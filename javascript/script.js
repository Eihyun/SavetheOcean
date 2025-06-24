//////////
const banana = '../images/Banana.png';
const bottle = '../images/Bottle.png';
const can = '../images/Can.png';
const paper = '../images/Paper.png';

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

const itemMap = {
    ArrowUp: banana,
    ArrowLeft: bottle,
    ArrowRight: paper,
    ArrowDown: can
};

const octopus = document.getElementById('octopus');
// Handle arrow key press
function handleKey(event) {
    // listen to the pressed arrow key
    const expectedItem = itemMap[event.key];
    // console.log(octopus);
    if (event.key === 'ArrowRight') {
        octopus.style.transform = "rotate(90deg)";
    } else if (event.key === 'ArrowDown') {
        octopus.style.transform = "rotate(180deg)";
    }else if (event.key === 'ArrowUp') {
        
        octopus.style.transform = "rotate(0deg)";
    }else if (event.key === 'ArrowLeft') {
        octopus.style.transform = "rotate(270deg)";
    }
    // return the value according to the pressed arrow key
    if (!expectedItem) {
        return;
    } 

    // set current item to be the bottom item(#item1) on the conveyor
    const currentItem = itemList[0];

    const correctSound = new Audio('../audio/sparkle.mp3');
    const wrongSound = new Audio('../audio/splat.mp3');

    // If the current item is equal to the pressed arrow key value
    // pressed the right arrow key
    if (expectedItem === currentItem) {
        correctSound.currentTime = 0; // rewind to start
        correctSound.play();
        // remove the first element(#item1) from the item list array
        itemList.shift();
        // add a random element to the end of the item list array
        itemList.push(getRandomItem());
        // display the updated item array 
        renderItems();
        // add 1 score
        score++;
        // display the updated score
        updateScore();
    } else { // pressed the wrong arrow key
        wrongSound.currentTime = 0; // rewind to start
        wrongSound.play();
        // lose 1 heart
        loseHeart();
    }
}

// display the updated score
function updateScore() {
    displayScore.innerHTML = score;
}

// lose 1 heart when pressed the wrong arrow key 
function loseHeart() {
    // add 1 wrong count
    wrongCount++;

    // lose 1st heart
    if (wrongCount === 1) {
        // last heart turns gray
        heart3.src = '../images/Heart_x.png';
        // background image changes
        gamePage.style.backgroundImage = 'url(../images/Game_bg_2.png)';
    } else if (wrongCount === 2) { // lose 2nd heart
        // middle heart turns gray
        heart2.src = '../images/Heart_x.png';
        // background image changes
        gamePage.style.backgroundImage = 'url(../images/Game_bg_3.png)';
    } else if (wrongCount === 3) { // lose 3rd heart
        fail();
    }
}

//////////
const startBtn = document.querySelector('#start-btn');
const startBtn2 = document.querySelector('#start-btn2');
const displayTime = document.querySelector('#time');
const displayScore = document.querySelector('#score');

// Time set for the game play
let time = 60;

// bgm starts
const bgm = document.querySelector('#bgm');
const bgmAutoPlay = () => {
    bgm.play().catch(err => {
        console.warn('Autoplay blocked:', err.message);
    });
};

// Game play start
function gameStart() {
    // Show game interface
    gamePage.style.visibility = 'visible';
    // Display time starting 60 seconds
    displayTime.innerHTML = time;
    updateScore();

    // Play background music
    bgmAutoPlay();

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
            if (score < 20 || wrongCount > 2) {
                fail();
                return;
            } else { // If user win, show successs ending
                success();
                return;
            }
        }
    }, 1000);
}

startBtn?.addEventListener('click', gameStart);
startBtn2?.addEventListener('click', gameStart);

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

const failSound = new Audio('../audio/fail.mp3');
const successSound = new Audio('../audio/yay.mp3');

const failTitle = document.getElementById('fail-title');

// Display Fail page
function fail() {
    failPage.style.visibility = 'visible';
    gamePage.style.opacity = '0%';

    // fail sound effect
    failSound.currentTime = 0; // rewind to start
    failSound.play();

    // Clear previous content
    failTitle.innerHTML = '';

    // First line (reason)
    const reason = document.createElement("p");
    if ( wrongCount > 2 ) {
        reason.textContent = "You lost all your hearts!";
        // Second line (instruction or encouragement)
        const followUp = document.createElement("p");
        followUp.textContent = "Try again to save the ocean!";

        // Append both paragraphs
        failTitle.appendChild(reason);
        failTitle.appendChild(followUp);
        reset();
        return;

    } else {
        reason.textContent = "Time's up!";
        // Second line (instruction or encouragement)
        const followUp = document.createElement("p");
        followUp.textContent = "Try again to save the ocean!";

        // Append both paragraphs
        failTitle.appendChild(reason);
        failTitle.appendChild(followUp);
        reset();
        return;
    }
}

// Display Success page
function success() {
    successPage.style.visibility = 'visible';
    gamePage.style.opacity = '0%';
    reset();
    successSound.currentTime = 0; // rewind to start
    successSound.play();
}

//////////
// Retry button goes back to 
function goHome() {
    location.reload();
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



//////////
// Arrow keys instruction
const arrowKey = document.getElementById("arrow-key");
const arrowDesc = document.getElementById("arrow-desc");

const showDesc = () => arrowDesc.classList.remove("hidden");
const hideDesc = () => arrowDesc.classList.add("hidden");

arrowKey.addEventListener("mouseenter", showDesc);
arrowKey.addEventListener("mouseleave", hideDesc);
