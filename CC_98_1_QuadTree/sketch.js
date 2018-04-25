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
    p.createCanvas(400, 400);
    p.background(255);
    let boundary = new Rectangle(200, 200, 200, 200);
    qtree = new QuadTree(boundary, 4);
    for (let i = 0; i < 300; i++) {
      let x = p.randomGaussian(p.width / 2, p.width / 8);
      let y = p.randomGaussian(p.height / 2, p.height / 8);
      let pt = new Point(x, y);
      qtree.insert(pt);
    }
  }

  p.draw = function () {
    p.background(0);
    qtree.show();

    p.stroke(0, 255, 0);
    p.rectMode(p.CENTER);
    let range = new Rectangle(p.mouseX, p.mouseY, 25, 25);
    p.rect(range.x, range.y, range.w * 2, range.h * 2);
    let points = qtree.query(range);
    for (let i in points) {
      let pt = points[i];
      p.strokeWeight(4);
      p.point(pt.x, pt.y);
    }

  }

};

var myp5 = new p5(s);
