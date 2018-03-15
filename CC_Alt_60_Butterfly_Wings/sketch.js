// Daniel Shiffman
// http://codingtra.in
// Butterfly Wings
// Video: [coming soon]

// instance mode by Naoto Hieda

var yoff = 0;

var s = function (sketch) {
  sketch.setup = function () {
    sketch.createCanvas(800, 800);
  }

  sketch.draw = function () {
    sketch.background(0);
    sketch.translate(sketch.width / 2, sketch.height / 2);

    sketch.stroke(255);
    sketch.fill(255, 150);
    sketch.strokeWeight(1);

    sketch.translate(0, -100);

    sketch.push();
    sketch.scale(1, sketch.map(sketch.cos(sketch.millis() * 0.002), -1, 1, 0.5, 1));
    sketch.rotate(0.2);
    sketch.drawWing(10, 2, 50, 30, 100, 400);
    sketch.rotate(-0.4);
    sketch.scale(-1, 1);
    sketch.drawWing(10, 2, 50, 30, 100, 400);
    sketch.pop();
    yoff += 0.04;

    sketch.push();
    sketch.scale(sketch.map(sketch.sin(sketch.millis() * 0.001 + sketch.PI/2), -1, 1, 0.5, 1), 1);
    sketch.rotate(-0.1);
    sketch.drawWing(10, 6, 20, 0, 200, 450);
    sketch.rotate(0.2);
    sketch.scale(-1, 1);
    sketch.drawWing(10, 6, 20, 0, 200, 450);
    sketch.pop();

    // let da = sketch.PI / 200;
    // let dx = 0.05;
    // for (let a = 0; a <= sketch.TWO_PI; a += da) {
    //   let r = 50;
    //   let x = r * sketch.cos(a) / 4;
    //   let y = r * sketch.sin(a);
    //   for (let i = 0; i < 5; i++) {
    //     let p = sketch.random(1) + i / 5;
    //     let px = p * x;
    //     let py = p * y + 60;
    //     sketch.point(px, py);
    //   }
    // }

    yoff += 0.04;
  }

  sketch.drawWing = function (itr, stripe, x1, x2, f1, f2) {
    var da = sketch.PI / 100;
    var dx = 0.05;

    var xoff = 0;
    sketch.beginShape();
    sketch.noStroke();
    for (var a = 0; a <= sketch.TWO_PI; a += da) {
      var n = sketch.noise(xoff, yoff);
      var r = sketch.map(n, 0, 1, f1, f2);
      // var x = r * sketch.cos(a);
      // var y = r * sketch.sin(a);
      let x = a * x1 + x2;
      let y = r;
      if (a < sketch.PI) {
        xoff += dx;
      } else {
        xoff -= dx;
      }
      if(a == 0) {
        for (let i = 0; i < itr; i++) {
          let p = i / itr;
          p = sketch.sqrt(p);
          let px = p * x;
          let py = p * p * y;
          sketch.vertex(px, py);
        }
      }
      else if(a >= sketch.TWO_PI-da) {
        for (let i = itr-1; i >= 0; i--) {
          let p = i / itr;
          p = sketch.sqrt(p);
          let px = p * x;
          let py = p * p * y;
          sketch.vertex(px, py);
        }
      }
      else {
        let p = 1;
        p = sketch.sqrt(p);
        let px = p * x;
        let py = p * p * y;
        sketch.vertex(px, py);
      }
    }
    sketch.endShape();

    sketch.strokeWeight(2);
    sketch.stroke(0, 200);
    for (var a = 0; a <= sketch.TWO_PI; a += da) {
      var n = sketch.noise(xoff, yoff);
      var r = sketch.map(n, 0, 1, f1, f2);
      // var x = r * sketch.cos(a);
      // var y = r * sketch.sin(a);
      let x = a * x1 + x2;
      let y = r;
      if (a < sketch.PI) {
        xoff += dx;
      } else {
        xoff -= dx;
      }
      for (let i = 0; i < itr; i++) {
        let p = 0;
        if(stripe != 0) {
          p = parseInt(i/itr*stripe)/stripe + sketch.randomGaussian()/7/stripe;//sketch.random(sketch.PI*2);
        }
        else {
          p = sketch.random(1);
        }
        p = sketch.sqrt(p);
        // let px = sketch.lerp(x, 0, p);
        // let py = sketch.lerp(y, 0, p);
        let px = p * x;
        let py = p * p * y;
        sketch.point(px, py);
      }
      // sketch.point(x, y);
    }
  }
};

var myp5 = new p5(s);