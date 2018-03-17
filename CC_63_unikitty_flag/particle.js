// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// 1) https://youtu.be/jrk_lOg_pVA
// 2) https://youtu.be/JunJzIe0hEo
// 3) https://youtu.be/FeXnJSCFj-Q

function Particle(sketch, x, y, z) {
  this.particle = new Packages.toxi.physics3d.VerletParticle3D(x, y, z);
  this.get = function () {
    return this.particle;
  }
  this.display = function () {
    sketch.push();
    sketch.translate(this.particle.x,this.particle.y,this.particle.z);
    sketch.noStroke();
    sketch.fill(255);
    sketch.ellipse(0, 0, 2, 2);
    sketch.pop();
  }
}
