let player;
let asteroids = [];
let bullets = [];

let sounds = {};

// TODO: Fixed width & height, moving camera (standardize across screens)
// IDEA: Earn money to spend on upgrades, lose a bunch on death (repair costs)

function preload() {
    sounds["shoot"] = loadSound("./assets/shoot.wav");
    sounds["laser"] = loadSound("./assets/laser.wav");
    sounds["engine"] = loadSound("./assets/engine.wav");
    sounds["engine"].playMode("restart");
    sounds["explosion"] = loadSound("./assets/explosion.wav");
    sounds["death"] = loadSound("./assets/death.wav");
}

function setup() {
    createCanvas(windowWidth, windowHeight);

    player = new Ship(bullets);
    for (let i = 0; i < 10; i++) {
        asteroids.push(new Asteroid(asteroids));
    }

    rectMode(CENTER);
    stroke(255);
    strokeWeight(2);
    noFill();
    frameRate(144);
    window.addEventListener("contextmenu", e => e.preventDefault());
}

function draw() {
    background(51);

    for (let asteroid of asteroids) {
        asteroid.update();
    }
    for (let bullet of bullets) {
        bullet.update();
        // FIXME: this should be optimized using spatial hashing or something
        // It is bad to just loop through them all (hence why I had issues in the first place)
        for (let asteroid of asteroids) {
            if (bullet.collide(asteroid)) break;
        }
    }
    player.update();
    for (let asteroid of asteroids) {
        if (player.collide(asteroid)) break;
    }

    
    for (let asteroid of asteroids) {
        asteroid.display();
    }
    for (let bullet of bullets) {
        bullet.display();
    }
    player.display();
}

function mousePressed(e) {
    player.mousePressed(e);
}
function mouseReleased(e) {
    player.mouseReleased(e);
}