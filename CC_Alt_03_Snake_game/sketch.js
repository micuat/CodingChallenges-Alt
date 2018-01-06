// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/AaGK-fj-BAM

// instance mode by Naoto Hieda

var sk = function (sketch) {

  var s;
  var scl = 20;

  var food;

  function Tile (sketch, j, i) {
    this.j = j;
    this.i = i;
    this.x = j * scl;
    this.y = i * scl;
    this.color = 255;
    this.pColor = 255;
    this.angle = 0;

    this.update = function () {
    }

    this.show = function () {
      var c = this.pColor / 8 * 7;
      c += tiles[(this.i+1)%tiles.length][this.j].pColor / 8 / 4;
      c += tiles[(this.i-1+tiles.length)%tiles.length][this.j].pColor / 8 / 4;
      c += tiles[this.i][(this.j+1)%tiles.length].pColor / 8 / 4;
      c += tiles[this.i][(this.j-1+tiles[i].length)%tiles.length].pColor / 8 / 4;
      this.color = c;
      this.color += 1;
      if(this.color > 255) this.color = 255;
      if(this.color < 0) this.color = 0;

      sketch.push();
      sketch.fill(255-this.color);
      sketch.translate(this.x + scl / 2, this.y + scl / 2);
      this.angle += (255-this.color) * 0.001;
      sketch.rotate(this.angle);
      sketch.rect(2 - scl/2, 2 - scl/2, scl - 4, scl - 4);
      sketch.pop();
      this.pColor = this.color;
    }
  }
  var tiles;

  sketch.setup = function () {
    sketch.createCanvas(600, 600);
    s = new Snake(sketch, scl);
    sketch.frameRate(60);
    sketch.pickLocation();

    tiles = [];

    for(var y = 0; y < sketch.height / scl; y++) {
      tiles[y] = [];
      for(var x = 0; x < sketch.width / scl; x ++) {
        tiles[y][x] = new Tile(sketch, x, y);
      }
    }
  }

  sketch.pickLocation = function () {
    var cols = sketch.floor(sketch.width / scl);
    var rows = sketch.floor(sketch.height / scl);
    food = sketch.createVector(sketch.floor(sketch.random(cols)), sketch.floor(sketch.random(rows)));
    food.mult(scl);
  }

  sketch.mousePressed = function () {
    s.toAdd = 5;
  }

  sketch.draw = function () {
    sketch.background(0);
    // sketch.stroke(0);
    sketch.noStroke();

    var j = food.x / scl;
    var i = food.y / scl;
    tiles[i][j].pColor = 0;
    tiles[i][j].color = 0;

    // for(var i = 0; i < tiles.length; i++) {
    //   for(var j = 0; j < tiles[i].length; j++) {
    //     tiles[i][j].update();
    //   }
    // }
    for(var i = 0; i < tiles.length; i++) {
      for(var j = 0; j < tiles[i].length; j++) {
        tiles[i][j].show();
      }
    }

    if (s.eat(food)) {
      sketch.pickLocation();
    }
    s.death();
    s.update(tiles);
    s.show();


    // sketch.fill(55, 0, 100);
    // sketch.rect(food.x, food.y, scl, scl);

  }

  sketch.keyPressed = function () {
    if (sketch.keyCode === sketch.UP_ARROW) {
      s.dir(0, -1);
    } else if (sketch.keyCode === sketch.DOWN_ARROW) {
      s.dir(0, 1);
    } else if (sketch.keyCode === sketch.RIGHT_ARROW) {
      s.dir(1, 0);
    } else if (sketch.keyCode === sketch.LEFT_ARROW) {
      s.dir(-1, 0);
    }
  }

};

var myp5 = new p5(sk);