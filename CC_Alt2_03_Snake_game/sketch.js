// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/AaGK-fj-BAM

// instance mode by Naoto Hieda

var shader;

var sk = function (p) {

  let s;
  let scl = 40;
  let margin = 2;

  let foods;

  p.setup = function () {
    p.createCanvas(600, 600);
    s = new Snake(scl);
    p.frameRate(60);
    foods = [];
    for (let i = 0; i < 5; i++) {
      p.pickLocation();
    }
    shader = p.loadShader(p.sketchPath("../CC_Alt2_03_Snake_game/frag.glsl"));
  }

  p.pickLocation = function () {
    var cols = p.floor(p.width / scl);
    var rows = p.floor(p.height / scl);
    let food = p.createVector(p.floor(p.random(cols)), p.floor(p.random(rows)));
    food.mult(scl);
    foods.push(food);
  }

  p.mousePressed = function () {
    s.total++;
  }

  p.draw = function () {
    if (p.frameCount % 120 == 0) {
      shader = p.loadShader(p.sketchPath("../CC_Alt2_03_Snake_game/frag.glsl"));
    }

    p.background(0);

    // let z = 1 * 0.8;
    // let y = z * 1.82;

    // p.push();
    // p.noStroke();
    // p.fill(255);
    // p.translate(100,100);
    // p.scale(100, 100);
    // p.beginShape(p.TRIANGLE_STRIP);
    // {
    //   p.vertex(-1, 1, 1, -0.4);
    //   p.vertex(1, 1, 1, 0.4);
    //   p.vertex(-1, 0, 0, -0.4);
    //   p.vertex(1, 0, 0, 0.4);
    //   p.vertex(-1, -1, -1, -0.4);
    //   p.vertex(1, -1, -1, 0.4);
    // }
    // p.endShape();
    // p.pop();

    p.noStroke();

    for (let n = 0; n < 1; n++) {
      if (foods[0].x < s.x) {
        s.dir(-1, 0);
      }
      else if (foods[0].x > s.x) {
        s.dir(1, 0);
      }
      else if (foods[0].y < s.y) {
        s.dir(0, -1);
      }
      else if (foods[0].y > s.y) {
        s.dir(0, 1);
      }

      for (let i = foods.length - 1; i >= 0; i--) {
        let food = foods[i];
        if (s.eat(food)) {
          foods.splice(i, 1);
          p.pickLocation();
          break;
        }
      }
      s.death();
      s.update();
    }
    s.show(margin);


    p.fill(255, 0, 100);
    for (let i in foods) {
      let food = foods[i];
      p.rect(food.x + margin, food.y + margin, scl - margin * 2, scl - margin * 2);
    }

    shader.set("iTime", p.millis() * 0.001);
    if (p.millis() * 0.001 % 2 < 1.5 || p.frameCount % 8 < 2) {
      p.filter(shader);
    }
  }

  p.keyPressed = function () {
    if (p.keyCode === p.UP_ARROW) {
      s.dir(0, -1);
    } else if (p.keyCode === p.DOWN_ARROW) {
      s.dir(0, 1);
    } else if (p.keyCode === p.RIGHT_ARROW) {
      s.dir(1, 0);
    } else if (p.keyCode === p.LEFT_ARROW) {
      s.dir(-1, 0);
    }
  }

};

var p003 = new p5(sk);