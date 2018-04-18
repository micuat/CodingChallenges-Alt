// Daniel Shiffman
// Snakes and Ladders

// A player
function Player() {
  this.reset();
}


// Reset variables
Player.prototype.reset = function () {
  this.spot = -1; // Where I am now
  this.next = -1; // Where I'm going
  this.roll = -1; // What was my latest roll
}

// random die roll 1 - 6
Player.prototype.rollDie = function () {
  this.roll = myp5.floor(myp5.random(1, 7));
  this.next = this.spot + this.roll;
}

// Update spot to next
Player.prototype.move = function () {
  this.spot = this.next;
}

// Highlight the tiles ahead
Player.prototype.showPreview = function () {
  let start = Math.max(0, this.spot);
  let end = Math.min(this.next, tiles.length - 1);
  for (let i = start; i <= end; i++) {
    tiles[i].highlight();
  }

}

// Is player on a Snake or Ladder?
Player.prototype.isSnadder = function () {
  let tile = tiles[this.spot];
  return (tile && tile.snadder !== 0);
}

// Move according to the Snake or Ladder
Player.prototype.moveSnadder = function () {
  let tile = tiles[this.spot];
  this.spot += tile.snadder;
}


// Display on the current tile
Player.prototype.show = function () {
  let current = tiles[this.spot];
  // Just get out of here if it's not a valid tile
  if (!current) return;
  myp5.fill(255);
  myp5.stroke(0);
  let center = current.getCenter();
  myp5.ellipse(center[0], center[1], 16);
}

