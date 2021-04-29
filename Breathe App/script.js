const container = document.querySelector('.container');
const text = document.querySelector('#text');

const totalTime = 7500;
// 7500 mil sec = 7.5sec

const breatheTime = (totalTime / 5) * 2;
const holdTime = totalTime / 5;

breatheAnimation();

function breatheAnimation() {
    text.innerText = 'Breathe In';
    container.className = 'container grow';

    setTimeout(() => {
        text.innerText = 'Hold';

        setTimeout(() => {
            text.innerText = 'Breathe Out';
            container.className = 'container shrink';
        }, holdTime);
    }, breatheTime);
}

// takes in a function and excutes at a specified interval
setInterval(breatheAnimation, totalTime); 