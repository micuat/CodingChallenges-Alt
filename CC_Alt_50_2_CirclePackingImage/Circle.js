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
    sketch.colorMode(sketch.RGB);

    let n = 5;
    let s = sketch.millis() * 0.002 + this.x;
    sketch.push();
    for(let i = 0; i < n; i++) {
      sketch.fill(this.color, sketch.map(i, 0, n, 0, 255));
      let dx = 2 * sketch.cos(s - i * 0.1) * this.r * 0.15 * 0.5*0;
      let dy = 2 * sketch.sin(s - i * 0.1) * this.r * 0.15 * 0.5;
  
      sketch.strokeWeight(2);
      sketch.ellipse(this.x + dx * i, this.y + dy * i, sketch.map(i, 0, n, this.r * 2, this.r * 2 * 0.9));
      sketch.translate(0, 0, 1);
    }
    sketch.pop();
  }

  this.edges = function() {
    return (this.x + this.r >= sketch.width || this.x - this.r <= 0 || this.y + this.r >= sketch.height || this.y - this.r <= 0)
  }
}
