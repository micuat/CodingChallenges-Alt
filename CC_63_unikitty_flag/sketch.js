// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// 1) https://youtu.be/jrk_lOg_pVA
// 2) https://youtu.be/JunJzIe0hEo
// 3) https://youtu.be/FeXnJSCFj-Q

// instance mode by Naoto Hieda

var unikitty;

var res = 1;
var cols = 40 / res;
var rows = 40 / res;

var particles;
var springs;

var w = 10 * res;
var zoff = 0;

var physics;
var particles;
var springs;

var s = function (sketch) {

  sketch.setup = function () {
    sketch.createCanvas(800, 800);

    particles = [];
    particles = particles;

    springs = [];
    springs = springs;

    gravity = new Packages.toxi.geom.Vec3D(0, 0.5, 0);
    physics = new Packages.toxi.physics3d.VerletPhysics3D();
    physics = physics;
    gb = new Packages.toxi.physics3d.behaviors.GravityBehavior3D(gravity);
    physics.addBehavior(gb);

    let x = -cols * w / 2 - 100;
    for (let i = 0; i < cols; i++) {
      particles[i] = [];
      let y = -rows * w / 2;
      for (let j = 0; j < rows; j++) {
        let p = new Particle(sketch, x, y, 0);
        particles[i][j] = p;
        physics.addParticle(p.get());
        y = y + w;
      }
      x = x + w;
    }

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        let a = particles[i][j];
        if (i != cols - 1) {
          let b1 = particles[i + 1][j];
          let s1 = new Spring(sketch, a.get(), b1.get());
          springs.push(s1);
          physics.addSpring(s1.get());
        }
        if (j != rows - 1) {
          let b2 = particles[i][j + 1];
          let s2 = new Spring(sketch, a.get(), b2.get());
          springs.push(s2);
          physics.addSpring(s2.get());
        }
      }
    }

    for (let i = 0; i < particles[0].length; i += 1) {
      particles[0][i].get().lock();
    }

    unikitty = sketch.loadImage(sketch.sketchPath("../CC_63_unikitty_flag/data/unikitty.jpg"));
  }
  var a = 0;

  sketch.draw = function () {
    sketch.background(51);

    sketch.translate(sketch.width / 2, sketch.height / 2);
    //rotateY(a);
    //a += 0.01;
    physics.update();

    let xoff = 0;
    for (let i = 0; i < cols; i++) {
      let yoff = 0;
      for (let j = 0; j < rows; j++) {
        let n = sketch.noise(xoff, yoff);
        //particles[i][j].display();
        let windx = sketch.map(sketch.noise(xoff, yoff, zoff), 0, 1, 0, 3);
        let windy = sketch.map(sketch.noise(xoff + 5000, yoff + 5000, zoff), 0, 1, -0.5, 0);
        let windz = sketch.map(sketch.noise(xoff + 3000, yoff + 3000, zoff), 0, 1, -1, 1);
        let wind = new Packages.toxi.geom.Vec3D(windx, windy, windz);
        particles[i][j].get().addForce(wind);
        yoff += 0.1;
      }
      xoff += 0.1;
    }
    zoff += 0.1;

    sketch.noFill();
    sketch.noStroke();
    sketch.textureMode(sketch.NORMAL);
    for (let j = 0; j < rows - 1; j++) {
      sketch.beginShape(sketch.TRIANGLE_STRIP);
      sketch.texture(unikitty);
      for (let i = 0; i < cols; i++) {
        let x1 = particles[i][j].get().x;
        let y1 = particles[i][j].get().y;
        let z1 = particles[i][j].get().z;
        let u = sketch.map(i, 0, cols - 1, 0, 1);
        let v1 = sketch.map(j, 0, rows - 1, 0, 1);
        sketch.vertex(x1, y1, z1, u, v1);
        let x2 = particles[i][j + 1].get().x;
        let y2 = particles[i][j + 1].get().y;
        let z2 = particles[i][j + 1].get().z;
        let v2 = sketch.map(j + 1, 0, rows - 1, 0, 1);
        sketch.vertex(x2, y2, z2, u, v2);
      }
      sketch.endShape();
    }


    //for (Spring s : springs) {
    //  s.display();
    //}

    sketch.stroke(255);
    sketch.strokeWeight(4);
    sketch.line(-cols * w / 2 - 100, -rows * w / 2, -cols * w / 2 - 100, sketch.height);

  }

};

var myp5 = new p5(s);
