// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for this video: https://youtu.be/LG8ZK-rRkXo

// instance mode by Naoto Hieda

var shader;

var s = function (p) {

  let a = 0;

  p.setup = function () {
    p.createCanvas(800, 800);
    shader = p.loadShader(p.sketchPath("../CC_Alt2_02_MengerSponge/frag.glsl"));
  }

  p.draw = function () {
    if (p.frameCount % 120 == 0) {
      // shader = p.loadShader(p.sketchPath("../CC_Alt2_02_MengerSponge/frag.glsl"));
    }
    let t = p.millis() * 0.001;
    shader.set("iResolution", p.width, p.height);
    shader.set("iMouse", p.mouseX, p.mouseY);
    shader.set("iTime", t);
    let m = p.floor(t % 12);
    if(m < 6) {
      shader.set("mtween", p.map((t % 1), 0, 1, 0.5, 1));
    }
    else {
      shader.set("mtween", p.map((t % 1), 0, 1, 1, 0.5));
      m = 12 - m;
    }
    shader.set("mscale", 0.0 + m);
    // shader.set("mscale", 2.0);


    p.background(0);
    // p.rotateX(a);
    // p.rotateY(a * 0.4);
    // p.rotateZ(a * 0.1);
    p.rect(0, 0, p.width, p.height);
    p.filter(shader);
    a += 0.01;
  }
};

var p002 = new p5(s);