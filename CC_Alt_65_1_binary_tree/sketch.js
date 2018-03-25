// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// Binary Tree
// Part 1: https://youtu.be/ZNH0MuQ51m4
// Part 2: https://youtu.be/KFEvF_ymuzY

// instance mode by Naoto Hieda

var tree;
var count = 0;
var colorType = 0;

var s = function (sketch) {

  sketch.setup = function () {
    sketch.createCanvas(800, 800);
    tree = new Tree(sketch);
    // for (var i = 0; i < 40; i++) {
    tree.addValue(sketch.floor(sketch.random(0, 255)));
    // }
    console.log(tree);

    var result = tree.search(10);
    if (result == null) {
      console.log('not found');
    } else {
      console.log(result);
    }

    sketch.colorMode(sketch.RGB);
    sketch.background(0);
  }

  sketch.draw = function () {
    sketch.noStroke();
    tree.traverse();
    if (count < 50) {
      tree.addValue(sketch.floor(sketch.random(0, 255)));
      count++;
    }
    else {
      sketch.background(0);
      count = 0;
      tree = new Tree(sketch);
      tree.addValue(sketch.floor(sketch.random(0, 255)));
      colorType = (colorType + 1) % 3;
    }
    // tree.show();
  }

};

var myp5 = new p5(s);
