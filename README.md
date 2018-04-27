CodingChallenges-Alt
========

Naoto Hieda (2018)

About
--------

This is an attempt to do daily coding based on [Daniel Shiffman's code](https://github.com/CodingTrain/Rainbow-Code).

Objective
--------

1. to port Coding Challenges code to [p5.js instance mode](https://github.com/processing/p5.js/wiki/Global-and-instance-mode)
1. to experiment with graphics
1. and to do more tests with [liveJsP5js](https://github.com/micuat/liveJsP5js)

Differences
--------

1. Star Field: none
1. Menger Sponge:
    * Processing version doesn't have `normalMaterial`
    * p5.js doesn't have `smooth` (in WEBGL) / `lights`
    * some issues with `this` scope (running alt on browser)
1. Snake Game: none
1. Purple Rain: none
1. Space Invaders:
    * `sketch.key === ' '` has to be `==` because in Nashorn `sketch.key` is a `java.lang.Character` object whereas `' '` is evaluated as `java.lang.String`
1. Mitosis: none
1. Solar System Generator:
    * Nashorn ES6 does not support `class` ?? (`let` works though)
    * LiveJS doesn't have `PGraphics.push` / `pop` yet
    * p5.js does not use `beginDraw` / `endDraw`
1. Solar System Generator 3D:
    * since p5.js version doesn't exist, the code is ported from Processing version
    * since `this` is not `PApplet` in Nashorn, `pApplet.that` is assigned to `PApplet` as a workaround to instantiate `PeasyCam`
    * included `PeasyCam` in liveJs but ideally this should be configured in JavaScript. But Processing IDE needs to be hacked to achieve this
1. Solar System Generator 3D Texture: same as above
1. Maze DFS: none
1. Perlin Noise Terrain:
    * z is flipped because `rotateX` rotates opposite directions in Processing and p5.js???
1. Lorenz Attractor:
    * `for (var ... of ...)` not supported
1. Reaction Diffusion:
    * p5.js `pixels` is an array of R,G,B,A,R,G,... whereas in Processing `pixels` is an array of `color` -> added `sketch.isLiveJs` constant as workaround
    * `pixelDensity` cannot be set in JavaScript
    * `sketch.color` is (ridiculously) slow
1. Fractal Tree: none*
1. Fractal Tree Array: none
1. L-System: *
    * noLoop is difficult because of the design of LiveJs so instead `turtle()` is called every frame
    * `resetMatrix()` seems messing up something...
1. Space Colonizer: none
1. Space Colonizer 3D:
    * `sketch.WEBGL` doesn't go well with `Peasycam` so currently conditions are messy
1. Superellipse: none*
1. Cloth:
    * 2D: adapted [toxiclibs.js](https://github.com/hapticdata/toxiclibsjs) instead of original toxiclibs
    * 2D: needs smart way to avoid loading toxiclibs.js every reload
    * 3D: uses original toxiclibs
    * 3D: couldn't figure out how to inherit `Particle` and `Spring` from toxiclibs classes
1. Mandelbrot: *
    * `pixel` issue (refer to 13. Reaction Diffusion)
1. Juliaset: none (`color` really slow)
1. SuperShape 2D: none
1. Perlin Noise Flow Field:
    * Processing `random` seems sometimes returning out of bound value
    * cannot `background` in `setup`
1. Sphere Geometry: none
1. SuperShape3D:
    * condition for `Peasycam`
1. Fireworks:
    * 2D: none
    * 3D: fullscreen disabled
1. MetaBalls: none (again `color` is slow)
1. Smart Rockets: none
1. phyllotaxis:
    * no `angleMode` in Processing
1. Flappy Bird: none
1. agar.io: none (socket.io version skipped)
1. Posson Disc: none
1. DLA: none
1. TSP:
    * 1: none
    * 2, 3: `splice(index)` behaves differently in [nashorn](https://bugs.openjdk.java.net/browse/JDK-8023252)
    * 4: no `shuffle()` in Processing
    * 4: cannot call `ellipse()` between `beginShape`/`endShape` in Processing
1. Blobby: none
1. Diastic: \*\*
1. Word Interacter: \*\*
1. Madlibs: Alt skipped \*\*
1. TF-IDF: \*\*
1. Clappy Bird: \*\*
1. Markov Chain Names: \*\*
1. Context Free Grammar: \*\*
1. Sentiment Analysis: Alt skipped  \*\*
1. Firebase Saving Drawing: Instance/Alt skipped
1. Asteroids:
    * LiveJS does not have `windowWidth`/`windowHeight`
1. Pixel Sorting: none
1. Tweets by Month:
    * draw functions moved from `setup` to `draw`
1. Obama Mosaic: skipped as dataset was not found
1. Circle Packing Animated:
    * 1a: none
    * 1b: p5 does not have preload
    * 1b: p5 / p5js have different pixel order
    * 1b: p5 cannot set color with `color(string)`
    * 2: p5 does not have preload
1. A Star: none
1. Random Walk:
    * background color not properly set
1. Random Walk Levy:
    * background color not properly set
1. Star Patterns:
    * 1: none \*
    * 2: none \*
1. Roses: none \*
1. Attraction Repulsion:
    * p5 does not draw anything when start and end points passed to `line` are the same (in p5.js it show up as a circle)
1. Earthquake Viz:
    * p5's `loadImage` needs second argument to specify file extension
1. Earthquake Viz 3D: none
1. Steering Text Paths:
    * `textToPoint` replaced by geomerative
    * geomerative does not support otf
1. Butterfly Wings: none
1. Fractal Spirograph:
    * `for (var ... of ...)` not supported
1. Plinko:
    * p5 does not have `loadSound`
1. Unikitty Flag: none
1. Forward Kinematics:
    * 1a, 1b: Nashorn ES6 does not support `class`
    * 1a, 1b: Java object does not have `hasOwnProperty`
    * 2: ported from p5
    * 3: ported from p5
    * 4: ported from p5
1. Binary Tree:
    * 1: p5 does not have `noCanvas`
    * 2: none
1. Timer: none \*\*
1. Pong:
    * sound lib different in p5
    * `'a'` and `'A'` are treated the same in p5.js but not in p5
    * `text(number)` shows floating point in p5
1. BFS Kevin Bacon: none \*\*
1. Steering Evolution: none \*
1. Nearest Neighbors:
    * 1: none \*\*
    * 2: none \*\*
    * 3: none \*\*
1. Mine Sweeper: add `nf` to convert float to int
1. Frogger:
    * `UP` is `UP_ARROW` in p5.js
1. Acrostic:
    * none \*\*
1. Clock:
    * no `angleMode` in Processing
1. Wikipedia: none \*\*
1. 10 PRINT: none
1. Recursion: none
1. Simple Particle System:
    * `class` to `function`
1. Number Guessing Chatbot: none \*\*
1. Voice Chatbot: none (it seems there's bug in original version) \*\*
1. Circle Morphing:
    * Part 1, 2: no `angleMode` in Processing
    * Part 1: change timing
    * Part 2: Nashorn cannot add members to Java class
1. Image Chrome Extension The Ex-Kitten-sion: skipping chrome extensions
1. Chrome Extension with p5.js Sketch: skipping chrome extensions
1. Word Definition Extension: skipping chrome extensions
1. The Game of Life: none
1. Bees and Bombs:
    * Processing version doesn't have `normalMaterial`
1. 3D Knots: none
1. Snowfall:
    * `class` to `function`
    * `for of` to `for in`
1. Langton's Ant: none
1. Dithering:
    * change `color` structure
1. Snakes and Ladders: \*
    * `class` to `function`
    * `for of` to `for in`
1. XOR:
    * nn library replaced by synaptic as nn uses ES6
1. Double Pendulum:
    * different buffer API
1. 2048:
    * fix ES6 compatibility
    * move drawing operations to `draw`
    * hex color string needs to be converted to `color`
1. Approximating Pi: none
1. Visualizing the Digits of Pi: none
1. Book of Pi:
    * 1, 2: needs to edit `size` to PDF mode
1. QuadTree:
    * 1, 3: ES6 compatibility
1. Color Predictor:
    * replace nn with synaptic
    * draw every frame instead of redraw

\* DOM replaced by other input/output  
\*\* HTML5 example, no LiveJS version
