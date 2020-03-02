const allSmallGlasses = document.querySelectorAll('.small-glasses');
const waterPercentage = document.getElementById('waterPercentage');
const remainedLitres = document.getElementById('remainedLitres');
const topData = document.getElementById('topData');
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
}
