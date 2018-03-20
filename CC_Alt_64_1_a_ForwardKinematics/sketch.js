var tentacles = [];

// instance mode by Naoto Hieda

var s = function (sketch) {

    sketch.setup = function () {
        sketch.createCanvas(800, 800);

        // We're building the positional p5.Vector for the first segment's
        // point a because of how we're handling JavaScript's lack of
        // functional overloading (see segment.js for more information)

        for (let j = 0; j < 32; j++) {
            let x = sketch.map(j, 0, 31, 0, sketch.width);
            let y = sketch.height;
            let pos = new p5.Vector(x, y);

            tentacle = new Segment(sketch, 0.25*j, pos, sketch.height/21, 0);

            let current = tentacle;
            for (let i = 0; i < 20; i++) {
                let next = new Segment(sketch, (j+3) * 0.1, current, sketch.height/21, 0);
                current.child = next;
                current = next;
            }
            tentacles.push(tentacle);
        }
    }

    sketch.draw = function () {
        sketch.background(0);

        for (let i in tentacles) {
            let next = tentacles[i];
            while (next) {
                next.wiggle();
                next.update();
                next.show();
                next = next.child;
            }
        }
    }

};

var myp5 = new p5(s);
