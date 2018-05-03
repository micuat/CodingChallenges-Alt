// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/KkyIDI6rQJI

// instance mode by Naoto Hieda

function Drop() {
  this.x = p004.random(p004.width);
  this.y = p004.random(-500, -50);
  this.z = p004.random(0, 20);
  this.len = p004.map(this.z, 0, 20, 10, 20);
  this.yspeed = p004.map(this.z, 0, 20, 1, 20);

  this.fall = function() {
    this.y = this.y + this.yspeed;
    var grav = p004.map(this.z, 0, 20, 0, 0.2);
    this.yspeed = this.yspeed + grav;

    if (this.y > p004.height) {
      this.y = p004.random(-200, -100);
      this.yspeed = p004.map(this.z, 0, 20, 4, 10);
    }
  }

  this.show = function() {
    var thick = p004.map(this.z, 0, 20, 1, 3);
    p004.strokeWeight(thick);
    p004.stroke(138, 43, 226);
    p004.line(this.x, this.y, this.x, this.y+this.len);
  }
}