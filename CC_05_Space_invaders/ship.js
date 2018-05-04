// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/biN3v3ef-Y0

// instance mode by Naoto Hieda

function Ship() {
  this.x = p005.width/2;
  this.xdir = 0;

  this.show = function() {
    p005.fill(255);
    p005.rectMode(p005.CENTER);
    p005.rect(this.x, p005.height-20, 20, 60);
  }

  this.setDir = function(dir) {
    this.xdir = dir;
  }

  this.move = function(dir) {
    this.x += this.xdir*5;
  }

}
