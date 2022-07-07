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

let playerWins = 0;
let compWins = 0;

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

const mainContainer = document.querySelector('#game-container');

function makeStartScreen() {
    console.log('makeStartScreen() called');
    // Clear all child nodes from main container
    mainContainer.textContent = '';

    const startingElement = document.createElement('div');
    startingElement.setAttribute('id', 'start-screen');
    
    const para = document.createElement('p');
    para.textContent = "How many rounds?";
    startingElement.appendChild(para);

    const roundsInput = document.createElement('input');
    roundsInput.setAttribute('id', 'number-of-rounds-input');
    startingElement.appendChild(roundsInput);

    const roundsSubmitBtn = document.createElement('button');
    roundsSubmitBtn.setAttribute('id', 'rounds-submit-btn');
    
    // 1) For some reason, this form calls startGame() once when makeStartScreen() is called,
    //    but it doesn't call startGame() when the button is clicked
    // roundsSubmitBtn.addEventListener('click', startGame());

    // 2) This works as expected
    roundsSubmitBtn.addEventListener('click', () => {
        startGame();
    });
    
    roundsSubmitBtn.textContent = 'Play!';
    startingElement.appendChild(roundsSubmitBtn);

    mainContainer.appendChild(startingElement);
}
makeStartScreen();

let currentRound = 1;
function startGame() {
    console.log('startGame() called');
    const numberOfRounds = document.querySelector('#number-of-rounds-input').value;
    mainContainer.textContent = '';

    const roundsTracker = document.createElement('p');
    roundsTracker.textContent = `Round ${currentRound}/${numberOfRounds}`;
    mainContainer.appendChild(roundsTracker);

    const cardContainer = document.createElement('div');
    cardContainer.setAttribute('id', 'card-container');

    const rockCard = document.createElement('button');
    rockCard.classList.toggle('game-card');
    rockCard.setAttribute('id', 'rock-card');
    rockCard.textContent = 'Rock';
    rockCard.addEventListener('click', () => {
        playRound('rock');
    });
    cardContainer.appendChild(rockCard);

    const paperCard = document.createElement('button');
    paperCard.classList.toggle('game-card');
    paperCard.setAttribute('id', 'paper-card');
    paperCard.textContent = 'Paper';
    paperCard.addEventListener('click', () => {
        playRound('paper');
    })
    cardContainer.appendChild(paperCard);

    const scissorsCard = document.createElement('button');
    scissorsCard.classList.toggle('game-card')
    scissorsCard.setAttribute('id', 'scissors-card');
    scissorsCard.textContent = 'Scissors';
    scissorsCard.addEventListener('click', () => {
        playRound('scissors');
    });
    cardContainer.appendChild(scissorsCard);

    mainContainer.appendChild(cardContainer);

}