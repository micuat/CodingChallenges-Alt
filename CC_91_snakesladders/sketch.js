// Daniel Shiffman
// Snakes and Ladders

// instance mode by Naoto Hieda

// What is the state?
const ROLL_STATE = 0; // Rolling the die
const MOVE_STATE = 1; // Moving to next spot
const SNADDER_STATE = 2; // Moving along a Snake or Ladder
var state = ROLL_STATE;

// Array of tiles
var tiles = [];
// One player
var player;

// Unecessary for playing the game
// these variables or for storing all the rolls over time
var rolls = [];
var index = 0;
var averageRolls = 0;
var avgP;

var s = function (p) {
  p.setup = function () {
    p.createCanvas(400, 400);
    // avgP = p.createP('');

    rolls[index] = 0;

    // Size of tile, columns and rows
    let resolution = 40;
    let cols = p.width / resolution;
    let rows = p.height / resolution;

    // Create all the tiles from bottom to top
    let x = 0;
    let y = (rows - 1) * resolution;
    let dir = 1;
    for (let i = 0; i < cols * rows; i++) {
      let tile = new Tile(x, y, resolution, i, i + 1);
      tiles.push(tile);
      x = x + (resolution * dir);
      // Move along a winding path up the rows
      if (x >= p.width || x <= -resolution) {
        dir *= -1;
        x += resolution * dir;
        y -= resolution;
      }
    }

    // Pick random Snakes
    for (let i = 0; i < 3; i++) {
      let index = p.floor(p.random(cols, tiles.length - 1));
      // -1 makes in a Snake (drop down a number of spots)
      tiles[index].snadder = -1 * p.floor(p.random(index % cols, index - 1));
    }

    // Pick random Ladders
    for (let i = 0; i < 3; i++) {
      let index = p.floor(p.random(0, tiles.length - cols));
      tiles[index].snadder = p.floor(p.random(cols - (index % cols), tiles.length - index - 1));
    }

    // A new player
    player = new Player();
  }

  p.draw = function () {
    // frameRate(5);
    p.background(51);

    // Draw all the tiles, snakes, and ladders
    for (let i in tiles) {
      let tile = tiles[i];
      tile.show();
    }
    for (let i in tiles) {
      let tile = tiles[i];
      tile.showSnadders();
    }

    // Rolling the die
    if (state === ROLL_STATE) {
      player.rollDie();
      rolls[index]++;
      player.showPreview();
      state = MOVE_STATE;
      // Moving the player
    } else if (state === MOVE_STATE) {
      player.move();
      if (player.isSnadder()) {
        state = SNADDER_STATE;
      } else {
        state = ROLL_STATE;
      }
      // Moving along a Snake or Ladder
    } else if (state === SNADDER_STATE) {
      player.moveSnadder();
      state = ROLL_STATE;
    }

    // Draw the player
    player.show();

    // Is the game over?
    if (player.spot >= tiles.length - 1) {
      state = ROLL_STATE;
      player.reset();
      index++;
      rolls[index] = 0;

      // Compute average rolls to complete game
      let sum = 0;
      for (let i = 0; i < rolls.length - 1; i++) {
        sum += rolls[i];
      }
      let avg = sum / (rolls.length - 1);
      if (avg) {
        // avgP.html(avg);
        console.log(avg);
      }
    }



  }

};

var myp5 = new p5(s);
