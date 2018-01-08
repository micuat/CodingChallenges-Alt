// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/jxGS3fKPKJA

// instance mode by Naoto Hieda

var s = function (sketch) {

  var cells = [];

  sketch.setup = function () {
    sketch.createCanvas(700, 700);
    cells.push(new Cell(sketch));
    cells.push(new Cell(sketch));
  }

  sketch.draw = function () {
    sketch.background(200);
    for (var i = 0; i < cells.length; i++) {
      cells[i].move();
      cells[i].show();
    }
  }

  sketch.mousePressed = function () {
    for (var i = cells.length-1; i >= 0; i--) {
      if (cells[i].clicked(sketch.mouseX, sketch.mouseY)) {
        cells.push(cells[i].mitosis());
        cells.push(cells[i].mitosis());
        cells.splice(i, 1);
      }
    }
  }
};

var myp5 = new p5(s);