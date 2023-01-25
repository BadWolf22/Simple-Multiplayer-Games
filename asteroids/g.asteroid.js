// TODO: Asteroid-Asteroid && Asteroid-Ship Collisisons (bonk around)
// TODO: Center of mass for asteroid rotation
// IDEA: Mega Asteroids (Split into like a million small ones)

class Asteroid {
    constructor(asteroids, x=random(width), y=random(height), splits=4) {
        const MAX_VEL = 15;
        this.pos = createVector(x, y);
        this.vel = createVector(random(-MAX_VEL, MAX_VEL), random(-MAX_VEL, MAX_VEL));
        this.splits = splits;
        this.asteroids = asteroids;
        this.radii = [];
        this.scale = 3;
        this.angle = 0;
        this.rotation = random(-2, 2) * PI/20
        let numPoints = random(6, 10);
        for (let i = 0; i < numPoints; i++) {
            this.radii.push(random(1, 4));
        }
    }

    update() {
        this.pos.add(this.vel.copy().mult(deltaTime/50));
        this.pos.x = (this.pos.x + width) % width;
        this.pos.y = (this.pos.y + height) % height;
        this.angle += this.rotation * deltaTime/50;
    }

    display() {
        // FIXME: This is probably not the best for performance, but it could probably be worse.
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                push();
                translate(width*i+this.pos.x, height*j+this.pos.y);
                rotate(this.angle);

                beginShape();
                for (let point in this.radii) {
                    let a = map(point, 0, this.radii.length, 0, TWO_PI);
                    vertex(this.radii[point]*cos(a)*this.splits*this.scale, this.radii[point]*sin(a)*this.splits*this.scale);
                }
                vertex(this.radii[0]*cos(0)*this.splits*this.scale, this.radii[0]*sin(0)*this.splits*this.scale);
                endShape();
                pop();
            }
        }
    }

    hit() {
        this.die();
    }

    die() {
        this.asteroids.splice(this.asteroids.indexOf(this), 1);
        sounds["explosion"].play();
        
        if (this.splits <= 1) return;
        
        let numC = 2;
        for (let i = 0; i < numC; i++) {
            asteroids.push(new Asteroid(this.asteroids, this.pos.x, this.pos.y, this.splits-1));
        }
    }
}