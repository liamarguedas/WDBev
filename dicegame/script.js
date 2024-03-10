
function randomDices(){
    return [Math.floor(Math.random()*6)+1, Math.floor(Math.random()*6)+1];
}

function changeDice(player, dice) {
    document.getElementById(`player-${player}-dice`).setAttribute('src', `./images/dice${dice}.png`)
}

function reset() {
    document.getElementsByClassName("game-info")[0].innerHTML = "";
    document.getElementById("player-1").style.color = "#4ECCA3";
    document.getElementById("player-2").style.color = "#4ECCA3";
}

function sayWinner(player1, player2) {
    if (player1 > player2) {
        document.getElementsByClassName("game-info")[0].innerHTML = "Player 1 won!";
        document.getElementById("player-1").style.color = "#ffcf40";
    } else if (player1 < player2) {
        document.getElementsByClassName("game-info")[0].innerHTML = "Player 2 won!";
        document.getElementById("player-2").style.color = "#ffcf40";
    } else {
        document.getElementsByClassName("game-info")[0].innerHTML = "Its a tie!";
        document.getElementById("player-2").style.color = "#ffcf40";
        document.getElementById("player-1").style.color = "#ffcf40";
    }
}

function refreshMe() {
    reset();
    const dices = randomDices();
    changeDice("1", dices[0]); //change player 1 dice
    changeDice("2", dices[1]); //change player 2 dice
    sayWinner(dices[0], dices[1]);
}

document.getElementById("toRefresh").addEventListener("click", refreshMe);