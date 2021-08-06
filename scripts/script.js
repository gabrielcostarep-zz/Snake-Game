var stage = document.getElementById("stage");
var ctx = stage.getContext("2d");

const velocity = 1;
var velocityX = velocityY = 0;
var positionX = positionY = 6;
var lengthPoint = 35;
var quantityPoint = 20;
var appleX = appleY = 13;
var trail = [];
var tail = 5;

var lineClear = firstColumn = 0;
var lineDark = secondColumn = lengthPoint;

document.addEventListener("keydown", keyPush);

setInterval(game, 100);

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

    board("#263445", "#1F2836");

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
    }
}

function board(colorClear, colorDark) {
    for (let j = 0; j < quantityPoint * quantityPoint; j++) {

        ctx.fillStyle = colorClear;
        ctx.fillRect(lineClear, firstColumn, lengthPoint, lengthPoint);

        ctx.fillStyle = colorDark;
        ctx.fillRect(lineDark, firstColumn, lengthPoint, lengthPoint);

        lineClear += lengthPoint * 2;
        lineDark += lengthPoint * 2;

        if (lineClear > lengthPoint * quantityPoint - 1) {
            lineClear = 0;
            lineDark = lengthPoint;
            firstColumn += lengthPoint * 2;
        }
    }

    for (let k = 0; k < quantityPoint * quantityPoint; k++) {

        ctx.fillStyle = colorDark;
        ctx.fillRect(lineDark - lengthPoint, secondColumn, lengthPoint, lengthPoint);

        ctx.fillStyle = colorClear;
        ctx.fillRect(lineClear + lengthPoint, secondColumn, lengthPoint, lengthPoint);

        lineDark += lengthPoint * 2;
        lineClear += lengthPoint * 2;

        if (lineDark > lengthPoint * quantityPoint) {
            lineDark = lengthPoint;
            lineClear = 0;
            secondColumn += lengthPoint * 2;
        }
    }

    lineClear = firstColumn = 0;
    lineDark = secondColumn = lengthPoint;

}