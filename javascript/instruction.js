const howToBtn = document.querySelector('#how-to-btn');
const howToPage = document.querySelector('#howTo-page');
const closeBtn = document.querySelector('#close-btn');

//////////
// How to Play show and hide
howToBtn?.addEventListener('click', () => {
    howToPage.style.visibility = 'visible';
});

closeBtn?.addEventListener('click', () => {
    howToPage.style.visibility = 'hidden';
});

