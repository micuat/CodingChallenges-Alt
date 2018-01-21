// Coding Rainbow
// Daniel Shiffman
// http://patreon.com/codingtrain
// Code for: https://youtu.be/JcopTKXt8L8

// instance mode by Naoto Hieda

var tree;
var prevTree;
var min_dist = 5;
var max_dist = 200;
var cam;

var mode = 0;
var modeNum = 3;
var s = function (sketch) {

  sketch.setup = function () {
    sketch.createCanvas(800, 800, sketch.WEBGL);
    tree = new Tree(sketch);
  }

  sketch.draw = function () {
    sketch.background(0);
    if(sketch.frameCount % 180 == 0) {
      prevTree = tree;
      tree = new Tree(sketch);
    }
    if (!sketch.isLiveJs) {
      sketch.rotateY(sketch.map(sketch.mouseX, 0, sketch.width, -sketch.PI/4, sketch.PI/4));
    }
    sketch.rotateY(sketch.millis() * 0.0001);
    tree.show();
    tree.grow();

    if(prevTree != null) {
      prevTree.show();
      prevTree.grow();
    }
    else {
      sketch.ellipse(0, 0, 100, 100)
    }
  }

};

var myp5 = new p5(s);
