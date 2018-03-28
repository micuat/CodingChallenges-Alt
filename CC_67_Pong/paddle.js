function Paddle(sketch, isLeft) {
  this.s = sketch;
  this.y = height / 2;
  this.w = 20;
  this.h = 100;
  this.ychange = 0;

  if (isLeft) {
    this.x = this.w;
  } else {
    this.x = width - this.w;
  }


}

Paddle.prototype.update = function () {
  this.y += this.ychange;
  this.y = this.s.constrain(this.y, this.h / 2, this.s.height - this.h / 2);
}

Paddle.prototype.move = function (steps) {
  this.ychange = steps;
}

Paddle.prototype.show = function () {
  this.s.fill(255);
  this.s.rectMode(this.s.CENTER);
  this.s.rect(this.x, this.y, this.w, this.h);
}
