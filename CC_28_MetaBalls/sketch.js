// Basile Pesin
// http://vertmo.github.io

// MetaBalls : p5.js implementation

// instance mode by Naoto Hieda

var s = function (sketch) {
    var blobs = []

    sketch.setup = function () {
        sketch.createCanvas(400, 200);
        sketch.colorMode(sketch.HSB);
        for (i = 0; i < 10; i++)
            blobs.push(new Blob(sketch, sketch.random(0, sketch.width), sketch.random(0, sketch.height)));
    }

    sketch.draw = function () {
        sketch.background(51);

        sketch.loadPixels();
        for (x = 0; x < sketch.width; x++) {
            for (y = 0; y < sketch.height; y++) {
                let sum = 0;
                for (i = 0; i < blobs.length; i++) {
                    let xdif = x - blobs[i].x;
                    let ydif = y - blobs[i].y;
                    let d = sketch.sqrt((xdif * xdif) + (ydif * ydif));
                    sum += 10 * blobs[i].r / d;
                }
                sketch.set(x, y, sketch.color(sum, 255, 255));
            }
        }
        sketch.updatePixels();

        for (i = 0; i < blobs.length; i++) {
            blobs[i].update();
        }
    }

};

var myp5 = new p5(s);
