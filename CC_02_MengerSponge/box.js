// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for this video: https://youtu.be/LG8ZK-rRkXo

// instance mode by Naoto Hieda

function Box(x, y, z, r) {
  this.pos = p002.createVector(x, y, z);
  this.r = r;

  this.generate = function () {
    var boxes = [];
    for (var x = -1; x < 2; x++) {
      for (var y = -1; y < 2; y++) {
        for (var z = -1; z < 2; z++) {
          var sum = p002.abs(x) + p002.abs(y) + p002.abs(z);
          var newR = this.r / 3;
          if (sum > 1) {
            var b = new Box(this.pos.x + x * newR, this.pos.y + y * newR, this.pos.z + z * newR, newR);
            boxes.push(b);
          }
        }
      }
    }
    return boxes;
  }

  this.show = function () {
    p002.push();
    p002.translate(this.pos.x, this.pos.y, this.pos.z);
    p002.stroke(255);
    p002.noStroke();
    if(!p002.isLiveJs) p002.noFill();
    p002.box(this.r);
    p002.pop();
  }
}