let userChoices = [];
let computerChoice;
let countdown;
let countdownInterval;

function startCountdown(duration, callback) {
    let timer = duration, seconds;
    countdown = document.getElementById('countdown');
    countdown.style.display = 'block';
    
    countdownInterval = setInterval(function () {
        seconds = parseInt(timer % 60, 10);
        seconds = seconds < 10 ? "0" + seconds : seconds;
        countdown.textContent = seconds;

        if (--timer < 0) {
            clearInterval(countdownInterval);
            callback();
        }
    }, 1000);
}

document.getElementById('rock').addEventListener('click', () => selectChoice('rock'));
document.getElementById('paper').addEventListener('click', () => selectChoice('paper'));
document.getElementById('scissors').addEventListener('click', () => selectChoice('scissors'));

function selectChoice(choice) {
    if (userChoices.length < 2) {
        userChoices.push(choice);
        if (userChoices.length === 2) {
            alert('Time to choose one to remove!');
            clearInterval(countdownInterval);
            startCountdown(1, removeChoicePrompt);
        }
    } else {
        alert('You have already made two choices.');
    }
}

function removeChoicePrompt() {
    document.getElementById('choices').style.display = 'none';
    document.getElementById('minusOne').style.display = 'block';
    startCountdown(1, () => alert('Time is up! You must remove an option!'));
}

document.getElementById('removeRock').addEventListener('click', () => removeChoice('rock'));
document.getElementById('removePaper').addEventListener('click', () => removeChoice('paper'));
document.getElementById('removeScissors').addEventListener('click', () => removeChoice('scissors'));

function removeChoice(choice) {
    if (userChoices.includes(choice)) {
        userChoices = userChoices.filter(c => c !== choice);
        computerChoice = getComputerChoice();
        determineWinner();
    } else {
        alert('You have not selected that item.');
    }
}

function getComputerChoice() {
    const choices = ['rock', 'paper', 'scissors'];
    return choices[Math.floor(Math.random() * choices.length)];
}

function determineWinner() {
    const userFinalChoice = userChoices[0]; // Remaining choice
    const result = document.getElementById('result');
    
    if (userFinalChoice === computerChoice) {
        result.textContent = 'It\'s a tie!';
    } else if (
        (userFinalChoice === 'rock' && computerChoice === 'scissors') ||
        (userFinalChoice === 'paper' && computerChoice === 'rock') ||
        (userFinalChoice === 'scissors' && computerChoice === 'paper')
    ) {
        result.textContent = 'You win!';
    } else {
        result.textContent = 'Computer wins!';
    }
}
