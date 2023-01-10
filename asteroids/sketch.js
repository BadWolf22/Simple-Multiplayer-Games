let player;
let asteroids = [];
let bullets = [];

function setup() {
    createCanvas(windowWidth, windowHeight);

    player = new Ship(bullets);
    for (let i = 0; i < 10; i++) {
        asteroids.push(new Asteroid());
    }

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
    }
    player.update();

    
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