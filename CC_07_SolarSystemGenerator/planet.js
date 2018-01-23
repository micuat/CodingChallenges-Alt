// instance mode by Naoto Hieda

function Planet(sketch, radius, distance, orbitspeed, angle) {
    this.radius = radius;
    this.distance = distance;
    this.orbitspeed = orbitspeed;
    this.angle = angle;
    this.planets = [];

    this.orbit = function () {
        this.angle += this.orbitspeed;
        for (let i in this.planets) {
            this.planets[i].orbit();
        }
    }


    this.spawnMoons = function (total, level) {
        for (let i = 0; i < total; i++) {
            let r = this.radius/(level*2);
            let d = sketch.random(50, 150);
            let o = sketch.random(-0.1, 0.1);
            let a = sketch.random(sketch.TWO_PI);
            this.planets.push(new Planet(sketch, r, d/level, o, a));
            if (level < 3) {
                let num = Math.floor(sketch.random(0, 4));
                this.planets[i].spawnMoons(num, level+1);
            }
        }
    }


    this.show = function () {
        sketch.push();
        sketch.fill(255, 100);
        sketch.rotate(this.angle);
        sketch.translate(this.distance, 0);
        sketch.ellipse(0, 0, this.radius*2);
        for (let i in this.planets) {
            this.planets[i].show();
        }
        sketch.pop();
    }

}

