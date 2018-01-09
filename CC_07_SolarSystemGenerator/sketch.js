// port of Daniel Shiffman's pde SolarSystemGenerator by madacoo

// instance mode by Naoto Hieda

var s = function (sketch) {

    this.sun;
    
    sketch.setup = function () {
        sketch.createCanvas(600, 600);
        this.sun = new Planet(sketch, 50, 0, 0, sketch.random(sketch.TWO_PI));
        this.sun.spawnMoons(5, 1);
    }

    sketch.draw = function () {
        sketch.background(51);
        sketch.translate(sketch.width/2, sketch.height/2);
        this.sun.show();
        this.sun.orbit();
    }

};

var myp5 = new p5(s);