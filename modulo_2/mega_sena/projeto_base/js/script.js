var state = {
    board: [],
    currentGame: [],
    savedGames: []
}

function start() {
    readLocalStorage();
    createBoard();
    newGame();
}

function createBoard() {
    state.board = []

    for (var i=1; i<=60; i++) {
        state.board.push(i);
    }
}

function newGame() {
    resetGame();
    render();
}

function render() {
    renderBoard();
    renderButtons();
    renderSavedGames();
}

function renderBoard() {
    var divBoard = document.querySelector('#megasena-board');
    divBoard.innerHTML = '';

    var ulNumbers = document.createElement('ul');
    ulNumbers.classList.add('numbers')

    for (var i=0; i<state.board.length; i++) {
        var currentNumber = state.board[i];

        var liNumber = document.createElement('li');
        liNumber.textContent = currentNumber;
        liNumber.classList.add('number')

        liNumber.addEventListener('click', handleNumberClick);

        if (isNumberInGame(currentNumber)) {
            liNumber.classList.add('selected-number')
        }

        ulNumbers.appendChild(liNumber);
    }

    divBoard.appendChild(ulNumbers);
}

function handleNumberClick(event) {
    var value = Number(event.currentTarget.textContent);
    
    if (isNumberInGame(value)) {
        removeNumber(value);
    } else {
        addNumberToGame(value);
    }

    render();
}

function renderButtons() {
    var divButtons = document.querySelector("#megasena-buttons");
    divButtons.innerHTML = '';

    var buttonNewGame = createNewGameButton();
    var buttonRandomGame = createRandomGameButton();
    var buttonSaveGame = createSaveGameButton();

    divButtons.appendChild(buttonNewGame);
    divButtons.appendChild(buttonRandomGame);
    divButtons.appendChild(buttonSaveGame);
}

function createNewGameButton() {
    var button = document.createElement('button');
    button.textContent = 'Novo Jogo';

    button.addEventListener('click', newGame);

    return button;
}

function createRandomGameButton() {
    var button = document.createElement('button');
    button.textContent = 'Jogo aleatório';

    button.addEventListener('click', randomGame);

    return button;
}

function createSaveGameButton() {
    var button = document.createElement('button');
    button.textContent = 'Salvar Jogo';
    button.disabled = !isGameComplete();

    button.addEventListener('click', saveGame);

    return button;
}

function randomGame() {
    resetGame();

    while (!isGameComplete()) {
        var randomNumber = Math.ceil(Math.random()*60);
        addNumberToGame(randomNumber);
    }

    render();
}

function renderSavedGames(){
    var divSavedGames = document.querySelector("#megasena-saved-games");
    divSavedGames.innerHTML = '';

    if (state.savedGames.length === 0) {
        divSavedGames.innerHTML = '<p>Nenhum jogo salvo</p>';
    } else {
        var ulSavedGames = document.createElement('ul');

        for (var i=0; i<state.savedGames.length; i++) {
            var currentGame = state.savedGames[i];

            var liGame = document.createElement('li');
            liGame.textContent = currentGame.join(', ');

            ulSavedGames.appendChild(liGame);
        }

        divSavedGames.appendChild(ulSavedGames)
    }
}

function addNumberToGame(numberToAdd) {
    if (numberToAdd < 1 || numberToAdd > 60) {
        console.error("Números devem ser entre 1 e 60");
        return;
    }

    if (state.currentGame.length >= 6) {
        console.error("O jogo só pode ter 6 números");
        return;
    }

    if (isNumberInGame(numberToAdd)) {
        console.error("Este número já está no jogo: ", numberToAdd);
        return;
    }

    state.currentGame.push(numberToAdd);
    state.currentGame.sort();
}

function removeNumber(numberToRemove) {
    if (numberToRemove < 1 || numberToRemove > 60) {
        console.error("Número inválido: ", numberToRemove);
        return;
    }    

    var newGame = []

    for (var i = 0; i < state.currentGame.length; i++) {
        var currentNumber = state.currentGame[i]

        if (currentNumber === numberToRemove) {
            continue;
        }

        newGame.push(currentNumber);
    }

    state.currentGame = newGame;
}

function isNumberInGame(numberToCheck) {
    return state.currentGame.includes(numberToCheck);
}

function saveGame() {
    if (!isGameComplete) {
        console.error("O jogo não está completo");
        return;
    }
    
    state.savedGames.push(state.currentGame);
    writeToLocalStorage();
    newGame();
}

function isGameComplete() {
    return state.currentGame.length === 6;
}

function resetGame() {
    state.currentGame = []
}

function readLocalStorage() {
    if (!window.localStorage) {
        return;
    }

    var savedGamesFromLocalStorage = window.localStorage.getItem('saved-games');
    if (savedGamesFromLocalStorage) {
        state.savedGames = JSON.parse(savedGamesFromLocalStorage);
    }
}

function writeToLocalStorage() {
    window.localStorage.setItem('saved-games', JSON.stringify(state.savedGames));
}

start()