let userChoices = [];
let computerChoice;
let countdownInterval;
let minusCountdownInterval;

document.getElementById('startButton').addEventListener('click', startGame);

function startGame() {
    document.getElementById('startScreen').style.display = 'none';
    document.getElementById('choiceScreen').style.display = 'block';
    userChoices = [];
    startCountdown(2, selectChoice);
}

function startCountdown(duration, callback) {
    let timer = duration, seconds;
    const countdown = document.getElementById('countdown');
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

function selectChoice() {
    document.getElementById('choices').addEventListener('click', function (event) {
        if (userChoices.length < 2 && event.target.tagName === 'IMG') {
            userChoices.push(event.target.id);
            if (userChoices.length === 2) {
                clearInterval(countdownInterval);
                document.getElementById('choiceScreen').style.display = 'none';
                document.getElementById('minusOneScreen').style.display = 'block';
                startMinusCountdown(1);
            }
        }
    });
}

function startMinusCountdown(duration) {
    let timer = duration, seconds;
    const minusCountdown = document.getElementById('minusCountdown');
    minusCountdown.style.display = 'block';

    minusCountdownInterval = setInterval(function () {
        seconds = parseInt(timer % 60, 10);
        seconds = seconds < 10 ? "0" + seconds : seconds;
        minusCountdown.textContent = seconds;

        if (--timer < 0) {
            clearInterval(minusCountdownInterval);
            alert('Time is up! You must remove an option!');
        }
    }, 1000);
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
    const resultMessage = document.getElementById('resultMessage');
    const resultScreen = document.getElementById('resultScreen');

    if (userFinalChoice === computerChoice) {
        resultMessage.textContent = 'It\'s a tie!';
    } else if (
        (userFinalChoice === 'rock' && computerChoice === 'scissors') ||
        (userFinalChoice === 'paper' && computerChoice === 'rock') ||
        (userFinalChoice === 'scissors' && computerChoice === 'paper')
    ) {
        resultMessage.textContent = 'You win!';
    } else {
        resultMessage.textContent = 'Computer wins!';
    }

    document.getElementById('minusOneScreen').style.display = 'none';
    resultScreen.style.display = 'block';
}

document.getElementById('replayButton').addEventListener('click', () => {
    userChoices = [];
    document.getElementById('resultScreen').style.display = 'none';
    document.getElementById('startScreen').style.display = 'block';
});
