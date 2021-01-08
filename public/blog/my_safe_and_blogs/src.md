# This blog system and its predecessor
## Diary Safebox
I wrote [an encrypted file system in python](https://github.com/daniel-chin/python_lib#bookpy) to store my diary.  
After several incremental improvements, I made a major update that required all diary entries to be re-encoded.  
When it turned out to be a success, I added an entry: 
> Title: Very happy to update my diary safebox  
> last modified at 2017-12-04 22:26:39  
>  
> The deed was done at 407, T2.  

"407, T2" was my freshman dormitory at NYU Shanghai.  
Seeing this brings back good memories.  

## Mind Extension
I later realized how unecessary it is to encrypt one's diary, especailly considering that mine were very much like blogs.  
So I started to store entries as `.txt`.  
I called the folder "Mind Extension". It was supposed to contain information I wished I could memorize by heart but could not.  

## Blogs on my personal website
Applying to PhD programs made me start a long-postponed project - building a project portfolio. The project portfolio then led to a personal website. Today (Jan-8 2021) I am migrating my Mind Extension entries to the blog system on my website. 

The blog system uses a "source - build" logic. I keep blogs in formats like `.md` and `.docx`. A script scans the directory and compiles them to `.html` and `.pdf`, summarizing meta info at the same time. For example, the system tracks the "last compiled time" of the blogs. If you see many blogs with Jan-8 2021 as "last compiled time", it is because of today's big migration.  
