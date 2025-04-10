const howToBtn = document.querySelector('#how-to-btn');
const howToPage = document.querySelector('#howTo-page');
const closeBtn = document.querySelector('#close-btn');
const closeBtn2 = document.querySelector('#close-btn2');

//////////
// How to Play show and hide
howToBtn?.addEventListener('click', () => {
    howToPage.style.visibility = 'visible';
});

closeBtn?.addEventListener('click', () => {
    howToPage.style.visibility = 'hidden';
});

closeBtn2?.addEventListener('click', () => {
    howToPage.style.visibility = 'hidden';
});