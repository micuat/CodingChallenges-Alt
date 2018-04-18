// Daniel Shiffman
// Snakes and Ladders

// Each tile on the board
function Tile(x, y, wh, index, next) {
  this.x = x
  this.y = y
  this.wh = wh
  // index and next
  // TODO: (next is probably redundant?)
  this.index = index;
  this.next = next;
  this.snadder = 0;
  // Checkboard pattern
  if (this.index % 2 == 0) {
    this.color = 200;
  } else {
    this.color = 100;
  }
}

// Find center
Tile.prototype.getCenter = function () {
  let cx = this.x + this.wh / 2;
  let cy = this.y + this.wh / 2;
  // TODO: change to p5.Vector?
  return [cx, cy];
}

// Draw rectangle
Tile.prototype.show = function () {
  myp5.fill(this.color);
  myp5.noStroke();
  myp5.rect(this.x, this.y, this.wh, this.wh);
}

// Highlight over rectangle
Tile.prototype.highlight = function () {
  myp5.fill(0, 0, 255, 100);
  myp5.noStroke();
  myp5.rect(this.x, this.y, this.wh, this.wh);
}

// If it's connected to another tile
// with a snake or a ladder
Tile.prototype.showSnadders = function () {
  if (this.snadder != 0) {
    let myCenter = this.getCenter();
    let nextCenter = tiles[this.index + this.snadder].getCenter();
    myp5.strokeWeight(4);
    if (this.snadder < 0) {
      myp5.stroke(255, 0, 0, 200);
    } else {
      myp5.stroke(0, 255, 0, 200);
    }
    myp5.line(myCenter[0], myCenter[1], nextCenter[0], nextCenter[1]);
  }
}
