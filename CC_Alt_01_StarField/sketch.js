// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/17WoOqgXsRM

// instance mode by Naoto Hieda

var s = function( sketch ) {

  var stars = [];

  var speed = 0;

  sketch.setup = function () {
    sketch.createCanvas(600, 600);
    for (var i = 0; i < 800; i++) {
      stars[i] = new Star(sketch);
    }
  }

  sketch.draw = function () {
    if(sketch.frameCount % 60 == 0) {
      if(sketch.frameCount % 120 < 60) {
        speed = sketch.random(10, 20);
      }
      else {
        speed = sketch.random(50, 100);
      }
    }
    sketch.background(0);
    sketch.translate(sketch.width / 2, sketch.height / 2);
    for (var i = 0; i < stars.length; i++) {
      stars[i].update(speed);
      stars[i].show();
    }
  };
};

var myp5 = new p5(s);
