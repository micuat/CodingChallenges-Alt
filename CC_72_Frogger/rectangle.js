// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// Frogger
// Part 1: https://youtu.be/giXV6xErw0Y
// Part 2: https://youtu.be/06-ZvYmSeus
// Part 3: https://youtu.be/hk326ZHlENQ
// Part 4: https://youtu.be/c6WdJltqEtM

function Rectangle(sketch, x, y, w, h) {
  this.sketch = sketch;
  this.x = x;
  this.w = w;
  this.y = y;
  this.h = h;
}

Rectangle.prototype.intersects = function (other) {
  let left = this.x;
  let right = this.x + this.w;
  let top = this.y;
  let bottom = this.y + this.h;

  let oleft = other.x;
  let oright = other.x + other.w;
  let otop = other.y;
  let obottom = other.y + other.h;

  return !(left >= oright ||
    right <= oleft ||
    top >= obottom ||
    bottom <= otop);
}
