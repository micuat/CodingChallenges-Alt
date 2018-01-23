// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/jrk_lOg_pVA

// instance mode by Naoto Hieda

// var VerletSpring = Java.type("toxi.physics3d.VerletSpring3D");
// var Spring = Java.extend(VerletSpring, {
//   testVal: 'hello',
//   display: function() {
//     // sketch.stroke(255);
//     // sketch.strokeWeight(2);
//     // sketch.line(a.x, a.y, a.z, b.x, b.y, b.z);
//   }
// });

function Spring(sketch, a, b) {
  this.spring = new Packages.toxi.physics3d.VerletSpring3D(a, b, w, 0.8);
  this.get = function () {
    return this.spring;
  }
  this.display = function () {
    sketch.stroke(255);
    sketch.strokeWeight(1);
    sketch.line(this.spring.a.x, this.spring.a.y, this.spring.a.z, this.spring.b.x, this.spring.b.y, this.spring.b.z);
  }
}
