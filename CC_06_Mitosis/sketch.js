// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/jxGS3fKPKJA

// instance mode by Naoto Hieda

var s = function (p) {

  var cells = [];

  p.setup = function () {
    p.createCanvas(700, 700);
    cells.push(new Cell());
    cells.push(new Cell());
  }

  p.draw = function () {
    p.background(200);
    for (var i = 0; i < cells.length; i++) {
      cells[i].move();
      cells[i].show();
    }
  }

  p.mousePressed = function () {
    for (var i = cells.length-1; i >= 0; i--) {
      if (cells[i].clicked(p.mouseX, p.mouseY)) {
        cells.push(cells[i].mitosis());
        cells.push(cells[i].mitosis());
        cells.splice(i, 1);
      }
    }
  }
};

var p006 = new p5(s);