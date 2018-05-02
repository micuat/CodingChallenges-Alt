// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// QuadTree
// https://www.youtube.com/watch?v=z0YFFg_nBjw

// For more:
// https://github.com/CodingTrain/QuadTree

// instance mode by Naoto Hieda

var shader, blur;

var s = function (p) {

  let particles = [];

  p.setup = function () {
    p.createCanvas(800, 800);
    for (let i = 0; i < 500; i++) {
      particles[i] = new Particle(p.random(p.width), p.random(p.height));
    }
    let r = 255;
    particles[0].col = myp5.color(r, 255 - r, 0);
  
    shader = p.loadShader(p.sketchPath("../CC_Alt_98_3_QuadTree_Collisions/frag.glsl"));
    blur = p.loadShader(p.sketchPath("../CC_Alt_98_3_QuadTree_Collisions/blur.glsl"));
    p.background(0);
  }

  p.draw = function () {
    p.background(0);

    p.translate(p.width/2, p.height/2);
    p.scale(1.2, 1.2);
    p.translate(-p.width/2, -p.height/2);
    
    if (p.frameCount % 120 == 0) {
      shader = p.loadShader(p.sketchPath("../CC_Alt_98_3_QuadTree_Collisions/frag.glsl"));
    }

    // p.pointLight(255, 255, 255, p.width/2, p.height/2, 50);


    let boundary = new Rectangle(400, 400, 400, 400);
    let qtree = new QuadTree(boundary, 4);

    let mode = false;
    //if(p.millis() * 0.001 % 4 < 2) mode = true;
    for (let i in particles) {
      let pt = particles[i];
      let point = new Point(pt.x, pt.y, pt);
      qtree.insert(point);


      pt.move(mode);
      pt.render();
      pt.setHighlight(false);
    }

    for (let i in particles) {
      let pt = particles[i];
      let range = new Circle(pt.x, pt.y, pt.r * 2);
      let points = qtree.query(range);
      for (let i in points) {
        let point = points[i];
        let other = point.userData;
        // for (let other of particles) {
        if (pt !== other && pt.intersects(other)) {
          pt.setHighlight(true, other);
        }
      }
    }

    p.g.filter(blur);
    // p.g.filter(blur);
    p.g.filter(shader);

  }

};

var myp5 = new p5(s);