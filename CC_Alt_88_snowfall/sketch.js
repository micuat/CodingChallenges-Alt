// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// Snowfall
// Edited Video: https://youtu.be/cl-mHFCGzYk

// instance mode by Naoto Hieda

var snow = [];
var gravity, inv_gravity;

var zOff = 0;


var spritesheet;
var textures = [];

var s = function (p) {

  p.preload = function () {
    if (p.isLiveJs) {
      spritesheet = p.loadImage('../CC_88_snowfall/flakes32.png');
    }
    else {
      spritesheet = p.loadImage('flakes32.png');
    }
  }


  p.setup = function () {
    if (p.isLiveJs) {
      p.createCanvas(800, 800);
    }
    else {
      p.createCanvas(p.windowWidth, p.windowHeight);
    }
    gravity = p.createVector(0, 0.3);
    inv_gravity = p.createVector(0, -0.3);
    for (let x = 0; x < spritesheet.width; x += 32) {
      for (let y = 0; y < spritesheet.height; y += 32) {
        let img = spritesheet.get(x, y, 32, 32);
        p.image(img, x, y);
        textures.push(img);
      }
    }


    for (let i = 0; i < 2000; i++) {
      let x = p.random(p.width);
      let y = p.random(p.height);
      let design = p.random(textures);
      snow.push(new Snowflake(x, y, design));
    }
  }
var angle = 0;
  p.draw = function () {
    p.background(0);
    //snow.push(new Snowflake());

    zOff += 0.1;

    let frame = p.frameCount % 540;
    if(frame < 90) angle = p.lerp(angle, 0, 0.1);
    else if(270 <= frame && frame < 270+90) angle = p.lerp(angle, p.PI, 0.1);
    p.translate(p.width / 2, p.height / 2);
    p.rotate(angle);

    p.push();
    p.noFill();
    p.stroke(255);
    p.box(p.width);
    p.pop();

    p.translate(-p.width / 2, -p.height / 2);

    let new_gravity = gravity.copy();
    new_gravity.rotate(angle);
    for (let i in snow) {
      let flake = snow[i];
      let xOff = flake.pos.x / p.width;
      let yOff = flake.pos.y / p.height;
      let wAngle = p.noise(xOff, yOff, zOff) * p.TWO_PI * 0;
      let wind = p5.Vector.fromAngle(wAngle);
      wind.mult(0.1);

      flake.applyForce(new_gravity);
      flake.applyForce(wind);
      flake.update(0.3);
      flake.render();
    }

    // for (let i = snow.length - 1; i >= 0; i--) {
    //   if (snow[i].offScreen()) {
    //     snow.splice(i, 1);
    //   }
    // }

  }
};

var myp5 = new p5(s);
