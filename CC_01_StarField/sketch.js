// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/17WoOqgXsRM

// instance mode by Naoto Hieda

var s = function(p) {

  var stars = [];

  var speed;

  p.setup = function () {
    p.createCanvas(600, 600);
    for (var i = 0; i < 800; i++) {
      stars[i] = new Star();
    }
  }

  p.draw = function () {
    speed = p.map(p.mouseX, 0, p.width, 0, 50);
    p.background(0);
    p.translate(p.width / 2, p.height / 2);
    for (var i = 0; i < stars.length; i++) {
      stars[i].update(speed);
      stars[i].show();
    }
  };
};

var p001 = new p5(s);
