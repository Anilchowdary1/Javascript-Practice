const startStopBtn = document.getElementById('startStopBtn');
const carStatus = document.getElementById('status');
const accelerate = document.getElementById('accelerate');
const deaccelerate = document.getElementById('deaccelerate');
class Car {
    constructor() {
        this.currentStatus = 'Stopped';
        this.speed = 0;
    }
    startTheCar() {
        this.currentStatus = 'Running';
    }
    stopTheCar() {
        this.speed = 0;
        this.currentStatus = 'Stopped';
    }
    pressAccelerate() {
        this.speed += 10;
    }
    pressDeaccelerate() {
        if (this.speed !== 0) {
            this.speed -= 10;
        }
    }
}

let car = new Car();

function changeStatesOfBtns(target, from, to) {
    target.classList.remove(from);
    target.classList.add(to);
}
startStopBtn.addEventListener('click', (event) => {
    if (car.currentStatus === 'Stopped') {
        car.startTheCar();
        event.target.innerHTML = 'Stop';
        changeStatesOfBtns(event.target, 'stopped', 'started');
        changeStatesOfBtns(accelerate, 'disable', 'enable');
    }
    else {
        car.stopTheCar();
        event.target.innerHTML = 'Start';
        changeStatesOfBtns(event.target, 'started', 'stopped');
        changeStatesOfBtns(accelerate, 'enable', 'disable');
        changeStatesOfBtns(deaccelerate, 'enable', 'disable');
    }
    updateCarStatus();
});

accelerate.addEventListener('click', (event) => {
    if (car.currentStatus === 'Running') {
        car.pressAccelerate();
        changeStatesOfBtns(deaccelerate, 'disable', 'enable');
    }
    updateCarStatus();
});

deaccelerate.addEventListener('click', (event) => {
    if (car.speed > 0) {
        car.pressDeaccelerate();
    }
    updateCarStatus();
});

function updateCarStatus() {
    if (car.speed !== 0) {
        carStatus.innerHTML = `Running with speed ${car.speed}kmph`;
    }
    else {
        changeStatesOfBtns(deaccelerate, 'enable', 'disable');
        carStatus.innerHTML = `${car.currentStatus}`;
    }
}
