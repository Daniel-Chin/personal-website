from __future__ import annotations

import typing as tp
import os
import contextlib
import functools
import io
import hashlib
import json
import base64
import mimetypes
import time

from openai import OpenAI
import openai.types.responses as tp_r
from pydantic import BaseModel, ConfigDict, model_validator

from public.blog.build import all_blog_ids, get_src_name_info, ROOT_FILENAME

MAX_N_BLOGS: int | None = 1 # throttle
MODEL = 'gpt-5.2'

ENDPOINT = '/v1/responses'
PROMPT_FILENAME = os.path.join(
    os.path.dirname(__file__),
    'prompt.md',
)
LLM_COMMENT_FILENAME = 'llm_comment_info.json'

CONTENT_HASH = 'content_hash'

class OnceComment(BaseModel):
    blog_content_hash: str
    prompt_hash: str
    comment: str | None
    model_snapshot: str | None

    model_config = ConfigDict(frozen=True)

class LLMCommentInfo(BaseModel):
    status: tp.Literal['not_requested', 'in_progress', 'completed']
    latest: OnceComment | None
    old: OnceComment | None

    model_config = ConfigDict(frozen=True)

    @model_validator(mode='after')
    def check_consistency(self) -> tp.Self:
        match self.status:
            case 'not_requested':
                assert self.latest is None
                assert self.old is None
            case 'in_progress':
                assert self.latest is not None  # contains the new content hash, corresponding to the in-progress request
                assert self.latest.comment is None
                assert self.latest.model_snapshot is None
            case 'completed':
                assert self.latest is not None
                assert self.latest.comment is not None
                assert self.latest.model_snapshot is not None
                assert self.old is None
        return self
    
    @classmethod
    def fresh(cls) -> tp.Self:
        return cls(
            status='not_requested',
            latest=None,
            old=None,
        )
    
    def on_new_request(
        self, new_blog_content_hash: str, 
    ) -> LLMCommentInfo:
        assert self.status in ('not_requested', 'completed')
        return LLMCommentInfo(
            status='in_progress',
            latest=OnceComment(
                blog_content_hash=new_blog_content_hash,
                prompt_hash=prompt_hash(),
                comment=None,
                model_snapshot=None,
            ),
            old=self.latest,
        )
    
    def on_failed(self) -> LLMCommentInfo:
        assert self.status == 'in_progress'
        return LLMCommentInfo(
            status='not_requested' if self.old is None else 'completed',
            latest=self.old,
            old=None,
        )
    
    def on_succeeded(self, comment: str, model_snapshot: str) -> LLMCommentInfo:
        assert self.status == 'in_progress'
        assert self.latest is not None
        return LLMCommentInfo(
            status='completed',
            latest=OnceComment(
                blog_content_hash=self.latest.blog_content_hash,
                prompt_hash=self.latest.prompt_hash,
                comment=comment,
                model_snapshot=model_snapshot,
            ),
            old=None,
        )
    
    @classmethod
    def load(cls, filename: str = LLM_COMMENT_FILENAME) -> LLMCommentInfo:
        try:
            with open(filename, 'r', encoding='utf-8') as f:
                json_text = f.read()
        except FileNotFoundError:
            return cls.fresh()
        return cls.model_validate_json(json_text)

    def save(self, filename: str = LLM_COMMENT_FILENAME) -> None:
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(self.model_dump_json(indent=2))

@functools.lru_cache(maxsize=1)
def prompt() -> str:
    with open(PROMPT_FILENAME, 'r', encoding='utf-8') as f:
        return f.read()

@functools.lru_cache(maxsize=1)
def prompt_hash() -> str:
    hasher = hashlib.sha256()
    hasher.update(prompt().encode('utf-8'))
    return hasher.hexdigest()

def body(blog_content_rich: tp_r.ResponseInputParam, content_hash: str) -> dict:
    return dict(
        input=blog_content_rich,
        instructions=prompt(),
        max_output_tokens=2000,
        model=MODEL,
        reasoning=dict(
            effort='medium',
        ),
        # temperature=0.7,  # not supported by gpt-5.2
        # tools=[{"type": "web_search"}],   # unsupported by OpenAI
        # tool_choice='auto',
        metadata={CONTENT_HASH: content_hash},
    )

def request(blog_id: str, blog_content_rich: tp_r.ResponseInputParam, content_hash: str) -> dict:
    return dict(
        custom_id=blog_id,
        method='POST',
        url=ENDPOINT,
        body=body(blog_content_rich, content_hash),
    )

def iter_images() -> tp.Generator[tuple[str, str, str], None, None]:
    for fname in os.listdir():
        _, ext = os.path.splitext(fname)
        if ext.lower() not in ('.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp'):
            continue
        mime_type, _ = mimetypes.guess_type(fname)
        with open(fname, 'rb') as f:
            img_data = f.read(1024 * 1024 * 3)  # max 3MB
            if f.read(1):
                print(f'Image {os.path.abspath(fname)} too large (>2MB), skipping. ')
                continue
        img_b64 = base64.b64encode(img_data).decode('utf-8')
        yield fname, mime_type or 'image/jpeg', img_b64

def iter_all_blogs():
    all_blogs_time = {id_: time.time() for id_ in all_blog_ids()}
    with open(ROOT_FILENAME, 'r', encoding='utf-8') as f:
        root = json.load(f)
    for entry in root:
        all_blogs_time[entry['id']] = entry['time']
    sorted_blog_ids = sorted(
        all_blogs_time.items(),
        key=lambda x: x[1],
        reverse=True,
    )
    # for blog_id, _ in sorted_blog_ids:
    for blog_id in all_blog_ids():
        with contextlib.chdir(blog_id):
            info = LLMCommentInfo.load()
            try:
                src_name_info = get_src_name_info()
            except ValueError:
                continue
            src_name, _ = src_name_info
            if src_name.lower() != 'src.md':
                continue    # only supports md for now
            with open(src_name, 'r', encoding='utf-8') as f:
                blog_content = f.read().strip()
            content_parts = list[tp_r.ResponseInputContentParam]()
            content_parts.append(tp_r.ResponseInputTextParam(
                type='input_text',
                text=blog_content,
            ))
            for _, mime_type, img_b64 in iter_images():
                content_parts.append(tp_r.ResponseInputImageParam(
                    type='input_image',
                    image_url=f"data:{mime_type};base64,{img_b64}",
                    detail='auto',
                ))
            blog_content_rich: list[tp_r.ResponseInputItemParam] = [tp_r.EasyInputMessageParam(
                type='message',
                role='user',
                content=content_parts,
            )]
            hasher = hashlib.sha256()
            hasher.update(json.dumps(blog_content_rich).encode('utf-8'))
            blog_content_hash = hasher.hexdigest()
            yield blog_id, blog_content_rich, blog_content_hash, info

@functools.lru_cache(maxsize=1)
def all_blogs() -> tuple[tuple[str, tp_r.ResponseInputParam, str, LLMCommentInfo], ...]:
    return tuple(iter_all_blogs())

@functools.lru_cache(maxsize=1)
def to_comment():
    return tuple(iter_to_comment())

def iter_to_comment() -> tp.Generator[tuple[str, tp_r.ResponseInputParam, str, LLMCommentInfo], None, None]:
    acc = 0
    for blog_id, blog_content_rich, blog_content_hash, info in all_blogs():
        match info.status:
            case 'not_requested':
                pass
            case 'in_progress':
                raise RuntimeError('Duplicate in-progress jobs detected. ')
                # pass
            case 'completed':
                if (
                    info.latest is not None 
                    and info.latest.blog_content_hash == blog_content_hash 
                    and info.latest.prompt_hash == prompt_hash()
                ):
                    continue    # already up-to-date
        yield blog_id, blog_content_rich, blog_content_hash, info
        acc += 1
        if MAX_N_BLOGS is not None and acc >= MAX_N_BLOGS:
            break

def jsonl() -> io.BytesIO:
    buf = io.BytesIO()
    for blog_id, blog_content_rich, blog_content_hash, _ in to_comment():
        req = request(blog_id, blog_content_rich, blog_content_hash)
        buf.write(json.dumps(req).encode('utf-8'))
        buf.write(b'\n')
    buf.seek(0)
    return buf

def submit_job(open_ai: OpenAI) -> None:
    for blog_id, _, blog_content_hash, old_info in to_comment():
        with contextlib.chdir(blog_id):
            info = old_info.on_new_request(blog_content_hash)
            info.save()
    batch_input_file = open_ai.files.create(
        file=jsonl(),
        purpose='batch',
    )
    print('batch_input_file:', *batch_input_file, sep='\n  ')
    print()
    batch_input_file_id = batch_input_file.id
    result = open_ai.batches.create(
        input_file_id=batch_input_file_id,
        endpoint=ENDPOINT,
        completion_window='24h',
        metadata=dict(
            description='llm comments blogs',
        ),
    )
    print('batch result:', *result, sep='\n  ')

def check_job(open_ai: OpenAI, batch_id: str) -> None:
    batch = open_ai.batches.retrieve(batch_id)
    print('batch:', *batch, sep='\n  ')

def check_all_jobs(open_ai: OpenAI) -> None:
    N = 10
    print('first', N, 'jobs:')
    bs = open_ai.batches.list(limit=N)
    for i, b in enumerate(bs.data):
        print(f'  batch {i}:', *b, sep='\n    ')
        print()

def retrieve_job(open_ai: OpenAI, batch_id: str) -> None:
    batch = open_ai.batches.retrieve(batch_id)
    match batch.status:
        case 'validating' | 'in_progress' | 'finalizing':
            print(f'Yo, patience. {batch.status = }')
            return
        case 'completed':
            if batch.error_file_id is None:
                err_text = ''
            else:
                err_text = open_ai.files.content(batch.error_file_id).text
            if batch.output_file_id is None:
                print('No output file ID found in completed batch. ')
                print('batch:', *batch, sep='\n  ')
                print()
                print(f'{err_text = }')
            else:
                file_response_out = open_ai.files.content(batch.output_file_id)
                digest(file_response_out.text, err_text)
        case 'failed' | 'expired' | 'cancelling' | 'cancelled':
            print(f'Batch job did not complete successfully: {batch.status = }')
        case _ as unreachable:
            tp.assert_never(unreachable)
    all_the_rest_failed()

def all_the_rest_failed() -> None:
    acc = 0
    for blog_id, _, _, old_info in all_blogs():
        with contextlib.chdir(blog_id):
            if old_info.status != 'in_progress':
                continue
            info = old_info.on_failed()
            info.save()
            acc += 1
    if acc > 0:
        print(f'Updated {acc} blogs\' comment info to reflect failed job.')

def digest(
    out_text: str, err_text: str, # both jsonl
) -> None:
    for out_line in out_text.splitlines():
        try:
            out_obj = json.loads(out_line)
            blog_id: str = out_obj['custom_id']
            response: dict = out_obj['response']
            body: dict = response['body']
            response_ = tp_r.Response.model_validate(body)
            assert response_.status == 'completed'
            output = response_.output
            msg, = [x for x in output if x.type != 'reasoning']
            assert msg.type == 'message'
            assert msg.status == 'completed'
            assert msg.role == 'assistant'
            content = msg.content
            text_part, = content
            assert text_part.type == 'output_text'
            comment = text_part.text
            metadata = response_.metadata
            assert metadata is not None
            api_content_hash: str = metadata[CONTENT_HASH]
        except Exception as e:
            print(f'{e} at {out_line = !r}')
            print('response_:', *response_, sep='\n  ')   # type: ignore
            raise e
        with contextlib.chdir(blog_id):
            old_info = LLMCommentInfo.load()
            if old_info.status == 'in_progress':
                info = old_info.on_succeeded(comment, response_.model)
                assert info.latest is not None
                if info.latest.blog_content_hash != api_content_hash:
                    raise RuntimeError('Content hash mismatch!?')
                if info.latest.prompt_hash != prompt_hash():
                    raise RuntimeError('Prompt hash mismatch!?')
                    # pass
                info.save()
            else:
                if old_info.latest is not None and old_info.latest.comment == comment:
                    pass # repeated digest
                else:
                    raise RuntimeError('Local rejects API response!?')
        print('ok:', blog_id)
    if err_text.strip():
        print()
        print(f'{err_text = }')

def main():
    with contextlib.chdir(os.path.dirname(__file__)):
        open_ai = OpenAI()
        
        # print(f'Pending blogs (capped {MAX_N_BLOGS}):', *[x[0] for x in to_comment()], sep='\n')
        # input('Enter...')
        # submit_job(open_ai)

        batch_id = 'batch_695cd93dd4148190a1f7bc22059f593b'

        # check_job(open_ai, batch_id)
        retrieve_job(open_ai, batch_id)

if __name__ == '__main__':
    main()
