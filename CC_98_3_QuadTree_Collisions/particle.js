// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// QuadTree
// https://www.youtube.com/watch?v=z0YFFg_nBjw

// For more:
// https://github.com/CodingTrain/QuadTree

function Particle(x, y) {
  this.x = x;
  this.y = y;
  this.r = 4;
  this.highlight = false;
}

Particle.prototype.intersects = function (other) {
  let d = myp5.dist(this.x, this.y, other.x, other.y);
  return (d < this.r + other.r);
}

Particle.prototype.setHighlight = function (value) {
  this.highlight = value;
}

Particle.prototype.move = function () {
  this.x += myp5.random(-1, 1);
  this.y += myp5.random(-1, 1);
}

Particle.prototype.render = function () {
  myp5.noStroke();
  if (this.highlight) {
    myp5.fill(255);
  } else {
    myp5.fill(100);
  }
  myp5.ellipse(this.x, this.y, this.r * 2);
}
