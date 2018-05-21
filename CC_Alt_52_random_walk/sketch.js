// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Video: https://youtu.be/l__fEY1xanY

// instance mode by Naoto Hieda

var x;
var y;

var s = function (p) {
  p.setup = function () {
    p.createCanvas(800, 800);
    x = 400;
    y = 400;
    p.background(0);
  }

  p.draw = function () {
    if(p.frameCount % 60 == 0) {
      x = p.random(p.width);
      y = p.random(p.height);
    }
    p.stroke(255, 100);
    p.strokeWeight(2);
    p.point(x, y);

    var r = p.floor(p.random(4));

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

var p052 = new p5(s);
