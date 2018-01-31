// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/CKeyIbT3vXI

// instance mode by Naoto Hieda

var fireworks = [];
var gravity;

var s = function (sketch) {

  sketch.setup = function () {
    sketch.createCanvas(800, 800);
    gravity = sketch.createVector(0, 0.2);
    sketch.stroke(255);
    sketch.strokeWeight(4);
    sketch.background(0);
  }

  sketch.draw = function () {
    sketch.colorMode(sketch.RGB);
    sketch.background(0);

    if (sketch.frameCount % 5 == 0) {
      let t = sketch.millis() * 0.0005;// % 1;
      let x = sketch.width / 2 + sketch.cos(t * 5) * 250;
      let y = 0;
      if((t*5) / sketch.TWO_PI % 8 < 2)
        y = -13 + 4*sketch.sin(t * 5);
      else if((t*5) / sketch.TWO_PI % 8 < 4)
        y = -13 + 0*sketch.sin(t * 5);
      else if((t*5) / sketch.TWO_PI % 8 < 6)
        y = -13 + 4*sketch.sin(t * 5 * 2);
      else
        y = -13 - 4*sketch.abs(sketch.sin(t * 5));
      fireworks.push(new Firework(sketch, x, y, 0));
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
