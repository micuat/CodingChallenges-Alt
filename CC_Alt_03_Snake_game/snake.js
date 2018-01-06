// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/AaGK-fj-BAM

// instance mode by Naoto Hieda

function Snake(sketch, scl) {
  this.x = 0;
  this.y = 0;
  this.xspeed = 1;
  this.yspeed = 0;
  this.total = 0;
  this.toAdd = 0;
  this.tail = [];

  this.eat = function(pos) {
    var d = sketch.dist(this.x, this.y, pos.x, pos.y);
    if (d < 1) {
      this.toAdd = 5;
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
    for (var i = 0; i < this.tail.length; i++) {
      var pos = this.tail[i];
      var d = sketch.dist(this.x, this.y, pos.x, pos.y);
      if (d < 1) {
        console.log('starting over');
        this.total = 0;
        this.tail = [];
      }
    }
  }

  this.update = function(tiles) {
    if(sketch.frameCount % 10 != 0) return;

    for (var i = 0; i < this.tail.length - 1; i++) {
      this.tail[i] = this.tail[i + 1];
      var x = this.tail[i].x / scl;
      var y = this.tail[i].y / scl;
      tiles[y][x].pColor = 0;
    }
    if(this.toAdd > 0) {
      this.total++;
      this.toAdd--;
    }
    if (this.total >= 1) {
      this.tail[this.total - 1] = sketch.createVector(this.x, this.y);

      var x = this.tail[this.total - 1].x / scl;
      var y = this.tail[this.total - 1].y / scl;
      tiles[y][x].pColor = 0;
    }

    this.x = this.x + this.xspeed * scl;
    this.y = this.y + this.yspeed * scl;

    this.x = sketch.constrain(this.x, 0, sketch.width - scl);
    this.y = sketch.constrain(this.y, 0, sketch.height - scl);

    var j = this.x / scl;
    var i = this.y / scl;
    tiles[i][j].pColor = 0;
  }

  this.show = function() {
    // sketch.fill(255);
    // for (var i = 0; i < this.tail.length; i++) {
    //   sketch.rect(this.tail[i].x, this.tail[i].y, scl, scl);
    // }
    // sketch.rect(this.x, this.y, scl, scl);
  }
}