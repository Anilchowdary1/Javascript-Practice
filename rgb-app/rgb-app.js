//changes the color of Left section
function changeColorOfLeft(colour) {
    document.getElementById('left-content').style.backgroundColor = colour;

}

//changes the color of the first child
function changeColorOfRightTop(colour) {
    document.getElementById('first-child').style.backgroundColor = colour;
}

//changes the color of the second child
function changeColorOfRightMiddle(colour) {
    document.getElementById('second-child').style.backgroundColor = colour;
}

//changes the color of the third child
function changeColorOfRightdown(colour) {
    document.getElementById('third-child').style.backgroundColor = colour;
}

//increases the height of left content
function increaseLeftDivisionHeight() {
    let leftElement = document.getElementById('left-content');
    let height = leftElement.clientHeight + 10;
    if (height <= 500) {
        leftElement.style.height = height + 'px';
    }
    else {
        alert('Maximum height reached');
    }
}
//decreases the height of left content
function decreaseLeftDivisionHeight() {
    let leftElement = document.getElementById('left-content');
    let height = leftElement.clientHeight - 10;
    if (height >= 80) {
        leftElement.style.height = height + 'px';
    }
    else {
        alert('Minimum height reached');
    }
}

function swapWithRightChild(target) {
    let CurrentElement = target.parentElement.parentElement;
    if (CurrentElement.style.order < 2) {
        CurrentElement.style.order = 2;
    }
    else {
        alert("Oops!! You can't do anymore");
    }
}

function swapWithLeftChild(target) {
    let CurrentElement = target.parentElement.parentElement;
    //alert(CurrentElement.style.order);
    if (CurrentElement.style.order > 1) {
        CurrentElement.style.order = 1;
    }
    else {
        alert("You can't do that!!");
    }
}

function swapWithPreviousChild(target) {
    let CurrentChild = target.parentElement.parentElement;
    let previousChild = CurrentChild.previousElementSibling;
    let CurrentChildBackground = window.getComputedStyle(CurrentChild, null).getPropertyValue('background-color');
    if (previousChild) {
        let previousChildBackground = window.getComputedStyle(previousChild, null).getPropertyValue('background-color');
        CurrentChild.style.backgroundColor = previousChildBackground;
        previousChild.style.backgroundColor = CurrentChildBackground;
    }
    else {
        let lastChild = CurrentChild.parentElement.children[2]
        let lastChildBackground = window.getComputedStyle(lastChild, null).getPropertyValue('background-color');
        CurrentChild.style.backgroundColor = lastChildBackground;
        lastChild.style.backgroundColor = CurrentChildBackground;
    }
}

function swapWithNextChild(target) {
    let CurrentChild = target.parentElement.parentElement;
    let nextChild = CurrentChild.nextElementSibling;
    let CurrentChildBackground = window.getComputedStyle(CurrentChild, null).getPropertyValue('background-color');
    if (nextChild) {
        let nextChildBackground = window.getComputedStyle(nextChild, null).getPropertyValue('background-color');
        CurrentChild.style.backgroundColor = nextChildBackground;
        nextChild.style.backgroundColor = CurrentChildBackground;
    }
    else {
        let firstChild = CurrentChild.parentElement.children[0];
        let firstChildBackground = window.getComputedStyle(firstChild, null).getPropertyValue('background-color');
        CurrentChild.style.backgroundColor = firstChildBackground;
        firstChild.style.backgroundColor = CurrentChildBackground;
    }
}

function resetAll() {
    //alert('working');
    let leftChild = document.getElementById('left-content');
    let rightChild = document.getElementById('right-content');
    leftChild.style.backgroundColor = '#28a745';
    for (let i = 0; i < 3; i++) {
        rightChild.children[i].style.backgroundColor = '#28a745';
    }
    leftChild.style.height = 500 + 'px';
}
