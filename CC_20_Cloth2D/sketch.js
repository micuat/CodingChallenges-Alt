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

    this.gravity = new toxi.geom.Vec2D(0, 1);
    this.physics = new toxi.physics2d.VerletPhysics2D(this.gravity);
    physics = this.physics;
    // this.gb = new toxi.physics2d.behaviors.GravityBehavior(gravity);
    // this.physics.addBehavior(this.gb);

    var x = 100;
    for (var i = 0; i < cols; i++) {
      this.particles[i] = [];
      var y = 10;
      for (var j = 0; j < rows; j++) {
        var p = new Particle(sketch, x, y);
        this.particles[i][j] = p;
        this.physics.addParticle(p);
        y = y + w;
      }
      x = x + w;
    }

    for (var i = 0; i < cols; i++) {
      for (var j = 0; j < rows; j++) {
        var a = this.particles[i][j];
        if (i != cols - 1) {
          var b1 = this.particles[i + 1][j];
          var s1 = new Spring(sketch, a, b1);
          this.springs.push(s1);
          this.physics.addSpring(s1);
        }
        if (j != rows - 1) {
          var b2 = this.particles[i][j + 1];
          var s2 = new Spring(sketch, a, b2);
          this.springs.push(s2);
          this.physics.addSpring(s2);
        }
      }
    }

    this.particles[0][0].lock();
    this.particles[cols - 1][0].lock();

    springs = this.springs;
  }

  sketch.draw = function () {
    sketch.background(51);
    physics.update();

    for (var i = 0; i < cols; i++) {
      for (var j = 0; j < rows; j++) {
        // this.particles[i][j].display();
      }
    }


    for (var i in this.springs) {
      springs[i].display();
    }
  }

};

var myp5 = new p5(s);
