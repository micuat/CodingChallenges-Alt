// Coding Rainbow
// Daniel Shiffman
// http://patreon.com/codingtrain
// Code for: https://youtu.be/0jjeOYMjmDU

// instance mode by Naoto Hieda

var angle = 0;

var s = function (sketch) {

  sketch.setup = function () {
    sketch.createCanvas(800, 800);
  }

  sketch.draw = function () {
    sketch.background(0);
    angle = sketch.map(sketch.millis(), 0, 10000, sketch.TWO_PI*2, 0);
    sketch.noStroke();
    sketch.fill(255, 100);
    sketch.translate(sketch.width / 2, sketch.height / 2);

    var len = 120;
    sketch.branch(120);
  }

  sketch.branch = function (len) {
    if (len > 10) {
      sketch.push();
      sketch.rotate(angle * (1 - len / 400) * (1 - len / 400) * (1 - len / 400));
      sketch.quad(0, 0, -3, -len/2, 0, -len, 3, -len/2);
      sketch.translate(0, -len);
      sketch.branch(len - 10);
      sketch.pop();

      sketch.push();
      sketch.rotate(-angle * (1 - len / 400) * (1 - len / 400) * (1 - len / 400));
      sketch.quad(0, 0, -3, -len/2, 0, -len, 3, -len/2);
      sketch.translate(0, -len);
      sketch.branch(len - 10);
      sketch.pop();
    }
  }
};

var myp5 = new p5(s);
