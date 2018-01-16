// Coding Rainbow
// Daniel Shiffman
// http://patreon.com/codingtrain
// Code for: https://youtu.be/0jjeOYMjmDU

// instance mode by Naoto Hieda

var angle = 0;
var slider;

var s = function (sketch) {

  sketch.setup = function () {
    sketch.createCanvas(400, 400);
    // slider = sketch.createSlider(0, sketch.TWO_PI, sketch.PI / 4, 0.01);
  }

  sketch.draw = function () {
    sketch.background(51);
    // angle = slider.value();
    angle = sketch.map(sketch.mouseX, 0, sketch.width, sketch.TWO_PI, sketch.PI / 4);
    sketch.stroke(255);
    sketch.translate(200, sketch.height);
    sketch.branch(100);

  }

  sketch.branch = function (len) {
    sketch.line(0, 0, 0, -len);
    sketch.translate(0, -len);
    if (len > 4) {
      sketch.push();
      sketch.rotate(angle);
      sketch.branch(len * 0.67);
      sketch.pop();
      sketch.push();
      sketch.rotate(-angle);
      sketch.branch(len * 0.67);
      sketch.pop();
    }

    //line(0, 0, 0, -len * 0.67);
  }
};

var myp5 = new p5(s);
