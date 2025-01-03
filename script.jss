const choices = ["가위", "바위", "보"];
let userChoice = null;
let userRemove = null;

// 유저 선택
function userSelect(choice) {
    userChoice = choice;
    document.getElementById("user-choice").innerText = `유저 선택: ${choice}`;
}

// 유저 "하나빼기"
function userRemoveChoice(remove) {
    if (!userChoice) {
        alert("먼저 가위, 바위, 보 중 하나를 선택하세요!");
        return;
    }
    userRemove = remove;
    document.getElementById("user-remove").innerText = `유저 뺀 것: ${remove}`;
    playGame();
}

// 컴퓨터 선택
function getComputerChoice() {
    return choices[Math.floor(Math.random() * choices.length)];
}

// 컴퓨터 "하나빼기"
function getComputerRemove(choice) {
    const remaining = choices.filter(item => item !== choice);
    return remaining[Math.floor(Math.random() * remaining.length)];
}

// 결과 계산
function playGame() {
    if (!userChoice || !userRemove) return;

    const computerChoice = getComputerChoice();
    const computerRemove = getComputerRemove(computerChoice);

    const userFinal = choices.find(item => item !== userRemove);
    const computerFinal = choices.find(item => item !== computerRemove);

    document.getElementById("computer-choice").innerText = `컴퓨터 선택: ${computerChoice}`;
    document.getElementById("computer-remove").innerText = `컴퓨터 뺀 것: ${computerRemove}`;

    let result = "";
    if (userFinal === computerFinal) {
        result = "무승부!";
    } else if (
        (userFinal === "가위" && computerFinal === "보") ||
        (userFinal === "바위" && computerFinal === "가위") ||
        (userFinal === "보" && computerFinal === "바위")
    ) {
        result = "유저 승리!";
    } else {
        result = "컴퓨터 승리!";
    }
    document.getElementById("final-result").innerText = `게임 결과: ${result}`;
}

// 게임 리셋
function resetGame() {
    userChoice = null;
    userRemove = null;
    document.getElementById("user-choice").innerText = "유저 선택: ";
    document.getElementById("user-remove").innerText = "유저 뺀 것: ";
    document.getElementById("computer-choice").innerText = "컴퓨터 선택: ";
    document.getElementById("computer-remove").innerText = "컴퓨터 뺀 것: ";
    document.getElementById("final-result").innerText = "게임 결과: ";
}
