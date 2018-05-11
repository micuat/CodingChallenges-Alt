// instance mode by Naoto Hieda

var shader;

var s = function (p) {

  p.setup = function () {
    p.createCanvas(800, 800);
    shader = p.loadShader(p.sketchPath("../CC_Alt2_25_SphereGeometry/frag.glsl"));
  }

  p.draw = function () {
    if (p.frameCount % 120 == 0) {
      shader = p.loadShader(p.sketchPath("../CC_Alt2_25_SphereGeometry/frag.glsl"));
    }

    let t = p.millis() * 0.001;
    let tpi = t * p.PI;
    p.background(0);

    shader.set("iTime", t);
    let m = p.map(Math.sin(tpi * 0.25), -1, 1, 0, 12);
    let n2 = p.map(Math.sin(tpi * 0.125), -1, 1, 1, 12);
    shader.set("S1", m, 5.0, 12.0, 2.0);
    shader.set("S2", m, 1.0, 1.0, 1.0);

    let x = Math.cos(tpi * 0.125) * 3.0;
    let y = 0.5;
    let z = Math.sin(tpi * 0.125) * 3.0;
    shader.set("cameraPosition", x, y, z);

    let pg = 0.0;
    let dg = 1.0;
    let itr = 32.0;
    if ((t - 0.5) % 8 < 1 && p.frameCount % 2 < 1) {
      // itr = 8.0;
      // pg = 1.0;
    }
    else if ((t - 2.5) % 4 < 2) {
      dg = 0.075;
    }
    shader.set("iteration", itr);
    shader.set("phiGlitch", pg);
    shader.set("dGlitch", dg);
    p.filter(shader);
  }

};

var p026 = new p5(s);