const btnContainer = document.querySelector('.btn-container');
const displayCurrentValue = document.querySelector('.current');
const displayPreviousValue = document.querySelector('.previous');
const numbers = ['0','1','2','3','4','5','6','7','8','9','.'];
const operators = ['+','-','÷','*'];
let a = '';
let b = '';
let operator = '';
let resetA = false;
let continueOperate = false;

function clearAll() {
    updateDisplay();
    displayCurrentValue.textContent = 0;
    displayPreviousValue.textContent = '';
    a = '';
    b = '';
    operator = '';
    resetA = false;
    continueOperate = false;
}

btnContainer.onclick = function (event) {
    let target = event.target;

    if (target.tagName != 'BUTTON') return;
    
    const key = target.textContent;

    // clear display
    if (key == 'AC') return clearAll();

    // calculate
    if (key === '=') return calculate();

    // get numbers and operator
    if (numbers.includes(key)) {
        if (resetA && operator !== ''){
            if (key === '.' && b.includes('.')) return;
            b += key === '.' ? '0.' : key;
        } else if (resetA) {
            a = key === '.' ? '0.' : key;
            resetA = false;
            continueOperate = false;
        } else if (!operator) {
            if (key === '.' && a.includes('.')) return;
            if (key === '.' && a === '') {
                a = '0.';
            } else {
                a += key;
            }
        } else {
            if (key === '.' && b.includes('.')) return;
            if (key === '.' && b === '') {
                b = '0.';
            } else {
                b += key;
            }
        }
    }

    if (operators.includes(key)){
        if (a === '' || a === '.') return;
        if (b !== '') {
            calculate();
        }
        operator = key;
        continueOperate = true;
    }

    updateDisplay();
};

function calculate() {
    if (a === '' || b === '' || operator === '') return;
    let num1 = parseFloat(a);
    let num2 = parseFloat(b);
    let result = 0;

    switch (operator) {
            case '+':
                result = num1 + num2;
                break;
            case '-':
                result = num1 - num2;
                break;
            case '*':
                result = num1 * num2;
                break;
            case '÷':
                result = num2 !== 0 ? num1 / num2 : 'Error';
                break;
        }

        displayPreviousValue.textContent = a !== '' && operator !== '' && b !== '' ? `${a} ${operator} ${b} =` : '';

        a = result.toString();
        b = '';
        operator = '';
        resetA = true;
        continueOperate = false;

        updateDisplay();
}

function updateDisplay() {
    displayCurrentValue.textContent = `${a} ${operator} ${b}` || '0';
}