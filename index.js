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
// !
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
let panel = document.querySelector(".panel");
let wholePanel = document.querySelector("#whole-panel")
let startStopButton = document.querySelector("#start-stop");
let background = document.querySelector("#background");
let circle = document.querySelector("#circle");
let square = document.querySelector("#square");
let triangle = document.querySelector("#triangle");
let line = document.querySelector("#line");
let isOn = false;
let isShowing = true;
let interval;
let sizeIsDisabled = false;
let opacityIsDisabled  = false;


const SQUARES = "squares";
const CIRCLES = "circles";
const TRIANGLES = "triangles";
const LINES = "lines";

let speed = document.querySelector("#speed");
let size = document.querySelector("#size");
let opacity = document.querySelector("#opacity");
let randomSize = document.querySelector("#size-check");
let randomOpacity = document.querySelector("#opacity-check");
let sizeVal;
let opacityVal;
let shape;

function openClosePanel() {
    if (isShowing) {
        wholePanel.setAttribute("style", "left: -21rem");
        isShowing = !isShowing;
    } else {
        wholePanel.setAttribute("style", "left: 0");
        isShowing = !isShowing;
    }
}

function changeStatus() {
    isOn = !isOn;
    if (isOn) {
        startStopButton.textContent = "Stop";
        startStopButton.classList.remove("btn-success");
        startStopButton.classList.add("btn-primary");
        createInterval();
    } else {
        clearInterval(interval);
        startStopButton.textContent = "Start";
        startStopButton.classList.remove("btn-primary");
        startStopButton.classList.add("btn-success");
    }
}
function dataChanged() {
    clearInterval(interval);
    if (isOn) {
        createInterval();
    }
}

function createInterval() {
    if (circle.checked){
        shape = CIRCLES;
    }else if (square.checked){
        shape = SQUARES;
    }else if (triangle.checked){
        shape = TRIANGLES;
    }else if (line.checked){
        shape = LINES;
    }
    interval = setInterval(() => {
        if(randomSize.checked){
            sizeVal = randomInt(1, 150);
        }else{
            sizeVal = size.value;
        }
        if(randomOpacity.checked){
            opacityVal = randomInt(0, 100);
        }else{
            opacityVal = opacity.value;
        }
        ctx.fillStyle = `${hexToRgbA(colorSelector.value)},${
            opacityVal / 100
        })`;
        ctx.beginPath();
        posX = randomInt(0, w);
        posY = randomInt(0, h);
        if (shape === SQUARES) ctx.rect(posX, posY, sizeVal, sizeVal);
        if (shape === CIRCLES) ctx.arc(posX, posY, sizeVal/2, 0, 2 * Math.PI);
        if (shape === LINES) ctx.rect(posX, posY, sizeVal, sizeVal/32);
        if (shape === TRIANGLES) {
            ctx.moveTo(posX, posY);
            ctx.lineTo(posX + sizeVal / 2, posY - sizeVal);
            ctx.lineTo(posX + sizeVal / 1, posY);
        };
        ctx.fill();
        ctx.closePath();
    }, 1500 - speed.value);
}

function disableSize(){
    if (!sizeIsDisabled){
        size.setAttribute('disabled', 'true')
    }else{
        size.removeAttribute('disabled')
    }
    sizeIsDisabled = !sizeIsDisabled
}

function disableOpacity(){
    if (!opacityIsDisabled){
        opacity.setAttribute('disabled', 'true')
    }else{
        opacity.removeAttribute('disabled')
    }
    opacityIsDisabled = !opacityIsDisabled
}

function changeBackground() {
    ctx.fillStyle = background.value;
    ctx.fillRect(0, 0, w, h);
}

function resetCanvas() {
    ctx.clearRect(0, 0, w, h);
    clearInterval(interval);
    isOn = false;
    background.value = "#000000";
    changeBackground();
    startStopButton.textContent = "Start";
    startStopButton.classList.remove("btn-primary");
    startStopButton.classList.add("btn-success");
}

function hexToRgbA(hex) {
    var c;
    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
        c = hex.substring(1).split("");
        if (c.length == 3) {
            c = [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        c = "0x" + c.join("");
        return "rgba(" + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(",");
    }
    throw new Error("Bad Hex");
}

function download() {
    var link = document.createElement("a");
    link.download = "my-background.png";
    link.href = document.getElementById("canvas").toDataURL();
    link.click();
    startStopButton.textContent = "Start";
    startStopButton.classList.remove("btn-primary");
    startStopButton.classList.add("btn-success");
}

canvas.addEventListener('click', (e) => {
    console.log(e)
    createFigureOnClick(e)
})

function createFigureOnClick(e){
    if(randomSize.checked){
        sizeVal = randomInt(1, 150);
    }else{
        sizeVal = size.value;
    }
    if (circle.checked){
        posX = e.pageX;
        posY = e.pageY;
        shape = CIRCLES;
    }else if (square.checked){
        posX = e.pageX - sizeVal/2;
        posY = e.pageY - sizeVal/2;
        shape = SQUARES;
    }else if (triangle.checked){
        posX = e.pageX - sizeVal/2;
        posY = e.pageY + sizeVal/3;
        shape = TRIANGLES;
    }else if (line.checked){
        posX = e.pageX - sizeVal/2;
        posY = e.pageY;
        shape = LINES;
    }
    ctx.beginPath();
        if(randomOpacity.checked){
            opacityVal = randomInt(0, 100);
        }else{
            opacityVal = opacity.value;
        }
        ctx.fillStyle = `${hexToRgbA(colorSelector.value)},${
            opacityVal / 100
        })`;
        if (shape === SQUARES) ctx.rect(posX, posY, sizeVal, sizeVal);
        if (shape === CIRCLES) ctx.arc(posX, posY, sizeVal/2, 0, 2 * Math.PI);
        if (shape === LINES) ctx.rect(posX, posY, sizeVal, sizeVal/32);
        if (shape === TRIANGLES) {
            ctx.moveTo(posX, posY);
            ctx.lineTo(posX + sizeVal / 2, posY - sizeVal);
            ctx.lineTo(posX + sizeVal / 1, posY);
        };
        ctx.fill();
        ctx.closePath();
}

changeBackground();
