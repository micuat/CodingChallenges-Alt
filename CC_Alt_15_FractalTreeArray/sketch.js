// Coding Rainbow
// Daniel Shiffman
// http://patreon.com/codingtrain
// Code for: https://youtu.be/fcdNSZ9IzJM

// instance mode by Naoto Hieda

var tree = [];
var leaves = [];

var count = 0;

var s = function (sketch) {

  sketch.setup = function () {
    sketch.createCanvas(800, 800);
    var a = sketch.createVector(sketch.width / 2, sketch.height);
    var b = sketch.createVector(sketch.width / 2, sketch.height - 200);
    var root = new Branch(sketch, a, b);

    tree[0] = root;
  }

  sketch.mousePressed = function () {
    for (var i = tree.length - 1; i >= 0; i--) {
      if (!tree[i].finished) {
        tree.push(tree[i].branchA());
        tree.push(tree[i].branchB());
      }
      tree[i].finished = true;
    }
    count++;

    if (count === 6) {
      for (var i = 0; i < tree.length; i++) {
        if (!tree[i].finished) {
          var leaf = tree[i].end.copy();
          leaves.push(leaf);
        }
      }
    }

  }

  sketch.draw = function () {
    sketch.background(0);

    for (var i = 0; i < tree.length; i++) {
      tree[i].show();
      if(tree[i].finished) 
      tree[i].jitter();
    }

    for (var i = 0; i < leaves.length; i++) {
      sketch.fill(255, 0, 100, 100);
      sketch.noStroke();
      sketch.ellipse(leaves[i].x, leaves[i].y, 8, 8);
      leaves[i].y += sketch.random(0, 2);
    }

  }

};

var myp5 = new p5(s);
