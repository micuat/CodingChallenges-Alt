// Coding Rainbow
// Daniel Shiffman
// http://patreon.com/codingtrain
// Code for: https://youtu.be/kKT0v3qhIQY


// instance mode by Naoto Hieda

var tree;
var max_dist = 100;
var min_dist = 10;

var s = function (sketch) {

  sketch.setup = function () {
    sketch.createCanvas(400, 400);
    tree = new Tree(sketch);
  }

  sketch.draw = function () {
    sketch.background(51);
    tree.show();
    tree.grow();
  }

};

var myp5 = new p5(s);
