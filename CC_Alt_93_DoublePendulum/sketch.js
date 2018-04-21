// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// Double Pendulum
// https://youtu.be/uWzPe_S-RVE

// instance mode by Naoto Hieda

function DP() {
  this.r1 = 200;
  this.r2 = 400;
  this.m1 = 40;
  this.m2 = 5;
  this.a1 = 0;
  this.a2 = 0;
  this.a1_v = 0;
  this.a2_v = 0;
  this.g = 1;

  this.a1 = Math.PI / 3;
  this.a2 = Math.PI / 3;
  this.cx = myp5.width / 2;
  this.cy = 50;

  this.px = [];
  this.py = [];
}

DP.prototype.update = function () {
  let num1 = -this.g * (2 * this.m1 + this.m2) * Math.sin(this.a1);
  let num2 = -this.m2 * this.g * Math.sin(this.a1 - 2 * this.a2);
  let num3 = -2 * Math.sin(this.a1 - this.a2) * this.m2;
  let num4 = this.a2_v * this.a2_v * this.r2 + this.a1_v * this.a1_v * this.r1 * Math.cos(this.a1 - this.a2);
  let den = this.r1 * (2 * this.m1 + this.m2 - this.m2 * Math.cos(2 * this.a1 - 2 * this.a2));
  let a1_a = (num1 + num2 + num3 * num4) / den;

  num1 = 2 * Math.sin(this.a1 - this.a2);
  num2 = (this.a1_v * this.a1_v * this.r1 * (this.m1 + this.m2));
  num3 = this.g * (this.m1 + this.m2) * Math.cos(this.a1);
  num4 = this.a2_v * this.a2_v * this.r2 * this.m2 * Math.cos(this.a1 - this.a2);
  den = this.r2 * (2 * this.m1 + this.m2 - this.m2 * Math.cos(2 * this.a1 - 2 * this.a2));
  let a2_a = (num1 * (num2 + num3 + num4)) / den;

  myp5.push();
  myp5.translate(this.cx, this.cy);
  myp5.stroke(255, 100);
  myp5.strokeWeight(2);

  let x1 = this.r1 * Math.sin(this.a1);
  let y1 = this.r1 * Math.cos(this.a1);

  let x2 = x1 + this.r2 * Math.sin(this.a2);
  let y2 = y1 + this.r2 * Math.cos(this.a2);


  myp5.line(0, 0, x1, y1);
  // myp5.noStroke();
  // myp5.fill(0);
  // myp5.ellipse(x1, y1, 15);

  myp5.line(x1, y1, x2, y2);
  myp5.noStroke();
  myp5.fill(255, 150);
  if (Math.cos(this.a2) > 0.5 || Math.abs(this.a2_v) > 0.05) {
    myp5.ellipse(x2, y2, 15);
    this.px.push(x2);
    this.py.push(y2);
  }
  else {
    this.px.push(-1000);
    this.py.push(-1000);
  }
  if (this.px.length > 10) this.px.shift();
  if (this.py.length > 10) this.py.shift();

  for(let i in this.px) {
    myp5.ellipse(this.px[i], this.py[i], 15);
  }
  myp5.pop();

  this.a1_v += a1_a;
  this.a2_v += a2_a;
  this.a1 += this.a1_v;
  this.a2 += this.a2_v;
}

var s = function (p) {
  let dp;
  p.setup = function () {
    p.createCanvas(800, 800);
    dp = [];
    for (let i = 0; i < 8; i++) {
      let d = new DP();
      d.r1 = p.map(i, 0, 7, 380, 387);
      d.r2 = 600 - d.r1;
      dp.push(d);
    }
  }

  p.draw = function () {
    p.background(0);
    // p.imageMode(p.CORNER);
    for (let i in dp) {
      let d = dp[i];
      d.update();

    }

  }

};

var myp5 = new p5(s);
