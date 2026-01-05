# Builds blogs source into html

import os
from os import path
from shutil import copyfile
import json
from time import time
import contextlib
import typing as tp

from daniel_chin_python_alt_stdlib.myfile import hashFile
from daniel_chin_python_alt_stdlib.indentprinter import indentPrinter

EXCLUDE_EXT = [
    'py', 'json', 'css', '__pycache__', 
    'gitignore', 'lnk', 'js', 'json', 'node_modules', 
]

HASH_FILENAME = 'hash.txt'
ROOT_FILENAME = '../../src/helpers/blogRoot.json'

IN_FILENAME  = "md_js_in.md"
OUT_FILENAME = "md_js_out.body"
SCRIPT_FILENAME = path.join(
    path.dirname(__file__), 
    'md.js',
)

def all_blog_ids():
    with contextlib.chdir(path.dirname(__file__)):
        return [
            x for x in os.listdir() if not any([
                x.lower().endswith(y) for y in EXCLUDE_EXT
            ])
        ]

def main(ignore_hash: bool = False):
    with contextlib.chdir(path.dirname(__file__)):
        with open(ROOT_FILENAME, 'r', encoding='utf-8') as f:
            prev_root = json.load(f)
        blog_ids = all_blog_ids()
        root = []
        for blog_id in blog_ids:
            with contextlib.chdir(blog_id):
                src_name_info = get_src_name_info()
                try:
                    src_name, build_type = src_name_info
                except TypeError:
                    continue
                meta = extract(blog_id, src_name, prev_root, build_type)
                modified = handle_folder(src_name, meta, ignore_hash)
                if modified and not ignore_hash:
                    meta['time'] = time()
                root.append(meta)
        root.sort(key=lambda x:x['time'], reverse=True)
        with open(ROOT_FILENAME, 'w', encoding='utf-8') as f:
            json.dump(root, f, indent=2)

def get_src_name_info() -> tuple[str, str]:
    list_dir = os.listdir()
    srcs = [
        x.lower() for x in list_dir 
        if x.lower().startswith('src')
    ]
    if srcs:
        return srcs[0], 'html'
    if 'build.html' in list_dir:
        return 'build.html', 'html'
    if 'build.pdf' in list_dir:
        return 'build.pdf', 'pdf'
    raise TypeError(f'Cannot recognize: {list_dir}. ')

def extract(blog_id: str, src_name: str, prev_root, build_type: str):
    def open_src():
        return open(src_name, 'r', encoding='utf-8')
    if src_name.endswith('.md'):
        with open_src() as f:
            line_0 = next(f).strip()
            assert line_0.startswith('# ')
            title = line_0.lstrip('# ')
    elif src_name == 'build.html':
        with open_src() as f:
            src = f.read()
        _, t = src.split('<h1>', 1)
        title, _ = t.split('</h1>', 1)
    elif src_name == 'build.pdf':
        with open('title.txt', 'r', encoding='utf-8') as f:
            title = f.read().strip()
    else:
        raise TypeError(f'Unknown src type "{src_name}". ')
    times = [x['time'] for x in prev_root if x['id'] == blog_id]
    if times:
        time_ = times[0]
    else:
        time_ = time()
    return {
        'id': blog_id, 
        'title': title, 
        'build_type': build_type, 
        'time': time_, 
    }

def handle_folder(src_name: str, meta, ignore_hash: bool):
    src_hash = hashFile(src_name)
    try:
        with open(HASH_FILENAME, 'r', encoding='utf-8') as f:
            prev_hash = f.read().strip()
    except FileNotFoundError:
        prev_hash = ''
    print(meta['title'])
    with indentPrinter as p:
        if src_hash == prev_hash and not ignore_hash:
            p('Not modified. ')
            return False
        else:
            p('Building...')
            build_blog(src_name, p)
            with open(HASH_FILENAME, 'w', encoding='utf-8') as f:
                print(src_hash, file=f)
            p('Built successfully. ')
            return True

def build_blog(src_name: str, p: tp.Callable[..., None]):
    if src_name.endswith('.md'):
        p('Translating md to HTML...')
        copyfile(src_name, IN_FILENAME)
        os.system('node ' + SCRIPT_FILENAME)
        with open(OUT_FILENAME, 'r', encoding='utf-8') as f:
            body = f.read()
        os.remove(IN_FILENAME)
        os.remove(OUT_FILENAME)
        body = body.replace('<a ', '<a target="_blank" ')
        p('Writing HTML...')
        with open('build.html', 'w', encoding='utf-8') as f:
            print('<html>', file=f)
            print('<head>', file=f)
            print('<link rel="stylesheet" href="/blog/style.css" />', file=f)
            print('</head>', file=f)
            print('<body>', file=f)
            print(body, file=f)
            print('</body>', file=f)
            print('</html>', file=f)
    elif src_name == 'build.html':
        p('build.html needs nothing to be done. ')
    elif src_name == 'build.pdf':
        p('build.pdf needs nothing to be done. ')
    # elif src_name.endswith('.docx'):
    #     p('.docx should be compiled with MS Word. ')
    else:
        raise TypeError(f'Unknown src type "{src_name}". ')

# def translateCodeBlock(src):
#     parts = src.split('\n```')
#     assert len(parts) % 2 == 1
#     buffer = []
#     is_code = False
#     for part in parts:
#         if is_code:
#             buffer.append('\n')
#             lines = part.split('\n')
#             language = lines.pop(0).strip()
#             if language:
#                 buffer.append(
#                     ' ' * 4 + '::' + language + '\n'
#                 )
#             buffer.extend([' ' * 4 + x + '\n' for x in lines])
#         else:
#             if part[0] == '\n':
#                 part = part[1:]
#             buffer.append(part)
#         is_code = not is_code
#     return ''.join(buffer)

if __name__ == '__main__':
    main()
    input('Enter...')
