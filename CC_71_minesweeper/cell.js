// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// Minesweeper
// Video: https://youtu.be/LFU5ZlrR21E

function Cell(sketch, i, j, w) {
  this.s = sketch;
  this.i = i;
  this.j = j;
  this.x = i * w;
  this.y = j * w;
  this.w = w;
  this.neighborCount = 0;

  this.bee = false;
  this.revealed = false;
}

Cell.prototype.show = function() {
  this.s.stroke(0);
  this.s.noFill();
  this.s.rect(this.x, this.y, this.w, this.w);
  if (this.revealed) {
    if (this.bee) {
      this.s.fill(127);
      this.s.ellipse(this.x + this.w * 0.5, this.y + this.w * 0.5, this.w * 0.5);
    } else {
      this.s.fill(200);
      this.s.rect(this.x, this.y, this.w, this.w);
      if (this.neighborCount > 0) {
        this.s.textAlign(this.s.CENTER);
        this.s.fill(0);
        this.s.text(this.s.nf(this.neighborCount), this.x + this.w * 0.5, this.y + this.w - 6);
      }
    }
  }
}

Cell.prototype.countBees = function() {
  if (this.bee) {
    this.neighborCount = -1;
    return;
  }
  var total = 0;
  for (var xoff = -1; xoff <= 1; xoff++) {
    var i = this.i + xoff;
    if (i < 0 || i >= cols) continue;

    for (var yoff = -1; yoff <= 1; yoff++) {
      var j = this.j + yoff;
      if (j < 0 || j >= rows) continue;

      var neighbor = grid[i][j];
      if (neighbor.bee) {
        total++;
      }
    }
  }
  this.neighborCount = total;
}

Cell.prototype.contains = function(x, y) {
  return (x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.w);
}

Cell.prototype.reveal = function() {
  this.revealed = true;
  if (this.neighborCount == 0) {
    // flood fill time
    this.floodFill();
  }
}

Cell.prototype.floodFill = function() {
  for (var xoff = -1; xoff <= 1; xoff++) {
    var i = this.i + xoff;
    if (i < 0 || i >= cols) continue;

    for (var yoff = -1; yoff <= 1; yoff++) {
      var j = this.j + yoff;
      if (j < 0 || j >= rows) continue;

      var neighbor = grid[i][j];
      // Note the neighbor.bee check was not required.
      // See issue #184
      if (!neighbor.revealed) {
        neighbor.reveal();
      }
    }
  }
}
