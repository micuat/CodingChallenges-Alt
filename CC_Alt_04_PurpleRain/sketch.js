// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/KkyIDI6rQJI

// instance mode by Naoto Hieda

// Purple Rain
// (138, 43, 226)
// (230, 230, 250) // background


var s = function (sketch) {

  var drops = [];
  var speed;

  sketch.setup = function () {
    sketch.createCanvas(640, 640);
    for (var i = 0; i < 5000; i++) {
      drops[i] = new Drop(sketch);
    }
  }

  sketch.draw = function () {
    sketch.background(0);

    for (var i = 0; i < drops.length; i++) {
      var t = sketch.map(sketch.sin(drops[i].x*0.02+sketch.millis()*0.002), -1, 1, 250, 400);
      if(drops[i].y > t + 200) speed = null;
      else if(drops[i].y > t && sketch.frameCount % 240 < 120) speed = -3;
      else speed = null;
      drops[i].fall(speed);
      drops[i].show();
    }
  }

};

var myp5 = new p5(s);