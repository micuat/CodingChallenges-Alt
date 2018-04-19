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
  this.last = -1;
  this.roll = -1; // What was my latest roll

  this.tween = 0;
  this.moveDone = true;

  this.speed = 0.5;//myp5.random(0.01, 0.5);

  this.trace = [];
}

// random die roll 1 - 6
Player.prototype.rollDie = function () {
  this.roll = myp5.floor(myp5.random(1, 7));
  this.next = this.spot + this.roll;
}

// Update spot to next
Player.prototype.move = function () {
  this.last = this.spot;
  this.spot = this.next;
  // this.tween = 0;
  this.moveDone = false;
}

Player.prototype.update = function () {
  // if(this.tween < 0.05 || this.tween > 0.95)print(this.spot, this.last)
  this.tween += this.speed;
  if (this.tween + this.last >= this.spot) {
    this.moveDone = true;
    this.tween = 0;
  }
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
  if(!tile) return;
  this.spot += tile.snadder;
  if(tile.snadder < 0)
    this.speed = Math.max(this.speed - 0.1, 0.1);
  else
    this.speed = Math.min(this.speed + 0.1, 1);
}


// Display on the current tile
Player.prototype.show = function () {
  if(this.tween == 0)return;
  let curIdx = myp5.floor(this.last + this.tween);
  let tween = this.last + this.tween - curIdx;

  let current = tiles[curIdx];
  // Just get out of here if it's not a valid tile
  if (!current) return;
  // myp5.fill(0, 50);
  myp5.noFill();
  myp5.stroke(255, 0, 0, 50);
  let center = current.getCenter();
  let nextTile = tiles[curIdx + 1];
  if (!nextTile) return;
  let next = nextTile.getCenter();
  let x = myp5.lerp(center[0], next[0], tween);
  let y = myp5.lerp(center[1], next[1], tween);
  // myp5.ellipse(x, y, 40);
  this.trace.push({x: x, y: y});
  myp5.beginShape();
  for(let i = 0; i < this.trace.length; i++) {
    let p = this.trace[i];
    myp5.stroke(255, 0, 0, (i - this.trace.length + 50) * 2);
    myp5.curveVertex(p.x, p.y);
  }
  myp5.endShape();
}

