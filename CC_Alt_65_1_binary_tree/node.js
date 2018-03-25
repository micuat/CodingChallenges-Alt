// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// Binary Tree
// Part 1: https://youtu.be/ZNH0MuQ51m4
// Part 2: https://youtu.be/KFEvF_ymuzY

function Node(sketch, val) {
  this.s = sketch;
  this.value = val;
  this.left = null;
  this.right = null;
  this.shown = false;
}

Node.prototype.search = function (val) {
  if (this.value == val) {
    return this;
  } else if (val < this.value && this.left != null) {
    return this.left.search(val);
  } else if (val > this.value && this.right != null) {
    return this.right.search(val);
  }
  return null;
}

Node.prototype.show = function (w, h) {
  if (this.shown == false) {
    let s = this.s;
    s.rectMode(s.CORNER)
    let di = 1;
    let dj = 1;
    for (let i = 0; i < h; i += di) {
      for (let j = -w / 2; j < w + w / 2; j += dj) {
        if(i / 4 % 2 < 1) continue;
        let dx = j - w / 2;
        let dy = i - h / 2;
        let d = s.sqrt(dx * dx / w / w);// + dy*dy/h/h);
        let n = s.map(d, 0, 1, 255, 0);

        if (colorType == 0)
          s.fill(200, this.value, s.map(i, 0, h, 30, 85), n);
        else if (colorType == 1)
          s.fill(this.value, 200, s.map(i, 0, h, 30, 85), n);
        else if (colorType == 2)
          s.fill(this.value, s.map(i, 0, h, 30, 85), 200, n);
        s.rect(j, i - s.sqrt(n * 2), dj, di);

        // if(0 <= j && j < w) {
        //   s.fill(this.value, 200, 60, 255/2-n);
        //   s.rect(j, i, dj, di);
        //   }
        // s.line(0, i, w, i);
      }
    }
    // s.rect(0, 0, w, h)
    // s.line(0, 0, w, h);
    this.shown = true;
  }
}

Node.prototype.visit = function () {
  let s = this.s;
  let w = 800;
  let h = 800 / 8;
  this.show(w, h);
  s.push();
  s.translate(0, h);
  s.scale(0.5, 1);
  if (this.left != null) {
    this.left.visit();
  }
  s.pop();
  // console.log(this.value);
  s.push();
  s.scale(0.5, 1);
  s.translate(w, h);
  if (this.right != null) {
    this.right.visit();
  }
  s.pop();
}

Node.prototype.addNode = function (n) {
  if (n.value < this.value) {
    if (this.left == null) {
      this.left = n;
    } else {
      this.left.addNode(n)
    }
  } else if (n.value > this.value) {
    if (this.right == null) {
      this.right = n;
    } else {
      this.right.addNode(n);
    }
  }
}
