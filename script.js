const baseImages = [
    'images/Csharp.png',
    'images/CSS.webp',
    'images/HTML.webp',
    'images/Java.jfif',
    'images/JavaScript.png',
    'images/PHP.webp',
    'images/Python.webp',
    'images/Typescript.webp'
];

let firstCard = null;
let secondCard = null;
let lockBoard = false;

const gameBoard = document.getElementById('game-board');
const restartBtn = document.getElementById('restart-btn');

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function initGame() {
    gameBoard.innerHTML = '';
    
    firstCard = null;
    secondCard = null;
    lockBoard = false;

    const cardImages = [...baseImages, ...baseImages];
    shuffle(cardImages);

    cardImages.forEach((imagePath) => {
        const card = document.createElement('div');
        card.classList.add('game-card');
        
        card.dataset.image = imagePath;

        card.innerHTML = `
            <span class="card-front">?</span>
            <img class="card-back" src="${imagePath}" alt="logo">
        `;

        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
    });
}
function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('open');

    if (!firstCard) {
        firstCard = this;
        return;
    }
    secondCard = this;
    lockBoard = true; 

    checkMatch();
}

function checkMatch() {
    const isMatch = firstCard.dataset.image === secondCard.dataset.image;

    if (isMatch) {
        disableCards();
    } else {
        unflipCards();
    }
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}


function unflipCards() {
    setTimeout(() => {
        firstCard.classList.remove('open');
        secondCard.classList.remove('open');
        resetBoard();
    }, 500);
}

function resetBoard() {
    firstCard = null;
    secondCard = null;
    lockBoard = false;
}

if (restartBtn) {
    restartBtn.addEventListener('click', initGame);
}
initGame();