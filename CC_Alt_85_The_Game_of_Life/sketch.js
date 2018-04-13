// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// Game of Life
// Video: https://youtu.be/FWSR_7kZuYg

// instance mode by Naoto Hieda

var s = function (p) {

  function make2DArray(cols, rows) {
    let arr = new Array(cols);
    for (let i = 0; i < arr.length; i++) {
      arr[i] = new Array(rows);
    }
    return arr;
  }

  let grid;
  let cols;
  let rows;
  let resolution = 8;
  let gap = 16;

  p.setup = function () {
    p.createCanvas(800, 800);
    cols = p.width / resolution;
    rows = p.height / resolution;

    let doRandom = gap == 16;//p.random(1) < 0.2 ? true : false;
    grid = make2DArray(cols, rows);
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        //grid[i][j] = p.floor(p.random(2));
        if(doRandom && p.random(1) < 0.01) {
          grid[i][j] = 1;
        }
        else {
          grid[i][j] = 0;
        }
      }
    }
    let bloc = [[10, 10], [11, 10], [12, 10], [13, 7], [13, 8], [13, 9], [10, 5], [11, 5], [12, 5], [8, 7], [8, 8], [8, 9]];
    for(let i in bloc) {
      for(let y = 0; y < 3; y++) {
        for(let x = 0; x < 3; x++) {
          let dx = x * gap + 21 + p.floor((16 - gap) / 1);
          let dy = y * gap + 22 + p.floor((16 - gap) / 1);
          grid[bloc[i][0] + dx][bloc[i][1] + dy] = 1;
          grid[28 - bloc[i][0] + dx][bloc[i][1] + dy] = 1;
          grid[bloc[i][0] + dx][22 - bloc[i][1] + dy] = 1;
          grid[28 - bloc[i][0] + dx][22 - bloc[i][1] + dy] = 1;
        }
      }
    }
  }

  p.draw = function () {
    p.background(0);
    if(p.frameCount % 60 == 0) {
      gap = gap - 1;
      if(gap < 12) gap = 16;
      p.setup();
    }

    if(p.frameCount % 60 < 15) {
      p.background(255);
    }

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        let x = i * resolution;
        let y = j * resolution;
        if (grid[i][j] == 1) {
          p.fill(255);
          p.stroke(0);
          p.rect(x, y, resolution - 1, resolution - 1);
        }
      }
    }

    let next = make2DArray(cols, rows);

    // Compute next based on grid
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        let state = grid[i][j];
        // Count live neighbors!
        let sum = 0;
        let neighbors = countNeighbors(grid, i, j);

        if (state == 0 && neighbors == 3) {
          next[i][j] = 1;
        } else if (state == 1 && (neighbors < 2 || neighbors > 3)) {
          next[i][j] = 0;
        } else {
          next[i][j] = state;
        }

      }
    }

    grid = next;



  }


  function countNeighbors(grid, x, y) {
    let sum = 0;
    for (let i = -1; i < 2; i++) {
      for (let j = -1; j < 2; j++) {
        let col = (x + i + cols) % cols;
        let row = (y + j + rows) % rows;
        sum += grid[col][row];
      }
    }
    sum -= grid[x][y];
    return sum;
  }

};

var myp5 = new p5(s);
