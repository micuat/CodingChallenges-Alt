// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// Minesweeper
// Video: https://youtu.be/LFU5ZlrR21E

// instance mode by Naoto Hieda

function Mouse(sketch) {
  this.s = sketch;
  this.x = 0;
  this.y = 0;
  this.targetX = 0;
  this.targetY = 0;
  this.count = 0;
}

Mouse.prototype.update = function () {
  let frame = this.s.frameCount % 15;
  if (frame == 0 && finishedTime < 0) {
    for (var i = 0; i < cols; i++) {
      for (var j = 0; j < rows; j++) {
        if (grid[i][j].contains(this.x, this.y)) {
          grid[i][j].reveal();

          if (grid[i][j].bee) {
            this.s.gameOver();
          }

        }
      }
    }
    let nonrevealed = [];
    for (var i = 0; i < cols; i++) {
      for (var j = 0; j < rows; j++) {
        let cell = grid[i][j];
        if (cell.revealed == false) {
          if (this.count < 7) {
            if (cell.bee == false)
              nonrevealed.push(cell);
          }
          else {
            if (cell.bee == true)
              nonrevealed.push(cell);
          }
        }
      }
    }
    if (nonrevealed.length > 0) {
      let target = this.s.random(nonrevealed);
      this.targetX = target.x + target.w * 0.5;
      this.targetY = target.y + target.w * 0.5;
    }
    this.count++;
  }
  else {
    // this.x = this.s.lerp(this.x, this.targetX, frame / 15);
    // this.y = this.s.lerp(this.y, this.targetY, frame / 15);
    if (frame < 8) {
      this.x = this.s.lerp(this.x, this.targetX, frame / 7);
    }
    else {
      this.y = this.s.lerp(this.y, this.targetY, (frame - 7) / 7);
    }
  }
}

Mouse.prototype.show = function () {
  {
    this.s.translate(this.x, this.y, 1);
    this.s.fill(255);
    this.s.scale(1.5, 1.5);
    this.s.beginShape();
    this.s.vertex(0, 0);
    this.s.vertex(11, 11);
    this.s.vertex(11, 12);
    this.s.vertex(7, 12);
    this.s.vertex(9, 17);
    this.s.vertex(8, 18);
    this.s.vertex(7, 18);
    this.s.vertex(4, 13);
    this.s.vertex(1, 16);
    this.s.vertex(0, 16);
    this.s.vertex(0, 0);
    this.s.endShape();
  }
}

function make2DArray(cols, rows) {
  var arr = new Array(cols);
  for (var i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}

var grid;
var cols;
var rows;
var w = 40;

var mode = -1;

var totalBees = 30;
var finishedTime = -1;

var mouse;

var s = function (sketch) {

  sketch.setup = function () {
    sketch.createCanvas(800, 800);
    sketch.noCursor();

    cols = sketch.floor(sketch.width / w);
    rows = sketch.floor(sketch.height / w);
    sketch.initGame();
  }
  sketch.initGame = function () {
    mouse = new Mouse(sketch);

    grid = make2DArray(cols, rows);
    for (var i = 0; i < cols; i++) {
      for (var j = 0; j < rows; j++) {
        grid[i][j] = new Cell(sketch, i, j, w);
      }
    }

    mode = (mode + 1) % 4;
    // let mode = sketch.floor(sketch.random(4));
    // Pick totalBees spots
    var options = [];
    for (var i = 0; i < cols; i++) {
      for (var j = 0; j < rows; j++) {
        if (mode == 0) {
          let dist = sketch.dist(i, j, cols / 2, rows / 2);
          if (dist >= 3 && dist <= 5)
            options.push([i, j]);
        }
        else if (mode == 1) {
          let dist = sketch.dist(i, j, i, rows / 2);
          if (dist >= 4 && dist <= 5)
            options.push([i, j]);
        }
        else if (mode == 2) {
          let dist = sketch.dist(i, j, i, rows / 2 + 5 * sketch.sin(i * 0.5));
          if (dist <= 2)
            options.push([i, j]);
        }
        else if (mode == 3) {
          let dist = sketch.dist(i, j, cols / 2, j);
          if (dist >= 4 && dist <= 5)
            options.push([i, j]);
        }
      }
    }


    for (var n = 0; n < totalBees; n++) {
      var index = sketch.floor(sketch.random(options.length));
      var choice = options[index];
      var i = choice[0];
      var j = choice[1];
      // Deletes that spot so it's no longer an option
      options.splice(index, 1);
      grid[i][j].bee = true;
    }


    for (var i = 0; i < cols; i++) {
      for (var j = 0; j < rows; j++) {
        grid[i][j].countBees();
      }
    }

  }

  sketch.gameOver = function () {
    finishedTime = sketch.millis() * 0.001;
    for (var i = 0; i < cols; i++) {
      for (var j = 0; j < rows; j++) {
        grid[i][j].revealed = true;
      }
    }
  }

  sketch.mousePressed = function () {
    for (var i = 0; i < cols; i++) {
      for (var j = 0; j < rows; j++) {
        if (grid[i][j].contains(sketch.mouseX, sketch.mouseY)) {
          grid[i][j].reveal();

          if (grid[i][j].bee) {
            sketch.gameOver();
          }

        }
      }
    }
  }

  sketch.draw = function () {
    if (finishedTime > 0 && sketch.millis() * 0.001 - finishedTime > 1) {
      sketch.initGame();
      finishedTime = -1;
    }

    mouse.update();

    sketch.background(155);
    for (var i = 0; i < cols; i++) {
      for (var j = 0; j < rows; j++) {
        grid[i][j].show();
      }
    }
    mouse.show();
  }

};

var myp5 = new p5(s);
