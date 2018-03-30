// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// Breadth-First search

// Part 1: https://youtu.be/piBq7VD0ZSo
// Part 2: https://youtu.be/-he67EEM6z0

function Node(sketch, value) {
  this.s = sketch;
  this.value = value;
  this.edges = [];
  this.searched = false;
  this.parent = null;
  this.x = this.s.random(this.s.width);
  this.y = this.s.random(this.s.height);
  this.z = this.s.random(3);
  this.c = [55, 55, 55];
  this.tc = [55, 55, 55];
  this.vx = 0;
  this.vy = 0;
  this.arm = this.s.random(50, 100);
}

Node.prototype.addEdge = function(neighbor) {
  this.edges.push(neighbor);
  // Both directions!
  neighbor.edges.push(this);
}

Node.prototype.updateForce = function() {
  for(let i in this.edges) {
    let e = this.edges[i];
    let d = this.s.dist(e.x, e.y, this.x, this.y);
    if(d > this.arm) {
      this.vx += (e.x - this.x) * 0.001;
      this.vy += (e.y - this.y) * 0.001;
    }
    else {
      this.vx += -(e.x - this.x) * 0.001;
      this.vy += -(e.y - this.y) * 0.001;
    }

  }
}

Node.prototype.update = function() {
  this.x += this.vx;
  this.y += this.vy;
  this.vx *= 0.999;
  this.vy *= 0.999;
  for(let i = 0; i < 3; i++)
  this.c[i] = this.s.lerp(this.c[i], this.tc[i], 0.1);
  // this.c.green = this.s.lerp(this.c.green, this.tc.green, 1);
  // this.c.blue = this.s.lerp(this.c.blue, this.tc.blue, 1);
  // this.x += this.z * (this.s.noise(this.x * 0.01, this.y * 0.01) - 0.5) * 10;
  // this.c = (this.c + this.tc) * 0.5;
}

Node.prototype.show = function() {
  this.s.stroke(255, 50);
  this.s.fill(this.c[0], this.c[1], this.c[2]);
  this.s.ellipse(this.x, this.y, 10);
  for(let i in this.edges) {
    let e = this.edges[i];
    // this.s.line(this.x, this.y, e.x, e.y);
    this.s.beginShape(this.s.LINES);
    this.s.stroke(this.c[0], this.c[1], this.c[2]);
    this.s.vertex(this.x, this.y);
    this.s.stroke(e.c[0], e.c[1], e.c[2]);
    this.s.vertex(e.x, e.y);
    this.s.endShape();
  }
}
