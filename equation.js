genEq = [];

function TranslateEquation() {
    //Processes / Formats equation before attempting graphing
    let formattedEq = [];

    for (let i = 0; i < genEq.length; i++) {
        if (['sin(', 'cos(', 'tan('].includes(genEq[i])) {
            formattedEq[i] = "Math." + genEq[i];
        }
        else if (genEq[i][0] == "^") {
            formattedEq[i] = "**" + genEq[i].slice(1);
        }
        else {
            formattedEq[i] = genEq[i];
        }
    }

    //Adds * between equations that need it
    //Increments by spaces between each set of items
    let blacklist = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '-', '*', '/'];
    let numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    let symbols = ['+', '-', '*', '/'];

    let newFormattedEq = [];

    for (let i = 0; i < formattedEq.length - 1; i++) {
        let a = formattedEq[i];
        let b = formattedEq[i + 1];

        newFormattedEq.push(a);

        if (!(symbols.includes(a) || symbols.includes(b))) {
            //Neither are symbols
            if (!(numbers.includes(a) && numbers.includes(b))) {
                //Both are not numbers
                if (!a.includes("(") && !b.includes(")")) {
                    //Stops cases such as (* and *)
                    if (!b.includes("**")) {
                        //Ensures ) is not followed by exponent
                        newFormattedEq.push("*");
                    }
                }
            }
        }

        //Last iteration; append b as well
        if (i == formattedEq.length - 2) {
            newFormattedEq.push(b);
        }
    }

    if (formattedEq.length == 1) {
        newFormattedEq.push(formattedEq[0]);
    }

    //console.log(newFormattedEq, formattedEq);

    CalculateGraph(newFormattedEq.join(''));
}

function KeyPressed(key) {
    if (snakeRunning) {
        return;
    }
    else {

        if (Number.isInteger(key)) {
            genEq.push(key.toString())
        }

        if (key == "+") {
            genEq.push("+");
        }

        if (key == "-") {
            if (!(['+', '-', '*', '/', '|'].includes(genEq[genEq.length - 1]))) {
                genEq.push("-");
            }
        }

        if (key == "*") {
            genEq.push("*");
        }

        if (key == "/") {
            genEq.push("/");
        }


        if (key == "|") {
            genEq.push("|");
        }

        if (key == "s") {
            genEq.push("sin(");
        }

        if (key == "c") {
            genEq.push("cos(");
        }

        if (key == "t") {
            genEq.push("tan(");
        }

        if (key == "^-1") {
            if (!['^-1', '^2', '^3'].includes(genEq[genEq.length - 1]) && genEq.length > 0) {
                genEq.push("^-1");
            }
        }

        if (key == "^2") {
            if (!['^-1', '^2', '^3'].includes(genEq[genEq.length - 1]) && genEq.length > 0) {
                genEq.push("^2");
            }
        }

        if (key == "^3") {
            if (!['^-1', '^2', '^3'].includes(genEq[genEq.length - 1]) && genEq.length > 0) {
                genEq.push("^3");
            }
        }

        if (key == "open") {
            genEq.push("(");
        }

        if (key == "close") {
            genEq.push(")");
        }

        if (key == "x") {
            genEq.push("x")
        }

        if (key == "backspace") {
            genEq.pop();
        }

        if (key == "clear") {
            genEq = [];
        }

        if (key == "enter") {
            RunSnake();
        }

        DisplayEquation();
    }
}

function DisplayEquation() {
    //console.log(genEq);
    TranslateEquation();

    document.getElementById("equation").innerHTML = "";

    for (let i = 0; i < genEq.length; i++) {
        if (genEq[i][0] == "^") {
            document.getElementById("equation").innerHTML += "<sup>" + genEq[i].slice(1) + "</sup>";
        } else {
            document.getElementById("equation").innerHTML += genEq[i];
        }
    }

    if (document.getElementById("equation").innerHTML == "") {
        document.getElementById("equation").innerHTML = "No equation entered";
    }
}

function isLastCharacterNumber() {
    lastEntry = genEq[genEq.length - 1];
    if (lastEntry in ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']) {
        return true;
    } else {
        return false;
    }
}