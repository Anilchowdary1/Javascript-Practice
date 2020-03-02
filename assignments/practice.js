/*const firstEl = document.getElementById('one');
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
*/
const boxContainer = document.getElementById('box');
const firstBox = document.getElementById('one');
const secondBox = document.getElementById('two');
const thirdBox = document.getElementById('three');
const fourthBox = document.getElementById('four');
boxContainer.ontouchstart = () => {
    firstBox.classList.add('rot');
    secondBox.classList.add('active');
    thirdBox.classList.add('rot');
    fourthBox.classList.add('active');
};
boxContainer.ontouchend = () => {
    firstBox.classList.remove('rot');
    secondBox.classList.remove('active');
    thirdBox.classList.remove('rot');
    fourthBox.classList.remove('active');
};
