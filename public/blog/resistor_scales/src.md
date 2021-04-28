# Tiers of scales
## Motivation: the Blues Synthesizer
I built an analogue synthesizer with a resistor ladder in the Pentatonic scale (G3 A3 C4 D4 E4). However, as a surprise side effect, the synthesizer supported one extra note, D♯4, making it a 6-note Blues scale. (See video demo at [this documentation](https://wp.nyu.edu/nyushanghai-dcdt/2021/03/19/weekly-performance-dj-carnivore/), section "Pentatonic piano"). 

Why did that happen? To make C4, I used (4 + 1 = 5) resistors, and to make D4, I used (4 + 1/2 = 4.5) resistors. The 1/2 is achieved by parallel-connecting two resistors. Holding C4 and D4 together parallel-connects the 1 and the 1/2, giving 1/3. Adding 4 back, we get 4.33, which is a D♯4. 

Is this a coincidence? Or is the Blues scale very special? 

## Building scales from resistors
I wrote a [python script](https://github.com/Daniel-Chin/personal-website/blob/main/public/blog/resistor_scales/1.py) to compute: what notes are possible to produce with a limited number (`N`) of resistors? As I increase `N`, more notes become available. Thus, we can formulate *multiple tiers of scales*. 

Note: Notes more than 10 cents off from the equal temperament are filtered away.  

### The tier-1 scale
C

### The tier-2 scale
C

### The tier-3 scale
C F G

### The tier-4 scale
C F G

### The tier-5 scale
C F G

### The tier-6 scale
C D F G A♯

This is a Pentatonic scale starting at F. 

### The tier-7 scale
C D D♯ E F F♯ G G♯ A A♯

### Conclusion
I have failed to replicate the appearance of the Blues scale. I don't know why. 

### Take a glance at the program output
```
Using 1 resistors:

    -<R>-

    fraction: 1
    note: C4 0%
    SAME OCTAVE

Available: {'C'}
Press Enter to continue...

Using 2 resistors:

    -<R>-<R>-

    fraction: 2
    note: C3 0%

  ============================================================

     |-<R>-|
    -|     |-
     |-<R>-|

    fraction: 1/2
    note: C5 0%

Available: {'C'}
Press Enter to continue...

Using 3 resistors:

    -<R>-<R>-<R>-

    fraction: 3
    note: F2 -2%

  ============================================================

     |-<R>-<R>-|
    -|         |-
     |---<R>---|

    fraction: 2/3
    note: G4 2%
    SAME OCTAVE

  ============================================================

     |-<R>-|
    -|     |-<R>-
     |-<R>-|

    fraction: 3/2
    note: F3 -2%

  ============================================================

     |-<R>-|
     |     |
    -|-<R>-|-
     |     |
     |-<R>-|

    fraction: 1/3
    note: G5 2%

Available: {'G', 'F', 'C'}
Press Enter to continue...

Using 4 resistors:

    -<R>-<R>-<R>-<R>-

    fraction: 4
    note: C2 0%

  ============================================================

     |-<R>-<R>-<R>-|
    -|             |-
     |-----<R>-----|

    fraction: 3/4
    note: F4 -2%
    SAME OCTAVE

  ============================================================

     |-<R>-|
     |     |
    -|-<R>-|-<R>-
     |     |
     |-<R>-|

    fraction: 4/3
    note: G3 2%

  ============================================================

     |-<R>-|
     |     |
     |-<R>-|
    -|     |-
     |-<R>-|
     |     |
     |-<R>-|

    fraction: 1/4
    note: C6 0%

Available: {'G', 'F', 'C'}
Press Enter to continue...

Using 5 resistors:

     |-<R>-<R>-|
    -|         |-<R>-<R>-
     |---<R>---|

    fraction: 8/3
    note: G2 2%

  ============================================================

     | |-<R>-|     |
     |-|     |-<R>-|
     | |-<R>-|     |
    -|             |-
     |-----<R>-----|
     |             |
     |-----<R>-----|

    fraction: 3/8
    note: F5 -2%

Available: {'G', 'F', 'C'}
Press Enter to continue...

Using 6 resistors:

    -<R>-<R>-<R>-<R>-<R>-<R>-

    fraction: 6
    note: F1 -2%

  ============================================================

     |-<R>-<R>-<R>-<R>-|
     |                 |
    -|-------<R>-------|-
     |                 |
     |-------<R>-------|

    fraction: 4/9
    note: D5 4%

  ============================================================

     |-<R>-<R>-|
     |         |
     |---<R>---|
     |         |
    -|---<R>---|-
     |         |
     |---<R>---|
     |         |
     |---<R>---|

    fraction: 2/9
    note: D6 4%

  ============================================================

     |-<R>-|
    -|     |-<R>-<R>-<R>-<R>-
     |-<R>-|

    fraction: 9/2
    note: A#1 -4%

  ============================================================

     |-<R>-|
     |     |
     |-<R>-|
    -|     |-<R>-<R>-
     |-<R>-|
     |     |
     |-<R>-|

    fraction: 9/4
    note: A#2 -4%

  ============================================================

     |-<R>-|
     |     |
     |-<R>-|
     |     |
     |-<R>-|
    -|     |-
     |-<R>-|
     |     |
     |-<R>-|
     |     |
     |-<R>-|

    fraction: 1/6
    note: G6 2%

Available: {'G', 'D', 'F', 'A#', 'C'}
Press Enter to continue...

Using 7 resistors:

     | |-<R>-<R>-|         |
     |-|         |-<R>-<R>-|
     | |---<R>---|         |
    -|                     |-
     |---------<R>---------|
     |                     |
     |---------<R>---------|

    fraction: 8/19
    note: D#5 -2%

  ============================================================

     | |-<R>-<R>-|         |
     | |         |         |
     |-|---<R>---|-<R>-<R>-|
    -| |         |         |-
     | |---<R>---|         |
     |                     |
     |---------<R>---------|

    fraction: 12/17
    note: F#4 3%
    SAME OCTAVE

  ============================================================

     | |-<R>-<R>-|     |
     | |         |     |
     |-|---<R>---|-<R>-|
    -| |         |     |-<R>-
     | |---<R>---|     |
     |                 |
     |-------<R>-------|

    fraction: 19/12
    note: E3 4%

  ============================================================

     | |-<R>-<R>-|     |
     | |         |     |
     | |---<R>---|     |
     |-|         |-<R>-|
    -| |---<R>---|     |-
     | |         |     |
     | |---<R>---|     |
     |                 |
     |-------<R>-------|

    fraction: 9/16
    note: A#4 -4%
    SAME OCTAVE

  ============================================================

     | |-<R>-|             |
     |-|     |-<R>-<R>-<R>-|
    -| |-<R>-|             |-<R>-
     |                     |
     |---------<R>---------|

    fraction: 16/9
    note: D3 4%

  ============================================================

     | | |-<R>-|         |     |
     | |-|     |-<R>-<R>-|     |
     |-| |-<R>-|         |-<R>-|
    -| |                 |     |-
     | |-------<R>-------|     |
     |                         |
     |-----------<R>-----------|

    fraction: 12/19
    note: G#4 -4%
    SAME OCTAVE

  ============================================================

     | |-<R>-|         |
     |-|     |-<R>-<R>-|
     | |-<R>-|         |
    -|                 |-<R>-
     |-------<R>-------|
     |                 |
     |-------<R>-------|

    fraction: 17/12
    note: F#3 -3%

  ============================================================

     | |-<R>-|     |
     |-|     |-<R>-|
     | |-<R>-|     |
    -|             |-<R>-<R>-
     |-----<R>-----|
     |             |
     |-----<R>-----|

    fraction: 19/8
    note: A2 2%

Available: {'G', 'D', 'D#', 'E', 'G#', 'A', 'F', 'A#', 'C', 'F#'}
Press Enter to continue...

Using 8 resistors:

    -<R>-<R>-<R>-<R>-<R>-<R>-<R>-<R>-

    fraction: 8
    note: C1 0%

  ============================================================

     |-<R>-<R>-<R>-<R>-<R>-|
    -|                     |-<R>-<R>-
     |---------<R>---------|

    fraction: 17/6
    note: F#2 -3%

  ============================================================

     | |-<R>-<R>-<R>-<R>-|     |
     | |                 |     |
     |-|-------<R>-------|-<R>-|
    -| |                 |     |-
     | |-------<R>-------|     |
     |                         |
     |-----------<R>-----------|

    fraction: 13/22
    note: A4 11%
    SAME OCTAVE

  ============================================================

     |-<R>-<R>-<R>-<R>-|
     |                 |
     |-------<R>-------|
     |                 |
    -|-------<R>-------|-
     |                 |
     |-------<R>-------|
     |                 |
     |-------<R>-------|

    fraction: 4/17
    note: C#6 5%

  ============================================================

     |-<R>-<R>-<R>-|
    -|             |-<R>-<R>-<R>-<R>-
     |-----<R>-----|

    fraction: 19/4
    note: A1 2%

  ============================================================

     | |-<R>-<R>-<R>-|             |
     |-|             |-<R>-<R>-<R>-|
    -| |-----<R>-----|             |-
     |                             |
     |-------------<R>-------------|

    fraction: 15/19
    note: E4 9%
    SAME OCTAVE

  ============================================================

     | |-<R>-<R>-<R>-|         |
     |-|             |-<R>-<R>-|
     | |-----<R>-----|         |
    -|                         |-
     |-----------<R>-----------|
     |                         |
     |-----------<R>-----------|

    fraction: 11/26
    note: D#5 -11%

  ============================================================

     | |-<R>-<R>-<R>-|     |
     |-|             |-<R>-|
     | |-----<R>-----|     |
     |                     |
    -|---------<R>---------|-
     |                     |
     |---------<R>---------|
     |                     |
     |---------<R>---------|

    fraction: 7/25
    note: A#5 4%

  ============================================================

     | |-<R>-<R>-<R>-|         |
     | |             |         |
     |-|-----<R>-----|-<R>-<R>-|
    -| |             |         |-
     | |-----<R>-----|         |
     |                         |
     |-----------<R>-----------|

    fraction: 17/24
    note: F#4 -3%
    SAME OCTAVE

  ============================================================

     | |-<R>-<R>-<R>-|     |
     | |             |     |
     |-|-----<R>-----|-<R>-|
    -| |             |     |-<R>-
     | |-----<R>-----|     |
     |                     |
     |---------<R>---------|

    fraction: 27/17
    note: E3 -1%

  ============================================================

     |-<R>-<R>-<R>-|
     |             |
     |-----<R>-----|
     |             |
     |-----<R>-----|
    -|             |-
     |-----<R>-----|
     |             |
     |-----<R>-----|
     |             |
     |-----<R>-----|

    fraction: 3/16
    note: F6 -2%

  ============================================================

     |-<R>-<R>-|
    -|         |-<R>-<R>-<R>-<R>-<R>-
     |---<R>---|

    fraction: 17/3
    note: F#1 -3%

  ============================================================

     | |-<R>-<R>-|             |
     |-|         |-<R>-<R>-<R>-|
    -| |---<R>---|             |-<R>-
     |                         |
     |-----------<R>-----------|

    fraction: 25/14
    note: D3 -4%

  ============================================================

     | | |-<R>-<R>-|         |     |
     | |-|         |-<R>-<R>-|     |
     |-| |---<R>---|         |-<R>-|
    -| |                     |     |-
     | |---------<R>---------|     |
     |                             |
     |-------------<R>-------------|

    fraction: 19/30
    note: G#4 -9%
    SAME OCTAVE

  ============================================================

     | |-<R>-<R>-|         |
     |-|         |-<R>-<R>-|
     | |---<R>---|         |
    -|                     |-<R>-
     |---------<R>---------|
     |                     |
     |---------<R>---------|

    fraction: 27/19
    note: F#3 -8%

  ============================================================

     | |-<R>-<R>-|         |
     |-|         |-<R>-<R>-|
     | |---<R>---|         |
     |                     |
    -|---------<R>---------|-
     |                     |
     |---------<R>---------|
     |                     |
     |---------<R>---------|

    fraction: 8/27
    note: A5 6%

  ============================================================

     | |-<R>-<R>-|     |
     |-|         |-<R>-|
     | |---<R>---|     |
    -|                 |-<R>-<R>-
     |-------<R>-------|
     |                 |
     |-------<R>-------|

    fraction: 31/13
    note: A2 -5%

  ============================================================

     |-<R>-<R>-|
     |         |
     |---<R>---|
     |         |
     |---<R>---|
    -|         |-<R>-
     |---<R>---|
     |         |
     |---<R>---|
     |         |
     |---<R>---|

    fraction: 13/11
    note: A3 11%

  ============================================================

     | |-<R>-|                     |
     |-|     |-<R>-<R>-<R>-<R>-<R>-|
    -| |-<R>-|                     |-
     |                             |
     |-------------<R>-------------|

    fraction: 11/13
    note: D#4 -11%
    SAME OCTAVE

  ============================================================

     | | |-<R>-|     |         |
     | |-|     |-<R>-|         |
     |-| |-<R>-|     |-<R>-<R>-|
     | |             |         |
    -| |-----<R>-----|         |-
     |                         |
     |-----------<R>-----------|
     |                         |
     |-----------<R>-----------|

    fraction: 13/31
    note: D#5 5%

  ============================================================

     | |-<R>-|     |
     |-|     |-<R>-|
     | |-<R>-|     |
    -|             |-<R>-<R>-<R>-
     |-----<R>-----|
     |             |
     |-----<R>-----|

    fraction: 27/8
    note: D#2 -6%

  ============================================================

     | | |-<R>-|     |         |
     | |-|     |-<R>-|         |
     | | |-<R>-|     |         |
     |-|             |-<R>-<R>-|
    -| |-----<R>-----|         |-
     | |             |         |
     | |-----<R>-----|         |
     |                         |
     |-----------<R>-----------|

    fraction: 19/27
    note: F#4 8%
    SAME OCTAVE

  ============================================================

     | | |-<R>-|     |     |
     | |-|     |-<R>-|     |
     | | |-<R>-|     |     |
     |-|             |-<R>-|
    -| |-----<R>-----|     |-<R>-
     | |             |     |
     | |-----<R>-----|     |
     |                     |
     |---------<R>---------|

    fraction: 30/19
    note: E3 9%

  ============================================================

     | | |-<R>-|     |     |
     | |-|     |-<R>-|     |
     | | |-<R>-|     |     |
     | |             |     |
     |-|-----<R>-----|-<R>-|
    -| |             |     |-
     | |-----<R>-----|     |
     | |             |     |
     | |-----<R>-----|     |
     |                     |
     |---------<R>---------|

    fraction: 14/25
    note: A#4 4%
    SAME OCTAVE

  ============================================================

     | |-<R>-|     |
     |-|     |-<R>-|
     | |-<R>-|     |
     |             |
     |-----<R>-----|
     |             |
    -|-----<R>-----|-
     |             |
     |-----<R>-----|
     |             |
     |-----<R>-----|
     |             |
     |-----<R>-----|

    fraction: 3/17
    note: F#6 3%

  ============================================================

     |-<R>-|
     |     |
    -|-<R>-|-<R>-<R>-<R>-<R>-<R>-
     |     |
     |-<R>-|

    fraction: 16/3
    note: G1 2%

  ============================================================

     | | |-<R>-|         |     |
     | | |     |         |     |
     | |-|-<R>-|-<R>-<R>-|     |
     |-| |     |         |-<R>-|
    -| | |-<R>-|         |     |-
     | |                 |     |
     | |-------<R>-------|     |
     |                         |
     |-----------<R>-----------|

    fraction: 17/27
    note: G#4 1%
    SAME OCTAVE

  ============================================================

     | |-<R>-|         |
     | |     |         |
     |-|-<R>-|-<R>-<R>-|
     | |     |         |
    -| |-<R>-|         |-<R>-
     |                 |
     |-------<R>-------|
     |                 |
     |-------<R>-------|

    fraction: 24/17
    note: F#3 3%

  ============================================================

     | |-<R>-|     |
     | |     |     |
     |-|-<R>-|-<R>-|
    -| |     |     |-<R>-<R>-<R>-
     | |-<R>-|     |
     |             |
     |-----<R>-----|

    fraction: 25/7
    note: D2 -4%

  ============================================================

     | |-<R>-|     |
     | |     |     |
     |-|-<R>-|-<R>-|
     | |     |     |
    -| |-<R>-|     |-<R>-<R>-
     |             |
     |-----<R>-----|
     |             |
     |-----<R>-----|

    fraction: 26/11
    note: A2 11%

  ============================================================

     | |-<R>-|     |
     | |     |     |
     |-|-<R>-|-<R>-|
     | |     |     |
     | |-<R>-|     |
    -|             |-<R>-
     |-----<R>-----|
     |             |
     |-----<R>-----|
     |             |
     |-----<R>-----|

    fraction: 19/15
    note: G#3 -9%

  ============================================================

     | |-<R>-|     |
     | |     |     |
     |-|-<R>-|-<R>-|
     | |     |     |
     | |-<R>-|     |
     |             |
    -|-----<R>-----|-
     |             |
     |-----<R>-----|
     |             |
     |-----<R>-----|
     |             |
     |-----<R>-----|

    fraction: 4/19
    note: D#6 -2%

  ============================================================

     |-<R>-|
     |     |
     |-<R>-|
    -|     |-<R>-<R>-<R>-<R>-
     |-<R>-|
     |     |
     |-<R>-|

    fraction: 17/4
    note: B1 -5%

  ============================================================

     | |-<R>-|         |
     | |     |         |
     | |-<R>-|         |
     |-|     |-<R>-<R>-|
    -| |-<R>-|         |-<R>-
     | |     |         |
     | |-<R>-|         |
     |                 |
     |-------<R>-------|

    fraction: 22/13
    note: D#3 -11%

  ============================================================

     | |-<R>-|     |
     | |     |     |
     | |-<R>-|     |
     | |     |     |
     |-|-<R>-|-<R>-|
     | |     |     |
    -| |-<R>-|     |-
     | |     |     |
     | |-<R>-|     |
     |             |
     |-----<R>-----|
     |             |
     |-----<R>-----|

    fraction: 6/17
    note: F#5 3%

  ============================================================

     |-<R>-|
     |     |
     |-<R>-|
     |     |
     |-<R>-|
     |     |
     |-<R>-|
    -|     |-
     |-<R>-|
     |     |
     |-<R>-|
     |     |
     |-<R>-|
     |     |
     |-<R>-|

    fraction: 1/8
    note: C7 0%

Available: {'G', 'D', 'D#', 'E', 'C#', 'G#', 'A', 'F', 'A#', 'C', 'B', 'F#'}
```