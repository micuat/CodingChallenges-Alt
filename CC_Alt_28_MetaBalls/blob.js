// Basile Pesin
// http://vertmo.github.io

// MetaBalls : p5.js implementation

function Blob(sketch, i, x, y) {
    this.i = i;
    this.x = x;
    this.y = y;
    let angle = sketch.random(0, 2 * sketch.PI);
    this.xspeed = sketch.random(2, 5) * Math.cos(angle);
    this.yspeed = sketch.random(2, 5) * Math.sin(angle);
    this.r = 400;//sketch.random(240, 480);

    this.tsin = function (x, n) {
        x = x % sketch.PI;
        let y = 0;
        for(let i = 0; i < n; i++) {
            let frac = 1;
            for(let j = 2; j < i * 2 + 1; j++) {
                frac *= j;
            }
            y += ((i%2==0)?1:-1) / frac * sketch.pow(x, 2 * i + 1);
        }
        return y;
    }
    this.tcos = function (x, n) {
        x = x % sketch.PI;
        let y = 0;
        for(let i = 0; i < n; i++) {
            let frac = 1;
            for(let j = 2; j < i * 2; j++) {
                frac *= j;
            }
            y += ((i%2==0)?1:-1) / frac * sketch.pow(x, 2 * i);
        }
        return y;
    }
    this.update = function () {
        let t = sketch.millis() * 0.001;
        let R = 250;
        let p = 0.95;
        if (false && t % 3 < 1.5) {
            if (i % 3 == 0) {
                t *= -1;
                R = 250;
            }
            else if (i % 3 == 1) {
                t *= 2;
                R = 200;
            }
            else {
    
            }
            this.x = this.x * p + (1-p) * (R * sketch.cos(t + i / 15 * sketch.TWO_PI) + sketch.width / 2);
            this.y = this.y * p + (1-p) * (R * sketch.sin(t + i / 15 * sketch.TWO_PI) + sketch.width / 2);
        }
        else {
            let n = t % 4 + 1 + i%2;
            this.x = this.x * p + (1-p) * (R * this.tcos(t + i / 15 * sketch.TWO_PI, n) + sketch.width / 2);
            this.y = this.y * p + (1-p) * (R * this.tsin(t + i / 15 * sketch.TWO_PI, n) + sketch.width / 2+100);
        }
        // this.x += this.xspeed;
        // this.y += this.yspeed;
        // if(this.x > sketch.width || this.x < 0) this.xspeed *= -1;
        // if(this.y > sketch.height || this.y < 0) this.yspeed *= -1;

    }

    this.show = function () {
        sketch.noFill();
        sketch.stroke(0);
        sketch.strokeWeight(4);
        sketch.ellipse(this.x, this.y, this.r * 2, this.r * 2);
    }
}
