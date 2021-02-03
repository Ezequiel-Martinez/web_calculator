const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");

let screenEl = document.getElementById("input");
let historyEl = document.getElementById("history");

historyEl.innerText = null;
let inProcess = false;
let isNumberBeginning = true;
let isChangingOpinion = false;
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

function clear() {
    inProcess = false;
    isNumberBeginning = true;
    isChangingOpinion = false;
    firstNumber = null;
    secondNumber = null;
    result = null;
    operation = null;
    isDecimal = false;
    screenEl.innerText = 0;
    historyEl.innerText = null;
}

function updateHistory(buttonPressed) {
    if (buttonPressed.id != "equal") {
        if (historyEl.innerText == "")
            historyEl.innerText = firstNumber;

        if (!isChangingOpinion) {
            if (operation == "substract")
                historyEl.innerText += " -";
            
            if (operation == "add") 
                historyEl.innerText += " +";
            
            if (operation == "multiplication")
                historyEl.innerText += " *";
            
            if (operation == "division")
                historyEl.innerText += " /";
        }
        else {
            historyEl.innerText = historyEl.innerText.substring(0, historyEl.innerText.length - 1);

            if (operation == "substract")
                historyEl.innerText += " -";
            
            if (operation == "add") 
                historyEl.innerText += " +";
            
            if (operation == "multiplication")
                historyEl.innerText += " *";
            
            if (operation == "division")
                historyEl.innerText += " /";
        }
    }
    else 
        historyEl.innerText = "( " + historyEl.innerText + " " + secondNumber + " )";
}

function operatorClicked() {

    // PRESIONADO CLEAR //

    if (this.id == "clear") {
        clear();
        return;
    }

    // PRESIONADO DELETE //
    
    if (this.id == "delete") {
        if (screenEl.innerText.length == 1) {
            isNumberBeginning = true;
            screenEl.innerText = "0";
        }
        else 
            screenEl.innerText = screenEl.innerText.substring(0, screenEl.innerText.length - 1);
        
        return;
    }

    // PRIMER ARGUMENTO //

    if (!inProcess) {

        // Operar cuando el usuario clickee el igual después de una operación

        if (this.id == "equal" && result != null) {
            operateNestedEquals();
            historyEl.innerText = null;
            screenEl.innerText = result;
            return;
        }
        else if (this.id == "equal")
            return;

        inProcess = true;
        operation = this.id;
        firstNumber = screenEl.innerText;
        isNumberBeginning = true;

        updateHistory(this);
    }

    // SEGUNDO ARGUMENTO O CORRIGIENDO OPERACIÓN//

    if (inProcess) {

        // CORRIGIENDO OPERACIÓN //

        if (this.id == "substract" || this.id == "add" || this.id == "multiplication" || this.id == "division") {
            operation = this.id;
            isChangingOpinion = true;
            updateHistory(this);
            return;
        }

        if (this.id == "equal") {
            secondNumber = screenEl.innerText;
    
            operate();
            updateHistory(this);
    
            screenEl.innerText = result;
    
            isDecimal = false;
            inProcess = false;
            isChangingOpinion = false;
        }

    }
}

numbers.forEach(number => {
    number.addEventListener("click", numberClicked);
})

operators.forEach(operator => {
    operator.addEventListener("click", operatorClicked);
})