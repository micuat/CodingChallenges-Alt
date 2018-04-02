// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// Frogger
// Part 1: https://youtu.be/giXV6xErw0Y
// Part 2: https://youtu.be/06-ZvYmSeus
// Part 3: https://youtu.be/hk326ZHlENQ
// Part 4: https://youtu.be/c6WdJltqEtM

function Obstacle(sketch, x, y, w, h, s, c) {
  Rectangle.call(this, sketch, x, y, w, h);
  this.speed = s;
  this.color = c;
}

Obstacle.prototype = Object.create(Rectangle.prototype, {
  update: {
    value: function () {
      this.x = this.x + this.speed;
      if (this.speed > 0 && this.x > this.sketch.width + grid) {
        this.x = -this.w - grid;
      } else if (this.speed < 0 && this.x < -this.w - grid) {
        this.x = this.sketch.width + grid;
      }
    }
  },
  show: {
    value: function () {
      this.sketch.fill(this.color);
      this.sketch.rect(this.x, this.y, this.w, this.h);
    }
  }
});

Obstacle.prototype.constructor = Obstacle;
