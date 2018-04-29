// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// Neuro-Evolution Flappy Bird

class Pipe {

  constructor() {
    this.spacing = 125;
    this.top = myp5.random(myp5.height / 6, 3 / 4 * myp5.height);
    this.bottom = myp5.height - (this.top + this.spacing);
    this.x = myp5.width;
    this.w = 80;
    this.speed = 6;
  }

  hits(bird) {
    if (bird.y < this.top || bird.y > myp5.height - this.bottom) {
      if (bird.x > this.x && bird.x < this.x + this.w) {
        return true;
      }
    }
    return false;
  }

  show() {
    myp5.fill(255);
    myp5.rectMode(myp5.CORNER);
    myp5.rect(this.x, 0, this.w, this.top);
    myp5.rect(this.x, myp5.height - this.bottom, this.w, this.bottom);
  }

  update() {
    this.x -= this.speed;
  }

  offscreen() {
    if (this.x < -this.w) {
      return true;
    } else {
      return false;
    }
  }
}
