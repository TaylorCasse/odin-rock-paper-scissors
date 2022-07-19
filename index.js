function randIntFromInterval(min, max) {
    // Generates a random number within the given limits (inclusive)
    // From StackOverflow
    // https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function compChoice() {
    const compNumChoice = randIntFromInterval(1, 3);
    switch (compNumChoice) {
        case 1:
            return 'Rock';
        case 2:
            return 'Paper';
        case 3:
            return 'Scissors';
    }
}

function winCheck(playerInput, compInput) {
    // Checks the PLAYER'S win status
    switch (playerInput) {
        case 'Rock':
            switch (compInput) {
                case 'Rock':
                    return 'Draw';
                case 'Paper':
                    return 'Lose';
                case 'Scissors':
                    return 'Win';
            }
        case 'Paper':
            switch (compInput) {
                case 'Rock':
                    return 'Win'
                case 'Paper':
                    return 'Draw'
                case 'Scissors':
                    return 'Lose'
            }

        case 'Scissors':
            switch (compInput) {
                case 'Rock':
                    return 'Lose';
                case 'Paper':
                    return 'Win';
                case 'Scissors':
                    return 'Draw';
            }
    }
}

let playerWins = 0;
let compWins = 0;
let currentRound = 1;
const playerScoreCard = document.querySelector('#player-score');
const playerScoreBlocks = playerScoreCard.childNodes;
const opponentScoreCard = document.querySelector('#opponent-score');
const opponentScoreBlocks = opponentScoreCard.childNodes;
console.log(playerScoreBlocks[1].classList.toggle('score-block-filled'));
playerScoreBlocks[1].classList.toggle('score-block-filled');
const roundsDisplay = document.querySelector('#current-round');

function playRound(input) {
    const winStatus = winCheck(input, compChoice());
    console.log(winStatus);
    if (winStatus === 'Win') {
        playerWins += 1;
        for (let i; i < playerWins; i++) {
            playerScoreBlocks[i].classList.toggle('score-block-filled');
        }
    } else if (winStatus === 'Lose') {
        compWins += 1;
    }
    currentRound += 1;

    // playerScoreCard.textContent = `${playerWins}`;
    // opponentScoreCard.textContent = `${compWins}`;
    roundsDisplay.textContent = `Round ${currentRound}`;
}

const mainContainer = document.querySelector('#game-container');

rockCard = document.querySelector('#player-rock');
rockCard.addEventListener('click', () => {
    console.log("Rock pressed");
    playRound('Rock');
})

paperCard = document.querySelector('#player-paper');
paperCard.addEventListener('click', () => {
    console.log("Paper pressed");
    playRound('Paper');
})

scissorsCard = document.querySelector('#player-scissors');
scissorsCard.addEventListener('click', () => {
    console.log("Scissors pressed");
    playRound('Scissors');
})

// template https://www.crazygames.com/game/rock-paper-scissors