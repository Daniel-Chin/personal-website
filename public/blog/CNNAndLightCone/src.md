# CNN and Light Cone

## Convolutional Neural Net (CNN)
Treat depth as time, then it is like a reality simulation. The filter size decides the angle of the light cone. 

There is no 超距作用 (nonlocal interactions), since information propogate in finite speed. 

## Maybe light cone is there for the god to simulate the world more easily. 
Let `V` be the volume of the universe. 

If light speed is infinite, then the time complexity of the simulation is `O(V²)`, since every point interact with every other point instantaneously. 

If light speed is finite, a point can only interact with points within a sphere of radius `R = (1 timestep) * (light speed)`. Time complexity is thus `O(V*R^3)`. If `V >> R`, that is `O(V)`. 

## Continuous CNN
We borrow the idea of reality and ask: can CNN be continuous? 

Previously I was thinking that the activation can be represented as wave functions. 

Now I am introduced to Immersed Boundary Methods, so I'm thinking using DSP to spread discrete representations to continuous space. 

## Planck 
Maybe reality is a simulation that has a low-pass filter of "Planck frequency"

## Jan 8 2021 Updates
There is a Wavelet CNN.  

The local vs global simulation can be found in soft body sim vs rigid body sim, and compressible fluid sim vs incompressible fluid sim.  
