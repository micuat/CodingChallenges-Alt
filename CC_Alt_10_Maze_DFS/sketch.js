// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// Videos
// https://youtu.be/HyK_Q5rrcr4
// https://youtu.be/D8UgRyRnvXU
// https://youtu.be/8Ju_uxJ9v44
// https://youtu.be/_p5IH0L63wo

// Depth-first search
// Recursive backtracker
// https://en.wikipedia.org/wiki/Maze_generation_algorithm

var cols, rows, layers;
var w = 80;
var grid = [];

var current;

var stack = [];

function index(i, j, k) {
  if (i < 0 || j < 0 || k < 0 || i > cols - 1 || j > rows - 1 || k > layers - 1) {
    return -1;
  }
  return i + j * cols + k * cols * rows;
}


function removeWalls(a, b) {
  var x = a.i - b.i;
  if (x === 1) {
    a.walls[3] = false;
    b.walls[1] = false;
  } else if (x === -1) {
    a.walls[1] = false;
    b.walls[3] = false;
  }
  var y = a.j - b.j;
  if (y === 1) {
    a.walls[0] = false;
    b.walls[2] = false;
  } else if (y === -1) {
    a.walls[2] = false;
    b.walls[0] = false;
  }
  var z = a.k - b.k;
  if (z === 1) {
    a.walls[5] = false;
    b.walls[4] = false;
  } else if (z === -1) {
    a.walls[4] = false;
    b.walls[5] = false;
  }
}

var s = function (sketch) {

  sketch.setup = function () {
    sketch.createCanvas(1200, 1200);
    cols = sketch.floor(sketch.width / w);
    rows = sketch.floor(sketch.height / w);
    layers = 2;
    //frameRate(5);

    for (var k = 0; k < layers; k++) {
      for (var j = 0; j < rows; j++) {
        for (var i = 0; i < cols; i++) {
          var cell = new Cell(sketch, i, j, k);
          grid.push(cell);
        }
      }
    }

    current = grid[0];


  }

  sketch.draw = function () {
    sketch.background(0);
    // sketch.pointLight(255, 255, 255, sketch.width/2, sketch.height/2, 1000);
    sketch.translate(sketch.width/2, sketch.height/2, -0);
    sketch.rotateX(sketch.PI/3);
    sketch.translate(-sketch.width/2, -sketch.height/2);
    // sketch.translate(w/2, 0);
    for (var i = 0; i < grid.length; i++) {
      grid[i].show();
    }

    current.visited = true;
    current.highlight();
    // STEP 1
    var next = current.checkNeighbors();
    if (next) {
      next.visited = true;

      // STEP 2
      stack.push(current);

      // STEP 3
      removeWalls(current, next);

      // STEP 4
      current = next;
    } else if (stack.length > 0) {
      current = stack.pop();
    }

  }

};

var myp5 = new p5(s);
