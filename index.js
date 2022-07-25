function randIntFromInterval(min, max) {
    // Generates a random number within the given limits (inclusive)
    // From StackOverflow
    // https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
    return Math.floor(Math.random() * (max - min + 1) + min);
}

const cardListRPS = ['Rock', 'Paper', 'Scissors'];
const cardListRPSLS = ['Rock', 'Paper', 'Scissors', 'Lizard', 'Spock'];

const rpsls = false;
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
// const playerScoreCard = document.querySelector('#player-score');
// const playerScoreBlocks = playerScoreCard.children;
// const opponentScoreCard = document.querySelector('#opponent-score');
// const opponentScoreBlocks = opponentScoreCard.children;
// const roundsDisplay = document.querySelector('#current-round');
// const resultElement = document.querySelector('#result-text');
// const mainContainer = document.querySelector('#game-container');

// const rockCard = document.querySelector('#player-rock');
// const paperCard = document.querySelector('#player-paper');
// const scissorsCard = document.querySelector('#player-scissors');


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
    this.cardContainer = document.createElement('div');
    for (let cardType of activeList) {
        const currentCard = new Card(cardType);
        this.hand.push(currentCard);
        this.cardContainer.appendChild(currentCard.element);
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
        this.cardContainer.setAttribute('class', 'card-container');

        playerCard.appendChild(this.cardContainer);
        return playerCard;
    }


    this.winRound = function() {
        this.score += 1;
        for (let i = 0; i < this.score; i++) {
            this.scoreElement.children[i].classList.add('score-block-filled');
        }
    }


    this.autoChoice = function() {
        return activeList[randIntFromInterval(0, activeList.length - 1)];
    };

    this.botSanitize = function() {
        for (let card of this.hand) {
            // card.removeEventListener('click', playRound);
            card.element.classList.remove('player-card');
            console.log(card.element);
        }

    }

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
for (let i = 0; i < numberOfBots; i++) {
    let randName = botNames[randIntFromInterval(0, botNames.length - 1)];    // Get a random bot name
    let newBot = new Player(randName);
    newBot.botSanitize();
    gameScreen.appendChild(newBot.genCard());
    botList.push(newBot);
}


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
    
    player.choice = playerChoice;
    playerList = [player];

    // Bots make their choice, generate array of all players with choices
    for (let bot of botList) {
        bot.choice = bot.autoChoice()
        playerList.push(bot);
    }

    // Compares the choices of all players and adds up each players wins in this round
    console.log('Round')
    for (let i = 0; i < playerList.length; i++) {
        playerList[i].roundScore = 0;
        for (let j = 0; j < playerList.length; j++) {
            let status = winCheck(playerList[i].choice, playerList[j].choice);
            
            // console.log(`${playerList[j].name}: ${status}`);
            if (status === 'Win') {
                playerList[i].roundScore += 1;
            }
        }
    }

    // Finds the player with the highest round score
    let highestRoundScore = 0;
    for (let player of playerList) {
        console.log(`${player.name}'s choice: ${player.choice}`);
        if (player.roundScore > highestRoundScore) {
            highestRoundScore = player.roundScore;
        }
    }
    console.log(highestRoundScore)

    for (let player of playerList) {
        if (player.roundScore === highestRoundScore && player.roundScore > 0) {
            player.winRound()
        }
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


// function playAnimations(playerChoice, botChoice) {
//     const cards = [rockCard, paperCard, scissorsCard];
//     let playerCard;
//     switch (playerChoice) {
//         case 'Rock':
//             playerCard = rockCard;
//         case 'Paper':
//             playerCard = paperCard;
//         case 'Scissors':
//             playerCard = scissorsCard;
//     }
// }

// rockCard.addEventListener('click', () => {
//     console.log("Rock pressed");
//     playRound('Rock');
//     playerRock.chosen();
// })


// paperCard.addEventListener('click', () => {
//     console.log("Paper pressed");
//     playRound('Paper');
// })

// scissorsCard.addEventListener('click', () => {
//     console.log("Scissors pressed");
//     playRound('Scissors');
// })



// template https://www.crazygames.com/game/rock-paper-scissors
