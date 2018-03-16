// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Fractal Spirograph
// Video: https://youtu.be/0dwJ-bkJwDI

var k = -4;

function Orbit(sketch, x_, y_, r_, n, p) {
  this.x = x_;
  this.y = y_;
  this.r = r_;
  this.parent = p;
  this.child = null;
  this.speed = (sketch.radians(sketch.pow(k, n-1)))/resolution;
  this.angle = -sketch.PI/2;

  this.addChild = function() {
    var newr = this.r / 3.0;
    var newx = this.x + this.r + newr;
    var newy = this.y;
    this.child = new Orbit(sketch, newx, newy, newr, n+1, this);
    return this.child;
  }

  this.update = function() {
    var parent = this.parent;
    if (parent != null) {
      this.angle += this.speed;
      var rsum = this.r + parent.r;
      this.x = parent.x + rsum * sketch.cos(this.angle);
      this.y = parent.y + rsum * sketch.sin(this.angle);
    }
  }

  this.show = function() {
    sketch.stroke(255, 100);
    sketch.strokeWeight(1);
    sketch.noFill();
    sketch.ellipse(this.x, this.y, this.r*2, this.r*2);
  }
}
