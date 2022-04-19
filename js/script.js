const cellElements = document.querySelectorAll('[data-cell]'); 
// [ ] Usar colchetes para selecionar um atributo.
const board = document.querySelector('[data-board]');

const winningMessageTextElement = document.querySelector('[data-winning-message-text]');

const winningMessage = document.querySelector('[data-winning]')

const restartButton = document.querySelector('[data-restart-button]')

let isCircleTurn;
// Turn = vez / É a vez do círculo

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

const startGame = () => {
    isCircleTurn = false;

    for (const cell of cellElements) {
        cell.classList.remove('circle'); // remover os circulos quando reiniciar o jogo
        cell.classList.remove('x'); // remover o x quando reiniciar o jogo
        cell.removeEventListener('click', handleClick) // remvoer EventListener 

        cell.addEventListener('click', handleClick, { once: true });
        // Clique adicionado apenas 1 vez para não repetir cliques.
        // Once = uma vez
    }

    setBoardHoverClass() // alterar símbolo

    winningMessage.classList.remove('show-winning-message') // remover mensagem quando clicar em 'reiniciar'
}

const endGame = (isDraw) => { // draw = empate
    if (isDraw) {
        winningMessageTextElement.innerText = 'Empate!';
    } else {
        winningMessageTextElement.innerText = isCircleTurn 
        ? '⭕ Venceu!'
        : '❌ Venceu!';
    }

    winningMessage.classList.add('show-winning-message'); // adicionar mensagem
}

const checkForWin = (currentPlayer) => {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentPlayer)
        })
    })
}


const checkForDraw = () => { // função checar empate
    return [...cellElements].every(cell => {
       return cell.classList.contains('x') || cell.classList.contains('circle');
    })
}

const placeMark = (cell, classToAdd) => {
    // Colocar a marca (X ou CÍRCULO)
    cell.classList.add(classToAdd);
}


// lógica mudar símbolo
const setBoardHoverClass = () => {
    board.classList.remove('circle')
    board.classList.remove('x')

    if (isCircleTurn) {
        board.classList.add('circle')
    } else {
        board.classList.add('x')
    }
}

const swapTurns = () => {
    // Mudar o símbolo
    isCircleTurn = !isCircleTurn;

    setBoardHoverClass();
}


const handleClick = (e) => { // e = elemento da célula

    // Colocar a marca (X ou CÍRCULO)
    let cell = e.target;
    let classToAdd = isCircleTurn ? 'circle' : 'x';

    placeMark(cell, classToAdd);

    // Verificar por vitória
    const isWin = checkForWin(classToAdd);

    // Verificar por empate
    const isDraw = checkForDraw();
    
    if (isWin) {
        endGame(false);
    } else if (isDraw) {
        endGame(true)
    } else {
        // Mudar o símbolo
        swapTurns();
    }

}

startGame ();

restartButton.addEventListener('click', startGame) // botão de reiniciar

