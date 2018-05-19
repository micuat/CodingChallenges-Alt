// instance mode by Naoto Hieda

function Planet(radius, distance, orbitspeed, angle) {
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
            let d = p007.random(50, 150);
            let o = p007.random(-0.1, 0.1);
            let a = p007.random(p007.TWO_PI);
            this.planets.push(new Planet(r, d/level, o, a));
            if (level < 3) {
                let num = Math.floor(p007.random(0, 4));
                this.planets[i].spawnMoons(num, level+1);
            }
        }
    }


    this.show = function () {
        p007.push();
        p007.fill(255, 100);
        p007.rotate(this.angle);
        p007.translate(this.distance, 0);
        p007.ellipse(0, 0, this.radius*2);
        for (let i in this.planets) {
            this.planets[i].show();
        }
        p007.pop();
    }

}

