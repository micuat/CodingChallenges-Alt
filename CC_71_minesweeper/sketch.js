// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// Minesweeper
// Video: https://youtu.be/LFU5ZlrR21E

// instance mode by Naoto Hieda

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
var w = 20;

var totalBees = 30;

var s = function (sketch) {

  sketch.setup = function () {
    sketch.createCanvas(401, 401);
    cols = sketch.floor(sketch.width / w);
    rows = sketch.floor(sketch.height / w);
    grid = make2DArray(cols, rows);
    for (var i = 0; i < cols; i++) {
      for (var j = 0; j < rows; j++) {
        grid[i][j] = new Cell(sketch, i, j, w);
      }
    }

    // Pick totalBees spots
    var options = [];
    for (var i = 0; i < cols; i++) {
      for (var j = 0; j < rows; j++) {
        options.push([i, j]);
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
    sketch.background(255);
    for (var i = 0; i < cols; i++) {
      for (var j = 0; j < rows; j++) {
        grid[i][j].show();
      }
    }
  }

};

var myp5 = new p5(s);
