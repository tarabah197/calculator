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
const MAX_LENGTH = 15;

function clearAll() {
    displayCurrentValue.textContent = 0;
    displayPreviousValue.textContent = '';
    a = '';
    b = '';
    operator = '';
    resetA = false;
    continueOperate = false;
}

function clear() {
    if (a === 'Error') return clearAll();
    if (b !== '') {
        b = b.slice(0, -1);
    } else if (operator !== '') {
        operator = '';
    } else if (a !== ''){
        a = a.slice(0, -1);
    }

    updateDisplay();
}

btnContainer.onclick = function (event) {
    let target = event.target;

    if (target.tagName != 'BUTTON') return;
    
    const key = target.textContent;

    // clear display
    if (key === 'AC') return clearAll();

    // clear one sign
    if (key === "\n                        backspace\n                    ") return clear();

    // calculate
    if (key === '=') return calculate();

    // toggle sign
    if (key === '-') return toggleMinus();

    // manipulation with percents
    if (key === '%') return toPercent();

    if (numbers.includes(key)) {
        numberInput(key);
    }

    if (operators.includes(key)) {
        operatorInput(key);
    }

    updateDisplay();
};

document.addEventListener('keydown', function(event) {
    
    const key = event.key;

    if (key === 'Delete') return clearAll();

    if (key === 'Backspace') return clear();

    if (key === 'Enter') return calculate();

    if (key === '-') return toggleMinus();

    if (key === '%') return toPercent();

    if (numbers.includes(key)) {
        numberInput(key);
    }
    
    if (operators.includes(key) || key === '/' || key === ':') {
        operatorInput(key === '/' || key === ':' ? '÷' : key);
    }

    updateDisplay();
   });

function toPercent() {
    if (operator === '' && a !== '') {
        a = ((parseFloat(a) / 100) + '%').toString();
    } else if (operator !== '' && b !== '') {
        b = ((parseFloat(a) * parseFloat(b) / 100) + '%').toString();
    }
    updateDisplay();
}

function toggleMinus() {
    if (a === '' && operator === '') {
        a = '-';
    } else if (a === '-' && operator === '') {
        return;
    } else if (operator === '' || operator === '+' && a !== '') {
        operator = '-';
    } else if (operator !== '' && b === '') {
        if (operator === '*' || operator === '÷') {
            b = '-';
        }
    } 
    
    updateDisplay();
}

function numberInput(key) {
    if (resetA && operator !== '') {
        if (b.length >= MAX_LENGTH) return;
        b = key === '.' && b === '' ? '0.' : b + key;
    } else if (resetA) {
        a = key === '.' ? '0.' : key;
        resetA = false;
        continueOperate = false;
    } else if (!operator) {
        if (a.length >= MAX_LENGTH) return;
        if (key === '.' && a.includes('.')) return;
        if (a.includes('-')) {
            a = key === '.' ? '-0.' : a + key;    
        } else {
            a = key === '.' && a === '' ? '0.' : a + key;
        }
    } else {
        if (b.length >= MAX_LENGTH) return;
        if (key === '.' && b.includes('.')) return;
        b = key === '.' && b === '' ? '0.' : b + key;
    }
}

function operatorInput(key) {
    if (a === '' || a === '.' || a === 'Error') return;
    if (b !== '') {
        calculate();
    }

    operator = key;
    continueOperate = true;
}

function calculate() {
    if (a === '' || b === '' || operator === '' || b === '-') return;
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

        a = result !== 'Error' ? result = parseFloat(result.toFixed(15)).toString() : result.toString();
        b = '';
        operator = '';
        resetA = true;
        continueOperate = false;

        updateDisplay();
}

function updateDisplay() {
    displayCurrentValue.textContent = `${a} ${operator} ${b}`.trim() || '0';
}