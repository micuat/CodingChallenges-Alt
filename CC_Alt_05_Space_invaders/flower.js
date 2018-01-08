// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/biN3v3ef-Y0

// instance mode by Naoto Hieda

function Flower(sketch, x, y, i) {
  this.dot1 = [
    [0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0],
    [0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1],
    [0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0]
  ];

  this.dot2 = [
    [0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0],
    [1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0]
  ];
  this.x = x;
  this.y = y;
  this.rInit = 15;
  this.r = this.rInit;
  this.i = i;

  this.xdir = 1;

  this.grow = function() {
    this.r = this.r + 2;
  }

  this.shiftDown = function() {
    this.xdir *= -1;
    this.y += this.rInit;
  }

  this.move = function() {
    this.x = this.x + this.xdir;
  }

  this.show = function() {
    if(sketch.frameCount % 60 < 30) {
      this.dot = this.dot1;
    }
    else {
      this.dot = this.dot2;
    }

    sketch.noStroke();
    sketch.fill(255);
    //sketch.ellipse(this.x, this.y, this.r*2, this.r*2);
    sketch.push();
    var d = 8;
    if(this.r > 20) {
      sketch.fill(255, 0, 0);
      sketch.translate(sketch.width / 2, sketch.height / 2);
      var x = sketch.cos(this.i * 0.2 + sketch.millis() * 0.002 * 1) * 200;
      var y = sketch.sin(this.i * 0.2 + sketch.millis() * 0.002 * 2) * 200;
      sketch.translate(sketch.floor(x / d) * d, sketch.floor(y / d) * d);
    }
    else {
      sketch.translate(sketch.floor(this.x / d) * d, sketch.floor(this.y / d) * d);
    }

    sketch.scale(this.r / 4);

    if(this.r > 20) {
      //sketch.rotate(sketch.millis() * 0.01);
    }

    sketch.translate(-this.dot[0].length * 0.5, -this.dot.length * 0.5);
    for(var i = 0; i < this.dot.length; i++) {
      for(var j = 0; j < this.dot[0].length; j++) {
        if(this.dot[i][j] == 1) {
          sketch.rect(j, i, 1, 1);
        }
      }
    }
    sketch.pop();
  }

}