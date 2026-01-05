import contextlib

from .build import all_blog_ids, get_src_name_info

MAX_N_BLOGS: int | None = 5 # throttle

ENDPOINT = 'https://api.openai.com/v1/responses'
