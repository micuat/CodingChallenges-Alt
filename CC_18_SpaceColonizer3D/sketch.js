// Coding Rainbow
// Daniel Shiffman
// http://patreon.com/codingtrain
// Code for: https://youtu.be/JcopTKXt8L8

// instance mode by Naoto Hieda

var tree;
var min_dist = 5;
var max_dist = 200;
var cam;

var s = function (sketch) {

  sketch.setup = function () {
    if (sketch.isLiveJs)
      sketch.createCanvas(600, 900);
    else
      sketch.createCanvas(600, 900, sketch.WEBGL);
    if (sketch.isLiveJs)
      cam = new Packages.peasy.PeasyCam(pApplet.that, 500);
    tree = new Tree(sketch);
  }

  sketch.draw = function () {
    sketch.background(51);
    if (!sketch.isLiveJs) {
      sketch.rotateY(sketch.map(sketch.mouseX, 0, sketch.width, -sketch.PI/4, sketch.PI/4));
    }
    tree.show();
    tree.grow();
  }

};

var myp5 = new p5(s);
