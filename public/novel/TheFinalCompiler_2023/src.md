# The Final Compiler
The following papers are fictional.  

## There Is a Limit of Compiler Optimization  
Published: Nov. 2023.  

**Abstract**:  
Compilers turn C programs into optimized assembly code. In this work, we rigorously establish the existence of a definitive upper bound on the extent to which a program can be optimized by a compiler. We formally denote this boundary as the "Optimization Ceiling." Employing our novel analytical framework, we evaluate the current SOTA compilers and find that their optimization capabilities are orders of magnitude inferior to the theoretically imposed Optimization Ceiling.  

## Attaining the Optimization Ceiling
Published: Feb. 2025. 

**Abstract**:  
Many recent studies have been dedicated to approaching the elusive Optimization Ceiling. Building upon the foundation laid by those prior works, we introduce a novel compiler and rigorously prove its position to be at the zenith of the Optimization Ceiling. We call it the "Pinnacle Compiler". Any C program, once compiled by the Pinnacle Compiler, is guaranteed to be as optimized as possible. However, the Pinnacle Compiler, characterized by its enormous codebase, incurs ~50 years of compilation time for even hello-world programs, rendering it entirely impractical for real-world applications.  

## Let the Pinnacle Compiler Think Step by Step  
Published: Mar. 2025. 

**Abstract**:  
It is well-known that the Pinnacle Compiler has absurdly long runtime. To mitigate that issue, we present a strategic adaptation known as the "Talkative Pinnacle Compiler." This variant of the compiler intermittently outputs a sequence of intermediate assembly drafts while optimizing the target C program. The draft sequence has the following two properties. (A) Every draft is a correct compilation of the target C program. (B) Each next draft is more optimized than the previous one. The implementation of the Talkative Pinnacle Compiler permits developers to prematurely terminate the compilation process, obtaining reasonably optimized runnables. However, it is imperative to acknowledge that this early termination strategy still lags behind SOTA compilers in terms of efficiency. 

## The Final Compiler
Published: Mar. 2025. 

**Abstract**:  
We introduce a transformative strategy to the Talkative Pinnacle Compiler: self-compilation. Once an intermediate draft assembly program is available, we abort the compilation process and use the draft assembly program to compile the Talkative Pinnacle Compiler. That process is then repeated until compilation finishes. It takes 13 days for the first draft to finalize, 2 days for the second draft, and 2 hours for the third draft. 475 more drafts are produced before we reach the final draft, but producing those 475 drafts takes only 3 seconds in total. We name the final draft as "the Final Compiler", which contains merely 42 lines of assembly code. As a demo, we compile Arch Linux with the Final Compiler. It takes only 5 milliseconds to compile and the resulting Arch Linux system is 800x faster than the baseline.  

## Acknowledgements
GPT3.5 revised the writing style.  
