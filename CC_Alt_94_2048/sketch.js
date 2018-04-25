// instance mode by Naoto Hieda

var grid;
var grid_new;
var grid_lerp;
var score = 0;

var gameCount;

var font;

var s = function (p) {

  p.setup = function () {
    p.createCanvas(800, 800);
    font = p.createFont('../CC_Alt_66_timer/HelveticaNeueMedium.ttf', 24);
    // p.noLoop();
    p.reset();
  }

  p.reset = function () {
    gameCount = 0;
    grid = blankGrid();
    grid_new = blankGrid();
    grid_lerp = blankGrid();
    // console.table(grid);
    addNumber();
    addNumber();
    p.updateCanvas();

  }

  // One "move"
  p.keyPressed = function () {
    p.moveGrid(p.keyCode);
  }

  p.moveGrid = function (code) {
    let flipped = false;
    let rotated = false;
    let played = true;
    switch (code) {
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

    let changed, gameover;
    if (played) {
      let past = copyGrid(grid);
      for (let i = 0; i < 4; i++) {
        grid[i] = operate(grid[i]);
      }
      changed = compare(past, grid);
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

      gameover = isGameOver();
      if (gameover) {
        console.log("GAME OVER");
      }

      let gamewon = isGameWon();
      if (gamewon) {
        console.log("GAME WON");
      }

    }
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        grid_lerp[i][j] = p.lerp(grid_lerp[i][j], grid[i][j], 0.01);
      }
    }

    return { changed: changed, gameover: gameover };
  }

  p.updateCanvas = function () {
    // p.background(255);
    // p.drawGrid();
    // p.select('#score').html(score);
  }

  p.draw = function () {
    for (let i = 0; i < 10; i++)
      if (true || p.frameCount % 2 == 0) {
        // let keys = [p.DOWN_ARROW, p.LEFT_ARROW, p.UP_ARROW, p.RIGHT_ARROW];
        // let key = keys[Math.floor(p.frameCount / 30) % 4];
        // p.moveGrid(key);
        let result = p.moveGrid(p.DOWN_ARROW);
        if (result.gameover) {
          p.reset();
        }
        else if (result.changed == false) {
          result = p.moveGrid(p.RIGHT_ARROW);
          if (result.gameover) {
            p.reset();
          }
          else if (result.changed == false) {
            result = p.moveGrid(p.LEFT_ARROW);
            if (result.gameover) {
              p.reset();
            }
            else if (result.changed == false) {
              result = p.moveGrid(p.UP_ARROW);
              if (result.gameover) {
                p.reset();
              }
            }
          }
        }
      }
    gameCount++;
    p.background(255);
    p.textFont(font);
    p.drawGrid();
  }

  p.drawGrid = function () {
    let w = 200;
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        p.noFill();
        p.strokeWeight(2);
        let val = grid_lerp[i][j];
        let val_org = grid[i][j];
        let s = val_org.toString();
        if (grid_new[i][j] === 1) {
          p.stroke(0);
          p.strokeWeight(4);
          // grid_new[i][j] = 0;
        } else {
          p.strokeWeight(4);
          p.stroke(0);
        }

        if (val != 0) {
          // p.fill(colorsSizes[s].color);
          p.noFill();
        } else {
          p.noFill();
        }

        let nw = 0;
        if (val != 0) {
          nw = p.map(Math.log(val), 0, 11, 0, w);
          if (nw < 0) nw = 0;
          // nw = p.map(val, 0, 2048, 0, w);
        }
        p.push();
        p.noStroke();
        if (gameCount > 10) {
          p.colorMode(p.HSB, 255)
          p.fill(nw / w * 200, 255, 255);
        }
        else {
          p.noFill();
          p.stroke(0);
          p.strokeWeight(2);
        }
        p.translate(i * w + w / 2, j * w + w / 2);
        p.rectMode(p.CENTER)
        p.rect(0, 0, nw, nw);
        p.pop();
        if (val_org !== 0) {
          p.textAlign(p.CENTER, p.CENTER);
          p.noStroke();
          p.fill(0);
          p.textSize(/*colorsSizes[s].size * 2*/24);
          p.text(val_org, i * w + w / 2, j * w + w / 2 - nw / 2 - 14);
        }
      }
    }
  }

};

var myp5 = new p5(s);
