from build import main

print('This will rebuild all blogs, ignoring hashes. Proceed?')
if input('y/n >').lower() == 'y':
    main(ignore_hash=True)
