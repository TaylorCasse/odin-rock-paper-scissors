function randIntFromInterval(min, max) {
    // Generates a random number within the given limits (inclusive)
    // From StackOverflow
    // https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
    return Math.floor(Math.random() * (max - min + 1) + min);
}


const rpsls = true;
let activeList;
const gameMode = 'First to 3';
if (rpsls) {
    activeList = ['Rock', 'Paper', 'Scissors', 'Lizard', 'Spock'];
} else {
    activeList = ['Rock', 'Paper', 'Scissors'];
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



function Card(type) {
    this.type = type;
    this.img = `./IMG/SVG/${this.type}.svg`;
    this.element = document.createElement('img');
    this.element.classList.toggle('card');
    this.element.setAttribute('src', this.img);
    
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
}

function Player(name, isBot) {
    this.name = name;
    this.isBot = isBot;
    this.score = 0;
    this.hand = [];

    // Generate DOM Elements
    this.element = document.createElement('div');
    this.element.setAttribute('class', 'container');

    const heading = document.createElement('h3');
    heading.textContent = `${this.name.toUpperCase()}'S SCORE`;

    this.scoreElement = document.createElement('div');
    this.scoreElement.setAttribute('class', 'score-tracker');
    for (let i = 0; i < winsToWin; i++) {
        const scoreBlock = document.createElement('div');
        scoreBlock.setAttribute('class', 'score-block');    
        this.scoreElement.appendChild(scoreBlock);
    }

    this.cardContainer = document.createElement('div');
    this.cardContainer.setAttribute('class', 'card-container');

    for (let cardType of activeList) {
        let currentCard = new Card(cardType);

        // Gives click event, hover transition and modified reset function 
        // if the card is owned by a human player
        if (!this.isBot) {
            currentCard.element.classList.toggle('hover-transition');
            currentCard.element.classList.toggle('player-card');
            currentCard.element.addEventListener('click', () => {
                player.choice = currentCard.type;
                playRound(this);
            })
            currentCard.reset = function() {
                this.element.removeAttribute('class');
                this.element.classList.toggle('card');
                this.element.classList.toggle('player-card');
            }
        } else {
            currentCard.reset = function() {
                this.element.removeAttribute('class');
                this.element.classList.toggle('card');
            }
        }
        this.hand.push(currentCard);
        this.cardContainer.appendChild(currentCard.element);
    }

    // Append DOM elements
    this.element.appendChild(heading);
    this.element.appendChild(this.scoreElement);
    this.element.appendChild(this.cardContainer);

    this.winRound = function() {
        this.score += 1;
        for (let i = 0; i < this.score; i++) {
            this.scoreElement.children[i].classList.add('score-block-filled');
        }
    }

    this.playAnimations = function() {
        for (let card of this.hand) {
            if (card.type === this.choice) {
                card.enlarge();
            } else {
                card.fade()
            }
        }
        setTimeout(() => {
            for (let card of this.hand) {
                card.reset();
            }
        }, 1000);
    }

    this.reset = function() {
        this.score = 0;
        for (let i = 0; i < this.scoreElement.children.length; i++) {
            this.scoreElement.children[i].classList.remove('score-block-filled');
        }
    }

    this.autoChoice = function() {
        return activeList[randIntFromInterval(0, activeList.length - 1)];
    };

}
botNames = ['Chappie', 'Johnny Five', 'Wall-E', 'Optimus Prime', 'HAL 9000', 'Your Phone', 'Cayde-6', 'Mecha Godzilla'];


// Game set-up
switch (gameMode) {
    case 'First to 3':
        // numberOfBots = botNames.length;
        numberOfBots = 15;
        winsToWin = 3;
}




function playRound(player) {
    

    const playerList = [player];
    player.playAnimations();
    // Bots make their choice, generate array of all player's choices
    for (let bot of botList) {
        bot.choice = bot.autoChoice();
        bot.playAnimations();
        playerList.push(bot);
    }

    // Compares the choices of all players and adds up each players wins (round score) in this round
    for (let i = 0; i < playerList.length; i++) {
        playerList[i].roundScore = 0;
        for (let j = 0; j < playerList.length; j++) {
            let status = winCheck(playerList[i].choice, playerList[j].choice);
            if (status === 'Win') {
                playerList[i].roundScore += 1;
            }
        }
    }

    // Finds the player with the highest round score
    let highestRoundScore = 0;
    for (let player of playerList) {
        // console.log(`${player.name}'s choice: ${player.choice}`);
        if (player.roundScore > highestRoundScore) {
            highestRoundScore = player.roundScore;
        }
    }

    const winners = [];
    for (let player of playerList) {
        // Finds the winner(s) of the round
        if (player.roundScore === highestRoundScore && player.roundScore > 0) {
            player.winRound();
            // Finds winner(s) of the game
            if (player.score === winsToWin) {
                winners.push(player);
            }
        }
    }

    currentRound += 1;
    roundTracker.textContent = `Round ${currentRound}`;

    if (winners) {
        gameOver(winners);
    }
}


function gameOver(winners) {
    if (winners.length === 1) {
        gameScreen.textContent = `${winners[0].name} wins!`;
    } else if (winners.length === 2) {
        gameScreen.textContent = `${winners[0].name} and ${winners[1].name} win!`;
        for (let winner of winners) {
            console.log(winner);
        }
    } else {
        let outputString = '';
        for (let i = 0; i < winners.length; i++) {
            outputString += winner[i].name + ', '
            if (i === winners.length) {
                outputString += ` and ${winners[winners.length]} win!`;
            }
        }
    }
}


const mainContainer = document.querySelector('#main');
function initialize() {
    gameScreen.textContent = '';

    mainHeading.textContent = 'TOP Rock Paper Scissors';


    roundTracker.textContent = 'Round 1';
    roundTracker.classList.toggle('current-round');

    mainContainer.appendChild(mainHeading);
    mainContainer.appendChild(roundTracker);



    gameScreen.appendChild(player.element);
    document.addEventListener('keydown', () => {
        player.reset();
    })
    
    
    for (let i = 0; i < numberOfBots; i++) {
        const botNameIndex = randIntFromInterval(0, botNames.length - 1)
        const randName = botNames[botNameIndex];      // Get a random bot name
        // botNames.splice(botNameIndex, 1);           // Ensure unique names
        const newBot = new Player(randName, true);
        gameScreen.appendChild(newBot.element);
        botList.push(newBot);
    }
    
}
// Assigning global DOM elements
const gameScreen = document.querySelector('#game-container');
const playerName = 'Taylor';
const player = new Player(playerName, false);
const botList = [];
let currentRound = 1;
const roundTracker = document.createElement('h2');
const mainHeading = document.createElement('h1');

initialize()

// template https://www.crazygames.com/game/rock-paper-scissors
