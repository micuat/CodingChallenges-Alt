// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for this video: https://youtu.be/Cl_Gjj80gPE

// instance mode by Naoto Hieda

var yoff = 0.0;
var points = [];

var s = function (sketch) {
  sketch.setup = function () {
    sketch.createCanvas(800, 800);
    sketch.noiseDetail(1,0.5);
    let xoff = 0;
    for (let a = 0; a < 1; a += 0.005) {
      points.push({ x: 0, y: 0, r: 0, next: null });
    }
    for (let i = 0; i < points.length; i++) {
      points[i].next = points[i + 1];
    }
    points[points.length - 1].next = points[0];
  }

  sketch.draw = function () {
    sketch.background(0);

    sketch.translate(sketch.width / 2, sketch.height / 2);

    let radius = 300;

    let xoff = 0;
    // let opoints = points.slice();
    let l = points.length;
    for (let i = 0; i < points.length; i++) {
      let ppn = sketch.map(sketch.noise(xoff, yoff), 0, 1, -25, 25) * 2;
      if (i == l - 1) {
        ppn = ppn * 0.5 + 0.5 * sketch.map(sketch.noise(0, yoff), 0, 1, -25, 25);
      }
      // let pn = ppn * 0.5 + opoints[(i-1+l)%l] * 0.25 + opoints[(i+1)%l] * 0.25;
      // let po = opoints[i] * 0.5 + opoints[(i-1+l)%l] * 0.25 + opoints[(i+1)%l] * 0.25;
      // points[i] = sketch.lerp(po, pn, 0.5);
      // let offset = points[i];
      let offset = ppn;
      let r = radius + offset * 1;
      let x = r * sketch.cos(i / points.length * sketch.TWO_PI);
      let y = r * sketch.sin(i / points.length * sketch.TWO_PI);
      points[i].x = x;
      points[i].y = y;
      points[i].r = offset;
      xoff += 0.1;
    }
    // sketch.noFill();
    // sketch.stroke(255);
    sketch.noStroke();
    sketch.colorMode(sketch.HSB);
    for (let i = 0; i < points.length; i++) {
      for (let j = 0; j < 8; j++) {
        let p = sketch.map(j, 0, 8, 1, 0.8);
        let s = 255 - j * 36;// * (2+sketch.cos(0.4 + i / points.length * sketch.TWO_PI));
        sketch.fill(points[i].r*2 + 200, s, j * 50, 255);
        sketch.beginShape();
        sketch.vertex(0, 0);
        sketch.vertex(points[i].x * p, points[i].y * p);
        sketch.vertex(points[i].next.x * p, points[i].next.y * p);
        sketch.vertex(0, 0);
        sketch.endShape();
      }
    }
    if(sketch.millis() * 0.001 % 4 < 0.75) {
      yoff += 0.2;
    }
    else {
      yoff += 0.05;
    }
    
  }

};

var myp5 = new p5(s);

