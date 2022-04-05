# 梯度消失与命中注定
最近在做 differentiable physics simulations. 物理模拟中时间是离散的，每次前进 Δt, 形成类似 RNN 的依赖关系。因为模拟起止之间有许多 Δt, 这个 RNN 很深，于是出现了梯度爆炸、梯度消失的现象。

梯度爆炸，只要不是数值不精确性导致，便说明了输入（始状态）的微小扰动能造成输出（末状态）的巨大变化。物理中早就提出了这一现象：蝴蝶效应。看来蝴蝶效应可以由 “递归依赖关系层数太深” 来解释。

如果梯度爆炸对应着蝴蝶效应，那么梯度消失对应着什么？

梯度消失意味着，不论输入（始状态）怎么变化，输出（末状态）总保持不变。物理中，这叫做 “命中注定” (fate). 

在我最近的实验中，梯度爆炸和梯度消失出现的频率大致相似。这是否说明，现实中 “不可更改的命运” 的普遍性与蝴蝶效应相仿？