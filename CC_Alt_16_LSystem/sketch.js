// Coding Rainbow
// Daniel Shiffman
// http://patreon.com/codingtrain
// Code for: https://youtu.be/E1B4UoSQMFw

// variables: A B
// axiom: A
// rules: (A → AB), (B → A)

// instance mode by Naoto Hieda

var angle;
var axiom = "F";
var sentence = axiom;
var len = 150;

var rules = [];
rules[0] = {
  a: "F",
  // b: "FF+[+F-F-F]-[-F+F+F]"
  b: "FF[+G-F-F-]"
}

var s = function (sketch) {

  sketch.generate = function () {
    len *= 0.5;
    var nextSentence = "";
    for (var i = 0; i < sentence.length; i++) {
      var current = sentence.charAt(i);
      var found = false;
      for (var j = 0; j < rules.length; j++) {
        if (current == rules[j].a) {
          found = true;
          nextSentence += rules[j].b;
          break;
        }
      }
      if (!found) {
        nextSentence += current;
      }
    }
    sentence = nextSentence;
    // sketch.createP(sentence);
    sketch.turtle();

  }

  sketch.turtle = function () {
    sketch.background(0);
    // sketch.resetMatrix();
    sketch.translate(sketch.width / 2, sketch.height);
    // sketch.stroke(255, 100);
    sketch.noStroke();
    sketch.fill(255, 100);
    for (var i = 0; i < sentence.length; i++) {
      var current = sentence.charAt(i);

      if (current == "F" || current == "G") {
        // sketch.line(0, 0, 0, -len);
        var d = sketch.sin(sketch.millis() * 0.001) * 5 + 5;
        d = parseInt(d);
        sketch.rect(0, d * len/9, -len, -len);
        sketch.translate(0, -len);
      } else if (current == "+") {
        sketch.rotate(angle);// + sketch.random(-0.01, 0.01));
      } else if (current == "-") {
        sketch.rotate(-angle);// + sketch.random(-0.01, 0.01))
      } else if (current == "[") {
        sketch.push();
      } else if (current == "]") {
        sketch.pop();
      }
    }
  }

  sketch.setup = function () {
    sketch.createCanvas(400, 400);
    angle = sketch.radians(25);
    sketch.background(0);
    // sketch.createP(axiom);
    sketch.turtle();
  }

  sketch.draw = function () {
    //angle = sketch.millis() / 1000;
    angle = sketch.PI / 2;
    sketch.turtle();
  }

  sketch.mousePressed = function () {
    sketch.generate();
    console.log(sentence);
  }

};

var myp5 = new p5(s);
