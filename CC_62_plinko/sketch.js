// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Plinko
// Video 1: https://youtu.be/KakpnfDv_f0
// Video 2: https://youtu.be/6s4MJcUyaUE
// Video 3: https://youtu.be/jN-sW-SxNzk
// Video 4: https://youtu.be/CdBXmsrkaPs

// instance mode by Naoto Hieda

// module aliases
var Engine = Matter.Engine,
  World = Matter.World,
  Events = Matter.Events,
  Bodies = Matter.Bodies;

var engine;
var world;
var particles = [];
var plinkos = [];
var bounds = [];
var cols = 11;
var rows = 10;

var s = function (sketch) {
  sketch.preload = function () {
    // ding = sketch.loadSound('ding.mp3');
  }

  sketch.setup = function () {
    sketch.createCanvas(600, 700);
    sketch.colorMode(sketch.HSB);
    engine = Engine.create();
    world = engine.world;
    //world.gravity.y = 2;

    function collision(event) {
      var pairs = event.pairs;
      for (var i = 0; i < pairs.length; i++) {
        var labelA = pairs[i].bodyA.label;
        var labelB = pairs[i].bodyB.label;
        if (labelA == 'particle' && labelB == 'plinko') {
          //ding.play();
        }
        if (labelA == 'plinko' && labelB == 'particle') {
          //ding.play();
        }
      }
    }

    Events.on(engine, 'collisionStart', collision);

    sketch.newParticle();
    var spacing = sketch.width / cols;
    for (var j = 0; j < rows; j++) {
      for (var i = 0; i < cols + 1; i++) {
        var x = i * spacing;
        if (j % 2 == 0) {
          x += spacing / 2;
        }
        var y = spacing + j * spacing;
        var p = new Plinko(sketch, x, y, 16);
        plinkos.push(p);
      }
    }

    var b = new Boundary(sketch, sketch.width / 2, sketch.height + 50, sketch.width, 100);
    bounds.push(b);

    for (var i = 0; i < cols + 2; i++) {
      var x = i * spacing;
      var h = 100;
      var w = 10;
      var y = sketch.height - h / 2;
      var b = new Boundary(sketch, x, y, w, h);
      bounds.push(b);

    }


  }

  sketch.newParticle = function () {
    var p = new Particle(sketch, 300, 0, 10);
    particles.push(p);
  }

  sketch.draw = function () {
    sketch.background(0, 0, 0);
    if (sketch.frameCount % 20 == 0) {
      sketch.newParticle();
    }
    Engine.update(engine, 1000 / 30);
    for (var i = 0; i < particles.length; i++) {
      particles[i].show();
      if (particles[i].isOffScreen()) {
        World.remove(world, particles[i].body);
        particles.splice(i, 1);
        i--;
      }
    }
    for (var i = 0; i < plinkos.length; i++) {
      plinkos[i].show();
    }
    for (var i = 0; i < bounds.length; i++) {
      bounds[i].show();
    }
  }

};

var myp5 = new p5(s);