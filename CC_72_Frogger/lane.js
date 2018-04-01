// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// Frogger
// Part 1: https://youtu.be/giXV6xErw0Y
// Part 2: https://youtu.be/06-ZvYmSeus
// Part 3: https://youtu.be/hk326ZHlENQ
// Part 4: https://youtu.be/c6WdJltqEtM

function Lane() {
  if (arguments.length == 3) {
    let sketch = arguments[0];
    let index = arguments[1];
    let c = arguments[2];
    Rectangle.call(this, sketch, 0, index * grid, sketch.width, grid);
    this.type = SAFETY;
    this.obstacles = [];
    this.col = c;
  }
  else if (arguments.length == 7) {
    let sketch = arguments[0];
    let index = arguments[1];
    let t = arguments[2];
    let n = arguments[3];
    let len = arguments[4];
    let spacing = arguments[5];
    let speed = arguments[6];
    Rectangle.call(this, sketch, 0, index * grid, sketch.width, grid);
    this.obstacles = new Array(n);
    this.type = t;
    let offset = sketch.random(0, 200);
    for (let i = 0; i < n; i++) {
      this.obstacles[i] = new Obstacle(sketch, offset + spacing * i, index * grid, grid * len, grid, speed);
    }
    this.col = sketch.color(0);
  }
}

Lane.prototype = Object.create(Rectangle.prototype, {
  check: {
    value: function (frog) {
      if (this.type == CAR) {
        for (let i in this.obstacles) {
          let o = this.obstacles[i];
          if (frog.intersects(o)) {
            this.sketch.resetGame();
          }
        }
      } else if (this.type == LOG) {
        let ok = false;
        for (let i in this.obstacles) {
          let o = this.obstacles[i];
          if (frog.intersects(o)) {
            ok = true;
            frog.attach(o);
          }
        }
        if (!ok) {
          this.sketch.resetGame();
        }
      }
    }
  },
  run: {
    value: function () {
      this.sketch.fill(this.col);
      this.sketch.rect(this.x, this.y, this.w, this.h);
      for (let i in this.obstacles) {
        let o = this.obstacles[i];
        o.show();
        o.update();
      }
    }
  }
});
Lane.prototype.constructor = Lane;
