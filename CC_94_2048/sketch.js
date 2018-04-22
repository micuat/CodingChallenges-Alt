// instance mode by Naoto Hieda

var grid;
var grid_new;
var score = 0;

var s = function (p) {

  p.setup = function () {
    p.createCanvas(400, 400);
    p.noLoop();
    grid = blankGrid();
    grid_new = blankGrid();
    // console.table(grid);
    addNumber();
    addNumber();
    p.updateCanvas();
  }

  // One "move"
  p.keyPressed = function () {
    let flipped = false;
    let rotated = false;
    let played = true;
    switch (p.keyCode) {
      case p.DOWN_ARROW:
        // do nothing
        break;
      case p.UP_ARROW:
        grid = flipGrid(grid);
        flipped = true;
        break;
      case p.RIGHT_ARROW:
        grid = transposeGrid(grid);
        rotated = true;
        break;
      case p.LEFT_ARROW:
        grid = transposeGrid(grid);
        grid = flipGrid(grid);
        rotated = true;
        flipped = true;
        break;
      default:
        played = false;
    }

    if (played) {
      let past = copyGrid(grid);
      for (let i = 0; i < 4; i++) {
        grid[i] = operate(grid[i]);
      }
      let changed = compare(past, grid);
      if (flipped) {
        grid = flipGrid(grid);
      }
      if (rotated) {
        grid = transposeGrid(grid);
      }
      if (changed) {
        addNumber();
      }
      p.updateCanvas();

      let gameover = isGameOver();
      if (gameover) {
        console.log("GAME OVER");
      }

      let gamewon = isGameWon();
      if (gamewon) {
        console.log("GAME WON");
      }

    }
  }

  p.updateCanvas = function () {
    p.background(255);
    p.drawGrid();
    p.select('#score').html(score);
  }

  p.drawGrid = function () {
    let w = 100;
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        p.noFill();
        p.strokeWeight(2);
        let val = grid[i][j];
        let s = val.toString();
        if (grid_new[i][j] === 1) {
          p.stroke(200, 0, 200);
          p.strokeWeight(16);
          grid_new[i][j] = 0;
        } else {
          p.strokeWeight(4);
          p.stroke(0);
        }

        if (val != 0) {
          p.fill(colorsSizes[s].color);
        } else {
          p.noFill();
        }
        p.rect(i * w, j * w, w, w, 30);
        if (val !== 0) {
          p.textAlign(p.CENTER, p.CENTER);
          p.noStroke();
          p.fill(0);
          p.textSize(colorsSizes[s].size);
          p.text(val, i * w + w / 2, j * w + w / 2);
        }
      }
    }
  }

};

var myp5 = new p5(s);
