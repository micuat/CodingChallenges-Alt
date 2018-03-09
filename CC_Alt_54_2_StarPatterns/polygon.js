// Daniel Shiffman
// http://codingtra.in
// Islamic Star Patterns
// Video Part 1: https://youtu.be/sJ6pMLp_IaI
// Video Part 2: [coming soon]
// Based on: http://www.cgl.uwaterloo.ca/csk/projects/starpatterns/

// Repo with more tiling patterns and features
// https://github.com/CodingTrain/StarPatterns

function Polygon(sketch, n) {
  this.vertices = [];
  this.edges = [];
  this.sides = n;

  this.addVertex = function(x, y) {
    var a = sketch.createVector(x, y);
    var total = this.vertices.length;
    if (total > 0) {
      var prev = this.vertices[total - 1];
      var edge = new Edge(sketch, prev, a);
      this.edges.push(edge);
    }
    this.vertices.push(a);
  }

  this.close = function() {
    var total = this.vertices.length;
    var last = this.vertices[total - 1];
    var first = this.vertices[0];
    var edge = new Edge(sketch, last, first);
    this.edges.push(edge);

    this.center = sketch.createVector(0, 0);
    for(let i in this.vertices) {
      this.center.x += this.vertices[i].x;
      this.center.y += this.vertices[i].y;
      // print(this.vertices[i])
    }
    this.center.mult(1.0 / this.vertices.length);
    for(let i in this.edges) {
      this.edges[i].center = this.center;
      // print(this.edges[i].center)
    }
  }

  this.hankin = function() {
    for (var i = 0; i < this.edges.length; i++) {
      this.edges[i].hankin(this.sides);
    }
  }

  this.show = function() {
    sketch.fill(255, 50);
    sketch.noStroke();
    for (var i = 0; i < this.edges.length; i++) {
      this.edges[i].show(true, i);
    }

    sketch.stroke(255);
    for (var i = 0; i < this.edges.length; i++) {
      this.edges[i].show(false);
    }
  }

}
