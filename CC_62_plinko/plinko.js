// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Plinko
// Video 1: https://youtu.be/KakpnfDv_f0
// Video 2: https://youtu.be/6s4MJcUyaUE
// Video 3: https://youtu.be/jN-sW-SxNzk
// Video 4: https://youtu.be/CdBXmsrkaPs

function Plinko(sketch, x, y, r) {
  this.sketch = sketch;
  var options = {
    restitution: 1,
    friction: 0,
    isStatic: true
  }
  this.body = Bodies.circle(x, y, r, options);
  this.body.label = "plinko";
  this.r = r;
  World.add(world, this.body);
}

Plinko.prototype.show = function() {
  let sketch = this.sketch;
  sketch.noStroke();
  sketch.fill(127);
  var pos = this.body.position;
  sketch.push();
  sketch.translate(pos.x, pos.y);
  sketch.ellipse(0, 0, this.r * 2);
  sketch.pop();
}
