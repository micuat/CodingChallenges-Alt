// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/KkyIDI6rQJI

// instance mode by Naoto Hieda

function Drop() {
  this.x = p004.random(p004.width);
  this.y = p004.random(-500, -50);
  this.z = p004.random(-100, 0);
  this.len = p004.map(this.z, 0, 20, 10, 20);
  this.yspeed = 1;//p004.map(this.z, 0, 20, 1, 20);
  this.count = 255;

  this.fall = function(t) {
    this.y = this.y + this.yspeed;
    var grav = 0.1;//p004.map(this.z, 0, 20, 0, 0.2);
    this.yspeed = this.yspeed + grav;

    let len = p004.map(Math.sin(t*2), -1, 1, 300/Math.sqrt(2), 150);
    if (this.y > p004.height){// ||
      // (Math.abs(this.x-p004.width/2) < len &&
      // this.y > p004.height/2 - 200 - p004.map(p004.dist(p004.width/2, p004.height/2, this.x, this.y), 0, 200, 200, 0))) {
      this.count -= p004.random(20, 50);

      if(this.count <= 0) {
        this.x = p004.random(p004.width);
        this.y = p004.random(-200, -100);
        this.yspeed = 1;//p004.map(this.z, 0, 20, 4, 10)// * 0.1;
        this.count = 255;
      }
    }
  }

  this.show = function() {
    var thick = 2;//p004.map(this.z, 0, 20, 1, 3)*2;
    // p004.strokeWeight(thick);
    p004.noStroke();
    p004.fill(this.count);
    // p004.line(this.x, this.y, this.x, this.y+this.len);
    p004.push();
    p004.translate(0, 0, this.z);
    p004.rect(this.x, this.y, thick, this.len);
    p004.pop();
  }
}