// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/QHEQuoIKgNE

function Circle(sketch, x, y) {
  this.x = x;
  this.y = y;
  this.r = 1;
  this.growing = true;

  this.grow = function() {
    if (this.growing) {
      this.r += 0.5;
    }
  }

  this.show = function() {
    sketch.stroke(255, 0, 0);
    sketch.strokeWeight(2);
    sketch.noFill();
    sketch.ellipse(this.x, this.y, this.r * 2, this.r * 2);
  }

  this.edges = function() {
    return (this.x + this.r >= sketch.width || this.x - this.r <= 0 || this.y + this.r >= sketch.height || this.y - this.r <= 0)
  }
}
