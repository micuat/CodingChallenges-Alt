// Coding Rainbow
// Daniel Shiffman
// http://patreon.com/codingtrain
// Code for: https://youtu.be/kKT0v3qhIQY

function Leaf(sketch) {
  this.pos = sketch.createVector(sketch.random(sketch.width), sketch.random(sketch.height - 100));
  this.reached = false;

  this.show = function() {
    sketch.fill(255);
    sketch.noStroke();
    sketch.ellipse(this.pos.x, this.pos.y, 4, 4);
  }

}
