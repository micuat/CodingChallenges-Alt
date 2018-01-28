// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/RkuBWEkBrZA

// instance mode by Naoto Hieda

var s = function (sketch) {

  var cam;
  var globe = [];
  var total = 75;
  
  sketch.setup = function () {
    sketch.createCanvas(600, 600);
    cam = new Packages.peasy.PeasyCam(pApplet.that, 500);
    sketch.colorMode(sketch.HSB);
  }

  sketch.draw = function () {
    sketch.background(0);
    sketch.noStroke();
    sketch.lights();
    let r = 200;
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
      let hu = sketch.map(i, 0, total, 0, 255*6);
      sketch.fill(hu % 255, 255, 255);
      sketch.beginShape(sketch.TRIANGLE_STRIP);
      for (let j = 0; j < total+1; j++) {
        let v1 = globe[i][j];
        sketch.vertex(v1.x, v1.y, v1.z);
        let v2 = globe[i+1][j];
        sketch.vertex(v2.x, v2.y, v2.z);
      }
      sketch.endShape();
    }
  }

};

var myp5 = new p5(s);
