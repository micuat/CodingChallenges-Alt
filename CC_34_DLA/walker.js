// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for this video: https://youtu.be/Cl_Gjj80gPE

function Walker(sketch, x, y) {
  if (arguments.length == 3) {
    this.pos = sketch.createVector(x, y);
    this.stuck = true;
  } else {
    this.pos = randomPoint(sketch);
    this.stuck = false;
  }
  this.r = radius;

  this.walk = function() {
    var vel = p5.Vector.random2D();
    // var vel = createVector(random(-1, 1), random(-0.5, 1));
    this.pos.add(vel);
    this.pos.x = sketch.constrain(this.pos.x, 0, sketch.width);
    this.pos.y = sketch.constrain(this.pos.y, 0, sketch.height);
  }


  this.checkStuck = function(others) {
    for (var i = 0; i < others.length; i++) {
      var d = distSq(this.pos, others[i].pos);
      if (d < (this.r * this.r + others[i].r * others[i].r +  2 * others[i].r * this.r)) {
        //if (random(1) < 0.1) {
        this.stuck = true;
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
    if (this.stuck) {
      sketch.fill(this.hu, 255, 255, 255);
    } else {
      sketch.fill(360, 0, 255);
    }
    sketch.ellipse(this.pos.x, this.pos.y, this.r * 2, this.r * 2);
  }

}

function randomPoint(sketch) {
  var i = sketch.floor(sketch.random(4));

  if (i === 0) {
    var x = sketch.random(sketch.width);
    return sketch.createVector(x, 0);
  } else if (i === 1) {
    var x = sketch.random(sketch.width);
    return sketch.createVector(x, sketch.height);
  } else if (i === 2) {
    var y = sketch.random(sketch.height);
    return sketch.createVector(0, y);
  } else {
    var y = sketch.random(sketch.height);
    return sketch.createVector(sketch.width, y);
  }
}


function distSq(a, b) {
  var dx = b.x - a.x;
  var dy = b.y - a.y;
  return dx * dx + dy * dy;
}
