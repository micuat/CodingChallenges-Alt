// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/CKeyIbT3vXI

// instance mode by Naoto Hieda

var fireworks = [];
var gravity;

var s = function (sketch) {

  sketch.setup = function () {
    sketch.createCanvas(400, 300);
    sketch.colorMode(sketch.HSB);
    gravity = sketch.createVector(0, 0.2);
    sketch.stroke(255);
    sketch.strokeWeight(4);
    sketch.background(0);
  }

  sketch.draw = function () {
    sketch.colorMode(sketch.RGB);
    sketch.background(0, 0, 0, 25);

    if (sketch.random(1) < 0.03) {
      fireworks.push(new Firework(sketch));
    }

    for (var i = fireworks.length - 1; i >= 0; i--) {
      fireworks[i].update();
      fireworks[i].show();

      if (fireworks[i].done()) {
        fireworks.splice(i, 1);
      }
    }
  }

};

var myp5 = new p5(s);
