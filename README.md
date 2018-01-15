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
1. Menger Sponge
    * Processing version doesn't have `normalMaterial`
    * p5.js doesn't have `smooth` (in WEBGL) / `lights`
    * some issues with this scope (running alt on browser)
1. Snake Game: none
1. Purple Rain: none
1. Space Invaders
    * `sketch.key === ' '` has to be `==` because in Nashorn `sketch.key` is a `java.lang.Character` object whereas `' '` is evaluated as `java.lang.String`
1. Mitosis: none
1. Solar System Generator
    * Nashorn in Java shipped with Processing does not support keywords like `let` / `class`
    * LiveJS doesn't have `PGraphics.push` / `pop` yet
    * p5.js does not use `beginDraw` / `endDraw`
1. Solar System Generator 3D
    * since p5.js version doesn't exist, the code is ported from Processing version
    * since `this` is not `PApplet` in Nashorn, `pApplet.that` is assigned to `PApplet` as a workaround to instantiate `PeasyCam`
    * included `PeasyCam` in liveJs but ideally this should be configured in JavaScript. But Processing IDE needs to be hacked to achieve this
1. Solar System Generator 3D Texture: same as above
1. Maze DFS: none
1. Perlin Noise Terrain:
    * z is flipped because `rotateX` rotates opposite directions in Processing and p5.js???
1. Lorenz Attractor:
    * `let` -> `var`
    * `for (var ... of ...)` not supported
1. Reaction Diffusion:
    * p5.js `pixels` is an array of R,G,B,A,R,G,... whereas in Processing `pixels` is an array of `color` -> added `sketch.isLiveJs` constant as workaround
    * `pixelDensity` cannot be set in JavaScript
