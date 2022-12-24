"use strict";
const winPattern = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 5, 9],
  [3, 5, 7],
  [2, 5, 8],
  [1, 4, 7],
  [3, 6, 9],
];
let active1;
let nonActive;
let restartActive;
let restartNonActive;
let cpu = false;
const pickX = document.querySelector(".pick-x");
const pickO = document.querySelector(".pick-o");
const svgX = document.querySelector(".svg-x");
const svgO = document.querySelector(".svg-o");
const vsCPU = document.querySelector(".vs-cpu");
const vsPlayer = document.querySelector(".vs-player");

const newGame = document.querySelector(".new-game-container");
const gameBoard = document.querySelector(".game-on-container");
const gameWin = document.querySelector(".winner-container-background");

const pl1 = document.querySelector(".pl-1-text");
const opponent = document.querySelector(".opponent-text");

const cells = document.querySelectorAll(".cell");

const quitBTN = document.querySelector(".quit-button");
const nextBTN = document.querySelector(".next-round");

let arrX = [];
let arrO = [];

pickO.addEventListener("click", function () {
  document.getElementById("yellow").removeAttribute("onclick");
  document.getElementById("blue").removeAttribute("onclick");
  restartActive = "o";
  restartNonActive = "x";
  active1 = "o";
  nonActive = "x";
  let svgActive = document.querySelector(`.svg-${active1}`);
  let svgNonActive = document.querySelector(`.svg-${nonActive}`);
  pickO.style.background = "var(--grey)";
  pickX.style.background = "var(--navy";
  svgO.style.fill = "var(--navy";
  svgX.style.fill = "var(--grey)";
  // ---> YELLOW BUTTON
  vsCPU.addEventListener("click", function () {
    newGame.style.display = "none";
    gameBoard.style.display = "flex";
    document.querySelector(`.svg-${active1}-2`).style.display = "block";
    pl1.textContent = "X (CPU)";
    opponent.textContent = "O (YOU)";
    cpu = true;
    let randomCell = Math.floor(Math.random() * 9) + 1;
    let cpuStarts = document.querySelector(`.cell-${randomCell}`);
    cpuStarts.querySelector(".icon-x").style.display = "block";
    arrX.push(randomCell);
    putCounter = 1;
  });
});

pickX.addEventListener("click", function () {
  document.getElementById("yellow").removeAttribute("onclick");
  document.getElementById("blue").removeAttribute("onclick");
  restartActive = "x";
  restartNonActive = "o";
  active1 = "x";
  nonActive = "o";
  let svgActive = document.querySelector(`.svg-${active1}`);
  let svgNonActive = document.querySelector(`.svg-${nonActive}`);

  pickX.style.background = "var(--grey)";
  pickO.style.background = "var(--navy";
  svgNonActive.style.fill = "var(--grey)";
  svgActive.style.fill = "var(--navy)";

  // ---> BLUE BUTTON!!

  vsPlayer.addEventListener("click", function () {
    newGame.style.display = "none";
    gameBoard.style.display = "flex";
    document.querySelector(`.svg-${active1}-2`).style.display = "block";
    pl1.textContent = "X (PL1)";
    opponent.textContent = "O (PL2)";
  });

  // ---> YELLOW  BUTTON
  vsCPU.addEventListener("click", function () {
    console.log("hi");
    newGame.style.display = "none";
    gameBoard.style.display = "flex";
    document.querySelector(`.svg-${active1}-2`).style.display = "block";
    pl1.textContent = "X (YOU)";
    opponent.textContent = "O (CPU)";
    cpu = true;
  });
});

let counterX = 0;
let counterO = 0;
let counterTie = 0;
let putCounter = 0;
let randomNum;
let stopper = 0;
let winnerIcons;

cells.forEach((elem) => {
  elem.addEventListener("mouseenter", function (elem) {
    if (
      elem.target.querySelector(".icon-x").style.display !== "block" &&
      elem.target.querySelector(".icon-o").style.display !== "block"
    ) {
      elem.target.querySelector(`.hover-icon-${active1}`).style.display =
        "block";
    }
  });
});
cells.forEach((elem) => {
  elem.addEventListener("mouseleave", function (e) {
    e.target.querySelector(`.hover-icon-${active1}`).style.display = "none";
  });
});

function putIcon(elem) {
  if (!cpu) {
    if (
      elem.querySelector(".icon-x").style.display !== "block" &&
      elem.querySelector(".icon-o").style.display !== "block"
    ) {
      elem.querySelector(`.icon-${active1}`).style.display = "block";
      elem.querySelector(`.hover-icon-${active1}`).style.display = "none";
      if (active1 === "x") {
        arrX.push(Number(elem.className[10]));
        active1 = "o";
        nonActive = "x";
      } else if (active1 === "o") {
        arrO.push(Number(elem.className[10]));
        active1 = "x";
        nonActive = "o";
      }

      document.querySelector(`.svg-${active1}-2`).style.display = "block";
      document.querySelector(`.svg-${nonActive}-2`).style.display = "none";
    }
    if (arrX.length >= 3) {
      if (checkArr(arrX)) {
        putCounter = 0;
        gameWin.style.display = "flex";
        winIcons("var(--palegrey)", "x");

        document.querySelector(".game-winner-x").style.display = "block";
        document.querySelector(".game-winner-o").style.display = "none";
        document.querySelector(".game-winner-text").textContent = "PL1 wins!";
        counterX += 1;
        document.querySelector(".x-score").textContent = counterX;
      }
    }
    if (arrO.length >= 3) {
      if (checkArr(arrO)) {
        putCounter = 0;
        gameWin.style.display = "flex";
        winIcons("var(--paleyellow)", "o");
        document.querySelector(`.game-winner-o`).style.display = "block";
        document.querySelector(".game-winner-x").style.display = "none";
        document.querySelector(".game-winner-text").textContent = "PL2 wins!";
        counterO += 1;
        document.querySelector(".o-score").textContent = counterO;
      }
    }
    putCounter += 1;
    tiesCounter(9);
  } else if (cpu) {
    if (
      elem.querySelector(".icon-x").style.display !== "block" &&
      elem.querySelector(".icon-o").style.display !== "block"
    ) {
      elem.querySelector(`.icon-${active1}`).style.display = "block";
      elem.querySelector(`.hover-icon-${active1}`).style.display = "none";
      /// which array to push
      if (active1 === "x") {
        arrX.push(Number(elem.className[10]));
        randomCell();
        arrO.push(randomNum);
      } else if (active1 === "o") {
        arrO.push(Number(elem.className[10]));
        randomCell();
        arrX.push(randomNum);
      }
      stopper += 2;
      document.querySelector(`.svg-${active1}-2`).style.display = "block";
      document.querySelector(`.svg-${nonActive}-2`).style.display = "none";
    }
    if (arrX.length >= 3) {
      if (checkArr(arrX)) {
        putCounter = 0;
        gameWin.style.display = "flex";
        winIcons("var(--palegrey");
        document.querySelector(".game-winner-x").style.display = "block";
        document.querySelector(".game-winner-o").style.display = "none";
        if (active1 === "x") {
          document.querySelector(".game-winner-text").textContent = "you won!";
        } else {
          document.querySelector(".game-winner-text").textContent =
            "oh no, you lost!";
        }
        counterX += 1;
        document.querySelector(".x-score").textContent = counterX;
      }
    }

    if (arrO.length >= 3) {
      if (checkArr(arrO)) {
        gameWin.style.display = "flex";
        winIcons("var(--paleyellow");
        document.querySelector(`.game-winner-o`).style.display = "block";
        document.querySelector(`.game-winner-x`).style.display = "none";
        if (active1 === "o") {
          document.querySelector(".game-winner-text").textContent = "you won!";
        } else {
          document.querySelector(".game-winner-text").textContent =
            "oh no, you lost!";
        }
        counterO += 1;
        document.querySelector(".o-score").textContent = counterO;
      }
    }
    putCounter += 1;
    tiesCounter(5);
  }
}

function tiesCounter(num) {
  if (putCounter == num) {
    gameWin.style.display = "flex";
    document.querySelector(".game-winner-text").textContent = "round tied";
    document.querySelector(".game-winner-announce").style.display = "none";
    counterTie += 1;
  }
}

function winIcons(color, icon) {
  document.querySelector(`.cell-${winnerIcons[0]}`).style.background = color;
  document.querySelector(`.cell-${winnerIcons[1]}`).style.background = color;
  document.querySelector(`.cell-${winnerIcons[2]}`).style.background = color;
  // ---> this part to change winner icon color <--- //
  // document
  //   .querySelector(`.cell-${winnerIcons[0]}`)
  //   .querySelector(`.winner-${icon}`).style.display = "block";
  // document
  //   .querySelector(`.cell-${winnerIcons[1]}`)
  //   .querySelector(`.winner-${icon}`).style.display = "block";
  // document
  //   .querySelector(`.cell-${winnerIcons[2]}`)
  //   .querySelector(`.winner-${icon}`).style.display = "block";
}

function randomCell() {
  if (stopper == 8) return false;
  randomNum = Math.floor(Math.random() * 9) + 1;

  let element = document.querySelector(`.cell-${randomNum}`);

  if (
    element.querySelector(".icon-x").style.display !== "block" &&
    element.querySelector(".icon-o").style.display !== "block"
  ) {
    element.querySelector(`.icon-${nonActive}`).style.display = "block";
    return randomNum;
  } else {
    randomCell();
  }
}

function checkArr(arr) {
  let winArr = [];
  winPattern.forEach((el) => {
    for (let i = 0; i < el.length; i++) {
      if (arr.includes(el[i])) {
        winArr.push(winPattern.indexOf(el));

        for (let j = 0; j < winArr.length; j++) {
          if (winArr[j] === winArr[j + 1] && winArr[j + 1] === winArr[j + 2]) {
            return true;
          }
        }
      }
    }
  });
  for (let j = 0; j < winArr.length; j++) {
    if (winArr[j] === winArr[j + 1] && winArr[j + 1] === winArr[j + 2]) {
      let winnerIndex = winArr[j];
      winnerIcons = winPattern[winnerIndex];
      return true;
    }
  }
}
// --->> ABOVE CODE SHORTER VERSION << ---- //
// function checkArr(arr) {
//   const winArr = winPattern.reduce((result, pattern) => {
//     if (pattern.every(item => arr.includes(item))) {
//       result.push(winPattern.indexOf(pattern));
//     }
//     return result;
//   }, []);

//   return winArr.some((item, index) => item === winArr[index + 1] && item === winArr[index + 2]);
// }

function reset() {
  location.reload();
}

function restart() {
  gameWin.style.display = "none";
  cells.forEach((elem) => {
    elem.querySelector(".icon-o").style.display = "none";
    elem.querySelector(".icon-x").style.display = "none";
    elem.style.background = "var(--board)";
  });
  arrX = [];
  arrO = [];
  active1 = restartActive;
  nonActive = restartNonActive;
  putCounter = 0;
  stopper = 0;
  document.querySelector(".ties-score").textContent = counterTie;
  if (cpu && active1 === "o") {
    let randomCell = Math.floor(Math.random() * 9) + 1;
    let cpuStarts = document.querySelector(`.cell-${randomCell}`);
    cpuStarts.querySelector(".icon-x").style.display = "block";
    arrX.push(randomCell);
    putCounter = 1;
  }
}
function resetGame() {
  console.log("hi");
  document.querySelector(".restart-button-background").style.display = "flex";
  document
    .querySelector(".cancel-restart")
    .addEventListener("click", function () {
      document.querySelector(".restart-button-background").style.display =
        "none";
    });
  document.querySelector(".yes-restart").addEventListener("click", function () {
    location.reload();
  });
}
