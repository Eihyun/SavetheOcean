// Get DOM elements
const bgm = document.querySelector('#bgm');

// Autoplay BGM when game starts
const bgmAutoPlay = () => {
    bgm.play();
};
window.addEventListener('load', bgmAutoPlay);

// Toggle mute/unmute on icon click
const bgmToggle = () => {
    const isMuted = play.classList.contains('fa-volume-mute');

    play.classList.toggle('fa-volume-up', isMuted);
    play.classList.toggle('fa-volume-mute', !isMuted);
    bgm.muted = !isMuted;
};

play.addEventListener('click', bgmToggle);
