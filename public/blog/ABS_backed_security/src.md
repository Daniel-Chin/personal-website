# God over Djinn (GOD) and ABS Backed Security (ABS)
In the book GEB, Douglas Hofstadter made "GOD over Djinn (GOD)". The section is very interesting; I encourage you to search it up, or better, read the book.  

In Finance, ABS refers to "Asset Backed Security". I realized while taking Futures and Options (taught by professor Rodrigo Zeidan in 2020) that swaps (another financial instrument) can be viewed as two bonds whose collateral is each other. This view explains swaps' default risk very well. I then wrote the below blog, exploiting the fact that "Asset Backed Security" is a subclass of "Asset".  

## ABS
"A" stands for "ABS"  
"B" stands for "backed"  
"S" stands for "security"  

## How to unpack?
ABS  
= ABS backed security  
= ABS backed security backed security  
= ABS backed security backed security backed security  
...  

## How to make one? 
```python
x = ABS()
y = ABS()
x.back(y)
y.back(x)
```

## Does it exist?
Yes. A swap is basically a pair of ABS backed securities backed by each other. 

## 2008? 
Yes. The ABS-SPV-ABS... cycle was partially responsible for the 2007-2009 financial crisis. 

I personally blame the greed and irresponsibility in the financial sector and its regulations. Those people were after a different kind of fun tho, not like the fun I was having when writing this blog.  
