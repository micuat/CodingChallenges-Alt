// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// QuadTree
// https://www.youtube.com/watch?v=z0YFFg_nBjw

// For more:
// https://github.com/CodingTrain/QuadTree

// instance mode by Naoto Hieda


var s = function (p) {

  let particles = [];

  p.setup = function () {
    p.createCanvas(600, 400);
    for (let i = 0; i < 1000; i++) {
      particles[i] = new Particle(p.random(p.width), p.random(p.height));
    }
  }

  p.draw = function () {
    p.background(0);


    let boundary = new Rectangle(300, 200, 600, 400);
    let qtree = new QuadTree(boundary, 4);

    for (let pt of particles) {
      let point = new Point(pt.x, pt.y, pt);
      qtree.insert(point);


      pt.move();
      pt.render();
      pt.setHighlight(false);
    }

    for (let pt of particles) {
      let range = new Circle(pt.x, pt.y, pt.r * 2);
      let points = qtree.query(range);
      for (let point of points) {
        let other = point.userData;
        // for (let other of particles) {
        if (pt !== other && pt.intersects(other)) {
          pt.setHighlight(true);
        }
      }
    }

  }

};

var myp5 = new p5(s);