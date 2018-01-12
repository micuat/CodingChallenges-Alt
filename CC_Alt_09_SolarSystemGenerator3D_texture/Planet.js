// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/FGAwi7wpU8c


function Planet (sketch, r, d, o, img) {
  this.radius = r;
  this.distance = d;
  this.planets = [];
  this.angle = sketch.random(sketch.TWO_PI);
  this.orbitspeed = o;
  this.v = p5.Vector.random2D();
  this.v.mult(this.distance);

  sketch.noStroke();
  sketch.noFill();
  this.globe = sketch.createShape(sketch.SPHERE, this.radius);
  this.globe.setTexture(img);

  this.orbit = function () {
    this.angle = this.angle + this.orbitspeed * speed;
    if (this.planets != null) {
      for (var i = 0; i < this.planets.length; i++) {
        this.planets[i].orbit();
      }
    }
  }

  this.spawnMoons = function (total, level) {
    this.planets = [];
    for (var i = 0; i < total; i++) {
      var r = this.radius/(level*2) * 2;
      var d = sketch.random((this.radius + r), (this.radius+r)*5);
      var o = sketch.random(-0.03, 0.03);
      var index = sketch.floor(sketch.random(0,textures.length));
      this.planets[i] = new Planet(sketch, r, d, o, textures[index]);
      if (level < 2) {
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
    //line(0, 0, 0, v.x, v.y, v.z);
    //line(0, 0, 0, p.x, p.y, p.z);

    sketch.translate(this.v.x, this.v.y, this.v.z);
    sketch.noStroke();
    sketch.fill(255);

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
    sketch.stroke(255);

    sketch.translate(this.v.x, this.v.y, this.v.z);
    sketch.noStroke();
    sketch.fill(255);
    sketch.push();
    sketch.rotate(count % 100 / 100 * 2 * sketch.PI, 0, 0, 1);
    sketch.shape(this.globe);
    sketch.pop();
    // sketch.sphere(this.radius);
    //ellipse(0, 0, radius*2, radius*2);
    if (this.planets != null) {
      for (var i = 0; i < this.planets.length; i++) {
        this.planets[i].show();
      }
    }
    sketch.pop();
  }
}
