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
var radius = 16;
var hu = 0;
var shrink = 0.995;
var curIndex = 0;

var s = function (sketch) {

  sketch.setup = function () {
    sketch.createCanvas(800, 800);
    sketch.colorMode(sketch.RGB);
    // for (var x = 0; x < width; x += r * 2) {
    //   tree.push(new Walker(x, height));
    // }

    tree[0] = new Walker(sketch, sketch.width / 2, sketch.height / 2, sketch.height / 2);
    radius *= shrink;
    for (var i = 0; i < maxWalkers; i++) {
      walkers[i] = new Walker(sketch);
      radius *= shrink;
    }
    let w = walkers[curIndex];
    w.vel = sketch.createVector(sketch.width / 2 - w.pos.x,
      sketch.height / 2 - w.pos.y,
      sketch.height / 2 - w.pos.z)
    w.vel.mult(0.0001);
    w.hitWall = false;
  }

  sketch.draw = function () {
    sketch.background(255);
    sketch.shininess(32.0);
    sketch.lightSpecular(255, 255, 255);
    sketch.directionalLight(255, 255, 255, -0.5, 0.2, -1);
    sketch.translate(sketch.width / 2, sketch.height / 2, sketch.height / 2);
    sketch.rotateY(sketch.millis() * 0.0001);
    sketch.scale(0.75, 0.75, 0.75);
    sketch.translate(-sketch.width / 2, -sketch.height / 2, -sketch.height / 2);

    // sketch.translate(0, 0, -sketch.height);
    for (var i = 0; i < tree.length; i++) {
      tree[i].show();
    }

    for (var i = 0; i < walkers.length; i++) {
      walkers[i].show();
    }

    for (var n = 0; n < iterations; n++) {
      for (var i = walkers.length - 1; i >= 0; i--) {
        if (i == curIndex) {
          walkers[i].walk();
          if (walkers[i].hitWall) {
            curIndex = sketch.floor(sketch.random(walkers.length));
            let w = walkers[curIndex];
            w.vel = sketch.createVector(sketch.width / 2 - w.pos.x,
              sketch.height / 2 - w.pos.y,
              sketch.height / 2 - w.pos.z)
            w.vel.mult(0.0001);
            w.hitWall = false;
          }
          if (walkers[i].checkStuck(tree)) {
            walkers[i].setHue(hu % 360);
            hu += 2;
            tree.push(walkers[i]);
            walkers.splice(i, 1);

            curIndex = sketch.floor(sketch.random(walkers.length));
            let w = walkers[curIndex];
            w.vel = sketch.createVector(sketch.width / 2 - w.pos.x,
              sketch.height / 2 - w.pos.y,
              sketch.height / 2 - w.pos.z)
            w.vel.mult(0.0001);
            w.hitWall = false;
          }
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
