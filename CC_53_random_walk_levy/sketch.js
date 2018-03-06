// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Video: https://youtu.be/bqF9w9TTfeo

// instance mode by Naoto Hieda

// var x;
// var y;
var pos;
var prev;


var s = function (sketch) {
  sketch.setup = function () {
    sketch.createCanvas(400, 400);
    sketch.background(51);
    pos = sketch.createVector(200, 200);
    prev = pos.copy();
    console.log(pos);
  }

  sketch.draw = function () {
    sketch.stroke(255);
    sketch.strokeWeight(2);
    //point(pos.x, pos.y);
    sketch.line(pos.x, pos.y, prev.x, prev.y);
    prev.set(pos);

    var step = p5.Vector.random2D();

    var r = sketch.random(100);
    if (r < 1) {
      step.mult(sketch.random(25, 100));
    } else {
      step.setMag(2);
    }

    //pos = pos + step;
    pos.add(step);

  }

};

var myp5 = new p5(s);
