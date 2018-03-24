var tentacle;
var pg;

// instance mode by Naoto Hieda

var s = function (sketch) {

    sketch.setup = function () {
        sketch.createCanvas(800, 800);

        // We're building the positional p5.Vector for the first segment's
        // point a because of how we're handling JavaScript's lack of
        // functional overloading (see segment.js for more information)
        let x = 0;
        let y = 0;
        let pos = new p5.Vector(x, y);

        let len = 75;
        tentacle = new Segment(sketch, pos, len, 0, 0);

        let current = tentacle;
        for (let i = 0; i < 5; i++) {
            let next = new Segment(sketch, current, len, 0, i);
            current.child = next;
            current = next;
        }

        pg = sketch.createGraphics(800, 800);
        pg.beginDraw();
        pg.background(0);
        pg.endDraw();
    }

    sketch.draw = function () {
        sketch.background(0);

        let mode = 0;
        if(sketch.millis() * 0.001 % 4 < 2) {
            mode = 0;
        }
        else {
            mode = 1;
        }
    
        pg.beginDraw();
        pg.noStroke();

        if(mode == 0) {
            pg.fill(0, 10);
        }
        else {
            pg.fill(0, 255);
        }
        pg.rect(0, 0, 800, 400);
        if(mode == 0) {
            pg.fill(0, 10);
        }
        else {
            pg.fill(0, 255);
        }
        pg.rect(0, 400, 800, 400);
        pg.translate(sketch.width / 2, sketch.height / 2);

        pg.rotate(sketch.PI/2);
        // pg.background(0);

        let next = tentacle;
        while (next) {
            next.wiggle();
            next.update();
            next.show(pg, mode==0?100:255);
            next = next.child;
        }

        // pg.rotate(sketch.PI);
        pg.scale(1, -1)
        next = tentacle;
        while (next) {
            next.wiggle();
            next.update();
            next.show(pg, mode==0?100:255);
            next = next.child;
        }
        pg.endDraw();

        sketch.blendMode(sketch.ADD);
        sketch.tint(200);
        sketch.image(pg, 0, 0, 800, 800);
    }

};

var myp5 = new p5(s);
