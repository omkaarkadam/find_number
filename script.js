// Game variables
let randomNumber = Math.floor(Math.random() * 100) + 1;
let movesLeft = 5;
let playerName = '';

// Get DOM elements
const namePrompt = document.getElementById('namePrompt');
const playerNameInput = document.getElementById('playerNameInput');
const startGameBtn = document.getElementById('startGameBtn');
const gameArea = document.getElementById('gameArea');
const playerNameDisplay = document.getElementById('playerName');
const guessInput = document.getElementById('guessInput');
const submitBtn = document.getElementById('submitBtn');
const message = document.getElementById('message');
const movesDisplay = document.getElementById('moves');
const restartBtn = document.getElementById('restartBtn');

// Start the game after getting the player's name
startGameBtn.addEventListener('click', function() {
    playerName = playerNameInput.value.trim();
    
    if (playerName === '') {
        alert('Please enter your name to start the game.');
        return;
    }
    
    // Store the player's name in local storage
    localStorage.setItem('playerName', playerName);

    // Display the game area
    playerNameDisplay.textContent = playerName;
    namePrompt.style.display = 'none';
    gameArea.style.display = 'block';
});

// Check the user's guess
submitBtn.addEventListener('click', function() {
    const userGuess = parseInt(guessInput.value);
    
    if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
        message.textContent = "Please enter a valid number between 1 and 100.";
        return;
    }

    movesLeft--;
    movesDisplay.textContent = movesLeft;

    if (userGuess === randomNumber) {
        message.textContent = `Congratulations, ${playerName}! You guessed the number ${randomNumber} correctly.`;
        endGame();
    } else if (movesLeft === 0) {
        message.textContent = `Game Over, ${playerName}! The correct number was ${randomNumber}.`;
        endGame();
    } else if (userGuess < randomNumber) {
        message.textContent = `Orignal Number is greater than  ${userGuess} .`;
    } else {
        message.textContent = ` Orignal Number is lower  than ${userGuess} .`;
    }

    guessInput.value = '';
});

function endGame() {
    guessInput.disabled = true;
    submitBtn.disabled = true;
    restartBtn.style.display = 'inline-block';
}

// Restart the game
restartBtn.addEventListener('click', function() {
    randomNumber = Math.floor(Math.random() * 100) + 1;
    movesLeft = 5;
    movesDisplay.textContent = movesLeft;
    message.textContent = '';
    guessInput.disabled = false;
    submitBtn.disabled = false;
    restartBtn.style.display = 'none';
});

// Retrieve player name from local storage on page load (if exists)
window.onload = function() {
    const storedName = localStorage.getItem('playerName');
    if (storedName) {
        playerName = storedName;
        playerNameDisplay.textContent = playerName;
        namePrompt.style.display = 'none';
        gameArea.style.display = 'block';
    }
};
