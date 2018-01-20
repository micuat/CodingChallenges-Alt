// Coding Rainbow
// Daniel Shiffman
// http://patreon.com/codingtrain
// Code for: https://youtu.be/kKT0v3qhIQY

function Leaf(sketch) {
  this.pos = p5.Vector.random3D();
  this.pos.mult(sketch.width / 2);
  this.reached = false;

  this.show = function() {
    sketch.fill(255);
    sketch.noStroke();
    // sketch.push();
    sketch.stroke(255);
    sketch.point(this.pos.x, this.pos.y, this.pos.z);
    // sketch.translate(this.pos.x, this.pos.y, this.pos.z);
    // sketch.ellipse(0, 0, 4, 4);
    // sketch.pop();
  }

}
