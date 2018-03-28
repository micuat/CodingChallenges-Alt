function Puck(sketch) {
  this.s = sketch;
  this.x = this.s.width / 2;
  this.y = this.s.height / 2;
  this.xspeed = 0;
  this.yspeed = 0;
  this.r = 4;

  this.reset();
}

Puck.prototype.checkPaddleLeft = function (p) {
  if (this.y - this.r < p.y + p.h / 2 &&
    this.y + this.r > p.y - p.h / 2 &&
    this.x - this.r < p.x + p.w / 2) {

    if (this.x > p.x) {
      let diff = this.y - (p.y - p.h / 2);
      let rad = this.s.radians(60);
      let angle = this.s.map(diff, 0, p.h, -rad, rad);
      // if(angle > 80) angle = 80;
      // else if(angle < -80) angle = -80;
      this.xspeed = 5 * this.s.cos(angle);
      this.yspeed = 5 * this.s.sin(angle);
      this.x = p.x + p.w / 2 + this.r;
    }

  }
}
Puck.prototype.checkPaddleRight = function (p) {
  if (this.y - this.r < p.y + p.h / 2 &&
    this.y + this.r > p.y - p.h / 2 &&
    this.x + this.r > p.x - p.w / 2) {

    if (this.x < p.x) {
      let diff = this.y - (p.y - p.h / 2);
      let angle = this.s.map(diff, 0, p.h, this.s.radians(225), this.s.radians(135));
      this.xspeed = 5 * this.s.cos(angle);
      this.yspeed = 5 * this.s.sin(angle);
      this.x = p.x - p.w / 2 - this.r;
    }
  }
}

Puck.prototype.update = function () {
  this.x += this.xspeed;
  this.y += this.yspeed;
}

Puck.prototype.reset = function () {
  this.x = this.s.width / 2;
  this.y = this.s.height / 2;
  // let angle = this.s.random(-this.s.PI / 4, this.s.PI / 4);
  let angle = this.s.millis() * 0.00025 * this.s.TWO_PI;
  this.xspeed = 5 * Math.cos(angle);
  this.yspeed = 5 * Math.sin(angle);

  // if (this.s.random(1) < 0.5) {
  //   this.xspeed *= -1;
  // }
}

Puck.prototype.edges = function () {
  if (this.y < 0 || this.y > this.s.height) {
    this.yspeed *= -1;
  }

  if (this.x - this.r > this.s.width) {
    if(this.s.isLiveJs == false) ding.play();
    leftscore++;
    this.reset();
  }

  if (this.x + this.r < 0) {
    if(this.s.isLiveJs == false) ding.play();
    rightscore++;
    this.reset();
  }
}

Puck.prototype.show = function () {
  let r = this.s.map(this.xspeed, -10, 10, 0, 255);
  let g = this.s.map(this.yspeed, -10, 10, 0, 255);
  let b = this.s.map(this.x, 0, this.s.width, 0, 255);
  this.s.fill(r, g, this.s.millis() * 0.01 % 255, 30);
  this.s.ellipse(this.x, this.y, this.r * 2);
}
