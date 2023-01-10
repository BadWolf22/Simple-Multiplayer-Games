// TODO: Collide with Asteroids
// TODO: Speed with deltaTime
// TODO: Bullet lifespan
// IDEA: Penetration
// IDEA: Speed
// IDEA: Lifespan

class Bullet {
    constructor(pos, facing) {
        const MAX_VEL = 15;
        this.pos = pos;
        this.vel = createVector(1, 0).setHeading(facing).setMag(MAX_VEL);
    }

    display() {
        push();
        translate(this.pos.x, this.pos.y);

        point(0, 0);
        pop();
    }

    update() {
        this.pos.add(this.vel.copy().mult(deltaTime/50));
        this.pos.x = (this.pos.x + width) % width;
        this.pos.y = (this.pos.y + height) % height;
    }
}