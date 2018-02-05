// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/cXgA1d_E-jY&

function Pipe(sketch) {
  let t = sketch.millis() * 0.00025;
  if (t % 8 < 2) {
    this.targetTop = sketch.map(sketch.sin(t * sketch.TWO_PI / 4), -1, 1, 100, sketch.height - 200);
    this.targetBottom = this.targetTop + 200;
  }
  else if (t % 8 < 4) {
    this.targetTop = sketch.map(sketch.sin(t * sketch.TWO_PI / 4), -1, 1, 100, sketch.height - 200);
    this.targetBottom = this.targetTop + 200;
  }
  else if (t % 8 < 6) {
    this.targetTop = sketch.map(sketch.sin((t * sketch.TWO_PI)), -1, 1, 100, sketch.height - 200);
    this.targetBottom = this.targetTop + 200;
  }
  else {
    this.targetTop = sketch.map(sketch.sin((t * sketch.TWO_PI)), -1, 1, 200, sketch.height / 2 - 50);
    this.targetBottom = sketch.map(sketch.sin((t * sketch.TWO_PI)), -1, 1, sketch.height - 200, sketch.height / 2 + 50);
  }
  this.x = sketch.width;
  this.w = 20;
  this.speed = 2;
  this.hit = false;

  this.top = 100;
  this.bottom = sketch.height - 100;

  this.highlight = false;

  this.hits = function (bird) {
    if (this.hit) return false;

    if (bird.y < this.top || bird.y > this.bottom) {
      if (bird.x > this.x && bird.x < this.x + this.w) {
        this.highlight = true;
        this.hit = true;
        return true;
      }
    }
    this.highlight = false;
    return false;
  }

  this.show = function () {
    sketch.fill(255);
    if (this.highlight) {
      sketch.fill(0, 0, 0);
    }
    sketch.rect(this.x, 0, this.w, this.top);
    sketch.rect(this.x, this.bottom, this.w, sketch.height - this.bottom);
  }

  this.update = function () {
    this.x -= this.speed;

    if(this.x < bird.x - 50) {
      let q = sketch.map(sketch.sin(sketch.millis() * 0.005 + this.x * 0.01), -1, 1, 10, sketch.height - 20);
      let p = 0.9;
      this.top = this.top * p + (1-p) * q;
      this.bottom = this.bottom * p + (1-p) * (q+10);
    }
    else if (this.x < bird.x + 400) {
      this.top = Math.min(this.targetTop, this.top + 10);
      this.bottom = Math.max(this.targetBottom, this.bottom - 10);
    }
  }

  this.offscreen = function () {
    if (this.x < -this.w) {
      return true;
    } else {
      return false;
    }
  }


}
