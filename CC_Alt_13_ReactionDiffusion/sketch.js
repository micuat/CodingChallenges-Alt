// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for this video: https://youtu.be/BV9ny785UNc

// Written entirely based on
// http://www.karlsims.com/rd.html

// Also, for reference
// http://hg.postspectacular.com/toxiclibs/src/44d9932dbc9f9c69a170643e2d459f449562b750/src.sim/toxi/sim/grayscott/GrayScott.java?at=default

// instance mode by Naoto Hieda

var grid;
var next;

var dA = 1;
var dB = 0.5;
var feed = 0.055;
var k = 0.062;
var shader;

var s = function (sketch) {

  sketch.setup = function () {
    sketch.createCanvas(600, 600);
    sketch.pixelDensity(1);
    // grid = [];
    // next = [];
    // for (var x = 0; x < sketch.width; x++) {
    //   grid[x] = [];
    //   next[x] = [];
    //   for (var y = 0; y < sketch.height; y++) {
    //     grid[x][y] = {
    //       a: 1,
    //       b: 0
    //     };
    //     next[x][y] = {
    //       a: 1,
    //       b: 0
    //     };
    //   }
    // }

    // var d = 2;
    // for (var i = sketch.width/2-d; i < sketch.width/2+d; i++) {
    //   for (var j = sketch.height/2-d; j < sketch.height/2+d; j++) {
    //     grid[i-100][j].b = 1;
    //   }
    // }
    // for (var i = sketch.width/2-d; i < sketch.width/2+d; i++) {
    //   for (var j = sketch.height/2-d; j < sketch.height/2+d; j++) {
    //     grid[i+100][j].b = 1;
    //   }
    // }
    sketch.frameRate(15);
    shader = sketch.loadShader(sketch.sketchPath("../CC_Alt_13_ReactionDiffusion/frag.glsl"));//,
//    sketch.sketchPath("../CC_Alt_13_ReactionDiffusion/vert.glsl"))

  }

  sketch.draw = function () {
    console.log(sketch.frameRate())

    // sketch.shader(shader);

    for (var x = 1; x < sketch.width - 1; x++) {
      for (var y = 1; y < sketch.height - 1; y++) {
        var a = grid[x][y].a;
        var b = grid[x][y].b;
        next[x][y].a = a +
          (dA * sketch.laplaceA(x, y)) -
          (a * b * b) +
          (feed * (1 - a));
        next[x][y].b = b +
          (dB * sketch.laplaceB(x, y)) +
          (a * b * b) -
          ((k + feed) * b);

        next[x][y].a = sketch.constrain(next[x][y].a, 0, 1);
        next[x][y].b = sketch.constrain(next[x][y].b, 0, 1);
      }
    }


    sketch.loadPixels();
    if(sketch.pixels == null) return;
    for (var x = 0; x < sketch.width; x++) {
      for (var y = 0; y < sketch.height; y++) {
        var a = next[x][y].a;
        var b = next[x][y].b;
        if(sketch.isLiveJs == true) {
          // sketch.pixels[(x + y * sketch.width)] = pApplet.color(c);
          sketch.pixels[(x + y * sketch.width)] = pApplet.color((a - b) * 255);
          
        }
        else {
          var c = sketch.floor((a - b) * 255);
          c = sketch.constrain(c, 0, 255);
          var pix = (x + y * sketch.width) * 4;
          sketch.pixels[pix + 0] = c;
          sketch.pixels[pix + 1] = c;
          sketch.pixels[pix + 2] = c;
          sketch.pixels[pix + 3] = 255;
        }
      }
    }
    sketch.updatePixels();

    sketch.g.filter(shader);

    sketch.swap();


  }


  sketch.laplaceA = function (x, y) {
    var sumA = 0;
    sumA += grid[x][y].a * -1;
    sumA += grid[x - 1][y].a * 0.2;
    sumA += grid[x + 1][y].a * 0.2;
    sumA += grid[x][y + 1].a * 0.2;
    sumA += grid[x][y - 1].a * 0.2;
    sumA += grid[x - 1][y - 1].a * 0.05;
    sumA += grid[x + 1][y - 1].a * 0.05;
    sumA += grid[x + 1][y + 1].a * 0.05;
    sumA += grid[x - 1][y + 1].a * 0.05;
    return sumA;
  }

  sketch.laplaceB = function (x, y) {
    var sumB = 0;
    sumB += grid[x][y].b * -1;
    sumB += grid[x - 1][y].b * 0.2;
    sumB += grid[x + 1][y].b * 0.2;
    sumB += grid[x][y + 1].b * 0.2;
    sumB += grid[x][y - 1].b * 0.2;
    sumB += grid[x - 1][y - 1].b * 0.05;
    sumB += grid[x + 1][y - 1].b * 0.05;
    sumB += grid[x + 1][y + 1].b * 0.05;
    sumB += grid[x - 1][y + 1].b * 0.05;
    return sumB;
  }



  sketch.swap = function () {
    var temp = grid;
    grid = next;
    next = temp;
  }

  sketch.mousePressed = function () {
    shader = sketch.loadShader(sketch.sketchPath("../CC_Alt_13_ReactionDiffusion/frag.glsl"));
  }
};

var myp5 = new p5(s);
