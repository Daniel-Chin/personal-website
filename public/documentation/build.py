# Builds dcoumentation source into html

import os
from os import path
from shutil import copyfile
from myfile import hashFile
from chdir_context import ChdirContext, ChdirAlongside
from time import time
from indentprinter import indentPrinter

EXCLUDE_EXT = [
    'py', 'json', 'css', '__pycache__', 
    'gitignore', 'lnk', 'js', 'json', 'node_modules', 
]

HASH_FILENAME = 'hash.txt'

js = {}

def main(ignore_hash = False):
    with ChdirAlongside(__file__):
        js["script_fn"] = path.abspath("../blog/md.js")
        js["in_fn"]   = "md_js_in.md"
        js["out_fn"]  = "md_js_out.body"
        doc_ids = [
            x for x in os.listdir() if not any([
                x.lower().endswith(y) for y in EXCLUDE_EXT
            ])
        ]
        for doc_id in doc_ids:
            print(doc_id)
            with ChdirContext(doc_id):
                src_name, _ = getSrcName()
                if src_name is None:
                    continue
                handleFolder(
                    src_name, ignore_hash
                )

def getSrcName():
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
    return None, None

def handleFolder(src_name, ignore_hash):
    src_hash = hashFile(src_name)
    try:
        with open(HASH_FILENAME, 'r', encoding='utf-8') as f:
            prev_hash = f.read().strip()
    except FileNotFoundError:
        prev_hash = ''
    with indentPrinter as p:
        if src_hash == prev_hash and not ignore_hash:
            p('Not modified. ')
            return False
        else:
            p('Building...')
            buildDoc(src_name, p)
            with open(HASH_FILENAME, 'w', encoding='utf-8') as f:
                print(src_hash, file=f)
            p('Built successfully. ')
            return True

def buildDoc(src_name, p):
    if src_name.endswith('.md'):
        p('Translating md to HTML...')
        copyfile(src_name, js['in_fn'])
        os.system('node ' + js['script_fn'])
        with open(js['out_fn'], 'r', encoding='utf-8') as f:
            body = f.read()
        os.remove(js['in_fn'])
        os.remove(js['out_fn'])
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
        raise Exception(f'Unknown src type "{src_name}". ')

if __name__ == '__main__':
    main()
    input('Enter...')
