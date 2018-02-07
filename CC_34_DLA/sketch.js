// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for this video: https://youtu.be/Cl_Gjj80gPE

// instance mode by Naoto Hieda

var tree = [];
var walkers = [];
//var r = 4;
var maxWalkers = 50;
var iterations = 1000;
var radius = 8;
var hu = 0;
var shrink = 0.995;

var s = function (sketch) {

  sketch.setup = function () {
    sketch.createCanvas(400, 400);
    sketch.colorMode(sketch.HSB);
    // for (var x = 0; x < width; x += r * 2) {
    //   tree.push(new Walker(x, height));
    // }

    tree[0] = new Walker(sketch, sketch.width / 2, sketch.height / 2);
    radius *= shrink;
    for (var i = 0; i < maxWalkers; i++) {
      walkers[i] = new Walker(sketch);
      radius *= shrink;
    }
  }

  sketch.draw = function () {
    sketch.background(0);

    for (var i = 0; i < tree.length; i++) {
      tree[i].show();
    }

    for (var i = 0; i < walkers.length; i++) {
      walkers[i].show();
    }

    for (var n = 0; n < iterations; n++) {
      for (var i = walkers.length - 1; i >= 0; i--) {
        walkers[i].walk();
        if (walkers[i].checkStuck(tree)) {
          walkers[i].setHue(hu % 360);
          hu += 2;
          tree.push(walkers[i]);
          walkers.splice(i, 1);
        }
      }
    }

    var r = walkers[walkers.length - 1].r;
    while (walkers.length < maxWalkers && radius > 1) {
      radius *= shrink;
      walkers.push(new Walker(sketch));
    }

  }

};

var myp5 = new p5(s);
