// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/KkyIDI6rQJI

// instance mode by Naoto Hieda

function Drop(sketch) {
  this.x = sketch.random(sketch.width);
  this.y = sketch.random(-500, -50);
  this.z = sketch.random(0, 20);
  this.len = sketch.map(this.z, 0, 20, 10, 20);
  this.yspeed = sketch.map(this.z, 0, 20, 1, 20);

  this.fall = function() {
    this.y = this.y + this.yspeed;
    var grav = sketch.map(this.z, 0, 20, 0, 0.2);
    this.yspeed = this.yspeed + grav;

    if (this.y > sketch.height) {
      this.y = sketch.random(-200, -100);
      this.yspeed = sketch.map(this.z, 0, 20, 4, 10);
    }
  }

  this.show = function() {
    var thick = sketch.map(this.z, 0, 20, 1, 3);
    sketch.strokeWeight(thick);
    sketch.stroke(138, 43, 226);
    sketch.line(this.x, this.y, this.x, this.y+this.len);
  }
}