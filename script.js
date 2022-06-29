const gameBoard = (() => {
  let game = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  const loggameBoard = () => console.log(game);
  const resetBoard = () => {
    game = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ];
  };
  const getFreePositions = () => {
    let freeArr = [];
    game.forEach((row, outerIndex) => {
      row.forEach((item, innerIndex) => {
        if (game[outerIndex][innerIndex] === "") {
          freeArr.push([outerIndex, innerIndex]);
        }
      });
    });
    return freeArr;
  };
  const checkIfFree = (rowIndex, arrIndex) => {
    if (game[rowIndex][arrIndex] === "") {
      return true;
    }
  };
  const alterBoard = (rowIndex, arrIndex, item) => {
    if (checkIfFree(rowIndex, arrIndex) === true) {
      game[rowIndex][arrIndex] = item;
    }
  };
  const refreshDisplay = () => {
    const allDocItems = [...document.querySelectorAll(".griditem")];
    let index = 0;
    game.forEach((row) => {
      row.forEach((innerItem) => {
        allDocItems[index].textContent = innerItem;
        index++;
      });
    });
  };
  const checkWinner = (userNoughtCross) => {
    if (
      game[0][0] === userNoughtCross &&
      game[0][1] === userNoughtCross &&
      game[0][2] === userNoughtCross
    ) {
      return true;
    } else if (
      game[1][0] === userNoughtCross &&
      game[1][1] === userNoughtCross &&
      game[1][2] === userNoughtCross
    ) {
      return true;
    } else if (
      game[2][0] === userNoughtCross &&
      game[2][1] === userNoughtCross &&
      game[2][2] === userNoughtCross
    ) {
      return true;
    } else if (
      game[0][0] === userNoughtCross &&
      game[1][0] === userNoughtCross &&
      game[2][0] === userNoughtCross
    ) {
      return true;
    } else if (
      game[0][1] === userNoughtCross &&
      game[1][1] === userNoughtCross &&
      game[2][1] === userNoughtCross
    ) {
      return true;
    } else if (
      game[0][2] === userNoughtCross &&
      game[1][2] === userNoughtCross &&
      game[2][2] === userNoughtCross
    ) {
      return true;
    } else if (
      game[0][0] === userNoughtCross &&
      game[1][1] === userNoughtCross &&
      game[2][2] === userNoughtCross
    ) {
      return true;
    } else if (
      game[0][2] === userNoughtCross &&
      game[1][1] === userNoughtCross &&
      game[2][0] === userNoughtCross
    ) {
      return true;
    }
  };
  return {
    loggameBoard,
    alterBoard,
    refreshDisplay,
    resetBoard,
    checkWinner,
    checkIfFree,
    getFreePositions,
  };
})();

const player = () => {
  let noughtorcross;
  let score = 0;
  const getNoughtOrCross = () => noughtorcross;
  const setNoughtOrCross = (setnought) => (noughtorcross = setnought);
  const getScore = () => score;
  const setScore = (userscore) => (score = userscore);
  return {
    getNoughtOrCross,
    setNoughtOrCross,
    getScore,
    setScore,
  };
};

const displayController = (() => {
  const submitForm = document.querySelector("#myform");
  const playOneScore = document.querySelector(".playeronescore > p");
  const playTwoScore = document.querySelector(".playertwoscore > p");
  playerOne = player();
  playerTwo = player();
  submitForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const formInfo = new FormData(submitForm);
    const formPairs = {};
    for (const [name, value] of formInfo) {
      formPairs[name] = value;
    }
    userChoice = playerOne.setNoughtOrCross(formPairs.noughtorcross);
    if (userChoice === "X") {
      playerTwo.setNoughtOrCross("O");
    } else {
      playerTwo.setNoughtOrCross("X");
    }
    while (submitForm.firstChild) {
      submitForm.removeChild(submitForm.lastChild);
    }
    startGame();
  });
  const startGame = () => {
    let freePos;
    let randomFree;
    gameBoard.resetBoard();
    gameBoard.refreshDisplay();
    const clickable = [...document.querySelectorAll(".griditem")];
    clickable.forEach((gridItem) => {
      gridItem.addEventListener("click", function (e) {
        gameBoard.alterBoard(
          parseInt(gridItem.id[0]),
          parseInt(gridItem.id[1]),
          playerOne.getNoughtOrCross()
        );
        gameBoard.loggameBoard();
        gameBoard.refreshDisplay();
        if (gameBoard.checkWinner(playerOne.getNoughtOrCross()) === true) {
          playerOne.setScore(playerOne.getScore() + 1);
          playOneScore.textContent = playerOne.getScore();
          setTimeout(() => {
            gameBoard.resetBoard();
            gameBoard.refreshDisplay();
          }, 500);
        } else {
          freePos = gameBoard.getFreePositions();
          if (freePos.length === 0) {
            setTimeout(() => {
              gameBoard.resetBoard();
              gameBoard.refreshDisplay();
            }, 500);
          } else {
            randomFree = freePos[Math.floor(Math.random() * freePos.length)];
            gameBoard.alterBoard(
              randomFree[0],
              randomFree[1],
              playerTwo.getNoughtOrCross()
            );
            if (gameBoard.checkWinner(playerTwo.getNoughtOrCross()) === true) {
              playerTwo.setScore(playerTwo.getScore() + 1);
              playTwoScore.textContent = playerTwo.getScore();
              setTimeout(() => {
                gameBoard.resetBoard();
                gameBoard.refreshDisplay();
              }, 500);
            }
          }
        }
        gameBoard.refreshDisplay();
      });
    });
  };
})();
