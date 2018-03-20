let tentacle;

// instance mode by Naoto Hieda

var s = function (sketch) {

    sketch.setup = function () {
        sketch.createCanvas(600, 400);

        // We're building the positional p5.Vector for the first segment's
        // point a because of how we're handling JavaScript's lack of
        // functional overloading (see segment.js for more information)
        let x = sketch.width / 2;
        let y = sketch.height;
        let pos = new p5.Vector(x, y);

        tentacle = new Segment(sketch, pos, 50, 0, 0);

        let current = tentacle;
        for (let i = 0; i < 5; i++) {
            let next = new Segment(sketch, current, 50, 0, i);
            current.child = next;
            current = next;
        }
    }

    sketch.draw = function () {
        sketch.background(51);

        let next = tentacle;
        while (next) {
            next.wiggle();
            next.update();
            next.show();
            next = next.child;
        }
    }

};

var myp5 = new p5(s);
