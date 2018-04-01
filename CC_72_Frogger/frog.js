// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// Frogger
// Part 1: https://youtu.be/giXV6xErw0Y
// Part 2: https://youtu.be/06-ZvYmSeus
// Part 3: https://youtu.be/hk326ZHlENQ
// Part 4: https://youtu.be/c6WdJltqEtM

function Frog(sketch, x, y, w) {
  Rectangle.call(this, sketch, x, y, w, w);
  this.attached = null;
}

Frog.prototype = Object.create(Rectangle.prototype, {
  attach: {
    value: function (log) {
      this.attached = log;
    }
  },
  update: {
    value: function () {
      if (this.attached != null) {
        this.x += this.attached.speed;
      }

      this.x = this.sketch.constrain(this.x, 0, this.sketch.width - this.w);
    }
  },
  show: {
    value: function () {
      this.sketch.fill(0, 255, 0, 200);
      this.sketch.rect(this.x, this.y, this.w, this.w);
    }
  },
  move: {
    value: function (xdir, ydir) {
      this.x += xdir * grid;
      this.y += ydir * grid;
      this.attach(null);
    }
  }
});
Frog.prototype.constructor = Frog;
