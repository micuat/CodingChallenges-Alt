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

\* DOM replaced by other input/output
