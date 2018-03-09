// Daniel Shiffman
// http://codingtra.in
// Islamic Star Patterns
// Video Part 1: https://youtu.be/sJ6pMLp_IaI
// Video Part 2: [coming soon]
// Based on: http://www.cgl.uwaterloo.ca/csk/projects/starpatterns/

// Repo with more tiling patterns and features
// https://github.com/CodingTrain/StarPatterns

function Edge(sketch, a, b) {
  this.a = a;
  this.b = b;
  this.h1;
  this.h2;

  this.show = function(vert, ii) {
    // sketch.stroke(255, 50);
    let ratio = 0.5;
    if(this.a.x == this.b.x) {
      // if(p.x < this.center.x) p.x += 10;
      ratio = (this.h1.a.y - this.center.y) / (this.h1.a.y - this.h1.b.y);
    }
    else {
      ratio = (this.h1.a.x - this.center.x) / (this.h1.a.x - this.h1.b.x);
    }
    let p = p5.Vector.lerp(this.h1.a, this.h1.b, ratio);
    // sketch.line(this.a.x, this.a.y, p.x, p.y);
    sketch.fill(ii * 64);
    sketch.beginShape();
    sketch.vertex(this.center.x, this.center.y);
    this.h1.show(p, vert);
    sketch.vertex(p.x, p.y);
    sketch.endShape();

    sketch.fill((ii+1)%4 * 64);
    sketch.beginShape();
    sketch.vertex(this.center.x, this.center.y);
    sketch.vertex(p.x, p.y);
    this.h2.show(p, vert);
    sketch.endShape();
  }

  this.hankin = function(sides) {
    var mid = p5.Vector.add(this.a, this.b);
    mid.mult(0.5);

    var v1 = p5.Vector.sub(this.a, mid);
    var v2 = p5.Vector.sub(this.b, mid);

    // Edge length
    var elen = v1.mag() + delta;

    var offset1 = mid;
    var offset2 = mid;
    if (delta > 0) {
      v1.setMag(delta);
      v2.setMag(delta);
      offset1 = p5.Vector.add(mid, v2);
      offset2 = p5.Vector.add(mid, v1);
    }
    v1.normalize();
    v2.normalize();

    v1.rotate(sketch.radians(-angle));
    v2.rotate(sketch.radians(angle));

    // Calculate interior angle
    var interior = (sides - 2) * sketch.PI / sides;
    // Law of sines right here!
    var alpha = interior * 0.5;
    var beta = sketch.PI - sketch.radians(angle) - alpha;
    var hlen = (elen * sketch.sin(alpha)) / sketch.sin(beta);

    v1.setMag(hlen);
    v2.setMag(hlen);

    this.h1 = new Hankin(sketch, offset1, v1);
    this.h2 = new Hankin(sketch, offset2, v2);

  }

}
