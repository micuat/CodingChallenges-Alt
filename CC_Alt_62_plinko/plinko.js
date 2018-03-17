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
  this.color = 100;
  var options = {
    restitution: 1,
    friction: 0,
    isStatic: true
  }
  this.body = Bodies.circle(x, y, r, options);
  this.body.label = "plinko";
  this.body.obj = this;
  this.r = r;
  World.add(world, this.body);
}

Plinko.prototype.show = function() {
  let sketch = this.sketch;
  sketch.noStroke();
  var pos = this.body.position;
  sketch.push();
  sketch.translate(pos.x, pos.y);

  sketch.fill(255, 150);
  sketch.ellipse(0, 0, sketch.map(this.color, 0, 255, this.r * 2, sketch.width/11));

  sketch.fill(255);
  sketch.ellipse(0, 0, this.r * 2);

  sketch.pop();

  if(this.color > 0) this.color -= 1;
}
