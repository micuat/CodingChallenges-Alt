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
    sketch.createCanvas(600, 600);

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
        if (i != cols - 1) {
          var b1 = this.particles[i + 1][j];
          var s1 = new Spring(sketch, a.get(), b1.get(), w, 0.8);
          this.springs.push(s1);
          this.physics.addSpring(s1.get());
        }
        if (j != rows - 1) {
          var b2 = this.particles[i][j + 1];
          var s2 = new Spring(sketch, a.get(), b2.get(), w, 0.8);
          this.springs.push(s2);
          this.physics.addSpring(s2.get());
        }
      }
    }

    this.particles[0][0].get().lock();
    this.particles[cols - 1][0].get().lock();

    springs = this.springs;
  }

  var a = 0;
  sketch.draw = function () {
    sketch.background(51);

    sketch.translate(sketch.width/2, sketch.height/2);
    sketch.rotateY(a);
    a += 0.01;
    physics.update();

    for (var i = 0; i < cols; i++) {
      for (var j = 0; j < rows; j++) {
        // this.particles[i][j].display();
      }
    }

    // print(springs[0].testVal);
    for (var i in this.springs) {
      springs[i].display();
    }
  }

};

var myp5 = new p5(s);
