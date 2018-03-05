// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Part 1: https://youtu.be/aKYlikFAV4k
// Part 2: https://youtu.be/EaZxUCWAjb0
// Part 3: https://youtu.be/jwRT4PCT6RU

// An object to describe a spot in the grid
function Spot(sketch, i, j) {

  // Location
  this.i = i;
  this.j = j;

  // f, g, and h values for A*
  this.f = 0;
  this.g = 0;
  this.h = 0;

  // Neighbors
  this.neighbors = [];

  // Where did I come from?
  this.previous = undefined;

  // Am I a wall?
  this.wall = false;
  if (sketch.random(1) < 0.4) {
    this.wall = true;
  }

  this.col = sketch.color(0);

  // Display me
  this.show = function(col) {
    if (this.wall) {
      sketch.fill(255);
      sketch.noStroke();
      sketch.push();
      sketch.translate(this.i * w + w/2, this.j * h + h/2);
      sketch.rotate(sketch.PI/4);
      let sc = sketch.sqrt(2);
      sketch.rect(-w/sc/2, -h/sc/2, w/sc, h/sc);
      sketch.pop();
      // sketch.ellipse(this.i * w + w / 2, this.j * h + h / 2, w / 2, h / 2);
    } else if (col){
      let p = 0.02;
      this.col = sketch.color(sketch.lerp(sketch.red(this.col), sketch.red(col), p),
        sketch.lerp(sketch.green(this.col), sketch.green(col), p),
        sketch.lerp(sketch.blue(this.col), sketch.blue(col), p));
      sketch.fill(this.col);
      // sketch.strokeWeight(0.5);
      // sketch.stroke(col)
      sketch.noStroke();
      // sketch.rect(this.i * w, this.j * h, w, h);
      sketch.ellipse(this.i * w + w / 2, this.j * h + h / 2, w / 2, h / 2);

      // sketch.push();
      // sketch.translate(this.i * w + w/2, this.j * h + h/2);
      // sketch.rotate(sketch.PI/4);
      // let sc = sketch.sqrt(2);
      // sketch.rect(-w/sc/2, -h/sc/2, w/sc, h/sc);
      // sketch.pop();
    }
  }

  // Figure out who my neighbors are
  this.addNeighbors = function(grid) {
    var i = this.i;
    var j = this.j;
    if (i < cols - 1) {
      this.neighbors.push(grid[i + 1][j]);
    }
    if (i > 0) {
      this.neighbors.push(grid[i - 1][j]);
    }
    if (j < rows - 1) {
      this.neighbors.push(grid[i][j + 1]);
    }
    if (j > 0) {
      this.neighbors.push(grid[i][j - 1]);
    }
    if (i > 0 && j > 0) {
      this.neighbors.push(grid[i - 1][j - 1]);
    }
    if (i < cols - 1 && j > 0) {
      this.neighbors.push(grid[i + 1][j - 1]);
    }
    if (i > 0 && j < rows - 1) {
      this.neighbors.push(grid[i - 1][j + 1]);
    }
    if (i < cols - 1 && j < rows - 1) {
      this.neighbors.push(grid[i + 1][j + 1]);
    }
  }
}
