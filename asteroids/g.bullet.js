// TODO: Adds to velocity
// IDEA: Penetration Upgrades
// IDEA: Speed Upgrades
// IDEA: Lifespan Upgrades
// IDEA: Homing bullets (steering force)

class Bullet {
    constructor(bullets, pos, facing) {
        const MAX_VEL = 15;
        this.bullets = bullets;
        this.pos = pos;
        this.lifeSpan = 3000;
        this.penetration = 1;
        this.vel = createVector(1, 0).setHeading(facing).setMag(MAX_VEL);
    }

    display() {
        push();
        translate(this.pos.x, this.pos.y);

        // point(0, 0);
        ellipse(0,0, 6);
        pop();
    }

    update() {
        this.pos.add(this.vel.copy().mult(deltaTime/50));
        this.pos.x = (this.pos.x + width) % width;
        this.pos.y = (this.pos.y + height) % height;
        this.lifeSpan -= deltaTime;
        if (this.lifeSpan <= 0) this.hit();
    }

    // FIXME: Must be made more accurate
    collide(obj) {
        if (dist(this.pos.x, this.pos.y, obj.pos.x, obj.pos.y) < 20) {
            this.hit();
            obj.hit();
            return true;
        }
        return false;
    }

    hit() {
        this.die();
        // Here can go special effects.
    }
    die() {
        this.bullets.splice(this.bullets.indexOf(this), 1);
    }
}