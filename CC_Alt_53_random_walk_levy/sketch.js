// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Video: https://youtu.be/bqF9w9TTfeo

// instance mode by Naoto Hieda

// var x;
// var y;
var pos;
var prev;
var angle = 0;


var s = function (sketch) {
  sketch.setup = function () {
    sketch.createCanvas(800, 800);
    sketch.background(0);
    pos = sketch.createVector(400, 400);
    prev = pos.copy();
    console.log(pos);
  }

  sketch.draw = function () {
    //point(pos.x, pos.y);
    var step = p5.Vector.random2D();

    if (sketch.frameCount % 120 == 0) {
      step = sketch.createVector(75, 0);
      step.rotate(angle);
      angle += sketch.PI / 8;
      sketch.stroke(255, 255);
      sketch.strokeWeight(1);
    } else {
      sketch.stroke(255, 50);
      sketch.strokeWeight(2);
      step.setMag(2);
    }

    //pos = pos + step;
    pos.add(step);

    sketch.line(pos.x, pos.y, prev.x, prev.y);
    prev.set(pos);

  }

};

var myp5 = new p5(s);
