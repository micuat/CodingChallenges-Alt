// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Video: https://youtu.be/l__fEY1xanY

// instance mode by Naoto Hieda

var x;
var y;

var s = function (sketch) {
  sketch.setup = function () {
    sketch.createCanvas(400, 400);
    x = 200;
    y = 200;
    sketch.background(51);
  }

  sketch.draw = function () {
    sketch.stroke(255, 100);
    sketch.strokeWeight(2);
    sketch.point(x, y);

    var r = sketch.floor(sketch.random(4));

    switch (r) {
      case 0:
        x = x + 1;
        break;
      case 1:
        x = x - 1;
        break;
      case 2:
        y = y + 1;
        break;
      case 3:
        y = y - 1;
        break;
    }


  }

};

var myp5 = new p5(s);
