# UI: Convenience and Consistency

I use WinSCP to transfer files with the university HPC. When starting the program, it asks me to select which server to connect to. I can use arrow keys to move your cursor in a list of servers and press Enter to select.  

Which server should be selected by default, before I move the cursor yourself?  

## Solution A: default to #0
The baseline solution.  

## Solution B: default to whatever is selected last time
This offers *convenience*. If I use shanghai.hpc.nyu.edu in November and newyork.hpc.nyu.edu in December, then I only need to use my arrow keys *once* on Dec. 1st. The rest of the times, I simply hit Enter.  

However, what if I need to use shanghai.hpc.nyu.edu once every morning and newyork.hpc.nyu.edu once every evening? Then I have to switch twice a day! Under solution A, I would only need to use my arrow keys once every day.  

That is not the biggest issue. The biggest issue with solution B is that it doesn't offer *consistency*. With solution A, a blind user can count on the default being #0 and use arrow keys to navigate to known-by-heart servers in the list. With solution B, even unimpaired users have to take a look at the cursor before moving on to use the arrow keys, taking efficiency away.  

## Solution C: default to the moving-mode of the last six selections
Record a short history of user selections. Find the most frequent selection among the last six interactions. Use that as the default option. 

Solution C is what I presume WinSCP to be using. I quite like this choice. It combines convenience and consistency to some degree. This is especially good when you have a long list of serves, where convenience becomes important. 
