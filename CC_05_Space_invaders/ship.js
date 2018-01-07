// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/biN3v3ef-Y0

function Ship(sketch) {
  this.x = sketch.width/2;
  this.xdir = 0;

  this.show = function() {
    sketch.fill(255);
    sketch.rectMode(sketch.CENTER);
    sketch.rect(this.x, sketch.height-20, 20, 60);
  }

  this.setDir = function(dir) {
    this.xdir = dir;
  }

  this.move = function(dir) {
    this.x += this.xdir*5;
  }

}
