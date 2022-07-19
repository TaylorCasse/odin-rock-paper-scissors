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

// Declaring global variables 
let playerWins = 0;
let compWins = 0;
let currentRound = 1;

// Assigning DOM elements
const playerScoreCard = document.querySelector('#player-score');
const playerScoreBlocks = playerScoreCard.children;
const opponentScoreCard = document.querySelector('#opponent-score');
const opponentScoreBlocks = opponentScoreCard.children;
const roundsDisplay = document.querySelector('#current-round');
const resultElement = document.querySelector('#result-text');

function playRound(input) {
    const compChoiceVar = compChoice()
    const winStatus = winCheck(input, compChoiceVar);
    console.log(winStatus);
    if (winStatus === 'Win') {
        playerWins += 1;
        for (let i=0; i < playerWins; i++) {
            playerScoreBlocks[i].classList.add('score-block-filled');
        }
        resultElement.textContent = "You win!";
    } else if (winStatus === 'Lose') {
        compWins += 1;
        for (let i=0; i < compWins; i++) {
            opponentScoreBlocks[i].classList.add('score-block-filled');
        }
        resultElement.textContent = "You lose...";
    } else {
        resultElement.textContent = 'Draw';
    }
    currentRound += 1;

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