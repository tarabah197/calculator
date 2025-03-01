const btnContainer = document.querySelector('.btn-container');
const displayCurrentValue = document.querySelector('.current');
const displayPreviousValue = document.querySelector('.previous');
const numbers = ['0','1','2','3','4','5','6','7','8','9','.'];
const operators = ['+','-','/','*'];
let a = '';
let b = '';
let operator = '';
let operation = [displayCurrentValue.textContent.trim()];

function clearAll() {
    displayCurrentValue.textContent = 0;
    displayPreviousValue.textContent = '';
    a = '';
    b = '';
    operator = '';
    updateDisplay();
}

btnContainer.onclick = function (event) {
    let target = event.target;

    if (target.tagName != 'BUTTON') return;
    
    const key = target.textContent;

    // clear display
    if (key == 'AC') return clearAll();

    // get numbers and operator
    if (numbers.includes(key)) {
        if(b === '' && operator === ''){        
            a+=key;
        }else if (a !== '' && operator !== '') {
            b+=key;
        }
    } 
    if (operators.includes(key)){
        operator = key;
    }

    updateDisplay();
};

function updateDisplay() {
    displayCurrentValue.textContent = `${a} ${operator} ${b}`;
    displayPreviousValue.textContent = a !== '' && operator !== '' && b !== '' ? `${a} ${operator} ${b} =` : '';
}



function add (a,b){
    return a + b;
}

function subtract (a,b) {
    return a - b;
}

function multiply (a,b) {
    return a * b;
}

function divide (a,b) {
    return a / b;
}