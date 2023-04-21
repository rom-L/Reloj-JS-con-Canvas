"use strict";
/** @type {HTMLCanvasElement} */


const CANVAS = document.querySelector("#my-canvas");
const CANVAS_WIDTH = CANVAS.width;
const CANVAS_HEIGHT = CANVAS.height;

const CTX = CANVAS.getContext("2d");
const CLOCK_RADIUS = CANVAS_HEIGHT / 2;

//muevo la posicion origen al centro del canvas
CTX.translate(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);



/******************* */
function drawClock() {
    drawClockFace();
    drawClockNumbers();
    updateTime();
}

function drawClockFace() {
    CTX.beginPath();


    CTX.arc(0, 0, CLOCK_RADIUS * 0.90, 0, 2 * Math.PI);
    CTX.fillStyle = "white";
    CTX.fill();

    CTX.strokeStyle = "black"
    CTX.lineWidth = 20;
    CTX.stroke();


    CTX.closePath();
}

function drawClockHours() {
    CTX.font = "30px Arial";
    CTX.textAlign = "center";
    CTX.textBaseline = "middle";
    CTX.fillStyle = "black";

    //dibuja los numeros de horas alrededor del reloj
    for (let i = 1; i <= 12; i++) {
        const angle = (i * Math.PI) / 6;
        const x = Math.sin(angle) * (CANVAS_WIDTH / 2 - 70);
        const y = -Math.cos(angle) * (CANVAS_HEIGHT / 2 - 70);
        CTX.fillText(i.toString(), x, y);
    }

}

function drawClockMinutes() {
    CTX.font = "11px Arial";
    CTX.textAlign = "center";
    CTX.textBaseline = "middle";
    CTX.fillStyle = "gray";

    //dibuja los numeros de segundos alrededor del reloj
    for (let i = 1; i <= 60; i++) {
        const angle = (i * Math.PI) / 30;
        const x = Math.sin(angle) * (CANVAS_WIDTH / 2 - 50);
        const y = -Math.cos(angle) * (CANVAS_HEIGHT / 2 - 50);
        CTX.fillText(i.toString(), x, y);
    }
}

function updateTime() {
    //consigue los valores en tiempo real
    const DATE = new Date();
    const SECONDS = DATE.getSeconds();
    const MINUTES = DATE.getMinutes();
    const HOURS = DATE.getHours();

    //se dibuja la hora
    const HOUR_POSITION = ((HOURS % 12) * Math.PI / 6) + (MINUTES * Math.PI / (6 * 60)) + (SECONDS * Math.PI / (360 * 60));
    drawClockHand(HOUR_POSITION, CLOCK_RADIUS * 0.4, 11, "black");

    //se dibujan los minutos
    const MINUTE_POSITION = (MINUTES*Math.PI/30)+(SECONDS*Math.PI/(30*60));
    drawClockHand(MINUTE_POSITION, CLOCK_RADIUS * 0.7, 9, "darkblue");

    //se dibujan los segundos
    const SECOND_POSITION = (SECONDS*Math.PI/30);
    drawClockHand(SECOND_POSITION, CLOCK_RADIUS * 0.8, 2, "red");

}

//dibuja una manecilla
function drawClockHand(pos, length, width, style) {
    CTX.beginPath();

    CTX.lineWidth = width;
    CTX.lineCap = "round";
    CTX.moveTo(0, 0);
    CTX.rotate(pos);
    CTX.lineTo(0, -length);
    CTX.strokeStyle = style;
    CTX.stroke();
    CTX.rotate(-pos);

    CTX.closePath();
}

function drawClockNumbers() {
    drawClockHours();
    drawClockMinutes();
}


setInterval(drawClock, 1000);