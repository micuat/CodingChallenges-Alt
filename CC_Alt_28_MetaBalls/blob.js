// Basile Pesin
// http://vertmo.github.io

// MetaBalls : p5.js implementation

function Blob (sketch, x, y) {

    this.x = x;
    this.y = y;
    let angle = sketch.random(0, 2*sketch.PI);
    this.xspeed = sketch.random(2, 5)*Math.cos(angle);
    this.yspeed = sketch.random(2, 5)*Math.sin(angle);
    this.r = sketch.random(240, 480);

    this.update = function () {
        this.x += this.xspeed;
        this.y += this.yspeed;
        if(this.x > sketch.width || this.x < 0) this.xspeed *= -1;
        if(this.y > sketch.height || this.y < 0) this.yspeed *= -1;
    }

    this.show = function () {
        sketch.noFill();
        sketch.stroke(0);
        sketch.strokeWeight(4);
        sketch.ellipse(this.x, this.y, this.r*2, this.r*2);
    }
}
