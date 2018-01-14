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

function Cell(sketch, i, j, k) {
  this.i = i;
  this.j = j;
  this.k = k;
  this.walls = [true, true, true, true, true, true];
  this.wallLevels = [0, 0, 0, 0, 0, 0];
  this.visited = false;

  this.checkNeighbors = function() {
    var neighbors = [];

    var top    = grid[index(i, j -1, k)];
    var right  = grid[index(i+1, j, k)];
    var bottom = grid[index(i, j+1, k)];
    var left   = grid[index(i-1, j, k)];
    var up     = grid[index(i,   j, k-1)];
    var down   = grid[index(i  , j, k+1)];

    if (top && !top.visited) {
      neighbors.push(top);
    }
    if (right && !right.visited) {
      neighbors.push(right);
    }
    if (bottom && !bottom.visited) {
      neighbors.push(bottom);
    }
    if (left && !left.visited) {
      neighbors.push(left);
    }
    if (up && !up.visited) {
      neighbors.push(up);
    }
    if (down && !down.visited) {
      neighbors.push(down);
    }

    if (neighbors.length > 0) {
      var r = sketch.floor(sketch.random(0, neighbors.length));
      return neighbors[r];
    } else {
      return undefined;
    }


  }
  this.highlight = function() {
    var x = this.i*w;
    var y = this.j*w;
    var z = this.k*w;
    sketch.noStroke();
    sketch.fill(255, 100);
    sketch.push();
    sketch.translate(x+w/2, y+w/2, z-w/2);
    sketch.box(w);
    sketch.pop();
  }

  this.show = function() {
    var x = this.i*w;
    var y = this.j*w;
    var z = this.k*w;
    sketch.fill(255, 50);
    sketch.stroke(0, 100);
    // sketch.fill(255, 255);
    // sketch.noStroke();
    var wallTh = -1;//-w;
    var th = -w;
    if (this.wallLevels[0] > wallTh) {
      sketch.push();
      sketch.translate(x, y, z);
      sketch.translate(0, 0, this.wallLevels[0]);
      sketch.rotateX(-sketch.PI/2);
      sketch.rect(0, 0, w, w);
      sketch.pop();
      // sketch.line(x    , y    , z, x + w, y, z);
      if(this.walls[0] == false && this.wallLevels[0] > th) this.wallLevels[0]--;
    }
    if (this.wallLevels[1] > wallTh) {
      sketch.push();
      sketch.translate(x+w, y, z);
      sketch.translate(0, 0, this.wallLevels[1]);
      sketch.rotateY(sketch.PI/2);
      sketch.rect(0, 0, w, w);
      sketch.pop();
      // sketch.line(x + w, y    , z, x + w, y + w, z);
      if(this.walls[1] == false && this.wallLevels[1] > th) this.wallLevels[1]--;
    }
    if (this.wallLevels[2] > wallTh) {
      sketch.push();
      sketch.translate(x, y+w, z);
      sketch.translate(0, 0, this.wallLevels[2]);
      sketch.rotateX(-sketch.PI/2);
      sketch.rect(0, 0, w, w);
      sketch.pop();
      // sketch.line(x + w, y + w, z, x    , y + w, z);
      if(this.walls[2] == false && this.wallLevels[2] > th) this.wallLevels[2]--;
    }
    if (this.wallLevels[3] > wallTh) {
      sketch.push();
      sketch.translate(x, y, z);
      sketch.translate(0, 0, this.wallLevels[3]);
      sketch.rotateY(sketch.PI/2);
      sketch.rect(0, 0, w, w);
      sketch.pop();
      // sketch.line(x    , y + w, z, x    , y, z);
      if(this.walls[3] == false && this.wallLevels[3] > th) this.wallLevels[3]--;
    }
    if (this.wallLevels[4] > wallTh &&z==0) {
      sketch.push();
      sketch.translate(x, y, z);
      sketch.rect(0, 0, w, w);
      sketch.pop();
    }
    if (this.wallLevels[5] > wallTh) {
      sketch.push();
      // if(this.visited) sketch.fill(0);
      sketch.translate(x, y, z-w);
      sketch.rect(0, 0, w, w);
      sketch.pop();
    }

    if (this.visited) {
      // sketch.noStroke();
      // sketch.fill(0, 0, 0);
      // sketch.push();
      // sketch.translate(x, y, z);
      // sketch.box(w);
      // sketch.pop();
    }
  }
}
