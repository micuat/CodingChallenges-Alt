// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/dncudkelNxw

function Planet (r, d, o) {
  this.radius = r;
  this.distance = d;
  this.planets = [];
  this.angle = p008.random(p008.TWO_PI);
  this.orbitspeed = o;
  this.v = p5.Vector.random3D();
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
      var d = p008.random((this.radius + r), (this.radius+r)*2);
      var o = p008.random(-0.1, 0.1);
      this.planets[i] = new Planet(r, d, o);
      if (level < 2) {
        var num = p008.floor(p008.random(0, 3));
        this.planets[i].spawnMoons(num, level+1);
      }
    }
  }

  this.show = function () {
    p008.push();
    p008.noStroke();
    var v2 = p008.createVector(1, 0, 1);
    var p = this.v.cross(v2);
    p008.rotate(this.angle, p.x, p.y, p.z);
    p008.stroke(255);
    //line(0, 0, 0, v.x, v.y, v.z);
    //line(0, 0, 0, p.x, p.y, p.z);

    p008.translate(this.v.x, this.v.y, this.v.z);
    p008.noStroke();
    p008.fill(255);
    p008.sphere(this.radius);
    //ellipse(0, 0, radius*2, radius*2);
    if (this.planets != null) {
      for (var i = 0; i < this.planets.length; i++) {
        this.planets[i].show();
      }
    }
    p008.pop();
  }
}
