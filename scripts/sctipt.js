const operatorContainer = document.querySelector('#operators');
const numbersContainer = document.querySelector('#numbers');
let getNumber = '';
let getOperator = '';


numbersContainer.onclick = function (event) {
    let target = event.target;

    if (target.tagName != 'DIV') return;

    return getNumber = target.textContent;
};

operatorContainer.onclick = function (event) {
    let target = event.target;

    if (target.tagName != 'DIV') return;

    return getOperator = target.textContent;
};


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