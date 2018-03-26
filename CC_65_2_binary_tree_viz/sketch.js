// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// Binary Tree
// Part 1: https://youtu.be/ZNH0MuQ51m4
// Part 2: https://youtu.be/KFEvF_ymuzY

// instance mode by Naoto Hieda

var tree;

var s = function (sketch) {

  sketch.setup = function () {
    sketch.createCanvas(600, 400);
    sketch.background(51);
    tree = new Tree(sketch);
    for (var i = 0; i < 100; i++) {
      tree.addValue(sketch.floor(sketch.random(0, 100)));
    }
    console.log(tree);
    tree.traverse();
  
    var result = tree.search(10);
    if (result == null) {
      console.log('not found');
    } else {
      console.log(result);
    }
  }

};

var myp5 = new p5(s);
