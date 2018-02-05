// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/cXgA1d_E-jY&

function Bird(sketch) {
  this.y = sketch.height/2;
  this.x = 300;

  this.gravity = 0.6;
  this.lift = -15;
  this.velocity = 0;

  this.show = function() {
    sketch.fill(255);
    sketch.ellipse(this.x, this.y, 32, 32);
  }

  this.up = function() {
    if(this.velocity > 0)
    this.velocity += this.lift;
  }

  this.update = function() {
    this.velocity += this.gravity;
    this.velocity *= 0.9;
    this.y += this.velocity;

    if (this.y > sketch.height) {
      this.y = sketch.height;
      this.velocity = 0;
    }

    if (this.y < 0) {
      this.y = 0;
      this.velocity = 0;
    }

  }

}
