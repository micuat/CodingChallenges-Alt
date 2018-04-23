// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// Visualizing the Digits of Pi
// https://youtu.be/WEd_UIKG-uc

// instance mode by Naoto Hieda

var s = function (p) {

  let pi;
  let digits = [];
  let counts = new Array(10);
  let index = 0;

  p.setup = function () {
    p.createCanvas(420, 420);
    pi = p.loadStrings("../CC_96_Visualizing_the_Digits_of_Pi/pi-1million.txt")[0];

    //println(pi.length());
    let sdigits = pi.split("");

    print(sdigits.length);
    for(let i in sdigits) {
      digits.push(parseInt(sdigits[i]));
    }

    // printArray(digits);
    p.background(0);
    p.stroke(255);
    p.noFill();
    p.translate(p.width / 2, p.height / 2);
    p.ellipse(0, 0, 400, 400);
  }

  p.draw = function () {

    p.translate(p.width / 2, p.height / 2);

    let digit = digits[index];
    let nextDigit = digits[index + 1];
    index++;

    let diff = p.TWO_PI / 10;

    let a1 = p.map(digit, 0, 10, 0, p.TWO_PI) + p.random(-diff, diff);
    let a2 = p.map(nextDigit, 0, 10, 0, p.TWO_PI) + p.random(-diff, diff);

    let x1 = 200 * p.cos(a1);
    let y1 = 200 * p.sin(a1);

    let x2 = 200 * p.cos(a2);
    let y2 = 200 * p.sin(a2);

    p.stroke(255, 50);
    p.line(x1, y1, x2, y2);

  }
};

var myp5 = new p5(s);
