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
    sketch.createCanvas(800, 800, sketch.WEBGL);
    tree = new Tree(sketch);
  }

  sketch.draw = function () {
    if(sketch.frameCount % 300 == 0) {
      tree = new Tree(sketch);
    }

    sketch.background(0);
    sketch.rotateY(sketch.millis() * 0.0001);
    sketch.rotateX(sketch.PI/3);
    tree.show();
    tree.grow();
  }

};

var myp5 = new p5(s);
