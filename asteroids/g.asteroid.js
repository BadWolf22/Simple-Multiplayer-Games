// TODO: Collisions (bonking around)
// TODO: Speed with deltaTime
// TODO: Death (split into 2+ children)

class Asteroid {
    constructor(x=random(width), y=random(height), splits=10) {
        const MAX_VEL = 15;
        this.pos = createVector(x, y);
        this.vel = createVector(random(-MAX_VEL, MAX_VEL), random(-MAX_VEL, MAX_VEL));
        this.splits = splits;
        this.radii = [];
        let numPoints = random(6, 10);
        for (let i = 0; i < numPoints; i++) {
            this.radii.push(random(1, 4));
        }
    }

    update() {
        this.pos.add(this.vel.copy().mult(deltaTime/50));
        this.pos.x = (this.pos.x + width) % width;
        this.pos.y = (this.pos.y + height) % height;
    }

    display() {
        push();
        translate(this.pos.x, this.pos.y);

        beginShape();
        for (let point in this.radii) {
            let a = map(point, 0, this.radii.length, 0, TWO_PI);
            vertex(this.radii[point]*cos(a)*this.splits, this.radii[point]*sin(a)*this.splits);
        }
        vertex(this.radii[0]*cos(0)*this.splits, this.radii[0]*sin(0)*this.splits);
        endShape();
        pop();
    }
}