// IDEA: Shooting type (multi, rapid, precise, semi/full-auto, shotgun, etc.)
// IDEA: Shield, lives

class Ship {
    constructor(bullets, x = width/2, y = height/2) {
        this.pos = createVector(x, y);
        this.vel = createVector(0, 0);
        this.acc = createVector(0, 1);
        this.facing = 0;
        this.thrust = 0;
        this.mass = 2;
        this.firing = false;
        this.cooldown = 0;
        this.fireRate = 1;

        this.bullets = bullets;
    }

    update() {
        this.facing = createVector(this.pos.x - mouseX, this.pos.y - mouseY).heading() - PI/2;

        this.pos.add(this.vel.copy().mult(deltaTime/50));
        let acc = this.acc.copy();
        acc.setHeading(this.facing - PI/2);
        acc.setMag(this.thrust / this.mass);
        this.vel.add(acc.mult(deltaTime/50));
        if (acc.mag() == 0) {
            this.vel.mult(0.99);
        }
        this.pos.x = (this.pos.x + width) % width;
        this.pos.y = (this.pos.y + height) % height;

        this.cooldown -= deltaTime;
        if (this.firing && this.cooldown<=0) this.fire();
    }

    // TODO: Fire sound
    // TODO: Screenshake
    fire() {
        let bullet = new Bullet(this.bullets, this.pos.copy(), this.facing - PI/2);
        this.bullets.push(bullet);
        this.cooldown = 1000/this.fireRate;
        sounds["shoot"].play();
    }

    mousePressed(e) {
        if (e.which == 3) {
            this.thrust = 1;
            sounds["engine"].loop();
        }
        if (e.which == 1) {
            this.firing = true;
        }
    }
    mouseReleased(e) {
        if (e.which == 3) {
            this.thrust = 0;
            sounds["engine"].stop();
        }
        if (e.which == 1) {
            this.firing = false;
        }
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

    display() {
        // FIXME: This is probably not the best for performance, but it could probably be worse.
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                push();
                translate(width*i+this.pos.x, height*j+this.pos.y);
                
                push();
                rotate(this.facing);
                triangle(0, -20, 10, 10, -10, 10);
                pop();
                
                if (this.cooldown > 0) rect(0, 25, this.cooldown/(1000/this.fireRate)*40, 5);
        
                pop();
            }
        }
    }

    // TODO: Collide sound
    hit() {
        this.die();
    }

    // TODO: Death sound
    die() {
        draw = () => {background(255,0,0);};
        sounds["death"].play();
    }
}