var stage = document.getElementById("stage");
var ctx = stage.getContext("2d");

const velocity = 1;
var velocityX = velocityY = 0;
var positionX = positionY = 6;
var lengthPoint = 30;
var quantityPoint = 20;
var appleX = appleY = 13;
var trail = [];
var tail = 5;

var lineClear = 0;
var lineDark = lengthPoint;
var column = 0;

document.addEventListener("keydown", keyPush);

setInterval(game, 120);

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

    // Não está atualizando conforme a cobrinha atualiza
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
        ctx.fillRect(lineClear, column, lengthPoint, lengthPoint);

        ctx.fillStyle = colorDark;
        ctx.fillRect(lineDark, column, lengthPoint, lengthPoint);

        lineClear += lengthPoint * 2;
        lineDark += lengthPoint * 2;

        // Acredito que o erro esteja nesses ifs
        if (lineClear > lengthPoint * quantityPoint) {
            lineClear = 0;
            column += lengthPoint;
        }

        if (lineDark > lengthPoint * quantityPoint) {
            lineDark = 0;
            column += lengthPoint;
        }
    }
}