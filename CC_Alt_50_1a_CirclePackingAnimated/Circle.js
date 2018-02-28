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
      this.r += 1;
    }
  }

  this.show = function() {
    sketch.noStroke();
    sketch.colorMode(sketch.RGB);

    let n = 5;
    let s = sketch.millis() * 0.002 + this.x;
    let dx = 2 * sketch.cos(s) * this.r * 0.15;
    let dy = 2 * sketch.sin(s) * this.r * 0.15;
    sketch.push();
    for(let i = 0; i < n; i++) {
      sketch.fill(255, this.x / 2.5, sketch.map(i, 0, n, 0, 255));

      sketch.strokeWeight(2);
      sketch.ellipse(this.x + dx * i, this.y + dy * i, sketch.map(i, 0, n, this.r * 2, 2));
      sketch.translate(0, 0, 1);
    }
    sketch.pop();
  }

  this.edges = function() {
    return (this.x + this.r >= sketch.width || this.x - this.r <= 0 || this.y + this.r >= sketch.height || this.y - this.r <= 0)
  }
}
