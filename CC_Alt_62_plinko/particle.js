// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Plinko
// Video 1: https://youtu.be/KakpnfDv_f0
// Video 2: https://youtu.be/6s4MJcUyaUE
// Video 3: https://youtu.be/jN-sW-SxNzk
// Video 4: https://youtu.be/CdBXmsrkaPs

function Particle(sketch, x, y, r) {
  this.sketch = sketch;
  this.hue = sketch.random(360);
  var options = {
    restitution: 0.5,
    friction: 0,
    density: 1
  }
  x += sketch.random(-1, 1);
  this.body = Bodies.circle(x, y, r, options);
  this.body.label = "particle";
  this.r = r;
  World.add(world, this.body);
}

Particle.prototype.isOffScreen = function() {
  let sketch = this.sketch;
  var x = this.body.position.x;
  var y = this.body.position.y;
  return (x < -50 || x > sketch.width + 50 || y > sketch.height);
}

Particle.prototype.show = function() {
  let sketch = this.sketch;
  let v = Matter.Vector.magnitude(this.body.velocity);
  if(v < 0.01 && this.body.position.y > 600) {
    Matter.Body.setStatic(this.body, true);
  }

  sketch.fill(sketch.map(v, 0, 2, 200, 255));
  sketch.noStroke();
  var pos = this.body.position;
  sketch.push();
  sketch.translate(pos.x, pos.y);
  sketch.ellipse(0, 0, this.r * 2);
  sketch.pop();
}
