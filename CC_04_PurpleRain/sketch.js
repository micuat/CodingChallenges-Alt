// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/KkyIDI6rQJI

// instance mode by Naoto Hieda

// Purple Rain
// (138, 43, 226)
// (230, 230, 250) // background


var s = function (p) {

  var drops = [];

  p.setup = function () {
    p.createCanvas(640, 360);
    for (var i = 0; i < 500; i++) {
      drops[i] = new Drop();
    }
  }

  p.draw = function () {
    p.background(230, 230, 250);
    for (var i = 0; i < drops.length; i++) {
      drops[i].fall();
      drops[i].show();
    }
  }

};

var p004 = new p5(s);