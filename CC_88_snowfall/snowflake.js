// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// Snowfall
// Edited Video: https://youtu.be/cl-mHFCGzYk

function getRandomSize() {

  let r = myp5.pow(myp5.random(0, 1), 3);
  return myp5.constrain(r * 32, 2, 32);


  // let r = randomGaussian() * 2.5;
  // return constrain(abs(r * r), 2, 36);
  // while (true) {
  //   let r1 = random(1);
  //   let r2 = random(1);
  //   if (r2 > r1) {
  //     return r1 * 36;
  //   }
  // }
}


function Snowflake(sx, sy, img) {

  let x = sx || myp5.random(width);
  let y = sy || myp5.random(-100, -10);
  this.img = img;
  this.pos = myp5.createVector(x, y);
  this.vel = myp5.createVector(0, 0);
  this.acc = myp5.createVector();
  this.angle = myp5.random(myp5.TWO_PI);
  this.dir = (myp5.random(1) > 0.5) ? 1 : -1;
  this.xOff = 0;
  this.r = getRandomSize();
}



Snowflake.prototype.applyForce = function (force) {
  // Parallax Effect hack
  let f = force.copy();
  f.mult(this.r);

  // let f = force.copy();
  // f.div(this.mass);
  this.acc.add(f);
}

Snowflake.prototype.randomize = function () {
  let x = myp5.random(myp5.width);
  let y = myp5.random(-100, -10);
  this.pos = myp5.createVector(x, y);
  this.vel = myp5.createVector(0, 0);
  this.acc = myp5.createVector();
  this.r = getRandomSize();
}

Snowflake.prototype.update = function () {

  this.xOff = myp5.sin(this.angle * 2) * 2 * this.r;

  this.vel.add(this.acc);
  this.vel.limit(this.r * 0.2);

  if (this.vel.mag() < 1) {
    this.vel.normalize();
  }

  this.pos.add(this.vel);
  this.acc.mult(0);

  if (this.pos.y > myp5.height + this.r) {
    this.randomize();
  }

  // Wrapping Left and Right
  if (this.pos.x < -this.r) {
    this.pos.x = myp5.width + this.r;
  }
  if (this.pos.x > myp5.width + this.r) {
    this.pos.x = -this.r;
  }

  this.angle += this.dir * this.vel.mag() / 200;

}

Snowflake.prototype.render = function () {
  // stroke(255);
  // strokeWeight(this.r);
  // point(this.pos.x, this.pos.y);
  myp5.push();
  myp5.translate(this.pos.x + this.xOff, this.pos.y);
  myp5.rotate(this.angle);
  myp5.imageMode(myp5.CENTER);
  myp5.image(this.img, 0, 0, this.r, this.r);
  myp5.pop();


}

// offScreen() {
//   return (this.pos.y > height + this.r);
// }
