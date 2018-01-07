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
  this.yspeed = sketch.map(this.z, 0, 20, 1, 2);

  this.fall = function(speed) {
    if(speed != null) this.yspeed = this.yspeed * 0.9 + 0.1 * sketch.map(this.z, 0, 20, 1*speed, 2*speed);
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
    sketch.push();
    sketch.strokeWeight(thick);
    sketch.stroke(255);
    var l = sketch.map(this.yspeed, 0, 20, this.len*0.1, this.len * 1);
    sketch.line(this.x, this.y, this.x, this.y+l);
    sketch.pop();
  }
}