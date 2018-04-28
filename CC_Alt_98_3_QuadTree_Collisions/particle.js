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
  this.r = 32;
  this.R = 8;
  this.highlight = false;
  this.other;
  this.wrapped = false;

  this.col = myp5.color(255, 255, 0);

  this.vx = myp5.random(-1, 1) * 1;
  this.vy = myp5.random(-1, 1) * 1;

  this.dvx = 0;
  this.dvy = 0;

  this.hit = 0;
}

Particle.prototype.intersects = function (other) {
  let d = myp5.dist(this.x, this.y, other.x, other.y);
  if (d < this.r + other.r) {
    // if(this.hit <= 0) this.hit = 60;
    this.hit = 255;

    if (d < this.r * 0.1) {
      this.dvx += (other.x - this.x) / d * 1;
      this.dvy += (other.y - this.y) / d * 1;
      other.dvx -= (other.x - this.x) / d * 1;
      other.dvy -= (other.y - this.y) / d * 1;
    }
    else {
      this.dvx -= (other.x - this.x) / d * 0.1;
      this.dvy -= (other.y - this.y) / d * 0.1;
      other.dvx += (other.x - this.x) / d * 0.1;
      other.dvy += (other.y - this.y) / d * 0.1;
    }

    return true;
  }
  else {
    return false;
  }
}

Particle.prototype.setHighlight = function (value, other) {
  this.highlight = value;
  this.other = other;
}

Particle.prototype.move = function (mode) {
  if (this.hit > 0) {
    this.hit -= 50;
  }
  //   this.x += this.vx * 0.1;
  //   this.y += this.vy * 0.1;
  // }
  // else {
  //   this.x += this.vx;
  //   this.y += this.vy;
  // }

  if (mode) {
    this.dvx -= (this.x - myp5.width / 2) * 0.002;
    this.dvy -= (this.y - myp5.height / 2) * 0.002;
  }
  this.x += this.vx;
  this.y += this.vy;

  this.vx *= 0.9;
  this.vx += this.dvx;

  this.vy *= 0.9;
  this.vy += this.dvy;

  // this.x += this.dvx;
  // this.y += this.dvy;
  this.dvx = 0;
  this.dvy = 0;


  this.wrapped = false;
  if (this.x < 0) {
    this.wrapped = true;
    this.x = this.x + myp5.width;
  }
  else if (this.x >= myp5.width) {
    this.wrapped = true;
    this.x = this.x % myp5.width;
  }
  if (this.y < 0) {
    this.wrapped = true;
    this.y = this.y + myp5.height;
  }
  else if (this.y >= myp5.height) {
    this.wrapped = true;
    this.y = this.y % myp5.height;
  }
}

Particle.prototype.render = function () {
  myp5.noStroke();
  // if (this.hit > 0) {
  //   myp5.fill(255, this.hit * 8);
  //   // myp5.stroke(255, 100);
  //   // myp5.line(this.x, this.y, this.other.x, this.other.y)
  //   myp5.push();
  //   myp5.translate(0, 0, -1);
  //   myp5.ellipse(this.x, this.y, this.R * 4);
  //   myp5.pop();
  //   } else {
  //   // myp5.fill(0);
  // }
  // myp5.fill(255, 10 + this.hit * 1);
  // myp5.fill(128);
  // myp5.fill(this.hit + 10);
  myp5.fill(100, this.hit, 0)
  myp5.ellipse(this.x, this.y, this.R * 2);
  // myp5.push();
  // myp5.translate(this.x, this.y);
  // // myp5.rotate(this.x * 0.001 + this.y * 0.001);
  // myp5.sphere(this.R * 2);
  // myp5.pop();
}
