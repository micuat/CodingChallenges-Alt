// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/jrk_lOg_pVA

// instance mode by Naoto Hieda

var cols = 40;
var rows = 40;
var w = 10;

var physics;
var particles;
var springs;
var s = function (sketch) {

  this.gravity;
  this.physics;

  sketch.setup = function () {
    sketch.createCanvas(800, 800);

    this.particles = [];
    particles = this.particles;

    this.springs = [];
    springs = this.springs;

    this.gravity = new Packages.toxi.geom.Vec3D(0, 1, 0);
    this.physics = new Packages.toxi.physics3d.VerletPhysics3D();
    physics = this.physics;
    this.gb = new Packages.toxi.physics3d.behaviors.GravityBehavior3D(this.gravity);
    this.physics.addBehavior(this.gb);

    var x = -cols*w/2;
    for (var i = 0; i < cols; i++) {
      this.particles[i] = [];
      var z = 0;
      for (var j = 0; j < rows; j++) {
        var p = new Particle(sketch, x, -200, z);
        this.particles[i][j] = p;
        this.physics.addParticle(p.get());
        z = z + w;
      }
      x = x + w;
    }

    for (var i = 0; i < cols; i++) {
      for (var j = 0; j < rows; j++) {
        var a = this.particles[i][j];
        if (j != rows - 1) {
          var b1 = this.particles[i][j + 1];
          var s1 = new Spring(sketch, a.get(), b1.get(), w, 0.8);
          this.springs.push(s1);
          this.physics.addSpring(s1.get());
        }
        else if (j == rows - 1 && i != cols - 1) {
          var b2 = this.particles[i + 1][j];
          var s2 = new Spring(sketch, a.get(), b2.get(), w, 0.8);
          this.springs.push(s2);
          this.physics.addSpring(s2.get());
        }
      }
      this.particles[i][0].get().lock();
    }

    springs = this.springs;
  }

  var a = 0;
  sketch.draw = function () {
    sketch.background(0);

    sketch.translate(sketch.width/2, sketch.height/2);
    sketch.rotateY(a);
    a += 0.01;
    physics.update();

    for (var i = 0; i < cols; i++) {
      if(sketch.frameCount % 180 < 60) {
        var f = new Packages.toxi.geom.Vec3D(0, sketch.sin(i * 0.2 + sketch.millis() * 0.01) * 50 + 50, 0);
      }
      else if(sketch.frameCount % 180 < 120) {
        var f = new Packages.toxi.geom.Vec3D(0, sketch.sin(i * 0.2 + sketch.millis() * 0.002)>0.8?200:20, 0);
      }
      else {
        var f = new Packages.toxi.geom.Vec3D(sketch.sin(i * 0.2 + sketch.millis() * 0.01) * 100, 200, 0);
      }
      this.particles[i][rows-1].get().addForce(f);
    }

    // print(springs[0].testVal);
    for (var i in this.springs) {
      springs[i].display();
    }
  }

};

var myp5 = new p5(s);
