# Learned tpmorp ensemble

## tpmorp
I have sentence A and word B. Is B related to A? My first thought is to use embedding similarity, but that requires encoding a sentence, which LM doesn't come with. The pure pre-trained LM solution is to use prompting. e.g.  
- Concatenate A and B and check likelihood. 
- Concatenate A and B and compare likelihood of continuation "That was unrelated." vs continuation "That makes sense."

Now, imagine you are making a dungeon game where the player can freely input texts. Today, the player is facing a cup of tea and must decide what to do. The game knows three possible outcomes: 
- player is poisoned. 
- player satiation level increases. 
- the tea becomes angry. 

The task is to give an appropriate outcome given the player's free-input action. Again, we can use LM to compare the likelihood of various continuations. Let's call each option a "tpmorp", i.e. the reverse of "prompt", since a prompt is a human-specified 上文, and a tpmorp is a human-specified 下文. 

By checking tpmorp likelihood, we can utilize general-purpose LM to do specific classification tasks. 

## tpmorp ensemble
We may increase the classification accuracy by providing an ensemble of tpmorps for a single category:
- player is poisoned. 
  - the tea poisoned the player. 
  - the player becomes ill from drinking the tea. 
  - ...
- player satiation level increases. 
  - player is less thirsty now. 
  - ...
- the tea becomes angry. 
  - the tea says, "why would you pass a nice cup of tea?"
  - ...

When we classify, we can use the weighted average likelihood of tpmorps to estimate the likelihood of an event. We can learn the weights of each tpmorp by gradient descend, as long as we have a dataset of tuples `(free-input text, outcome)`.  

## learned tpmorp
Next, we don't want to come up with tpmorps manually. Suppose we have a mechanism to propose tpmorps. It's easy to tell whether it's a good tpmorp, since we can run it over the dataset and check the correlation between the tpmorp likelihood and the ground truth outcome. This way, the system can automatically improve the ensembles of tpmorps and maintain suitable weights for them. At the end, humans can inspect the ensembles to interpret how the system does classification. 

How to propose tpmorps? We can ask an LM to continue "Similar sentences follow. {known tpmorp 0} {known tpmorp 1} ... \<mask\>". 

We can stop here. Or, we can use the learned ensemble technique to improve tpmorp proposals. 

## final quining
To summarize paragraph `X` with sentence `Y`, you can give the context "`X` TL;DR" and the LM to continue. (That is what GPT-2 did.) More generally, any natural language mapping task `X -> Y` can be rephrased as a LM-based prompt continuation task. Simply provide the context `prompt(X)` and the LM will give you `Y`. 

`prompt(X)` wraps `X` in prompts (e.g. "TLDR"), and is usually human-specified. Let's now have an ensemble of `prompt`s, and make it learnable too. When we have an ensemble of `prompt`s, to generate a token of `Y`, we take the weighted average of the likelihood vector provided by each `prompt` as the context. 

If we can propose and evaluate `prompt`, then tpmorp proposal becomes a mere special case of the general `X -> Y` task. Here X is a set of known tpmorps. Learn a good ensemble of `prompt`s that will propose new tpmorps that are related. 

To evaluate the quality of a `prompt`, there are two ways: 
- Boring way: train on a dataset of `(X, y)`. 
- Weird way: prepare many datasets of `(text, classification)` of various tasks. The quality of a `prompt` is how well it can be used to improve tpmorp proposals! 

To propose a `prompt` is another special case of `X -> Y`. 

Convergence? Who knows. 
