// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for this video: https://youtu.be/Cl_Gjj80gPE

function Walker(sketch, x, y, z) {
  if (arguments.length == 4) {
    this.pos = sketch.createVector(x, y, z);
    this.stuck = true;
  } else {
    this.pos = randomPoint(sketch);
    this.stuck = false;
  }
  this.r = radius;
  this.stuckTo = null;
  this.vel = sketch.createVector();
  this.acc = sketch.createVector();
  this.hitWall = false;

  this.walk = function() {
    this.acc = p5.Vector.random3D();
    this.acc.mult(0.0001);
    this.vel.add(this.acc);
    // var vel = createVector(random(-1, 1), random(-0.5, 1));
    this.pos.add(this.vel);
    if(this.pos.x <= 0 || sketch.width <= this.pos.x)
      this.hitWall = true;
    if(this.pos.y <= 0 || sketch.height <= this.pos.y)
      this.hitWall = true;
    if(this.pos.z <= 0 || sketch.height <= this.pos.z)
      this.hitWall = true;
    this.pos.x = sketch.constrain(this.pos.x, 0, sketch.width);
    this.pos.y = sketch.constrain(this.pos.y, 0, sketch.height);
    this.pos.z = sketch.constrain(this.pos.z, 0, sketch.height);
    //this.vel.mult(0.9);
  }


  this.checkStuck = function(others) {
    for (var i = 0; i < others.length; i++) {
      if(estimate(this.pos, others[i].pos, this.r + others[i].r)) continue;
      var d = distSq(this.pos, others[i].pos);
      if (d < (this.r * this.r + others[i].r * others[i].r +  2 * others[i].r * this.r)) {
        //if (random(1) < 0.1) {
        this.stuck = true;
        this.stuckTo = others[i];
        return true;
        break;
        //}
      }
    }
    return false;
  }

  this.setHue = function(hu) {
    this.hu = hu;
  }

  this.show = function() {
    sketch.noStroke();
    sketch.push();
    if (this.stuckTo != null) {
      // sketch.stroke(this.hu, 255, 255, 255);
      // sketch.stroke(360, 0, 255);
      // sketch.line(this.pos.x, this.pos.y, this.stuckTo.pos.x, this.stuckTo.pos.y);
      sketch.fill(0);
      sketch.translate(this.pos.x, this.pos.y, this.pos.z);
      sketch.sphere(this.r * 1);
    } else {
      sketch.fill(0);
      sketch.translate(this.pos.x, this.pos.y, this.pos.z);
      sketch.sphere(this.r * 1);
    }
    sketch.pop();
  }

}

function randomPoint(sketch) {
  var i = sketch.floor(sketch.random(4));

  if (i === 0) {
    var x = sketch.random(sketch.width);
    return sketch.createVector(x, 0, sketch.random(sketch.width));
  } else if (i === 1) {
    var x = sketch.random(sketch.width);
    return sketch.createVector(x, sketch.height, sketch.random(sketch.width));
  } else if (i === 2) {
    var y = sketch.random(sketch.height);
    return sketch.createVector(0, y, sketch.random(sketch.width));
  } else {
    var y = sketch.random(sketch.height);
    return sketch.createVector(sketch.width, y, sketch.random(sketch.width));
  }
}


function distSq(a, b) {
  var dx = b.x - a.x;
  var dy = b.y - a.y;
  var dz = b.z - a.z;
  return dx * dx + dy * dy + dz * dz;
}

function estimate(a, b, d) {
  var dx = b.x - a.x;
  var dy = b.y - a.y;
  var dz = b.z - a.z;
  return Math.abs(dx) > d || Math.abs(dy) > d || Math.abs(dz) > d;
}
