// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// Double Pendulum
// https://youtu.be/uWzPe_S-RVE

// instance mode by Naoto Hieda

var s = function (p) {
  let r1 = 125;
  let r2 = 125;
  let m1 = 10;
  let m2 = 10;
  let a1 = 0;
  let a2 = 0;
  let a1_v = 0;
  let a2_v = 0;
  let g = 1;

  let px2 = -1;
  let py2 = -1;
  let cx, cy;

  let buffer;

  p.setup = function () {
    p.createCanvas(500, 300);
    a1 = Math.PI / 2;
    a2 = Math.PI / 2;
    cx = p.width / 2;
    cy = 50;
    buffer = p.createGraphics(p.width, p.height);
    if (!p.isLiveJs) {
      buffer.pixelDensity(1);
    }
    if (p.isLiveJs) {
      buffer.beginDraw();
    }
    buffer.background(175);
    buffer.translate(cx, cy);
    if (p.isLiveJs) {
      buffer.endDraw();
    }
  }

  p.draw = function () {
    p.background(175);
    p.imageMode(p.CORNER);
    p.image(buffer, 0, 0, p.width, p.height);

    let num1 = -g * (2 * m1 + m2) * Math.sin(a1);
    let num2 = -m2 * g * Math.sin(a1 - 2 * a2);
    let num3 = -2 * Math.sin(a1 - a2) * m2;
    let num4 = a2_v * a2_v * r2 + a1_v * a1_v * r1 * Math.cos(a1 - a2);
    let den = r1 * (2 * m1 + m2 - m2 * Math.cos(2 * a1 - 2 * a2));
    let a1_a = (num1 + num2 + num3 * num4) / den;

    num1 = 2 * Math.sin(a1 - a2);
    num2 = (a1_v * a1_v * r1 * (m1 + m2));
    num3 = g * (m1 + m2) * Math.cos(a1);
    num4 = a2_v * a2_v * r2 * m2 * Math.cos(a1 - a2);
    den = r2 * (2 * m1 + m2 - m2 * Math.cos(2 * a1 - 2 * a2));
    let a2_a = (num1 * (num2 + num3 + num4)) / den;

    p.translate(cx, cy);
    p.stroke(0);
    p.strokeWeight(2);

    let x1 = r1 * Math.sin(a1);
    let y1 = r1 * Math.cos(a1);

    let x2 = x1 + r2 * Math.sin(a2);
    let y2 = y1 + r2 * Math.cos(a2);

    p.line(0, 0, x1, y1);
    p.fill(0);
    p.ellipse(x1, y1, m1, m1);

    p.line(x1, y1, x2, y2);
    p.fill(0);
    p.ellipse(x2, y2, m2, m2);

    a1_v += a1_a;
    a2_v += a2_a;
    a1 += a1_v;
    a2 += a2_v;

    // a1_v *= 0.99;
    // a2_v *= 0.99;

    if (p.isLiveJs) {
      buffer.beginDraw();
      buffer.translate(cx, cy);
    }
    buffer.stroke(0);
    if (p.frameCount > 1) {
      buffer.line(px2, py2, x2, y2);
    }
    if (p.isLiveJs) {
      buffer.endDraw();
    }

    px2 = x2;
    py2 = y2;
  }

};

var p093 = new p5(s);
