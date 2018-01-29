// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/RkuBWEkBrZA

// instance mode by Naoto Hieda

var s = function (sketch) {

  var cam;
  var globe = [];
  var total = 75;
  var hu = [0, 0, 0];
  var step = [1, 1, 1];
  
  sketch.setup = function () {
    sketch.createCanvas(800, 800, sketch.WEBGL);
    sketch.colorMode(sketch.RGB);
  }

  sketch.draw = function () {
    sketch.background(0);
    sketch.noStroke();
    sketch.rotateY(sketch.millis() * 0.0001);
    sketch.rotateX(sketch.PI / 3);

    if(sketch.millis() * 0.001 % 3   < 2.75) {
      step[0] = step[0] * 0.9 + 1 * 0.1;
    }
    else {
      step[0] = step[0] * 0.9 + -10 * 0.1;
    }
    step[1] = step[1] * 0.95 + step[0] * 0.05;
    step[2] = step[2] * 0.95 + step[1] * 0.05;
    sketch.drawSphere(280, hu[2], 1);
    sketch.drawSphere(300, hu[1], -2);
    sketch.drawSphere(320, hu[0], 1);
    for(let i = 0; i < 3; i++) {
      hu[i] += step[i];
    }
  }

  sketch.drawSphere = function (r, h, step) {
    for (let i = 0; i < total+1; i++) {
      let lat = sketch.map(i, 0, total, 0, sketch.PI);
      globe[i] = [];
      for (let j = 0; j < total+1; j++) {
        let lon = sketch.map(j, 0, total, 0, sketch.TWO_PI);
        let x = r * sketch.sin(lat) * sketch.cos(lon);
        let y = r * sketch.sin(lat) * sketch.sin(lon);
        let z = r * sketch.cos(lat);
        globe[i][j] = new p5.Vector(x, y, z);
      }
    }
  
    for (let i = 0; i < total; i++) {
      sketch.beginShape(sketch.TRIANGLE_STRIP);
      for (let j = 0; j < total+1; j++) {
        sketch.fill((h % 255 - 240) * 20, 100);
        let v1 = globe[i][j];
        sketch.vertex(v1.x, v1.y, v1.z);
        let v2 = globe[i+1][j];
        sketch.vertex(v2.x, v2.y, v2.z);
        h += step;
      }
      sketch.endShape();
    }
  }

};

var myp5 = new p5(s);
