const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");

let screenEl = document.getElementById("screen");

let inProcess = false;
let isNumberBeginning = true;
let isDecimal = false;
let firstNumber = null;
let secondNumber = null;
let result = null;
let operation = null;

function numberClicked() {
    if (this.id == "number0" && isNumberBeginning)
        return;

    if (isNumberBeginning && this.id != "decimal") {
        screenEl.innerText = null;
        isNumberBeginning = false;
    }

    if (isNumberBeginning && this.id == "decimal") {
        screenEl.innerText = 0;
        isNumberBeginning = false;
    }

    if (isDecimal && this.id != "decimal" || !isDecimal)
        screenEl.innerText += this.innerText;

    if (this.id == "decimal")
        isDecimal = true;
}

function operate() {
    if (operation == "substract")
        result = parseFloat(firstNumber) - parseFloat(secondNumber);
    
    if (operation == "add") 
        result = parseFloat(firstNumber) + parseFloat(secondNumber);
    
    if (operation == "multiplication")
        result = parseFloat(firstNumber) * parseFloat(secondNumber);
    
    if (operation == "division")
        result = parseFloat(firstNumber) / parseFloat(secondNumber);
}

function operateNestedEquals() {
    if(operation == "substract")
        result = result - parseFloat(secondNumber);

    if(operation == "add") 
        result = result + parseFloat(secondNumber);

    if(operation == "multiplication")
        result = result * parseFloat(secondNumber);

    if(operation == "division")
        result = result / parseFloat(secondNumber);
}

function operatorClicked() {
    if (this.id == "clear") {
        inProcess = false;
        isNumberBeginning = true;
        firstNumber = null;
        secondNumber = null;
        result = null;
        operation = null;
        isDecimal = false;
        screenEl.innerText = 0;
        return;
    }

    if (!inProcess) {

        if (this.id == "equal" && result != null) {
            operateNestedEquals();
            screenEl.innerText = result;
            return;
        }
        else if (this.id == "equal")
            return;

        inProcess = true;
        operation = this.id;

        firstNumber = screenEl.innerText;
        isNumberBeginning = true;
    }

    if (inProcess && this.id == "equal") {
        secondNumber = screenEl.innerText;

        operate();

        screenEl.innerText = result;

        isDecimal = false;
        isNumberBeginning = true;
        inProcess = false;
    }

}

numbers.forEach(number => {
    number.addEventListener("click", numberClicked);
})

operators.forEach(operator => {
    operator.addEventListener("click", operatorClicked);
})