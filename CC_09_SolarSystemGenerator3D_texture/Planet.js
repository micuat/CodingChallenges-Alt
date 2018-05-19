// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/FGAwi7wpU8c


function Planet (r, d, o, img) {
  this.radius = r;
  this.distance = d;
  this.planets = [];
  this.angle = p009.random(p009.TWO_PI);
  this.orbitspeed = o;
  this.v = p5.Vector.random3D();
  this.v.mult(this.distance);

  p009.noStroke();
  p009.noFill();
  this.globe = p009.createShape(p009.SPHERE, this.radius);
  this.globe.setTexture(img);

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
      var d = p009.random((this.radius + r), (this.radius+r)*2);
      var o = p009.random(-0.1, 0.1);
      var index = p009.floor(p009.random(0,textures.length));
      this.planets[i] = new Planet(r, d, o, textures[index]);
      if (level < 2) {
        var num = p009.floor(p009.random(0, 3));
        this.planets[i].spawnMoons(num, level+1);
      }
    }
  }

  this.show = function () {
    p009.push();
    p009.noStroke();
    var v2 = p009.createVector(1, 0, 1);
    var p = this.v.cross(v2);
    p009.rotate(this.angle, p.x, p.y, p.z);
    p009.stroke(255);
    //line(0, 0, 0, v.x, v.y, v.z);
    //line(0, 0, 0, p.x, p.y, p.z);

    p009.translate(this.v.x, this.v.y, this.v.z);
    p009.noStroke();
    p009.fill(255);
    p009.shape(this.globe);
    // p009.sphere(this.radius);
    //ellipse(0, 0, radius*2, radius*2);
    if (this.planets != null) {
      for (var i = 0; i < this.planets.length; i++) {
        this.planets[i].show();
      }
    }
    p009.pop();
  }
}
