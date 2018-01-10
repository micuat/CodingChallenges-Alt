// instance mode by Naoto Hieda

function Planet(sketch, radius, distance, orbitspeed, angle) {
    this.radius = radius;
    this.distance = distance;
    this.orbitspeed = orbitspeed;
    this.angle = angle;
    this.planets = [];
    this.trace = [];

    this.orbit = function () {
        this.trace.push({distance: this.distance, angle: this.angle});
        if(this.trace.length > maxTrace) this.trace.shift();
        this.angle += this.orbitspeed;
        for (var i in this.planets) {
            this.planets[i].orbit();
        }
    }


    this.spawnMoons = function (total, level) {
        for (var i = 0; i < total; i++) {
            var r = this.radius/(level);
            var d = sketch.random(50, 250);
            var o = 0.1 / r;//sketch.random(-0.03, 0.03);
            var a = sketch.random(sketch.TWO_PI);
            this.planets.push(new Planet(sketch, r, d/level, o, a));
            if (level < 4) {
                var num = Math.floor(sketch.random(1, 2));
                this.planets[i].spawnMoons(num, level+1);
            }
        }
    }


    // http://inconvergent.net/grains-of-sand/

    this.show = function (index, pg) {
        if(index >= this.trace.length) return;

        var alpha = index;
        if(index > maxTrace/2) alpha = maxTrace - alpha;
        alpha = sketch.map(alpha, 0, maxTrace/2, 0, 5);

        // sketch.stroke(255, alpha);
        pg.stroke(255, 5);
        // pg.stroke(255, alpha);
        // pg.fill(255, alpha);

        pg.pushMatrix();
        pg.rotate(this.trace[index].angle);
        pg.translate(this.trace[index].distance, 0);

        var x = sketch.random(0, 2 * sketch.PI);
        var y = sketch.randomGaussian() * this.radius;

        pg.point(y * sketch.cos(x), y * sketch.sin(x));

        // sketch.ellipse(0, 0, this.radius*2);
        for (var i in this.planets) {
            this.planets[i].show(index, pg);
        }
        pg.popMatrix();
    }

}

