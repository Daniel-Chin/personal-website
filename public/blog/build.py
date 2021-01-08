# Builds blogs source into html

import os
from myfile import hashFile
from chdir_context import ChdirContext, ChdirAlongside
from markdown import markdown
import json
from time import time
from indentprinter import indentPrinter

EXCLUDE_EXT = [
    'py', 'json', 'css', '__pycache__', 
    'gitignore', 
]

HASH_FILENAME = 'hash.txt'
ROOT_FILENAME = '../../src/helpers/blogRoot.json'

def main(ignore_hash = False):
    with ChdirAlongside(__file__):
        with open(ROOT_FILENAME, 'r', encoding='utf-8') as f:
            prev_root = json.load(f)
        blog_ids = [
            x for x in os.listdir() if not any([
                x.lower().endswith(y) for y in EXCLUDE_EXT
            ])
        ]
        root = []
        for blog_id in blog_ids:
            with ChdirContext(blog_id):
                src_name = getSrcName()
                if src_name is None:
                    continue
                src, meta = extract(blog_id, src_name, prev_root)
                modified = handleFolder(
                    src_name, src, meta, ignore_hash
                )
                if modified:
                    meta['time'] = time()
                root.append(meta)
        root.sort(key=lambda x:x['time'], reverse=True)
        with open(ROOT_FILENAME, 'w', encoding='utf-8') as f:
            json.dump(root, f, indent=2)

def getSrcName():
    list_dir = os.listdir()
    srcs = [
        x.lower() for x in list_dir 
        if x.lower().startswith('src')
    ]
    if srcs:
        return srcs[0]
    if 'build.html' in list_dir:
        return 'build.html'
    return None

def extract(blog_id, src_name, prev_root):
    with open(src_name, 'r', encoding='utf-8') as f:
        src = f.read()
    if src_name.endswith('.md'):
        line_0 = src.split('\n', 1)[0].strip()
        assert line_0.startswith('# ')
        title = line_0.lstrip('# ')
    elif src_name == 'build.html':
        _, t = src.split('<h1>', 1)
        title, _ = t.split('</h1>', 1)
    else:
        raise Exception(f'Unknown src type "{src_name}". ')
    times = [x['time'] for x in prev_root if x['id'] == blog_id]
    if times:
        _time = times[0]
    else:
        _time = time()
    return src, {
        'id': blog_id, 
        'title': title, 
        'time': _time, 
    }

def handleFolder(src_name, src, meta, ignore_hash):
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
            buildBlog(src_name, src, p)
            with open(HASH_FILENAME, 'w+', encoding='utf-8') as f:
                print(src_hash, file=f)
            p('Built successfully. ')
            return True

def buildBlog(src_name, src, p):
    if src_name.endswith('.md'):
        p('Translating code blocks...')
        translated = translateCodeBlock(src)
        p('Translating md to HTML...')
        body = markdown(
            translated, 
            extensions=['codehilite'], 
        )
        p('Writing HTML...')
        with open('build.html', 'w+', encoding='utf-8') as f:
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
    else:
        raise Exception(f'Unknown src type "{src_name}". ')

def translateCodeBlock(src):
    parts = src.split('\n```')
    assert len(parts) % 2 == 1
    buffer = []
    is_code = False
    for part in parts:
        if is_code:
            buffer.append('\n')
            lines = part.split('\n')
            language = lines.pop(0).strip()
            if language:
                buffer.append(
                    ' ' * 4 + '::' + language + '\n'
                )
            buffer.extend([' ' * 4 + x + '\n' for x in lines])
        else:
            if part[0] == '\n':
                part = part[1:]
            buffer.append(part)
        is_code = not is_code
    return ''.join(buffer)

if __name__ == '__main__':
    main()
    input('Enter...')
