// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// 3D Knot
// Video: https://youtu.be/r6YMKr1X0VA

// instance mode by Naoto Hieda

var angle = 0;

var vectors = [];
// r(beta) = 0.8 + 1.6 * sin(6 * beta)
// theta(beta) = 2 * beta
// phi(beta) = 0.6 * pi * sin(12 * beta)

//x = r * cos(phi) * cos(theta)
//y = r * cos(phi) * sin(theta)
//z = r * sin(phi)


var beta = 0;

var s = function (p) {

  p.setup = function () {
    p.createCanvas(600, 400);
  }

  p.draw = function () {
    p.background(0);
    p.translate(p.width / 2, p.height / 2);
    p.rotateY(angle);
    angle += 0.03;


    let r = 100 * (0.8 + 1.6 * p.sin(6 * beta));
    let theta = 2 * beta;
    let phi = 0.6 * p.PI * p.sin(12 * beta);
    let x = r * p.cos(phi) * p.cos(theta);
    let y = r * p.cos(phi) * p.sin(theta);
    let z = r * p.sin(phi);
    p.stroke(255, r, 255);

    vectors.push(new p5.Vector(x, y, z));


    beta += 0.01;


    p.noFill();
    p.stroke(255);
    p.strokeWeight(8);
    p.beginShape();
    for (let i in vectors) {
      let v = vectors[i];
      p.vertex(v.x, v.y, v.z);
    }
    p.endShape();
  }
};

var myp5 = new p5(s);
