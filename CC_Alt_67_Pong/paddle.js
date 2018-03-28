function Paddle(sketch, isLeft) {
  this.s = sketch;
  this.y = this.s.height / 2;
  this.w = 20;
  this.h = 200;
  this.ychange = 0;

  if (isLeft) {
    this.x = this.w;
  } else {
    this.x = this.s.width - this.w;
  }


}

Paddle.prototype.update = function () {
  // let closestPuck = null;
  // let closestDist = 100000;
  // for(let i in pucks) {
  //   let puck = pucks[i];
  //   let dist = this.s.dist(this.x, this.y, puck.x, puck.y);
  //   if(dist < closestDist) {
  //     closestDist = dist;
  //     closestPuck = puck;
  //   }
  // }
  let self = this;
  let closestPuck = pucks.reduce(
    function (accum, cur) {
      let dist = self.s.dist(self.x, self.y, cur.x, cur.y);
      if(dist < accum.dist) {
        return {ptr: cur, dist: dist};
      }
      else return accum;
    }, {ptr: null, dist: 100000}
  ).ptr;
  this.y = this.s.lerp(this.y, closestPuck.y, 0.1);
  this.y += (this.s.noise(this.s.millis() * 0.001) - 0.5) * 20;
  this.y = this.s.constrain(this.y, this.h / 2, this.s.height - this.h / 2);
}

Paddle.prototype.move = function (steps) {
  this.ychange = steps;
}

Paddle.prototype.show = function () {
  this.s.fill(255, 10);
  this.s.rectMode(this.s.CENTER);
  this.s.rect(this.x, this.y, this.w, this.h);
}
