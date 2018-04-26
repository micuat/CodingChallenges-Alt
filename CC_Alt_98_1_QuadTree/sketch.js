// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// QuadTree
// 1: https://www.youtube.com/watch?v=OJxEcs0w_kE
// 2: https://www.youtube.com/watch?v=QQx_NmCIuCY

// For more:
// https://github.com/CodingTrain/QuadTree

// instance mode by Naoto Hieda

var qtree;

var s = function (p) {

  p.setup = function () {
    p.createCanvas(800, 800);
    p.background(255);
    let boundary = new Rectangle(400, 400, 400, 400);
    qtree = new QuadTree(boundary, 4);
  }

  p.draw = function () {
    let boundary = new Rectangle(400, 400, 400, 400);
    qtree = new QuadTree(boundary, 4);
    // print(p.frameRate())
    let t = p.millis() * 0.001 / 2;
    for (let i = 0; i < 1000; i++) {
      let x;
      let y;
      if (t % 4 < 1) {
        x = i * 0.8;
        y = p.height / 2 + Math.sin(t + i * 0.01) * 200 * (t%1);
      }
      else if (t % 4 < 2) {
        x = i * 0.8;
        y = p.height / 2 + p.random(-1, 1) * 200;
      }
      else if (t % 4 < 3) {
        x = p.width / 2 + Math.cos(t + i * 0.01) * i/2;
        y = p.height / 2 + Math.sin(t + i * 0.01) * i/2;
      }
      else if (t % 4 < 4) {
        x = p.width / 2 + Math.cos(t + i * 2 * 0.01) * 300;
        y = p.height / 2 + Math.sin(t + i * 0.01) * 300;
      }

      // x += p.randomGaussian(0, 1);
      // y += p.randomGaussian(0, 1);
      let pt = new Point(x, y);
      qtree.insert(pt);
    }

    p.background(0);
    if (t % 1 < 0.3 || (t % 1 < 0.5 && p.random(1) < 0.5)) {
      qtree.show(false, true);
    }
    else {
      qtree.show(true, false);
    }

    p.stroke(0, 255, 0);
    p.rectMode(p.CENTER);
    // let range = new Rectangle(p.mouseX, p.mouseY, 25, 25);
    // p.rect(range.x, range.y, range.w * 2, range.h * 2);
    // let points = qtree.query(range);
    // for (let i in points) {
    //   let pt = points[i];
    //   p.strokeWeight(4);
    //   p.point(pt.x, pt.y);
    // }

  }

};

var myp5 = new p5(s);
