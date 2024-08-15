let level = 2;

let snakeRunning;
let snakeCanMove = false;

let coins = [];

function DrawCoins() {
    if (coins.length == 0) {
        level++;

        for (let i = 0; i < level; i++) {
            coins.push(Math.random() * 900 + 50);
            coins.push(Math.random() * 900 + 50);
        }
    }

    //Draw coins in array, stored in [x, y, x, y, x, y]
    for (let i = 0; i < coins.length; i += 2) {
        let x = coins[i]
        let y = coins[i + 1];

        DrawCircle(x, y, "green");
    }
}

function DrawCircle(x, y, color) {
    ctx.beginPath();
    ctx.arc(x, y, 20, 0, Math.PI * 2)
    ctx.fillStyle = color;
    ctx.fill()
    ctx.closePath();
}

function RunSnake() {
    if (!snakeCanMove || genEq.length == 0) {
        return;
    }

    snakeRunning = true;

    let xPos = 0;
    snakeDrawLoop = setInterval(function () {
        //Redraws graph
        Redraw();

        let nodeOffset = 3;
        for (let i = 0; i < level; i++) {
            DrawCircle((xPos * 10) - (nodeOffset * i * 10), snakeHeights[xPos - (nodeOffset * i)], "red");
        }

        CalculateCollectedCoin(xPos * 10, snakeHeights[xPos]);

        xPos++;

        if (xPos > 100 + (nodeOffset * level)) {
            snakeRunning = false;
            clearInterval(snakeDrawLoop);
        }
    }, 30);
}

function CalculateCollectedCoin(x, y) {
    if (x >= 1000) {
        //y is undefined past 1000
        return;
    }

    //console.log(x, y);

    let newCoinsList = [];

    for (let i = 0; i < coins.length; i += 2) {
        //console.log(x, y, coins[i], coins[i + 1]);
        if (CompareCoordinates(x, coins[i]) && CompareCoordinates(y, coins[i + 1])) {
            console.log("Coin hit at", coins[i], coins[i + 1]);
        } else {
            newCoinsList.push(coins[i]);
            newCoinsList.push(coins[i + 1]);
        }

        //console.log(newCoinsList);
    }

    coins = [];
    for (let i = 0; i < newCoinsList.length; i++) {
        coins.push(newCoinsList[i]);
    }
    //console.log(newCoinsList);
}

let maxDifference = 30;
function CompareCoordinates(coord1, coord2) {
    //console.log("Space Diff", Math.abs(coord1 - coord2));
    if (Math.abs(coord1 - coord2) < maxDifference) {
        return true;
    } else {
        return false;
    }
}