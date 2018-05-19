// port of Daniel Shiffman's pde SolarSystemGenerator by madacoo

// instance mode by Naoto Hieda

var s = function (p) {

    var sun;

    p.setup = function () {
        p.createCanvas(600, 600);
        sun = new Planet(50, 0, 0, p.random(p.TWO_PI));
        sun.spawnMoons(5, 1);
    }

    p.draw = function () {
        p.background(51);
        p.translate(p.width/2, p.height/2);
        sun.show();
        sun.orbit();
    }

};

var p007 = new p5(s);