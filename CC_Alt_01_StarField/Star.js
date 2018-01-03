// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/17WoOqgXsRM

// instance mode by Naoto Hieda

function Star(sketch) {
  this.x = sketch.random(-sketch.width, sketch.width)/2;
  this.y = sketch.random(-sketch.height, sketch.height)/2;
  this.z = sketch.random(sketch.width);
  this.pz = this.z;
  if(sketch.random(1) > 0.) {
    this.tail = 10;
  }
  else {
    this.tail = 1;
  }

  this.update = function(speed) {
    this.z = this.z - speed;
    if (this.z < 1) {
      this.z = sketch.width;
      this.x = sketch.random(-sketch.width, sketch.width)/2;
      this.y = sketch.random(-sketch.height, sketch.height)/2;
      this.pz = this.z;
    }
  }

  this.show = function() {
    var sx = sketch.map(this.x / this.z, 0, 1, 0, sketch.width);
    var sy = sketch.map(this.y / this.z, 0, 1, 0, sketch.height);

    for(var i = 0; i < this.tail; i++) {
      var pz = this.pz + i * 20;
      var px = sketch.map(this.x / (this.pz+i*10), 0, 1, 0, sketch.width);
      var py = sketch.map(this.y / (this.pz+i*10), 0, 1, 0, sketch.height);

      sketch.fill(255, sketch.map(i, 0, 10, 255, 0));
      sketch.noStroke();
      var r = sketch.map(pz, 0, sketch.width, 16, 0);
      sketch.ellipse(px, py, r, r);
      }

    // sketch.fill(255, 128);
    // sketch.noStroke();

    // var r = sketch.map(this.z, 0, sketch.width, 16, 0);
    // sketch.ellipse(sx, sy, r, r);

    this.pz = this.z;
  }
}
