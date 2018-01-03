// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/17WoOqgXsRM

// instance mode by Naoto Hieda

function Star(sketch) {
  this.x = sketch.random(-sketch.width, sketch.width);
  this.y = sketch.random(-sketch.height, sketch.height);
  this.z = sketch.random(sketch.width);
  this.pz = this.z;

  this.update = function(speed) {
    this.z = this.z - speed;
    if (this.z < 1) {
      this.z = sketch.width;
      this.x = sketch.random(-sketch.width, sketch.width);
      this.y = sketch.random(-sketch.height, sketch.height);
      this.pz = this.z;
    }
  }

  this.show = function() {
    sketch.fill(255);
    sketch.noStroke();

    var sx = sketch.map(this.x / this.z, 0, 1, 0, sketch.width);
    var sy = sketch.map(this.y / this.z, 0, 1, 0, sketch.height);

    var r = sketch.map(this.z, 0, sketch.width, 16, 0);
    sketch.ellipse(sx, sy, r, r);

    var px = sketch.map(this.x / this.pz, 0, 1, 0, sketch.width);
    var py = sketch.map(this.y / this.pz, 0, 1, 0, sketch.height);

    this.pz = this.z;

    sketch.stroke(255);
    sketch.line(px, py, sx, sy);

  }
}
