// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/cXgA1d_E-jY&

function Bird(sketch) {
  this.y = sketch.height/2;
  this.x = 500;

  this.gravity = 0.6;
  this.lift = -15;
  this.velocity = 0;

  this.trace = [];

  this.show = function() {
    sketch.fill(255);
    sketch.noStroke();
    // sketch.ellipse(this.x, this.y, 8, 8);

    sketch.stroke(255);
    let t = sketch.millis() * 0.001;
    // for(let i = 0; i < this.trace.length - 1; i++) {
    //   let y0 = this.trace[this.trace.length - 1 - i];
    //   let y1 = this.trace[this.trace.length - 1 - (i+1)];
    //   y0 += sketch.sin(i * 0.3 + t * 10) * 20;
    //   y1 += sketch.sin((i+1) * 0.3 + t * 10) * 20;
    //   sketch.line(this.x - i * 1, y0, this.x - (i+1) * 1, y1);
    // }
    sketch.noFill()
    sketch.beginShape();
    for(let i = 0; i < this.trace.length - 1; i++) {
      let y = this.trace[this.trace.length - 1 - i];
      y += sketch.sin(i * 0.3 + t * 10) * 20;
      sketch.vertex(this.x - i * 1, y);
    }
    sketch.endShape();
  }

  this.up = function() {
    this.velocity += this.lift;
  }

  this.update = function() {
    this.trace.push(this.y);
    if(this.trace.length > sketch.width / 1) {
      this.trace.shift();
    }
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
