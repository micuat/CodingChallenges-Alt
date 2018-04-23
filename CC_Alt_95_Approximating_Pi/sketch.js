// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// Approximating Pi
// https://youtu.be/5cNnf_7e92Q

// instance mode by Naoto Hieda

var s = function (p) {

  let r = 400;

  let total;
  let circle;

  let recordPI;

  let pg;
  let nr;

  let startFrame;
  let b = 150;

  p.setup = function () {
    p.createCanvas(800, 800);

    pg = p.createGraphics(800, 800);
    pg.beginDraw();
    pg.background(0);
    pg.endDraw();

    total = 0;
    circle = 0;
  
    recordPI = 0;
    nr = r * 2;

    b = b<150?150:0;

    startFrame = p.frameCount;
  }

  p.draw = function () {
    if(p.frameCount - startFrame >= p.width/8) p.setup();


    p.background(0);

    for (let i = 0; i < 32; i++) {
      let x = ((p.frameCount - startFrame)*8+i/4) % p.width - p.width/2//p.random(-r, r);
      if(b>0) x = -x;
      let y = p.random(-r, r);
      total++;

      let d = x * x + y * y;
      if (d < r * r) {
        circle++;
        pg.stroke(255, x/4, b);
      } else {
        pg.stroke(255, 255-x/4, b);
      }
      pg.beginDraw();
      pg.translate(p.width / 2, p.height / 2);
      pg.strokeWeight(5);
      pg.point(x, y);
      pg.endDraw();

      let pi = 4 * (circle / total);
      let recordDiff = Math.abs(Math.PI - recordPI);
      let diff = Math.abs(Math.PI - pi);
      if (diff < recordDiff) {
        recordDiff = diff;
        recordPI = pi;
        print(recordPI);
      }
    }

    p.image(pg, 0, 0);

    p.push();
    p.translate(p.width / 2, p.height / 2);
    p.stroke(255);
    p.strokeWeight(5);
    p.noFill();
    nr = p.lerp(nr, r * 2 / Math.PI * recordPI, 0.1);
    // p.ellipse(0, 0, nr);
    for(let i = 0; i < 128; i++) {
      p.point(nr/2, 0);
      p.rotate(Math.PI / 128 * 2);
    }
    // p.rectMode(p.CENTER);
    // p.rect(0, 0, r * 2, r * 2);
    p.pop();
  }

};

var myp5 = new p5(s);
