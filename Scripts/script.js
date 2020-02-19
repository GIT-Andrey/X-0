let areaArr = [];
let move = true;

jQuery(document).ready(createArea());

function createArea() {
    for (let i = 0; i < 9; i++) {
        $("<div></div>", {
            id: "div-" + i
        }).appendTo(".mainWrap");
        $("#div-" + i).click(isDivClick);
    };
    for (let i = 0; i < 9; i++) {
        $("<span></span>", {
            id: "span-" + i
        }).appendTo("#div-" + i);
        $("#span-" + i).html(' ');
    };
    $("#crossScore").html('0');
    $("#toeScore").html('0');
    $("#players").click(botSwich);
    $("#clear").click(scoreClear);
    areaUpdate();
}

function isDivClick(botMove) {
    let targetNumber = event.target.id.split('-');
    if (botMove >= 0 && botMove < 9) {
        $("#span-" + botMove).html('&#128939;');
        areaArr[botMove] = move;
        move = false;
        $("#moveIs").html("&#128901;");
        areaStatus();
    } else {
        if (areaArr[targetNumber[1]] == undefined) {
            move == true ? $("#span-" + targetNumber[1]).html('&#128939;') : $("#span-" + targetNumber[1]).html('&#128901;');
            areaArr[targetNumber[1]] = move;
            move = !move;
            move == true ? $("#moveIs").html("&#128939;") : $("#moveIs").html("&#128901;");
            areaStatus();
        }
    }
}

function areaStatus() {
    let endGame = true;
    for (let i = 0; i < 9; i++) {
        if (areaArr[i] == undefined) {
            endGame = false;
        }
    }
    if (
        areaArr[0] == !move && areaArr[1] == !move && areaArr[2] == !move ||
        areaArr[3] == !move && areaArr[4] == !move && areaArr[5] == !move ||
        areaArr[6] == !move && areaArr[7] == !move && areaArr[8] == !move ||
        areaArr[0] == !move && areaArr[3] == !move && areaArr[6] == !move ||
        areaArr[1] == !move && areaArr[4] == !move && areaArr[7] == !move ||
        areaArr[2] == !move && areaArr[5] == !move && areaArr[8] == !move ||
        areaArr[0] == !move && areaArr[4] == !move && areaArr[8] == !move ||
        areaArr[2] == !move && areaArr[4] == !move && areaArr[6] == !move
    ) {
        if (!move == true) {
            alert("Выиграли крестики!");
            areaUpdate(!move);
        } else {
            alert("Выиграли нолики!");
            areaUpdate(!move);
        }
        if ($("#players").text() == "1 игрок") {
            move = true;
        }
    } else if (endGame == true) {
        alert("Ничья!");
        areaUpdate();
    }
    if ($("#players").text() == "1 игрок" && !move == false && endGame == false) {
        move = true;
        botFunc();
    }
}

function areaUpdate(winner, mode) {
    for (let i = 0; i < 9; i++) {
        areaArr[i] = undefined;
        move == true ? $("#moveIs").html("&#128939;") : $("#moveIs").html("&#128901;");
        $("#span-" + i).html(' ');
    }
    if (winner == true) {
        let score = $("#crossScore").text();
        $("#crossScore").html(++score);
    }
    if (winner == false) {
        let score = $("#toeScore").text();
        $("#toeScore").html(++score);
    }
    if ($("#players").text() == "1 игрок") {
        move = true;
    }
}

function botFunc() { // Невезучий бот рандомщик! 
    let isBotMoveFirst = true;
    move = true;
    for (let i = 0; i < 9; i++) {
        if (areaArr[i] != undefined) {
            isBotMoveFirst = false;
        }
    }
    if (isBotMoveFirst == true) {
        isDivClick(4);
        isBotMoveFirst = false;
    } else if (move) {
        let isBotMoveValid = false;
        while (isBotMoveValid == false) {
            let random = parseInt(Math.random() * 9);
            if (areaArr[random] == undefined) {
                isDivClick(random);
                isBotMoveValid = true;
            }
        }
    }
}

function scoreClear() {
    $("#crossScore").html('0');
    $("#toeScore").html('0');
    areaUpdate();
    if ($("#players").text() == "1 игрок") {
        move = true;
        botFunc();
    }
}

function botSwich() {
    areaUpdate();
    scoreClear();
    if ($("#players").text() == "2 игрока") {
        $("#players").html("1 игрок");
        $("#moveIs").html("&#128939;")
        move = true;
        botFunc();
    } else {
        $("#players").html("2 игрока");
        $("#moveIs").html("&#128939;")
        move = true;
    }
}