// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/17WoOqgXsRM

// instance mode by Naoto Hieda

var shader;
var magtex;

var s = function (p) {

  var stars = [];

  var speed;

  p.setup = function () {
    p.createCanvas(800, 800);
    for (var i = 0; i < 300; i++) {
      stars[i] = new Star();
    }
    shader = p.loadShader(p.sketchPath("../CC_Alt2_01_StarField/frag.glsl"),
      p.sketchPath("../CC_Alt2_01_StarField/vert.glsl"));
    magtex = p.loadImage("../CC_Alt2_01_StarField/magnesite.jpg");
  }

  let cur = 0;

  p.draw = function () {

    p.blendMode(p.BLEND);
    let shape = p.createShape();
    let total = 32;
    let totali = 8;
    let r = 5;
    let tm = p.millis() * 0.001;
    for (let i = 0; i < totali; i++) {
      shape.beginShape(p.TRIANGLE_STRIP);
      for (let j = 0; j < total + 1; j++) {
        // if(i*totali + j < cur || cur+15 < i*totali + j) continue;
        let t = p.map(Math.sin(tm + i * 0.01), -1, 1, 2, 8);
        let lat = p.map(i, 0, totali, -p.HALF_PI, p.HALF_PI);
        let lon = p.map(j, 0, total, -p.PI, p.PI);
        let r1 = p.constrain(p.map(Math.sin(lon * t), -1, 1, 0.2, 1.5), 0.2, 1);
        let x = Math.cos(lon) * Math.cos(lat) * r * r1;
        let y = Math.sin(lon) * Math.cos(lat) * r * r1;
        let z = Math.sin(lat) * r * p.map(r1, 0.2, 1, 1, 0.5);
        shape.normal(Math.cos(lon) * Math.cos(lon * t) * t - Math.sin(lon) * Math.sin(lon * t),
          Math.sin(lon) * Math.cos(lon * t) * t + Math.cos(lon) * Math.sin(lon * t),
          0);
        shape.vertex(x, y, z);

        t = p.map(Math.sin(tm + (i+1) * 0.01), -1, 1, 2, 8);
        r1 = p.constrain(p.map(Math.sin(lon * t), -1, 1, 0.2, 1.5), 0.2, 1);
        lat = p.map(i + 1, 0, totali, -p.HALF_PI, p.HALF_PI);
        x = Math.cos(lon) * Math.cos(lat) * r * r1;
        y = Math.sin(lon) * Math.cos(lat) * r * r1;
        z = Math.sin(lat) * r * p.map(r1, 0.2, 1, 1, 0.5);
        shape.vertex(x, y, z);
        shape.normal(Math.cos(lon) * Math.cos(lon * t) * t - Math.sin(lon) * Math.sin(lon * t),
          Math.sin(lon) * Math.cos(lon * t) * t + Math.cos(lon) * Math.sin(lon * t),
          0);
      }
      shape.endShape();
    }
    cur = (cur + 1) % (total * totali)/2;
    // shape.enableStyle();
    // shape.setStroke(p.color(0,0,0,0));
    // shape.setFill(p.color(255));
    shape.disableStyle();

    // p.directionalLight(255, 100, 100, 0, 0, -1);
    if (p.frameCount % 120 == 0) {
      shader = p.loadShader(p.sketchPath("../CC_Alt2_01_StarField/frag.glsl"),
        p.sketchPath("../CC_Alt2_01_StarField/vert.glsl"));
    }
    // shader.set("tex", magtex);

    // p.lights();
    p.shader(shader);

    speed = 10;
    // if(p.frameCount % 240 < 60)
    p.background(0);
    p.translate(p.width / 2, p.height / 2);
    p.directionalLight(255, 255, 255, 0.5, 0.5, -1);
    for (var i = 0; i < stars.length; i++) {
      stars[i].update(speed);
      stars[i].show(shape);
    }
  };
};

var p001 = new p5(s);
