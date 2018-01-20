// Coding Rainbow
// Daniel Shiffman
// http://patreon.com/codingtrain
// Code for: https://youtu.be/JcopTKXt8L8

// instance mode by Naoto Hieda

function Leaf(sketch) {
  this.pos = p5.Vector.random3D();
  this.pos.mult(sketch.random(sketch.width/2));
  this.pos.y -= sketch.height/4;
  this.reached = false;

  this.show = function() {
    sketch.fill(255);
    sketch.noStroke();
    sketch.push();
    sketch.translate(this.pos.x, this.pos.y, this.pos.z);
    sketch.ellipse(0, 0, 4, 4);
    sketch.pop();
  }

}
