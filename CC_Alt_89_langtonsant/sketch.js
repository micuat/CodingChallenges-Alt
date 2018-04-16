
// instance mode by Naoto Hieda

var grid;
var x;
var y;
var dir;

var ANTUP = 0;
var ANTRIGHT = 1;
var ANTDOWN = 2;
var ANTLEFT = 3;

var m = 8;

var s = function (p) {

  p.setup = function () {
    p.createCanvas(800, 800);
    p.background(255);
    // p.noStroke();
    p.strokeWeight(m);
    p.fill(0);
    grid = make2DArray(p.width / m, p.height / m);
    x = p.width / m / 2;
    y = p.height / m / 2;
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

    if (x > p.width / m - 1) {
      x = 0;
    } else if (x < 0) {
      x = p.width / m - 1;
    }
    if (y > p.height / m - 1) {
      y = 0;
    } else if (y < 0) {
      y = p.height / m - 1;
    }
  }

  var lastMode = 0;
  p.draw = function () {
    let mode = parseInt(p.millis() * 0.001 / 1.5 % 4);
    if (mode != lastMode) {
      p.background(255);
      // p.noStroke();
      p.strokeWeight(m);
      p.fill(0);
      grid = make2DArray(p.width / m, p.height / m, mode);
      x = p.width / m / 2;
      y = p.height / m / 2;
      dir = ANTUP;
    }
    lastMode = mode;
    for (let n = 0; n < 100; n++) {
      let state = grid[x][y];
      if (state == 0) {
        turnRight();
        grid[x][y] = 1;
      } else if (state == 1) {
        turnLeft();
        grid[x][y] = 0;
      }

      if (grid[x][y] == 1) {
        p.stroke(0);
        p.point(x * m, y * m);
      }
      else {
        p.stroke(255);
        p.point(x * m, y * m);
      }
      moveForward();
    }
  }

  function make2DArray(cols, rows, mode) {
    p.stroke(0);
    let arr = new Array(cols);
    for (let i = 0; i < arr.length; i++) {
      arr[i] = new Array(rows);
      for (let j = 0; j < arr[i].length; j++) {
        arr[i][j] = 0;
        let cond = false;
        switch (mode) {
          case 0:
            cond = i % 8;
            break;
          case 1:
            cond = j % 4;
            break;
          case 2:
            cond = i % 4;
            break;
          case 3:
            cond = (i + j) % 8;
            break;
        }
        if (cond == 0) {
          arr[i][j] = 1;
          p.point(i * m, j * m);
        }
      }
    }
    return arr;
  }
};

var myp5 = new p5(s);
