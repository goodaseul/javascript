// 랜덤 번호 지정
// 유저가 랜덤번호를 맞추면, 맞췄습니다!
// 랜덤번호가 < 유저번호 > DOWN!
// 랜덤번호가 > 유저번호 > UP!
// Reset 버튼을 누르면 게임이 리셋
// 5번의 기회를 다쓰면 게임이 끝난다 (추측 불가, 버튼 disable)
// 1~100 범위 밖 숫자를 입력하면 알려준다. 기회를 깎지 않는다.
// 이미 입력한 숫자를 입력하면, 알려준다, 기회를 깎지 않는다.

let randomNum = 0;
let playTimes = 5;
let gameOver = false;
let history = [];
function pickRandom() {
    randomNum = Math.floor(Math.random(randomNum) * 100) + 1;
    console.log(randomNum);
}
pickRandom();

let goBtn = document.getElementById("goBtn");
let resetBtn = document.getElementById("reset");
let inputBox = document.querySelector("input");
let resultBox = document.getElementById("resultBox");
let playTimeNum = document.getElementById("playTimeNum");

goBtn.addEventListener("click", play);
resetBtn.addEventListener("click", reset);
inputBox.addEventListener("focus", function () {
    inputBox.value = "";
});
function play() {
    let userValue = inputBox.value;

    if (userValue < 1 || userValue > 100) {
        resultBox.innerText = "1과 100 사이의 숫자를 입력해 주세요.";
        return;
    }

    if (history.includes(userValue)) {
        resultBox.innerText = "이미 나온 숫자입니다.";
        return;
    }

    history.push(userValue);

    playTimes--;

    if (userValue < randomNum) {
        resultBox.innerText = "up";
    } else if (userValue > randomNum) {
        resultBox.innerText = "down";
    } else {
        resultBox.innerText = "맞췄다";
        gameOver = true;
    }

    if (playTimes < 1) {
        gameOver = true;
    }
    if (gameOver == true) {
        goBtn.disabled = true;
        inputBox.disabled = true;
    }

    playTimeNum.innerText = playTimes;
}

function reset() {
    // input창 깨끗하게 정리
    // 새로운 번호 생성
    inputBox.value = "";
    pickRandom();
    resultBox.innerText = "결과가 나온다";

    goBtn.disabled = false;
    inputBox.disabled = false;
    playTimeNum.innerText = 5;
}
