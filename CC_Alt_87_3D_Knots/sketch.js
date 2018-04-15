// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// 3D Knot
// Video: https://youtu.be/r6YMKr1X0VA

// instance mode by Naoto Hieda

var angle = 0;

var vectors = [];
var vectorsOrg = [];

var beta = 0;

var s = function (p) {

  p.setup = function () {
    p.createCanvas(800, 800);
  }

  p.draw = function () {
    p.background(0);
    p.translate(p.width / 2, p.height / 2);
    if (vectorsOrg.length > 0) {
      let v = vectorsOrg[vectorsOrg.length - 1];
      angle = p.createVector(v.x, v.z).heading() + p.PI / 2;//p.lerp(angle, p.atan2(v.z, v.x) + p.PI / 2, 0.01);
      // if (angle < 0) angle += p.PI;
    }
    p.rotateY(angle);
    angle += 0.01;


    let r = 200 * (0.8 + 1.6 * p.sin(6 * beta));
    let theta = 2 * beta;
    let phi = 0.6 * p.PI * p.sin(12 * beta);
    let x = r * p.cos(phi) * p.cos(theta);
    let y = r * p.cos(phi) * p.sin(theta);
    let z = r * p.sin(phi);
    p.stroke(255, r, 255);

    vectorsOrg.push(new p5.Vector(x, y, z));
    if (vectorsOrg.length > 1) {
      for (let i = 0; i < 4; i++) {
        let v0 = vectorsOrg[vectorsOrg.length - 2].copy();
        let v1 = vectorsOrg[vectorsOrg.length - 1].copy();
        let v = v0.lerp(v1, i * 0.2);

        // vectors.push(v);

        let dr = p.randomGaussian() * 10;
        // if(dr < 0) dr = -dr;
        // if(dr > 10) dr = 10;
        // dr = 10 - dr;
        let dv = p5.Vector.random3D();
        dv.setMag(dr);
        dv.add(v)
        vectors.push(dv);
      }
    }

    beta += 0.001;


    p.noFill();

    if (p.millis() * 0.001 % 2 < 1.75) {
      p.stroke(255, 100);
      p.strokeWeight(2);
      p.beginShape(p.POINTS);
      for (let i in vectors) {
        let v = vectors[i];
        p.vertex(v.x, v.y, v.z);
      }
      p.endShape();
    }
    else {
      // p.background(255);
      p.stroke(255);
      p.beginShape();
      for (let i in vectorsOrg) {
        p.strokeWeight(8 + 8 * p.sin(i*0.8 + p.millis() * 0.1));
        let v = vectorsOrg[i];
        p.vertex(v.x, v.y, v.z);
      }
      p.endShape();
    }

    while (vectors.length > 20000) {
      vectors.shift();
    }
  }
};

var myp5 = new p5(s);
