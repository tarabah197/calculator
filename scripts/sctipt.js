const btnContainer = document.querySelector('.btn-container');
const numbers = ['0','1','2','3','4','5','6','7','8','9','.'];
const operators = ['+','-','/','*'];
let getNumber = '';


btnContainer.onclick = function (event) {
    let target = event.target;

    if (target.tagName != 'BUTTON') return;
    getNumber = target.textContent;
    if (numbers.includes(getNumber)) 
    return console.log("true");
    return console.log(getNumber);
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