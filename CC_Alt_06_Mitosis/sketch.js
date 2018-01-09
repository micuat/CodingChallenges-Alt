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
    sketch.background(0);
    for (var i = 0; i < cells.length; i++) {
      cells[i].move();
      cells[i].show();
    }
  }

  sketch.mouseMoved = function () {
    for (var i = cells.length-1; i >= 0; i--) {
      if (cells[i].clicked(sketch.mouseX, sketch.mouseY)) {
        var c = cells[i].mitosis();
        for(var j in c)
          cells.push(c[j]);
        cells.splice(i, 1);
      }
    }
  }
};

var myp5 = new p5(s);