
// instance mode by Naoto Hieda

var grid;
var x;
var y;
var dir;

var ANTUP = 0;
var ANTRIGHT = 1;
var ANTDOWN = 2;
var ANTLEFT = 3;

var s = function (p) {

  p.setup = function () {
    p.createCanvas(400, 400);
    grid = make2DArray(p.width, p.height);
    x = p.width / 2;
    y = p.height / 2;
    dir = ANTUP;
  }

  function turnRight() {
    dir++;
    if (dir > ANTLEFT) {
      dir = ANTUP;
    }
  }

  function turnLeft() {
    dir--;
    if (dir < ANTUP) {
      dir = ANTLEFT;
    }
  }

  function moveForward() {
    if (dir == ANTUP) {
      y--;
    } else if (dir == ANTRIGHT) {
      x++;
    } else if (dir == ANTDOWN) {
      y++;
    } else if (dir == ANTLEFT) {
      x--;
    }

    if (x > p.width - 1) {
      x = 0;
    } else if (x < 0) {
      x = p.width - 1;
    }
    if (y > p.height - 1) {
      y = 0;
    } else if (y < 0) {
      y = p.height - 1;
    }
  }


  p.draw = function () {
    p.strokeWeight(1);
    for (let n = 0; n < 100; n++) {
      let state = grid[x][y];
      if (state == 0) {
        turnRight();
        grid[x][y] = 1;
      } else if (state == 1) {
        turnLeft();
        grid[x][y] = 0;
      }

      p.stroke(p.color(255));
      if (grid[x][y] == 1) {
        p.stroke(p.color(0));
      }
      p.point(x, y);
      moveForward();
    }
  }

  function make2DArray(cols, rows) {
    let arr = new Array(cols);
    for (let i = 0; i < arr.length; i++) {
      arr[i] = new Array(rows);
      for (let j = 0; j < arr[i].length; j++) {
        arr[i][j] = 0;
      }
    }
    return arr;
  }
};

var myp5 = new p5(s);
