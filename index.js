let w = window.innerWidth;
let h = window.innerHeight;
let w2 = w / 2;
let h2 = h / 2;

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

/** @type HTMLCanvasElement */
const canvas = document.querySelector("#canvas");

/** @type CanvasRenderingContext2D */
const ctx = canvas.getContext("2d");

canvas.setAttribute("width", w);
canvas.setAttribute("height", h);

let posX, posY, scale;

// PROCESS 1

// for (let i = 0; i < 1000; i++) {
//     ctx.fillStyle = `rgba( ${randomInt(0,255)}, ${randomInt(0,255)}, ${randomInt(0,255)}, .5)`;
//     ctx.beginPath();
//     posX = randomInt(0, w);
//     posY = randomInt(0, h);
//     scale = randomInt(5, 25);
//     ctx.arc(posX, posY, scale, 0, 2 * Math.PI);
//     ctx.fill();
//     ctx.closePath();
// }

////////////////////////////////////////////////////////////////////////////////////

// PROCESS 2

// setInterval(() => {
//     ctx.fillStyle = `rgba( ${randomInt(0,255)}, ${randomInt(0,255)}, ${randomInt(0,255)}, .5)`;
//     ctx.beginPath();
//     posX = randomInt(0, w);
//     posY = h2;
//     scale = randomInt(5, 25);
//     ctx.arc(posX, posY, scale, 0, 2 * Math.PI);
//     ctx.fill();
//     ctx.closePath();
// }, 100000);

////////////////////////////////////////////////////////////////////////////////////

// PROCESS 3

// Array(w)
//     .fill()
//     .forEach((_) => {
//         ctx.fillStyle = `rgba( ${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)}, .5)`;
//         ctx.beginPath();
//         posX = randomInt(0, w);
//         posY = randomInt(0, h);
//         scale = randomInt(5, 25);
//         ctx.arc(posX, posY, scale, 0, 2 * Math.PI);
//         ctx.fill();
//         ctx.closePath();
//     });

////////////////////////////////////////////////////////////////////////////////////

// MOUSETRACKER!!!

// let paint = false;
// canvas.onclick = () => {
//     paint = !paint;

//     canvas.onmousemove = (e) => {
//         if (paint) createDot(e.x, e.y);
//     };
// };

// function createDot(posX, posY) {
//     ctx.fillStyle = `rgba( ${posX}, ${posY}, ${200}, ${(h - posY)/h})`;
//     ctx.beginPath();
//     scale = randomInt(50, 100);
//     ctx.arc(posX, posY, scale, 0, 2 * Math.PI);
//     ctx.fill();
//     ctx.closePath();
// }

////////////////////////////////////////////////////////////////////////////////////

// FUNCTION GENERATOR!!!

let colorSelector = document.querySelector("#colorpicker");
let isOn = false;
let interval;



function changeStatus() {
    isOn = !isOn;

    if (isOn) {
        interval = setInterval(() => {
            ctx.fillStyle = colorSelector.value;
            ctx.beginPath();
            posX = randomInt(0, w);
            posY = randomInt(0, h);
            scale = randomInt(5, 15);
            ctx.arc(posX, posY, scale, 0, 2 * Math.PI);
            ctx.fill();
            ctx.closePath();
        }, 50);
    }else{
        clearInterval(interval)
    }
}
