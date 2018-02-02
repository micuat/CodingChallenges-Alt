// Basile Pesin
// http://vertmo.github.io

// MetaBalls : p5.js implementation

// instance mode by Naoto Hieda

var s = function (sketch) {
    var blobs = []
    var shader, shader_blur;

    sketch.setup = function () {
        sketch.createCanvas(800, 800);
        sketch.colorMode(sketch.HSB);
        shader = sketch.loadShader("../../CC_Alt_28_MetaBalls/frag.glsl");
        shader_blur = sketch.loadShader("../../CC_Alt_28_MetaBalls/blur.glsl");
        for (i = 0; i < 15; i++)
            blobs.push(new Blob(sketch, i, sketch.random(0, sketch.width), sketch.random(0, sketch.height)));
    }

    sketch.draw = function () {
        sketch.background(51);
        let blobArray = [];
        for(let i = 0; i < blobs.length; i++) {
            blobArray.push(blobs[i].x);
            blobArray.push(blobs[i].y);
            blobArray.push(blobs[i].r);
        }
        shader["set(java.lang.String, float)"]("width", sketch.width);
        shader["set(java.lang.String, float)"]("height", sketch.height);
        shader["set(java.lang.String, float[])"]("blobs", blobArray);

        sketch.fill(255);
        sketch.rect(0, 0, sketch.width, sketch.height);
        sketch.filter(shader);
        sketch.filter(shader_blur);
    
        for (i = 0; i < blobs.length; i++) {
            blobs[i].update();
        }
    }

};

var myp5 = new p5(s);
