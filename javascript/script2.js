const howToBtn = document.querySelector('#how-to-btn');
const howToPage = document.querySelector('#howTo-page');
const closeBtn = document.querySelector('#close-btn');
const startBtn = document.querySelector('#start-btn');
const retryBtn = document.querySelector('#retry-btn');
const playAgainBtn = document.querySelector('#play-again-btn');
const gamePage = document.querySelector('#game-page');
const displayTime = document.querySelector('#time');
const heart1 = document.querySelector('#heart1');
const heart2 = document.querySelector('#heart2');
const heart3 = document.querySelector('#heart3');


// Time set for the game play
let time = 5;

// Game play start
function gameStart() {
    // Show game interface
    gamePage.style.visibility = 'visible';
    // Display time starting 60 seconds
    displayTime.innerHTML = time;
    // Enable the arrow keys
    useArrowKeys();

    // When start button is clicked, time starts going right away
    const timeInterval = setInterval(function () {

        // Time subtract by 1 every second
        time--;
        // Display time changes
        displayTime.innerHTML = time;

        // If user put in a wrong bin, they lose 1st heart
        

            // Gray out 1st heart
            heart3.src = '../images/Heart_x.png';

        // lose 2nd heart

            // Gray out 2nd heart
            heart2.src = '../images/Heart_x.png';


        // If user lose all 3 hearts, they fail



        // When time ends, game ends
        if (time <= 0) {
            clearInterval(timeInterval);
            gamePage.style.opacity = '40%';

            // If user fail to place 20 items under 60 seconds, they lose
            
            // If user fail, show fail ending
            // fail();
            
            
            // If user success to place 20 items under 60 seconds, they win

                // If user win, show successs ending
                success();

        }
    }, 1000);
}

//////////
const failPage = document.querySelector('#fail');
const successPage = document.querySelector('#success');

// Display Fail page
function fail() {
    failPage.style.visibility = 'visible';
}

// Display Success page
function success() {
    successPage.style.visibility = 'visible';
}

//////////
// Retry button goes back to 
function goHome() {
    time = 5;
    gamePage.style.visibility = 'hidden';
    gamePage.style.opacity = '100%';
}

function retry() {
    goHome();
    failPage.style.visibility = 'hidden';
}

function playAgain() {
    goHome();
    gamePage.style.visibility = 'hidden';
    gamePage.style.opacity = '100%';
    successPage.style.visibility = 'hidden';
}

function useArrowKeys() {
    window.addEventListener(
    'keydown',
    (event) => {
        if (event.defaultPrevented) return;

        switch (event.key) {
        case 'ArrowLeft':
            console.log('Left key');
            break;
        case 'ArrowUp':
            console.log('Up key');
            break;
        case 'ArrowRight':
            console.log('Right key');
            break;
        case 'ArrowDown':
            console.log('Down key');
            break;
        default:
            return;
        }

        event.preventDefault();
    },
    true
    );
}

howToBtn?.addEventListener('click', () => {
    howToPage.style.visibility = 'visible';
});

closeBtn?.addEventListener('click', () => {
    howToPage.style.visibility = 'hidden';
});

startBtn?.addEventListener('click', gameStart);
retryBtn?.addEventListener('click', retry);
playAgainBtn?.addEventListener('click', playAgain);