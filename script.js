class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }

    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    };

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0,-1);
    };

    appendNumber(number) {;
        if (number === '.' && this.currentOperand.includes('.')) return;
        this.currentOperand = this.currentOperand.toString() + number.toString();
    };

    chooseOperation(operation) {
        if (this.currentOperand === '') return;
        if (this.previousOperand !== '') {
            this.operate();
        };
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    operate() {
        let computation;
        if (this.previousOperand && this.currentOperand) {
            const prev = parseFloat(this.previousOperand);
            const current = parseFloat(this.currentOperand);
            if (isNaN(prev) || isNaN(current)) return;
            switch(this.operation) {
                case '+':
                    computation = prev + current;
                    break;
                case '-':
                    if (prev === '') {
                        computation = 0 - current;
                    }
                    computation = prev - current;
                    break;
                case '*':
                    computation = prev * current;
                    break;
                case '÷':
                    if (current === 0) {
                        alert("You can't divide by 0!")
                    }
                    computation = prev / current;
                    break;
                case '%':
                    if (Number.isInteger(prev) && Number.isInteger(current)) {
                        computation = prev % current;
                    } else {
                        alert("Both operands should be integers only. Click AC to clear screen.")
                    }
                    break;
                case '^':
                    if (prev < 0 && current < 1) {
                        alert("The answer is imaginary. Click AC to clear screen.")
                    }
                    computation = prev ** current;
                    break;
                case 'Exp':
                    computation = prev * (10 ** current);
                    break;
                default:
                    return; 
            }            
        }
        if (this.currentOperand == '' && this.previousOperand) {
            const prev = parseFloat(this.previousOperand);
            if (Number.isInteger(prev) && prev >= 0) {
                if (prev === 0) computation = 1;
                let product = 1;
                for (let i = prev; i > 0; i--) {
                    product *= i;
                    computation = product;
                }
            } else {
                alert("The number must be a positive integer only.")
            }
        }
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = '';
    };

    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        let integerDisplay;
        if (isNaN(integerDigits)) {
            integerDisplay = '';
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0
            });
        };
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        } else {
            return integerDisplay
        }
    };

    updateDisplay() {
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand);
        if (this.operation != null) {
            this.previousOperandTextElement.innerText = 
            `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
        } else {
            this.previousOperandTextElement.innerText = '';
        }
    };

    plusMinus() {
        this.currentOperand *= -1;
    }
};

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');
const plusMinusButton = document.querySelector('[data-plus-minus]');

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
});

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
});

equalsButton.addEventListener('click', button => {
    calculator.operate();
    calculator.updateDisplay();
})


allClearButton.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();
})

deleteButton.addEventListener('click', button => {
    calculator.delete();
    calculator.updateDisplay();
})

plusMinusButton.addEventListener('click', button => {
    calculator.plusMinus();
    calculator.updateDisplay();
})