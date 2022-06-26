const gameBoard = (() => {
    const game = [['','',''],['','',''],['','','']];
    const loggameBoard = () => console.log(game);
    const alterBoard = (rowIndex, arrIndex, item) => {
        game[rowIndex][arrIndex] === '' ? item : '';
    }
    const refreshDisplay = (playerItem) => {
        const allDocItems = [...document.querySelectorAll('.griditem')];
        let index = 0;
        game.forEach(row => {
            row.forEach(innerItem => {
                console.log(innerItem);
                allDocItems[index].textContent = innerItem;
                index ++;
            })
        })
    };
    return {
        loggameBoard, 
        alterBoard,
        refreshDisplay,
    };
})();

const player = (name, noughtorcross) => {
    const getName = () => name;
    const getNoughtOrCross = () => noughtorcross;
    return {
        getName,
        getNoughtOrCross,
    };
};

const displayController = (() => {
    const currentGame = gameBoard;
    const playerOne = player()
    const playerTwo = player();
    document.querySelector('fieldset > button')
    console.log(playerOne.getName());
    console.log(playerOne.getNoughtOrCross());
    console.log(playerTwo.getName());
    console.log(playerTwo.getNoughtOrCross());
    const startGame = () => {
        currentGame.loggameBoard();
        currentGame.refreshDisplay(playerOne.getNoughtOrCross());
    }
    return {
        currentGame,
        playerOne,
        playerTwo,
        startGame,
    };
})();
