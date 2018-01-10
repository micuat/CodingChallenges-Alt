// port of Daniel Shiffman's pde SolarSystemGenerator by madacoo

// instance mode by Naoto Hieda

var maxTrace = 1000;

var s = function (sketch) {

    var sun;
    var pg;

    sketch.setup = function () {
        sketch.createCanvas(800, 800);
        sun = new Planet(sketch, 50, 0, 0, sketch.random(sketch.TWO_PI));
        sun.spawnMoons(3, 1);

        pg = sketch.createGraphics(sketch.width, sketch.height);
    }

    sketch.draw = function () {
        // sketch.background();

        pg.beginDraw();
        // pg.background(0, 10);
        pg.translate(sketch.width/2, sketch.height/2);
        for(var i = 0; i < maxTrace; i++) {
            sun.show(i, pg);
        }
        pg.endDraw();
        sketch.image(pg, 0, 0);
        sun.orbit();
    }

};

var myp5 = new p5(s);