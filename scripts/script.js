var stage = document.getElementById("stage");
var ctx = stage.getContext("2d");

const velocity = 1;
var velocityX = velocityY = 0;
var positionX = positionY = 10;
var lengthPoint = 30;
var quantityPoint = 20;
var appleX = appleY = 15;
var trail = [];
var tail = 5;

document.addEventListener("keydown", keyPush);

setInterval(game, 85);

function game() {
    positionX += velocityX;
    positionY += velocityY;

    if (positionX < 0) {
        positionX = quantityPoint - 1;
    }

    if (positionX > quantityPoint - 1) {
        positionX = 0;
    }

    if (positionY < 0) {
        positionY = quantityPoint - 1;
    }

    if (positionY > quantityPoint - 1) {
        positionY = 0;
    }

    ctx.fillStyle = "#263445";
    ctx.fillRect(0, 0, stage.width, stage.height);

    ctx.fillStyle = "#fd4a4a";
    ctx.fillRect(appleX * lengthPoint, appleY * lengthPoint, lengthPoint, lengthPoint);

    ctx.fillStyle = "#2D8BD4";
    for (let i = 0; i < trail.length; i++) {
        ctx.fillRect(trail[i].x * lengthPoint, trail[i].y * lengthPoint, lengthPoint - 1, lengthPoint - 1);

        if (trail[i].x == positionX && trail[i].y == positionY) {
            velocityX = velocityY = 0;
            tail = 5;
        }
    }

    trail.push({ x: positionX, y: positionY });
    while (trail.length > tail) {
        trail.shift();
    }

    if (appleX == positionX && appleY == positionY) {
        tail++;
        appleX = Math.floor(Math.random() * quantityPoint);
        appleY = Math.floor(Math.random() * quantityPoint);
    }
}

function keyPush(event) {
    switch (event.keyCode) {
        case 37: // Left
            velocityX = -velocity;
            velocityY = 0;
            break;

        case 38: // Up
            velocityX = 0;
            velocityY = -velocity;
            break;

        case 39: // Right
            velocityX = velocity;
            velocityY = 0;
            break;

        case 40: // Down
            velocityX = 0;
            velocityY = velocity;
            break;

        default:
            break;
    }
}