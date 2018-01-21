// Coding Rainbow
// Daniel Shiffman
// http://patreon.com/codingtrain
// Code for: https://youtu.be/JcopTKXt8L8

// instance mode by Naoto Hieda

function Leaf(sketch, mode) {
  if (mode == 0) {
    this.pos = sketch.createVector(0, sketch.random(0, sketch.width), 0);
    this.pos.x = 200 * sketch.cos(this.pos.y * 0.02) + sketch.randomGaussian() * 100;
    this.pos.z = 200 * sketch.sin(this.pos.y * 0.02) + sketch.randomGaussian() * 100;
    this.pos.y -= sketch.height / 2;
  }
  else if (mode == 1) {
    this.pos = p5.Vector.random3D();
    this.pos.mult(sketch.random(sketch.width / 2));
  }
  else if (mode == 2) {
    this.pos = p5.Vector.random3D();
    this.pos.mult(sketch.width / 2);
  }
  else {
    this.pos = p5.Vector.random3D();
    this.pos.mult(sketch.width / 2);
  }
  this.reached = false;

  this.show = function () {
    sketch.fill(255);
    sketch.stroke(255);
    sketch.point(this.pos.x, this.pos.y, this.pos.z);
    // sketch.noStroke();
    // sketch.push();
    // sketch.translate(this.pos.x, this.pos.y, this.pos.z);
    // sketch.ellipse(0, 0, 4, 4);
    // sketch.pop();
  }

}
