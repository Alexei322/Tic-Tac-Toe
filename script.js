const gameBoard = (() => {
    const game = [['','',''],['','',''],['','','']];
    const loggameBoard = () => console.log(game);
    const alterBoard = (rowIndex, arrIndex, item) => {
        game[rowIndex][arrIndex] === '' ? item : '';
    }
    const refreshDisplay = () => {
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

const player = () => {
    let name;
    let noughtorcross;
    const getName = () => name;
    const getNoughtOrCross = () => noughtorcross;
    const setName = (setname) => name = setname; 
    const setNoughtOrCross = (setnought) => noughtorcross = setnought; 
    return {
        getName,
        getNoughtOrCross,
        setName,
        setNoughtOrCross,
    };
};

const displayController = (() => {
    const currentGame = gameBoard;
    const submitForm = document.querySelector('#myform');
    playerOne = player();
    playerTwo = player();
    submitForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const formInfo = new FormData(submitForm);
        const formPairs = {};
        for(const [name, value] of formInfo) {
            formPairs[name] = value;
            console.log(name, value);
        };
        console.log(formPairs);
        playerOne.setName(formPairs.nameinput);
        userChoice = playerOne.setNoughtOrCross(formPairs.noughtorcross);
        playerTwo.setName("Computorrrrrr");
        if(userChoice === "X") {
            playerTwo.setNoughtOrCross("O")
        } else {
            playerTwo.setNoughtOrCross("X")
        };
        startGame()

    });
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
