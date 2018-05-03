// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/17WoOqgXsRM

// instance mode by Naoto Hieda

function Star() {
  this.x = p001.random(-p001.width, p001.width) / 2;
  this.y = p001.random(-p001.height, p001.height) / 2;
  this.z = p001.random(p001.width);

  this.rx = p001.random(p001.TWO_PI);
  this.ry = p001.random(p001.TWO_PI);

  let red = p001.random(255, 100);
  this.col = p001.color(red, p001.map(red, 100, 255, 255, 100), 100);

  this.r = p001.random(16, 64);

  this.update = function (speed) {
    this.z = this.z - speed;
    if (this.z < 1) {
      this.z = p001.width;

      // if(p001.frameCount % 240 < 30) {
      //   this.r = 32;
      //   this.x = p001.map(p001.frameCount % 30, 0, 30, -p001.width/2, p001.width/2);
      //   this.y = 50;
      //   this.rx = 0;
      //   this.ry = 0;//Math.PI / 2;
      // }
      // else if(p001.frameCount % 240 < 60) {
      //   this.r = 32;
      //   this.x = p001.map(p001.frameCount % 30, 30, 0, -p001.width/2, p001.width/2);
      //   this.y = -50;
      //   this.rx = 0;
      //   this.ry = 0;//Math.PI / 2;
      // }
      // else {
        this.r = p001.random(16, 64);
        this.x = p001.random(-p001.width, p001.width) / 2;
        this.y = p001.random(-p001.height, p001.height) / 2;
        this.rx = p001.random(p001.TWO_PI);
        this.ry = p001.random(p001.TWO_PI);
      // }
    }
  }

  this.show = function (shape) {
    var sx = p001.map(this.x / this.z, 0, 1, 0, p001.width);
    var sy = p001.map(this.y / this.z, 0, 1, 0, p001.height);

    var r = p001.map(this.z, 0, p001.width, this.r, 0);

    p001.fill(255);
    p001.noStroke();
    // p001.rect(sx, sy, r/4, r/4);
    // p001.ellipse(sx, sy, r, r);
    // p001.stroke(r*10);
    // p001.strokeWeight(10 * r);
    // p001.point(sx, sy);

    // p001.strokeWeight(2);

    var px = p001.map(this.x / (this.z + 200), 0, 1, 0, p001.width);
    var py = p001.map(this.y / (this.z + 200), 0, 1, 0, p001.height);

    p001.stroke(r / this.r * 255, p001.dist(px, py, sx, sy), 0);
    p001.strokeWeight(40 * r / this.r);
    p001.line(px, py, sx, sy);

  }
}
