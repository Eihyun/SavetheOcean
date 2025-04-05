//////////
const banana = '../images/Banana.png';
const bottle = '../images/Bottle.png';
const can = '../images/Can.png';
const paper = '../images/Paper.png';

const itemMap = {
    ArrowUp: banana,
    ArrowLeft: bottle,
    ArrowRight: paper,
    ArrowDown: can
};

const itemList = []; // live queue of items

const itemContainers = [
    document.querySelector('#item1'),
    document.querySelector('#item2'),
    document.querySelector('#item3')
];

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function getRandomItem() {
    const items = [banana, bottle, can, paper];
    return items[getRandomInt(items.length)];
}

// Initialize the list with 3 random items
function initializeItems() {
    itemList.length = 0;
    itemContainers.forEach(container => {
        const item = getRandomItem();
        itemList.push(item);
        renderItems();
    });
}

// Render the itemList array to the 3 containers
function renderItems() {
    itemContainers.forEach((container, index) => {
        container.innerHTML = ''; // clear old content
        if (itemList[index]) {
            const img = document.createElement("img");
            img.setAttribute("src", itemList[index]);
            img.classList.add("item");
            container.appendChild(img);
        }
    });
}

let wrongCount = 0;
let score = 0;

const heart1 = document.querySelector('#heart1');
const heart2 = document.querySelector('#heart2');
const heart3 = document.querySelector('#heart3');
const gamePage = document.querySelector('#game-page');

// Handle arrow key press
function handleKey(event) {
    const expectedItem = itemMap[event.key];
    if (!expectedItem) return;

    const currentItem = itemList[0];
    if (expectedItem === currentItem) {
        itemList.shift();
        itemList.push(getRandomItem());
        renderItems();
        score++;
        updateScore();
    } else {
        loseHeart();
    }
}

function updateScore() {
    displayScore.innerHTML = score;
}

function loseHeart() {
    wrongCount++;

    if (wrongCount === 1) {
        heart3.src = '../images/Heart_x.png';
        gamePage.style.backgroundImage = 'url(../images/Game_bg_2.png)';
    } else if (wrongCount === 2) {
        heart2.src = '../images/Heart_x.png';
        gamePage.style.backgroundImage = 'url(../images/Game_bg_3.png)';
    } else if (wrongCount === 3) {
        fail();
    }
}

//////////
const startBtn = document.querySelector('#start-btn');
const displayTime = document.querySelector('#time');
const displayScore = document.querySelector('#score');

// Time set for the game play
let time = 60;

// Game play start
function gameStart() {
    // Show game interface
    gamePage.style.visibility = 'visible';
    // Display time starting 60 seconds
    displayTime.innerHTML = time;
    updateScore();

    // Start the game
    initializeItems();

    // Enable arrow key control
    window.addEventListener('keydown', handleKey);

    // When start button is clicked, time starts going right away
    const timeInterval = setInterval(function () {

        // Time subtract by 1 every second
        time--;
        // Display time changes
        displayTime.innerHTML = time;

        // When time ends, game ends
        if (time <= 0) {
            clearInterval(timeInterval);

            // If user fail to place 20 items under 60 seconds, they lose
            if (score > 20 && wrongCount < 3) {
                success();
            } else { // If user win, show successs ending
                fail();
            }

        }
    }, 1000);
}

startBtn?.addEventListener('click', gameStart);


// Reset Game interface
function reset() {
    wrongCount = 0;
    score = 0;
    time = 60;
    heart3.src = '../images/Heart.png';
    heart2.src = '../images/Heart.png';
    gamePage.style.backgroundImage = 'url(../images/Game_bg.png)';

    // Disable arrow key control
    window.removeEventListener('keydown', handleKey);
}

//////////
const retryBtn = document.querySelector('#retry-btn');
const playAgainBtn = document.querySelector('#play-again-btn');
const failPage = document.querySelector('#fail');
const successPage = document.querySelector('#success');

// Display Fail page
function fail() {
    failPage.style.visibility = 'visible';
    gamePage.style.opacity = '40%';
    reset();
}

// Display Success page
function success() {
    successPage.style.visibility = 'visible';
    gamePage.style.opacity = '40%';
    reset();
}

//////////
// Retry button goes back to 
function goHome() {
    gamePage.style.visibility = 'hidden';
    gamePage.style.opacity = '100%';
}

function retry() {
    goHome();
    failPage.style.visibility = 'hidden';
}

function playAgain() {
    goHome();
    successPage.style.visibility = 'hidden';
}

retryBtn?.addEventListener('click', retry);
playAgainBtn?.addEventListener('click', playAgain);