// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for this video: https://youtu.be/Cl_Gjj80gPE

// instance mode by Naoto Hieda

var yoff = 0.0;

var s = function (p) {
  p.setup = function () {
    p.createCanvas(400, 400);
  }

  p.draw = function () {
    p.background(0);

    p.translate(p.width / 2, p.height / 2);

    let radius = 150;

    p.beginShape();
    let xoff = 0;
    for (let a = 0; a < p.TWO_PI; a += 0.1) {
      let offset = p.map(p.noise(xoff, yoff), 0, 1, -25, 25);
      let r = radius + offset;
      let x = r * p.cos(a);
      let y = r * p.sin(a);
      p.vertex(x, y);
      xoff += 0.1;
      //ellipse(x, y, 4, 4);
    }
    p.endShape();

    yoff += 0.01;
  }

};

var p036 = new p5(s);

