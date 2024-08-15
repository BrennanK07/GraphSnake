let canvas = document.getElementById("gameWindow");
let ctx = canvas.getContext("2d");

let canvasSize = canvas.width;

let snakeHeights = [];

canvasRes = 1000;
function resizeCanvas() {
    let size = window.innerHeight * 0.6;
    canvas.style.width = size + 'px';
    canvas.style.height = size + 'px';

    canvas.width = canvasRes;
    canvas.height = canvasRes;

    canvasSize = size;
}

resizeCanvas();

Redraw();

//DrawGrid();
//CalculateGraph();

function CalculateGraph(equation) {
    DrawGrid();

    let genHeights = [];
    let resolution = 100;

    try {
        for (let i = 0; i < resolution; i++) {
            let x = -5 + ((i / resolution) * 10)
            let equationWithX = equation.replace('/x/g', x);

            genHeights.push(eval(equationWithX))
        }

        DrawGraph(genHeights);
        snakeCanMove = true;
    } catch (error) {
        console.log("Equation not complete or invalid");
        snakeCanMove = false;
        DrawCoins();
    }
}

//Ranges from equation domain [-1, 1]
function DrawGraph(heights) {
    let step = canvasRes / (heights.length - 1)
    let threshold = 1e1;

    snakeHeights = [];

    ctx.beginPath();
    ctx.lineWidth = 4;
    ctx.strokeStyle = "red"

    ctx.moveTo(-1, TransformY(heights[0]))
    for (i = 0; i < heights.length; i++) {
        //Move forward in increments of (width / heights.length)
        if (Math.abs(heights[i] - heights[i - 1]) > threshold) {
            //Asymptote detected; end current line and start new
            ctx.stroke();

            ctx.moveTo(step * i, TransformY(heights[i]));
        }
        else {
            ctx.lineTo(step * i, TransformY(heights[i]));
        }

        snakeHeights.push(TransformY(heights[i]));
    }

    ctx.stroke();

    DrawCoins();
}

function TransformY(y) {
    return ((canvasRes / 2) - (y * 100));
}

function DrawGrid() {
    //Clear screen first
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let gridLines = 10;
    let step = canvasRes / gridLines;

    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#aaaaaa"

    for (let i = 1; i < gridLines; i++) {
        ctx.moveTo(step * i, 0);
        ctx.lineTo(step * i, canvasRes);

        ctx.moveTo(0, step * i);
        ctx.lineTo(canvasRes, step * i);
    }
    ctx.stroke();

    ctx.beginPath();

    ctx.lineWidth = 3;
    ctx.strokeStyle = "#888888";

    ctx.moveTo(canvasRes / 2, 0);
    ctx.lineTo(canvasRes / 2, canvasRes);

    ctx.moveTo(0, canvasRes / 2);
    ctx.lineTo(canvasRes, canvasRes / 2);

    ctx.stroke();
}

function Redraw() {
    DrawGrid()
    TranslateEquation();
    DrawCoins();
}