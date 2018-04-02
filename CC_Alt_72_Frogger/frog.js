// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// Frogger
// Part 1: https://youtu.be/giXV6xErw0Y
// Part 2: https://youtu.be/06-ZvYmSeus
// Part 3: https://youtu.be/hk326ZHlENQ
// Part 4: https://youtu.be/c6WdJltqEtM

function Frog(sketch, x, y, w, index) {
  Rectangle.call(this, sketch, x, y, w, w);
  this.attached = null;
  this.index = index;
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

      if (this.sketch.frameCount % 5 == 0) {
        let lane = null;
        for (i in lanes) {
          lane = lanes[i];
          if (lane.y == this.y - grid) {
            break;
          }
        }

        let frogn = new Rectangle(this.sketch, this.x, this.y - grid, this.w, this.h);
        if (lane == null) {
          this.sketch.resetGame(this);
        }
        else if (lane.type == SAFETY) {
          this.y += -grid;
          this.attach(null);
        }
        else if (lane.type == CAR) {
          let intersects = false;
          for (let i in lane.obstacles) {
            let o = lane.obstacles[i];
            if (frogn.intersects(o)) {
              intersects = true;
              break;
            }
          }
          if (intersects == false) {
            this.y += -grid;
            this.attach(null);
          }
        }
        else if (lane.type == LOG) {
          for (let i in lane.obstacles) {
            let o = lane.obstacles[i];
            if (frogn.intersects(o)) {
              this.y += -grid;
              this.attach(null);
              break;
            }
          }
        }
      }

      this.x = this.sketch.constrain(this.x, 0, this.sketch.width - this.w);
    }
  },
  show: {
    value: function () {
      this.sketch.fill(0, 255, 0);
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
