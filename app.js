const cells = document.querySelectorAll('.cell');
const winner = document.querySelector('#winner h2'); 

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

cells.forEach(cell => {
    cell.addEventListener('click', makeMove);
});

function makeMove (e) {
    const cell = e.target;
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

function checkForWin () {
    winningCombinations.forEach(combination => {
        const [x, y, z] = combination;
        if (cells[x].classList.contains('selected') && cells[y].classList.contains('selected') && cells[z].classList.contains('selected')) {
            if (cells[x].innerText === cells[y].innerText && cells[x].innerText === cells[z].innerText) {
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

function displayWinner () {
    winner.innerText = lastMove + ' is the Winner';
}

function displayDraw () {
    winner.innerText = 'Draw';
}

function reset () {
    cells.forEach(cell => {
        cell.innerText = '';
        cell.classList.remove('selected', 'win');
    });
    lastMove = '';
    winner.innerText = '';
    gameOver = false;
}