// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/RkuBWEkBrZA

// instance mode by Naoto Hieda

var s = function (p) {

  let cam;
  let globe = [];
  let total = 75;
  
  p.setup = function () {
    if(p.isLiveJs) {
      cam = new Packages.peasy.PeasyCam(pApplet.that, 500);
      p.createCanvas(600, 600);
    }
    else {
      p.createCanvas(600, 600, p.WEBGL);
    }
    p.colorMode(p.HSB);
  }

  p.draw = function () {
    p.background(0);
    p.noStroke();
    if(p.isLiveJs) {
      p.lights();
    }
    else {
      p.rotateY(p.map(p.mouseX, 0, p.width, -p.HALF_PI, p.HALF_PI));
      p.rotateX(p.map(p.mouseY, 0, p.height, -p.HALF_PI, p.HALF_PI));
    }
    let r = 200;
    for (let i = 0; i < total+1; i++) {
      let lat = p.map(i, 0, total, 0, p.PI);
      globe[i] = [];
      for (let j = 0; j < total+1; j++) {
        let lon = p.map(j, 0, total, 0, p.TWO_PI);
        let x = r * p.sin(lat) * p.cos(lon);
        let y = r * p.sin(lat) * p.sin(lon);
        let z = r * p.cos(lat);
        globe[i][j] = new p5.Vector(x, y, z);
      }
    }
  
    for (let i = 0; i < total; i++) {
      let hu = p.map(i, 0, total, 0, 255*6);
      p.fill(hu % 255, 255, 255);
      p.beginShape(p.TRIANGLE_STRIP);
      for (let j = 0; j < total+1; j++) {
        let v1 = globe[i][j];
        p.vertex(v1.x, v1.y, v1.z);
        let v2 = globe[i+1][j];
        p.vertex(v2.x, v2.y, v2.z);
      }
      p.endShape();
    }
  }

};

var p025 = new p5(s);
