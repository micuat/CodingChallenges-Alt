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
1. Menger Sponge: Processing version doesn't have `normalMaterial`
1. Snake Game: none
1. Purple Rain: none
1. Space Invaders: `sketch.key === ' '` has to be `==` because in Nashorn `sketch.key` is a `java.lang.Character` object whereas `' '` is evaluated as `java.lang.String`