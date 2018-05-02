// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/17WoOqgXsRM

// instance mode by Naoto Hieda

function Star() {
  this.x = p001.random(-p001.width, p001.width) / 2;
  this.y = p001.random(-p001.height, p001.height) / 2;
  this.z = p001.random(p001.width);
  this.pz = this.z;

  this.rx = p001.random(p001.TWO_PI);
  this.ry = p001.random(p001.TWO_PI);

  let red = p001.random(255, 100);
  this.col = p001.color(red, p001.map(red, 100, 255, 255, 100), 100);

  this.r = p001.random(16, 64);

  this.update = function (speed) {
    this.z = this.z - speed;
    if (this.z < 1) {
      this.z = p001.width;
      this.pz = this.z;

      if(p001.frameCount % 240 < 30) {
        this.r = 32;
        this.x = p001.map(p001.frameCount % 30, 0, 30, -p001.width/2, p001.width/2);
        this.y = 50;
        this.rx = 0;
        this.ry = 0;//Math.PI / 2;
      }
      else if(p001.frameCount % 240 < 60) {
        this.r = 32;
        this.x = p001.map(p001.frameCount % 30, 30, 0, -p001.width/2, p001.width/2);
        this.y = -50;
        this.rx = 0;
        this.ry = 0;//Math.PI / 2;
      }
      else {
        this.r = p001.random(16, 64);
        this.x = p001.random(-p001.width, p001.width) / 2;
        this.y = p001.random(-p001.height, p001.height) / 2;
        this.rx = p001.random(p001.TWO_PI);
        this.ry = p001.random(p001.TWO_PI);
      }
    }
  }

  this.show = function (shape) {
    p001.fill(255);
    p001.noStroke();

    var sx = p001.map(this.x / this.z, 0, 1, 0, p001.width);
    var sy = p001.map(this.y / this.z, 0, 1, 0, p001.height);

    var r = p001.map(this.z, 0, p001.width, this.r, 0);

    // p001.ellipse(sx, sy, r, r);
    // p001.stroke(r*10);
    // p001.strokeWeight(10 * r);
    // p001.point(sx, sy);
    p001.push();
    p001.translate(sx, sy);
    // p001.fill(r * 10);
    p001.fill(this.col);
    // r*=2;
    p001.scale(r, r, r);
    p001.rotateX(this.rx);
    p001.rotateY(this.ry);
    p001.shape(shape, 0, 0);
    // p001.noFill();
    // p001.stroke(255);
    // let total = 10;
    // for (let i = 0; i < total; i++) {
    //   p001.beginShape(p001.TRIANGLE_STRIP);
    //   for (let j = 0; j < total+1; j++) {
    //     let lat = p001.map(i, 0, total, -p001.HALF_PI, p001.HALF_PI);
    //     let lon = p001.map(j, 0, total, -p001.PI, p001.PI);
    //     let x = Math.cos(lon) * Math.cos(lat) * r * Math.sin(j*0.5);
    //     let y = Math.sin(lon) * Math.cos(lat) * r * Math.sin(j*0.5);
    //     let z = Math.sin(lat) * r * 0.1;
    //     p001.vertex(x, y, z);

    //     lat = p001.map(i+1, 0, 10, -p001.HALF_PI, p001.HALF_PI);
    //     x = Math.cos(lon) * Math.cos(lat) * r * Math.sin(j*0.5);
    //     y = Math.sin(lon) * Math.cos(lat) * r * Math.sin(j*0.5);
    //     z = Math.sin(lat) * r * 0.1;
    //     p001.vertex(x, y, z);
    //   }
    //   p001.endShape();
    // }
    // p001.sphere(r * 2);
    p001.pop();

    p001.strokeWeight(2);

    var px = p001.map(this.x / this.pz, 0, 1, 0, p001.width);
    var py = p001.map(this.y / this.pz, 0, 1, 0, p001.height);

    this.pz = this.z;

    // p001.stroke(255);
    // p001.line(px, py, sx, sy);

  }
}
