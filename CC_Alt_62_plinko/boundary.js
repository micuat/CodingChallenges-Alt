// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Plinko
// Video 1: https://youtu.be/KakpnfDv_f0
// Video 2: https://youtu.be/6s4MJcUyaUE
// Video 3: https://youtu.be/jN-sW-SxNzk
// Video 4: https://youtu.be/CdBXmsrkaPs

function Boundary(sketch, x, y, w, h) {
  this.sketch = sketch;
  var options = {
    isStatic: true
  };
  this.body = Bodies.rectangle(x, y, w, h, options);
  this.w = w;
  this.h = h;
  World.add(world, this.body);
}

Boundary.prototype.show = function() {
  let sketch = this.sketch;
  sketch.fill(20);
  sketch.noStroke();
  var pos = this.body.position;
  sketch.push();
  sketch.translate(pos.x, pos.y);
  sketch.rectMode(sketch.CENTER);
  sketch.rect(0, 0, this.w, this.h);
  sketch.pop();
}
