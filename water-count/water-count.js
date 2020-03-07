const allSmallGlasses = document.querySelectorAll('.small-glasses');
const waterPercentage = document.getElementById('waterPercentage');
const remainedLitres = document.getElementById('remainedLitres');
const topData = document.getElementById('topData');
const resetButton = document.getElementById('reset');
const days = document.getElementById('days');
let glassStates = {};
resetGlassStates();

function resetGlassStates() {
    glassStates = {
        1: Array(8).fill(false),
        2: Array(8).fill(false),
        3: Array(8).fill(false),
        4: Array(8).fill(false),
        5: Array(8).fill(false),
        6: Array(8).fill(false),
        7: Array(8).fill(false),
    };
}

days.addEventListener('change', updateDayStatus);

function updateDayStatus() {
    let states = glassStates[days.selectedIndex + 1];
    console.log(states);
    for (let i = 0; i < states.length; i++) {
        if (states[i]) {
            allSmallGlasses[i].classList.add('full');
        }
        else {
            allSmallGlasses[i].classList.remove('full');
        }
    }
    updateData();
}
allSmallGlasses.forEach((item, index) => {
    item.addEventListener('click', () => {
        fillTheGlasses(index);
    });
});

function fillTheGlasses(index) {
    let i;
    if (allSmallGlasses[index].classList.contains('full') &&
        (index === 7 || !(allSmallGlasses[index + 1].classList.contains('full')))) {
        allSmallGlasses[index].classList.remove('full');
        updateData();
    }
    else {
        for (i = 0; i <= index; i++) {
            allSmallGlasses[i].classList.add('full');
        }
        for (i; i < allSmallGlasses.length; i++) {
            if (allSmallGlasses[i].classList.contains('full')) {
                allSmallGlasses[i].classList.remove('full');
            }
        }
        updateData();
    }
}

function updateData() {
    let numberOffilledGlasses = document.getElementsByClassName('full').length;
    let remainedLitresHeight = 100 - (numberOffilledGlasses * 12.5);
    let waterPercentageHeight = numberOffilledGlasses * 12.5;
    let litres = (2000 - (numberOffilledGlasses * 250));
    litres /= 1000;
    waterPercentage.innerHTML = `${waterPercentageHeight}%`;
    topData.style.height = `${remainedLitresHeight}%`;
    remainedLitres.innerHTML = `${litres.toFixed(2)}L`;
    waterPercentage.style.height = `${waterPercentageHeight}%`;
    glassStates[days.selectedIndex + 1] = addGlassesToArray();
}
resetButton.addEventListener('click', reset);

function reset() {
    allSmallGlasses.forEach((item) => {
        item.classList.remove('full');
    });
    resetGlassStates();
    updateData();
}

function addGlassesToArray() {
    let glassArray = [];
    allSmallGlasses.forEach((glass, index) => {
        if (allSmallGlasses[index].classList.contains('full')) {
            glassArray[index] = true;
        }
        else {
            glassArray[index] = false;
        }
    });
    return glassArray;
}
window.onunload = (event) => {
    let dayStatus = days.selectedIndex;
    window.localStorage.setItem('glassArray', JSON.stringify(glassStates));
    window.localStorage.setItem('dayStatus', JSON.stringify(dayStatus));
};

window.onload = (event) => {
    resetGlassStates();
    updateDayStatus();
    console.log(`second ${glassStates}`);
    glassStates = JSON.parse(window.localStorage.getItem('glassArray'));
    let day = JSON.parse(window.localStorage.getItem('dayStatus'));
    console.log(parseInt(day));
    days.options[day].selected = true;
    updateDayStatus();
    //updateData();
};
