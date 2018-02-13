// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/cXgA1d_E-jY&

function Pipe(sketch) {
  var spacing = sketch.random(50, sketch.height / 2);
  var centery = sketch.random(spacing, sketch.height - spacing);

  this.top = centery - spacing / 2;
  this.bottom = sketch.height - (centery + spacing / 2);
  this.x = sketch.width;
  this.w = 50;
  this.speed = 2;

  this.highlight = false;

  this.hits = function(bird) {
    if (bird.y < this.top || bird.y > sketch.height - this.bottom) {
      if (bird.x > this.x && bird.x < this.x + this.w) {
        this.highlight = true;
        return true;
      }
    }
    this.highlight = false;
    return false;
  }

  this.show = function() {
    sketch.noStroke();
    sketch.fill(255);
    if (this.highlight) {
      sketch.fill(255, 0, 0);
    }
    sketch.rect(this.x, 0, this.w, this.top);
    sketch.rect(this.x, sketch.height - this.bottom, this.w, this.bottom);
  }

  this.update = function() {
    this.x -= this.speed;
  }

  this.offscreen = function() {
    if (this.x < -this.w) {
      return true;
    } else {
      return false;
    }
  }


}
