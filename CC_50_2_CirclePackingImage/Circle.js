// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/ERQcYaaZ6F0

function Circle(sketch, x, y, color) {
  this.x = x;
  this.y = y;
  this.r = 2;
  this.color = color;
  this.growing = true;

  this.grow = function() {
    if (this.growing) {
      this.r += 0.5;
    }
  }

  this.show = function() {
    sketch.noStroke();
    sketch.fill(this.color);
    sketch.ellipse(this.x, this.y, this.r * 2, this.r * 2);
  }

  this.edges = function() {
    return (this.x + this.r >= sketch.width || this.x - this.r <= 0 || this.y + this.r >= sketch.height || this.y - this.r <= 0)
  }
}
