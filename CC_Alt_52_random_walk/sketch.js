// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Video: https://youtu.be/l__fEY1xanY

// instance mode by Naoto Hieda

var x;
var y;

var s = function (sketch) {
  sketch.setup = function () {
    sketch.createCanvas(800, 800);
    x = 400;
    y = 400;
    sketch.background(0);
  }

  sketch.draw = function () {
    if(sketch.frameCount % 60 == 0) {
      x = sketch.random(sketch.width);
      y = sketch.random(sketch.height);
    }
    sketch.stroke(255, 100);
    sketch.strokeWeight(2);
    sketch.point(x, y);

    var r = sketch.floor(sketch.random(4));

    switch (r) {
      case 0:
        x = x + 5;
        break;
      case 1:
        x = x - 5;
        break;
      case 2:
        y = y + 5;
        break;
      case 3:
        y = y - 5;
        break;
    }


  }

};

var myp5 = new p5(s);
