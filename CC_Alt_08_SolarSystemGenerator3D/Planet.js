// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/dncudkelNxw

function Planet (sketch, r, d, o) {
  this.radius = r;
  this.distance = d;
  this.planets = [];
  this.angle = sketch.random(sketch.TWO_PI);
  this.orbitspeed = o;
  this.v = p5.Vector.random2D();
  this.v.mult(this.distance);

  this.orbit = function () {
    this.angle = this.angle + this.orbitspeed;
    if (this.planets != null) {
      for (var i = 0; i < this.planets.length; i++) {
        this.planets[i].orbit();
      }
    }
  }

  this.spawnMoons = function (total, level) {
    this.planets = [];
    for (var i = 0; i < total; i++) {
      var r = this.radius/(level*2);
      var d = sketch.random((this.radius + r), (this.radius+r)*5);
      var o = sketch.random(-0.03, 0.03);
      this.planets[i] = new Planet(sketch, r, d, o);
      if (level < 3) {
        var num = sketch.floor(sketch.random(0, 3));
        this.planets[i].spawnMoons(num, level+1);
      }
    }
  }

  this.light = function () {
    sketch.push();
    sketch.noStroke();
    var v2 = sketch.createVector(1, 0, 0);
    var p = this.v.cross(v2);
    sketch.rotate(this.angle, p.x, p.y, p.z);
    sketch.stroke(255);

    sketch.translate(this.v.x, this.v.y, this.v.z);
    sketch.noStroke();
    sketch.fill(155);

    var x = sketch.modelX(0, 0, 0);
    var y = sketch.modelY(0, 0, 0);
    var z = sketch.modelZ(0, 0, 0);
    if(numLights < 8) {
      var l = 250;
      sketch.push();
      sketch.rotateX(-sketch.PI/2);
      lp.push([x, y, z]);
      sketch.pop();

      numLights++;
    }

    if (this.planets != null) {
      for (var i = 0; i < this.planets.length; i++) {
        this.planets[i].light();
      }
    }
    sketch.pop();
  }

  this.show = function () {
    sketch.push();
    sketch.noStroke();
    var v2 = sketch.createVector(1, 0, 0);
    var p = this.v.cross(v2);
    sketch.rotate(this.angle, p.x, p.y, p.z);

    sketch.translate(this.v.x, this.v.y, this.v.z);
    sketch.noStroke();
    // sketch.stroke(255, 50);
    sketch.fill(155);
    sketch.sphere(this.radius);

    if (this.planets != null) {
      for (var i = 0; i < this.planets.length; i++) {
        this.planets[i].show();
      }
    }
    sketch.pop();
  }
}
