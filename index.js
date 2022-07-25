function randIntFromInterval(min, max) {
    // Generates a random number within the given limits (inclusive)
    // From StackOverflow
    // https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
    return Math.floor(Math.random() * (max - min + 1) + min);
}

const cardListRPS = ['Rock', 'Paper', 'Scissors'];
const cardListRPSLS = ['Rock', 'Paper', 'Scissors', 'Lizard', 'Spock'];

const rpsls = true;
let activeList;
const gameMode = 'First to 3';
if (rpsls) {
    activeList = cardListRPSLS;
} else {
    activeList = cardListRPS;
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
                case 'Lizard':
                    return 'Win';
                case 'Spock':
                    return 'Lose';
            }
        case 'Paper':
            switch (compInput) {
                case 'Rock':
                    return 'Win';
                case 'Paper':
                    return 'Draw';
                case 'Scissors':
                    return 'Lose';
                case 'Lizard':
                    return 'Lose';
                case 'Spock':
                    return 'Win';
            }

        case 'Scissors':
            switch (compInput) {
                case 'Rock':
                    return 'Lose';
                case 'Paper':
                    return 'Win';
                case 'Scissors':
                    return 'Draw';
                case 'Lizard':
                    return 'Win';
                case 'Spock':
                    return 'Lose';
            }

        case 'Lizard':
            switch (compInput) {
                case 'Rock':
                    return 'Lose';
                case 'Paper':
                    return 'Win';
                case 'Scissors':
                    return 'Lose';
                case 'Lizard':
                    return 'Draw';
                case 'Spock':
                    return 'Win';
            }

        case 'Spock':
            switch (compInput) {
                case 'Rock':
                    return 'Win';
                case 'Paper':
                    return 'Lose';
                case 'Scissors':
                    return 'Win';
                case 'Lizard':
                    return 'Lose';
                case 'Spock':
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
    this.img = `./IMG/SVG/${this.type}.svg`;
    this.element = document.createElement('img');
    this.element.classList.toggle('card');
    this.element.setAttribute('src', this.img);
    this.element.classList.toggle('player-card');
    this.element.addEventListener('click', () => {
        playRound(this.type);
    })

    document.addEventListener('keydown', () => {
        console.log('keydown')
        this.reset()
    })

    this.fade = function() {
        this.element.classList.toggle('fade-transition');
    }
    
    this.enlarge = function() {
        this.element.classList.toggle('enlarged');
    }

    this.reset = function() {
        this.element.removeAttribute('class');
        this.element.classList.toggle('card');
        this.element.classList.toggle('player-card');
    }
}

function Player(name) {
    this.name = name;
    this.score = 0;
    this.element = document.createElement('div');
    this.scoreElement = document.createElement('div');
    this.hand = []
    for (let card of activeList) {
        const currentCard = new Card(card);
        this.hand.push(currentCard);
    }
    this.genCard = function() {        
        const playerCard = document.createElement('div');
        playerCard.setAttribute('class', 'player-container');

        const heading = document.createElement('h3');
        heading.textContent = `${this.name.toUpperCase()}'S SCORE`;

        
        playerCard.appendChild(heading);
    
        this.scoreElement.setAttribute('class', 'score-tracker');

        const winsToWin = 3;
        for (let i = 0; i < winsToWin; i++) {
            const scoreBlock = document.createElement('div');
            scoreBlock.setAttribute('class', 'score-block');    
            this.scoreElement.appendChild(scoreBlock);
        }

        playerCard.appendChild(this.scoreElement);
        const cardContainer = document.createElement('div');
        cardContainer.setAttribute('class', 'card-container');
        for (let cardType of activeList) {
            let card = new Card (cardType);
            cardContainer.appendChild(card.element);
        }
        playerCard.appendChild(cardContainer);
        return playerCard;
    }
    // this.win = function() {
    //     this.score += 1;
    //     for (let card of )
    // }
    this.card = document.querySelector('.player-container');
    this.scoreCard = document.querySelector('#player-score');
    this.autoChoice = function() {
        return activeList[randIntFromInterval(0, activeList.length - 1)];
    };

}


// Game set-up
switch (gameMode) {
    case 'First to 3':
        numberOfBots = 3
}

const playerName = 'Taylor';
const player = new Player(playerName);
const botList = [];
gameScreen.appendChild(player.genCard());

botNames = ['Chappie', 'Johnny Five', 'Wall-E', 'Optimus Prime', 'HAL 9000', 'Your Phone', 'Cayde-6', 'Mecha Godzilla'];
// numberOfBots = 3;
for (let i = 0; i < numberOfBots; i++) {
    randName = botNames[randIntFromInterval(0, botNames.length - 1)];    // Get a random bot name
    newBot = new Player(randName);
    gameScreen.appendChild(newBot.genCard());
    botList.push(newBot);
}
console.log(botList)


// function playRound(playerChoice) {
//     const compChoiceVar = compChoice()
//     const winStatus = winCheck(playerChoice, compChoiceVar);

//     if (winStatus === 'Win') {
//         playerWins += 1;
//         for (let i=0; i < playerWins; i++) {
//             playerScoreBlocks[i].classList.add('score-block-filled');
//         }
//         resultElement.textContent = "You win!";
//     } else if (winStatus === 'Lose') {
//         compWins += 1;
//         for (let i=0; i < compWins; i++) {
//             opponentScoreBlocks[i].classList.add('score-block-filled');
//         }
//         resultElement.textContent = "You lose...";
//     } else {
//         resultElement.textContent = 'Draw';
//     }

//     if (playerWins === 3 || compWins === 3) {
//         gameScreen.textContent = 'GAME OVER';
//         const reloadButton = document.createElement('button');
//         reloadButton.setAttribute('id', 'reload-button');
//         reloadButton.textContent = 'Play again';
//         reloadButton.addEventListener('click', () => {
//             location.reload();
//         })
//         resultElement.appendChild(reloadButton);
//     } else {
//         currentRound += 1;
//         roundsDisplay.textContent = `Round ${currentRound}`;
//     }

// }

function playRound(playerChoice) {
    
    for (let bot of botList) {
        bot.choice = bot.autoChoice()
        console.log(bot.choice);
    }
    
    const compChoiceVar = botList[0].autoChoice();
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
