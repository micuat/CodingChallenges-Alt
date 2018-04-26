// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// QuadTree
// https://www.youtube.com/watch?v=z0YFFg_nBjw

// For more:
// https://github.com/CodingTrain/QuadTree

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.r = 4;
    this.highlight = false;
  }

  intersects(other) {
    let d = myp5.dist(this.x, this.y, other.x, other.y);
    return (d < this.r + other.r);
  }

  setHighlight(value) {
    this.highlight = value;
  }

  move() {
    this.x += myp5.random(-1, 1);
    this.y += myp5.random(-1, 1);
  }

  render() {
    myp5.noStroke();
    if (this.highlight) {
      myp5.fill(255);
    } else {
      myp5.fill(100);
    }
    myp5.ellipse(this.x, this.y, this.r * 2);
  }

}
