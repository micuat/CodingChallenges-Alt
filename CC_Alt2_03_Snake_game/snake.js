// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/AaGK-fj-BAM

// instance mode by Naoto Hieda

function Snake(scl) {
  this.x = 0;
  this.y = 0;
  this.xspeed = 1;
  this.yspeed = 0;
  this.total = 0;
  this.tail = [];

  this.eat = function(pos) {
    var d = p003.dist(this.x, this.y, pos.x, pos.y);
    if (d < 1) {
      this.total++;
      return true;
    } else {
      return false;
    }
  }

  this.dir = function(x, y) {
    this.xspeed = x;
    this.yspeed = y;
  }

  this.death = function() {
    if(this.total < 10) return;
    for (var i = 0; i < this.tail.length; i++) {
      var pos = this.tail[i];
      var d = p003.dist(this.x, this.y, pos.x, pos.y);
      if (d < 1) {
        console.log('starting over');
        this.total = 0;
        this.tail = [];
      }
    }
  }

  this.update = function() {
    for (var i = 0; i < this.tail.length - 1; i++) {
      this.tail[i] = this.tail[i + 1];
    }
    if (this.total >= 1) {
      this.tail[this.total - 1] = p003.createVector(this.x, this.y);
    }

    this.x = this.x + this.xspeed * scl;
    this.y = this.y + this.yspeed * scl;

    this.x = p003.constrain(this.x, 0, p003.width - scl);
    this.y = p003.constrain(this.y, 0, p003.height - scl);
  }

  this.show = function(margin) {
    p003.fill(255);
    for (var i = 0; i < this.tail.length; i++) {
      p003.rect(this.tail[i].x+margin, this.tail[i].y+margin, scl-margin*2, scl-margin*2);
    }
    p003.rect(this.x+margin, this.y+margin, scl-margin*2, scl-margin*2);

  }
}