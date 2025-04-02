// Show and hide How to Play page
document.addEventListener('DOMContentLoaded', function() {
    const howToBtn = document.querySelector('#how-to-btn');
    const howToPage = document.querySelector('#howTo-page');
    const closeBtn = document.querySelector('#close-btn');
    
    // Show the how-to page when "How to Play" button is clicked
    howToBtn.addEventListener('click', function() {
        howToPage.style.visibility = 'visible';
    });
    
    // Close the how-to page when the close button is clicked
    closeBtn.addEventListener('click', function() {
        howToPage.style.visibility = 'hidden';
    });
});

// Start button shows the game interface
const startBtn = document.querySelector('#start-btn');
const gamePage = document.querySelector('#game-page');
const displayTime = document.querySelector('#time');

let time = 5;

const retryBtn = document.querySelector('#retry-btn');
const failPage = document.querySelector('#fail');

// Game starts when start btn is clicked
startBtn.addEventListener('click', function() {
    // Show game interface
    gamePage.style.visibility = 'visible';

    displayTime.innerHTML = time;

        // Arrow Key
        window.addEventListener(
            "keydown",
            (event) => {
              if (event.defaultPrevented) {
                return; // Do nothing if the event was already processed
              }

            switch (event.keyCode) {
            case 37:
                console.log('Left key');
            break;
            case 38:
                console.log('Up key');
            break;
            case 39:
                console.log('Right key');
            break;
            case 40:
                console.log('Down key');
            break;
            default: 
            return;
            }
            event.preventDefault();

            }, true,
        );



    // When start button is clicked, time starts going right away
    const timeInterval =  setInterval(function() {
        time--;
        displayTime.innerHTML = time;


        if (time <= 0) {
            clearInterval(timeInterval);
            gamePage.style.opacity = "40%";

            // If user fails, show fail ending
            failPage.style.visibility = 'visible';

            // If user fails to place 20 items under 60 seconds, they fail

            // If user lose all 3 hearts, they fail

            // If user success, show successs ending


        }
    }, 1000);
})



// Retry button goes back to the start page
retryBtn.addEventListener('click', function() {
    time = 5;
    gamePage.style.visibility = 'hidden';
    gamePage.style.opacity = "100%";
    failPage.style.visibility = 'hidden'; 
})
