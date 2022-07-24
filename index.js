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
const gameScreen = document.querySelector('#game-container');
const playerScoreCard = document.querySelector('#player-score');
const playerScoreBlocks = playerScoreCard.children;
const opponentScoreCard = document.querySelector('#opponent-score');
const opponentScoreBlocks = opponentScoreCard.children;
const roundsDisplay = document.querySelector('#current-round');
const resultElement = document.querySelector('#result-text');
const mainContainer = document.querySelector('#game-container');

const rockCard = document.querySelector('#player-rock');
const paperCard = document.querySelector('#player-paper');
const scissorsCard = document.querySelector('#player-scissors');



function Card(type) {
    this.type = type;
    this.img = `./IMG/SVG/${this.type}.svg`

    this.element = document.createElement('img');
    this.element.setAttribute('class', 'card');
    this.element.setAttribute('src', this.img);
    this.element.addEventListener('click', () => {
        playRound(this.type);
    })
    this.element.addEventListener('mouseover', () => {
        this.element.classList.toggle('enlarged');
        console.log('Hovered');
    })
    this.element.addEventListener('mouseleave', () =>{
        this.element.classList.toggle('enlarged');
        console.log('Unhovered');
    })

    this.makeElement = function() {
        const card = document.createElement('img');
        card.setAttribute('class', 'card');
        card.setAttribute('src', this.img);
    }
    this.chosen = function() {
        this.element.classList.add('enlarged');
    }
    this.notChosen = function() {
        this.element.classList.add('fade-transition');
    }
    this.reset = function() {
        this.element.classList.remove('enlarged');
        this.element.classList.remove('fade-transition');
    }

}

const test2 = new Card('Paper');
console.log(test2.element);

gameScreen.appendChild(test2.element);

function Player(name, img) {
    this.name = name;
    this.img = img;
    this.score = 0;
    this.genCard = function() {        
        const playerCard = document.createElement('div');
        playerCard.setAttribute('class', 'player-container');

        const heading = document.createElement('h3');
        heading.textContent = `${this.name.toUpperCase()}'S SCORE`;
        playerCard.appendChild(document.createElement('h3'));
        
        const scoreElement = document.createElement('div');
        scoreElement.setAttribute('class', 'score-tracker');

        const scoreBlock = document.createElement('div');
        scoreBlock.setAttribute('score-tracker');

        const winsToWin = 3;
        for (let i = 0; i < winsToWin; i++) {
            scoreElement.appendChild(scoreBlock);
        }

        playerCard.appendChild(scoreElement);

        const cardContainer = document.createElement('div');
        // const rockCard = new Card('rock', )
        
    }
    this.card = document.querySelector('.player-container');
    this.scoreCard = document.querySelector('#player-score');
    this.autoChoice = compChoice();
}

const test = new Player('Taylor');
console.log(test);
for (let i = 0; i < 10; i++ ) {
    console.log(`${i}`)
    mainContainer.appendChild(test.card);
}

const playerRock = new Card('Rock', document.querySelector('#player-rock'));
const playerPaper = new Card('Paper', document.querySelector('#player-paper'));
const playerScissors = new Card('Scissor', document.querySelector('#player-scissors'));


function playRound(playerChoice) {
    const compChoiceVar = compChoice()
    const winStatus = winCheck(playerChoice, compChoiceVar);

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

    if (playerWins === 3 || compWins === 3) {
        gameScreen.textContent = 'GAME OVER';
        const reloadButton = document.createElement('button');
        reloadButton.setAttribute('id', 'reload-button');
        reloadButton.textContent = 'Play again';
        reloadButton.addEventListener('click', () => {
            location.reload();
        })
        resultElement.appendChild(reloadButton);
    } else {
        currentRound += 1;
        roundsDisplay.textContent = `Round ${currentRound}`;
    }

}

function gameOverScreen(playerWin) {
    if (playerWin) {
        gameScreen.textContent = 'Game over\nYou Win!!';

    } else {
        gameScreen.textContent = 'Game over\nYou lose...';
    }
}


function playAnimations(playerChoice, botChoice) {
    const cards = [rockCard, paperCard, scissorsCard];
    let playerCard;
    switch (playerChoice) {
        case 'Rock':
            playerCard = rockCard;
        case 'Paper':
            playerCard = paperCard;
        case 'Scissors':
            playerCard = scissorsCard;
    }
}

rockCard.addEventListener('click', () => {
    console.log("Rock pressed");
    playRound('Rock');
    playerRock.chosen();
})


paperCard.addEventListener('click', () => {
    console.log("Paper pressed");
    playRound('Paper');
})

scissorsCard.addEventListener('click', () => {
    console.log("Scissors pressed");
    playRound('Scissors');
})



// template https://www.crazygames.com/game/rock-paper-scissors