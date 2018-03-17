// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// 1) https://youtu.be/jrk_lOg_pVA
// 2) https://youtu.be/JunJzIe0hEo
// 3) https://youtu.be/FeXnJSCFj-Q

function Spring(sketch, a, b) {
  this.spring = new Packages.toxi.physics3d.VerletSpring3D(a, b, w, 1);
  this.get = function () {
    return this.spring;
  }
  this.display = function () {
    sketch.stroke(255);
    sketch.strokeWeight(2);
    sketch.line(this.spring.a.x, this.spring.a.y, this.spring.a.z, this.spring.b.x, this.spring.b.y, this.spring.b.z);
  }
}
