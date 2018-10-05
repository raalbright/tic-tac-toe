const cells = document.querySelectorAll('.cell');
const displayMsg = document.querySelector('#display h2'); 

let lastMove = '';
let gameOver = false;
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8]
];

const makeMove = ({target: cell }) => {
    if (gameOver) {
        reset();
    } else if (!cell.classList.contains('selected')) {
        if (lastMove !== 'X') {
            cell.innerText = 'X';
            lastMove = 'X';
        } else {
            cell.innerText = 'O';
            lastMove = 'O';
        }
        cell.classList.add('selected');
        checkForWin();
    }
}

const checkForWin = () => {
    winningCombinations.forEach(combination => {
        const [x, y, z] = combination;
        if (cells[x].classList.contains('selected') && cells[y].classList.contains('selected') && cells[z].classList.contains('selected')) {
            if (cells[x].innerText === cells[y].innerText && cells[y].innerText === cells[z].innerText) {
                cells[x].classList.add('win');
                cells[y].classList.add('win');
                cells[z].classList.add('win');
                displayWinner();
                gameOver = true;
            }
        }
    });
    
    const draw = Array.from(cells).every(cell => cell.classList.contains('selected'));
    if (draw && !gameOver) {
        displayDraw();
    }
}

const displayWinner = () => displayMsg.innerText = lastMove + ' is the Winner';

const displayDraw = () => displayMsg.innerText = 'Draw';

const reset = () => {
    cells.forEach(cell => {
        cell.innerText = '';
        cell.classList.remove('selected', 'win');
    });
    lastMove = '';
    displayMsg.innerText = '';
    gameOver = false;
}

cells.forEach(cell => cell.addEventListener('click', makeMove));