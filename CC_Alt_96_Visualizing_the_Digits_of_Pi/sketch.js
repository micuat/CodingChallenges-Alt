// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// Visualizing the Digits of Pi
// https://youtu.be/WEd_UIKG-uc

// instance mode by Naoto Hieda

var pi;
var digits;

var s = function (p) {

  let counts = new Array(10);
  let index = 100;

  p.setup = function () {
    p.createCanvas(800, 800);

    if (pi == undefined) {
      digits = [];
      pi = p.loadStrings("../CC_96_Visualizing_the_Digits_of_Pi/pi-1million.txt")[0];

      //println(pi.length());
      let sdigits = pi.split("");

      print(sdigits.length);
      for (let i in sdigits) {
        digits.push(parseInt(sdigits[i]));
      }
    }

    // printArray(digits);
    // p.background(0);
    // p.stroke(255);
    // p.noFill();
    // p.translate(p.width / 2, p.height / 2);
    // p.ellipse(0, 0, 700, 700);
  }

  let angle = 0;
  let digit;
  let nextDigit;
  let tween = 0;

  p.draw = function () {

    p.background(0);
    p.translate(p.width / 2, p.height / 2);
    p.rotateX(p.PI / 6);

    // p.rotate(p.PI);

    if (digit === undefined || Math.abs(angle - digit / 10 * p.TWO_PI) < 0.02) {
      print(digit + "->" + digits[index]);
      digit = digits[index];
      nextDigit = digits[index + 1];
      index++;
      tween = 0;
    }
    else {
      tween++;
    }
    angle = p.lerp(angle, digit / 10 * p.TWO_PI, 0.05);
    // angle = digit / 10 * p.TWO_PI;

    p.textSize(64);
    p.textAlign(p.CENTER, p.CENTER);
    p.fill(255)
    p.translate(0,0,1);
    let str = digits.slice(index-9, index-1).join(" ") + "                           ";
    let x = 0;
    if(tween < 10) x = p.map(tween, 0, 10, 64, 0);
    p.text(str, x, -300+30)

    str = digits.slice(index-28, index-9).join(" ");
    x = 0;
    if(tween < 10) x = p.map(tween, 0, 10, 64, 0);
    p.text(str, x, -300+30-70)

    str = digits.slice(index-47, index-28).join(" ");
    x = 0;
    if(tween < 10) x = p.map(tween, 0, 10, 64, 0);
    p.text(str, x, -300+30-70-70)

    str = digits.slice(index-47-19, index-47).join(" ");
    x = 0;
    if(tween < 10) x = p.map(tween, 0, 10, 64, 0);
    p.text(str, x, -300+30-70-70-70)

    str = digits.slice(index-47-19, index-47).join(" ");
    x = 0;
    if(tween < 10) x = p.map(tween, 0, 10, 64, 0);
    p.text(str, x, -300+30-70-70-70)

    str = digits.slice(index-47-19-19-2, index-47-19).join(" ");
    x = 0;
    if(tween < 10) x = p.map(tween, 0, 10, 64, 0);
    p.text(str, x, -300+30-70-70-70-70)

    p.translate(0,0,-1);

    p.rotate(-angle);
    for (let i = 0; i < 10; i++) {
      p.push();
      if (i == digit) {
        p.fill(255);
        p.translate(0,0,1);
      }
      else {
        p.fill(128);
      }
      p.text(p.nf(i), 0, -300 + 30);
      p.pop();
      p.rotate(1 / 10 * p.TWO_PI);
    }

    p.translate(0, 0, -1);
    p.pointLight(255, 255, 255, 0, 50, 30);
    p.noStroke();
    p.fill(150);
    p.ellipse(0, 0, 600, 600);


    // let diff = 0;//p.TWO_PI / 10;

    // let a1 = p.map(digit + index * 0.001, 0, 10, 0, p.TWO_PI) + p.random(-diff, diff);
    // let a2 = p.map(nextDigit + index * 0.001, 0, 10, 0, p.TWO_PI) + p.random(-diff, diff);

    // let x1 = 350 * p.cos(a1);
    // let y1 = 350 * p.sin(a1);

    // let x2 = 350 * p.cos(a2);
    // let y2 = 350 * p.sin(a2);

    // p.stroke(255, 50);
    // //p.line(x1, y1, x2, y2);
    // let n = 2;
    // p.bezier(x1, y1, x1/n, y1/n, x2/n, y2/n, x2, y2);

  }
};

var myp5 = new p5(s);
