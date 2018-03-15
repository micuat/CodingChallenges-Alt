// Daniel Shiffman
// http://codingtra.in
// Butterfly Wings
// Video: [coming soon]

// instance mode by Naoto Hieda

var yoff = 0;

var s = function (sketch) {
  sketch.setup = function () {
    sketch.createCanvas(800, 800);
    sketch.background(0);
  }

  sketch.draw = function () {
    sketch.background(0, 5);
    sketch.translate(sketch.width / 2, sketch.height / 2);
    //rotate(PI / 2);

    sketch.stroke(255);
    sketch.fill(255, 10);
    sketch.strokeWeight(1);

    var da = sketch.PI / 300;
    var dx = 0.05;

    var xoff = 0;
    for (let i = 0; i < 3; i++) {
      sketch.push();
      let sc = sketch.map(i, 0, 2, 0.5, 1);
      sketch.scale(sc, sc);
      sketch.noStroke();
      sketch.beginShape();
      for (var a = 0; a <= sketch.TWO_PI; a += da) {
        let angle = a;
        var n = sketch.noise(xoff, yoff);
        var r = sketch.sin(2 * a) * sketch.map(n, 0, 1, 200, 400);
        if (0 <= a && a < sketch.PI / 2) angle += 0.2;
        else if (sketch.PI / 2 * 3 <= a && a < sketch.PI * 2) angle -= 0.2;
        else if (sketch.PI / 2 <= a && a < sketch.PI) { angle += 0.4; r *= 0.8; }
        else { angle -= 0.4; r *= 0.8; }
        var x = r * sketch.cos(angle);
        var y = r * sketch.sin(angle);
        if (a < sketch.PI) {
          xoff += dx;
        } else {
          xoff -= dx;
        }
        //point(x, y);
        sketch.vertex(x, y);
      }
      sketch.endShape();
      sketch.pop();
      yoff+=0.001;
    }
    // sketch.strokeWeight(2);
    // var xoff = 0;
    // for (var a = 0; a <= sketch.TWO_PI; a += da) {
    //   let angle = a;
    //   var n = sketch.noise(xoff, yoff+0.2);
    //   var r = sketch.sin(2 * a) * sketch.map(n, 0, 1, 200, 400);
    //   if(0 <= a && a < sketch.PI/2) angle += 0.2;
    //   else if(sketch.PI/2*3 <= a && a < sketch.PI*2) angle -= 0.2;
    //   else if(sketch.PI/2 <= a && a < sketch.PI) {angle += 0.4;r*=0.8;}
    //   else {angle -= 0.4;r*=0.8;}
    //   if (a < sketch.PI) {
    //     xoff += dx;
    //   } else {
    //     xoff -= dx;
    //   }
    //   sketch.stroke(0);
    //   // for(let i = 0; i < 3; i++) {
    //   //   let rr = r + sketch.random(-3, 3);
    //   //   var x = rr * sketch.cos(angle);
    //   //   var y = rr * sketch.sin(angle);
    //   //   sketch.point(x, y);
    //   // }
    //   sketch.stroke(0, 100);
    //   for(let i = 0; i < 1; i++) {
    //     let j = sketch.floor(sketch.random(4)) / 4;
    //     let rr = r * (sketch.randomGaussian() / 40 + j);
    //     var x = rr * sketch.cos(angle);
    //     var y = rr * sketch.sin(angle);
    //     sketch.point(x, y);
    //   }
    // }

    yoff += 0.002;
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
      if (a == 0) {
        for (let i = 0; i < itr; i++) {
          let p = i / itr;
          p = sketch.sqrt(p);
          let px = p * x;
          let py = p * p * y;
          sketch.vertex(px, py);
        }
      }
      else if (a >= sketch.TWO_PI - da) {
        for (let i = itr - 1; i >= 0; i--) {
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
        if (stripe != 0) {
          p = parseInt(i / itr * stripe) / stripe + sketch.randomGaussian() / 7 / stripe;//sketch.random(sketch.PI*2);
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