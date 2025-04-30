function getDiceRollImgPath(number) {
    return `./images/dice${number}.png`;
}

function playTurn(player) {
    const roll = Math.floor(Math.random() * 6) + 1;
    const targetImgElem = document.getElementById(`p${player}-dice`);
    targetImgElem.setAttribute("src", getDiceRollImgPath(roll));
    return roll;
}

function pickWinner(p1Roll, p2Roll) {
    return p1Roll === p2Roll ? 0 : (p1Roll > p2Roll ? 1 : 2);
}

function updateH1(winner) {
    var winnerText = "Draw.";
    if (winner === 1) {
        winnerText = `🚩Player 1 Wins!`;
    }
    else if (winner === 2) {
        winnerText = "Player 2 Wins!🚩";
    }
    document.getElementsByTagName("h1")[0].innerText = winnerText;
}

const p1Roll = playTurn(1);
const p2Roll = playTurn(2);
const winner = pickWinner(p1Roll, p2Roll);
updateH1(winner);