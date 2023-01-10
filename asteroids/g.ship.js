// TODO: Limit firing
// TODO: Death on collide
// IDEA: Shooting type (multi, rapid, precise, etc.)
// IDEA: Shield, lives

class Ship {
    constructor(bullets, x = width/2, y = height/2) {
        this.pos = createVector(x, y);
        this.vel = createVector(0, 0);
        this.acc = createVector(0, 1);
        this.facing = 0;
        this.thrust = 0;
        this.mass = 2;

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
    }

    fire() {
        let bullet = new Bullet(this.pos.copy(), this.facing - PI/2);
        this.bullets.push(bullet);
    }

    mousePressed(e) {
        if (e.which == 3) {
            this.thrust = 1;
        }
        if (e.which == 1) {
            this.fire();
        }
    }
    mouseReleased(e) {
        if (e.which == 3) {
            this.thrust = 0;
        }
    }

    display() {
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                push();
                translate(width*i+this.pos.x, height*j+this.pos.y);
                rotate(this.facing);
        
                triangle(0, -20, 10, 10, -10, 10);
        
                pop();
            }
        }
    }
}