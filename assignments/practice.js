const firstEl = document.getElementById('one');
const secondEl = document.getElementById('two');
const thirdEl = document.getElementById('three');
firstEl.addEventListener('click', () => {
    console.log('First element event listener!');
    console.log(event.currentTarget);
}, true);

secondEl.addEventListener('click', () => {
    console.log('Second element event listener!');
    console.log(event.currentTarget);
}, true);

thirdEl.addEventListener('click', () => {
    console.log('Third element event listener!');
    console.log(event.currentTarget);
    //event.stopPropagation();
}, false);
