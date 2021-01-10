# Builds novel source into html

import os
from os import path
from shutil import copyfile
from myfile import hashFile
from chdir_context import ChdirContext, ChdirAlongside
import json
from time import time
from indentprinter import indentPrinter
from meta_keywords import SRC, YEAR, TITLE, BUILD_NAME, ID

EXCLUDE_EXT = [
    '.py', 'css', '__pycache__', 
    '.gitignore', '.lnk', 
]

HASH_FILENAME = 'hash.txt'
ROOT_FILENAME = '../../src/helpers/novelRoot.json'

js = {}

def main(ignore_hash = False):
    with ChdirAlongside(__file__):
        js["script_fn"] = path.abspath("../blog/md.js")
        js["in_fn"]   = "md_js_in.md"
        js["out_fn"]  = "md_js_out.body"
        novel_ids = [
            x for x in os.listdir() if not any([
                x.lower().endswith(y) for y in EXCLUDE_EXT
            ])
        ]
        root = []
        for novel_id in novel_ids:
            with ChdirContext(novel_id):
                copyfile('../meta_keywords.py', 'meta_keywords.py')
                meta = __import__(
                    novel_id + '.meta'
                ).meta.meta
                src_name = meta[SRC]
                handleFolder(
                    novel_id, src_name, meta, ignore_hash
                )
                root.append(meta)
        root.sort(key=lambda x:x[YEAR], reverse=True)
        with open(ROOT_FILENAME, 'w', encoding='utf-8') as f:
            json.dump(root, f, indent=2)

def handleFolder(novel_id, src_name, meta, ignore_hash):
    print(meta[TITLE])
    meta[ID] = novel_id
    with indentPrinter as p:
        if src_name == 'build.pdf':
            build_name = 'build.pdf'
            need_build = False
        elif src_name == 'build.html':
            build_name = 'build.html'
            need_build = False
        else:
            raise Exception(f'File "{src_name}" is of unknown src type')
        meta[BUILD_NAME] = build_name

        if not need_build:
            p('Does not need build.')
            return
        
        src_hash = hashFile(src_name)
        try:
            with open(HASH_FILENAME, 'r', encoding='utf-8') as f:
                prev_hash = f.read().strip()
        except FileNotFoundError:
            prev_hash = ''
        if src_hash == prev_hash and not ignore_hash:
            p('Not modified. ')
            return False
        
        p('Building...')
        buildNovel(src_name, p)
        with open(HASH_FILENAME, 'w', encoding='utf-8') as f:
            print(src_hash, file=f)
        p('Built successfully. ')
        return True

def buildNovel(src_name, p):
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
    else:
        raise Exception(f'Unknown src type "{src_name}". ')

if __name__ == '__main__':
    main()
    input('Enter...')
