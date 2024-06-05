// 랜덤번호 지정
// 유저가 번호 입력 & go btn
// 맞추면 , 맞췄습니다!
// 작으면 DOWN!!
// 크다면  UP!!
// reset 버튼을 누르면 reset
// 5번의 기회를 다쓰면 게임 끝 추측 불가 disabled
// 유저가 1~100 범위 밖에 숫자시 알려주고, 기회를 깎지않음.
// 이미 입력한 숫자를 또 입력하면, 알려준다. 기회를 깎지않음.

let randomNum = 0;
const goBtn = document.getElementById("goBtn");
const userInput = document.querySelector("input");
const resetBtn = document.getElementById("resetBtn");
let status = document.querySelector(".status");
let chance = document.querySelector(".chance");
let alert = document.querySelector(".alert");

let chanceNum = 5;
let gameOver = false;
let history = [];

chance.innerText = chanceNum;
alert.hidden = true;

let pickRandomNum = () => {
    randomNum = Math.floor(Math.random() * 100) + 1;
    console.log("randomNum", randomNum);
};

userInput.addEventListener("focus", function () {
    userInput.value = "";
});

let play = () => {
    let userInputValue = userInput.value;

    if (userInputValue > 100 || userInputValue < 1) {
        alert.hidden = false;
        return;
    } else {
        alert.hidden = true;
    }

    if (history.includes(userInputValue)) {
        status.innerText = "이미 입력한 숫자입니다.";
        return;
    }

    chanceNum--;
    chance.innerText = chanceNum;

    if (userInputValue < randomNum) {
        status.innerText = "UP!";
    } else if (userInputValue > randomNum) {
        status.innerText = "DOWN!";
    } else {
        status.innerText = "맞 췄 다";
        gameOver = true;
    }
    history.push(userInputValue);

    if (chanceNum < 1) {
        gameOver = true;
    }
    if (gameOver == true) {
        goBtn.disabled = true;
        userInput.disabled = true;
        userInputValue = " ";
        return;
    }

    userInputValue = "";
};

let reset = () => {
    status.innerText = " ";
    userInput.value = " ";
    chanceNum = 5;
    chance.innerText = chanceNum;
    gameOver = false;
    goBtn.disabled = false;
    userInput.disabled = false;
    pickRandomNum();
};

goBtn.addEventListener("click", play);
resetBtn.addEventListener("click", reset);
pickRandomNum();
