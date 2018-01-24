// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/jrk_lOg_pVA

// var VerletParticle = Java.type("toxi.physics3d.VerletParticle3D");
// var Particle = Java.extend(VerletParticle, {
//   display: function() {
//     sketch.pushMatrix();
//     sketch.translate(x,y,z);
//     //fill(255);
//     //ellipse(x, y, 10, 10);
//     sketch.popMatrix();
//   }
// });

function Particle(sketch, x, y, z) {
  this.particle = new Packages.toxi.physics3d.VerletParticle3D(x, y, z);
  this.get = function () {
    return this.particle;
  }
  this.display = function () {
    sketch.push();
    sketch.translate(this.particle.x,this.particle.y,this.particle.z);
    sketch.fill(255);
    sketch.ellipse(0, 0, 10, 10);
    sketch.pop();
  }
}
