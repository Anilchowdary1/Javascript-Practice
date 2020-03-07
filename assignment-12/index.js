const deposit = document.getElementById('deposit');
const withdraw = document.getElementById('withdraw');
const showBalance = document.getElementById('showBalance');
const history = document.getElementById('history');

const depositInput = document.querySelector('.deposit-display');
const depositSubmit = document.querySelector('.deposit-submit');
const depositAmount = document.querySelector('.deposit-amount');
const withdrawInput = document.querySelector('.withdraw-display');
const withdrawSubmit = document.querySelector('.withdraw-submit');
const withdrawAmount = document.querySelector('.withdraw-amount');

const resultDisplay = document.querySelector('.resultDisplay');
const updatedAmount = document.getElementById('updatedAmount');
const errorDisplay = document.querySelector('.error-display');
const historyDetails = document.getElementById('historyDetails');
const historyTable = document.getElementById('transactionTable');

let transaction;

class Transaction {
    constructor(transactionType, transactionAmount, balance) {
        this.transactionType = transactionType;
        this.transactionAmount = transactionAmount;
        this.balance = balance;
    }
}
class ATM {
    constructor() {
        this.mode = null;
        this.balance = 0;
        this.transactionHistory = [];
    }
    makeWithdrawal(money) {
        this.balance -= money;
        this.mode = 'WITHDRAW';
        transaction = new Transaction(this.mode, money, this.balance);
        this.transactionHistory.push(transaction);
    }
    makeDeposit(money) {
        this.balance += money;
        this.mode = 'DEPOSIT';
        transaction = new Transaction(this.mode, money, this.balance);
        this.transactionHistory.push(transaction);
    }
    showBalance() {
        this.mode = 'SHOW_BALANCE';
        updatedAmount.innerHTML = `Rs ${this.balance}`;
    }
}

let atm;
let errorMessage = '';

//onload Process
window.addEventListener('load', () => {
    atm = new ATM();
    let dummy = JSON.parse(window.localStorage.getItem('atm'));
    if (dummy) {
        atm.mode = dummy.mode;
        atm.balance = dummy.balance;
        atm.transactionHistory = dummy.transactionHistory;
    }
    console.log(atm);
});

function hideAll() {
    depositInput.classList.add('hide');
    withdrawInput.classList.add('hide');
    resultDisplay.classList.add('hide');
    historyTable.classList.add('hide');
    historyDetails.innerHTML = '';
    errorDisplay.innerHTML = '';
}

//Deposit Part

deposit.addEventListener('click', (event) => {
    setActiveButton(event.target);
    hideAll();
    depositInput.classList.remove('hide');
});
depositSubmit.addEventListener('click', () => {
    updateErrorMessage('');
    let money = parseInt(depositAmount.value);
    if (money <= 0 || isNaN(money) || money === '') {
        errorMessage = 'Enter valid amount';
    }
    else {
        depositAmount.value = '';
        errorMessage = '';
        atm.makeDeposit(money);
    }
    updateErrorMessage(errorMessage);
});

//Withdrawal Part

withdraw.addEventListener('click', (event) => {
    setActiveButton(event.target);
    hideAll();
    withdrawInput.classList.remove('hide');
});
withdrawSubmit.addEventListener('click', () => {
    updateErrorMessage('');
    let money = parseInt(withdrawAmount.value);
    if (isNaN(money) || money === '') {
        errorMessage = 'Enter valid amount';
    }
    else {
        if (money <= 0 || money > atm.balance) {
            errorMessage = 'Insufficient balance';
        }
        else {
            withdrawAmount.value = '';
            errorMessage = '';
            atm.makeWithdrawal(money);
        }
    }
    updateErrorMessage(errorMessage);
});

//Show balance and history Part

showBalance.addEventListener('click', (event) => {
    setActiveButton(event.target);
    hideAll();
    resultDisplay.classList.remove('hide');
    atm.showBalance();
});

history.addEventListener('click', (event) => {
    setActiveButton(event.target);
    atm.mode = 'HISTORY';
    hideAll();
    const currentTableRows = document.getElementsByTagName('tr');
    let transactionsList = atm.transactionHistory;
    if (transactionsList.length === 0) {
        historyDetails.innerHTML = 'No transactions';
    }
    else if (currentTableRows.length - 1 !== transactionsList.length) {
        historyTable.classList.remove('hide');
        for (let i = currentTableRows.length; i <= transactionsList.length; i++) {
            let newRow = historyTable.insertRow(i);
            let cell1 = newRow.insertCell(0);
            let cell2 = newRow.insertCell(1);
            let cell3 = newRow.insertCell(2);
            cell1.innerHTML = transactionsList[i - 1].transactionType.toLowerCase();
            cell2.innerHTML = transactionsList[i - 1].transactionAmount;
            cell3.innerHTML = transactionsList[i - 1].balance;
        }
    }
    else {
        historyTable.classList.remove('hide');
    }
});

//UI Part

function setActiveButton(target) {
    let activeButtons = document.querySelectorAll('.active-btn');
    activeButtons.forEach((btn) => {
        btn.classList.add('inactive-btn');
        btn.classList.remove('active-btn');
    });
    target.classList.add('active-btn');
}

function updateErrorMessage(error) {
    errorDisplay.innerHTML = error;
}

//Local Storage part

window.addEventListener('unload', () => {
    window.localStorage.setItem('atm', JSON.stringify(atm));
});
