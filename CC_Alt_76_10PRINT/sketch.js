// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// 10PRINT
// https://www.youtube.com/watch?v=bEyTZ5ZZxZs

// instance mode by Naoto Hieda

var x = 0;
var y = 0;
var spacing = 40;

var found = false;
var cur = '一'.charCodeAt(0);

var font;
var c = '田';
var index = 0;
var carray = ['田', '口', '日', '一', '子', '東', '車', '三'];

var s = function (p) {

  p.setup = function () {
    p.createCanvas(800, 800);
    p.background(0);

    p.printArray(Packages.processing.core.PFont.list());
    font = p.createFont('Meiryo', 46);
    p.textFont(font);
  }

  p.draw = function () {
    // p.stroke(255);

    if (found) {
      p.noStroke();

      for (let i = 0; i < 4; i++) {
        p.textSize(46); //田由　口古　日旦
        p.text(String.fromCharCode(c.charCodeAt(0) + 0.5 + p.random(1)), x - 3, y + spacing);
        x = x + spacing;
        if (x > p.width) {
          x = 0;
          y = y + spacing;
        }
        if (y > p.height - spacing) {
          // index = (index + 1) % carray.length;
          // c = carray[index];
          // p.background(0);
          x = 0;
          y = 0;
          found = false;
          cur++;
        }
      }
    }
    else {
      for (let k = 0; k < 10; k++) {
        c = String.fromCharCode(cur);
        p.background(0);
        p.textSize(46);
        x = y = 0;

        let w = 46;

        let dx = p.width / 2 - w;
        let dy = p.height / 2 - w;
        p.push();
        p.translate(dx, dy);
        p.text(String.fromCharCode(c.charCodeAt(0)), x - 3, y + spacing);
        p.text(String.fromCharCode(c.charCodeAt(0) + 1), x - 3 + spacing, y + spacing);
        p.pop();

        let total = 0;
        let totalwhite = 0;
        let d = 46;
        for (let i = 0; i < w; i++) {
          for (let j = 0; j < w; j++) {
            let leftc = p.get(j + dx, i + dy);
            let rightc = p.get(w + spacing - j + dx, i + dy);
            if (p.brightness(leftc) > 100 && p.brightness(rightc) > 100) total++;
            if (p.brightness(rightc) > 100) totalwhite++;
          }
        }
        if (total / totalwhite > 0.5) {
          found = true;
          p.background(0);
          break;
        }
        else {
          cur++;
        }
      }
      // print(c, total)
      // p.stroke(255);
      // p.line(p.mouseX, 0, p.mouseX, 100)
    }
  }

};

var myp5 = new p5(s);
