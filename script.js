class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
      this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
            this.clear()
    }
  
    //clear function called by the onclick event handler allClearButton
    clear(){
      this.currentOperand = ''
        this.previousOperand = ''
            this.operation = undefined
    }
  
    //delete function called by the delete onclick event handler
    delete(){
      this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }
    
    //this function appends the numbers after the decimal point the decimal digit
    appendNumber(number){
      if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }
  
    chooseOperation(operation) {
      if (this.currentOperand === '') return
        if (this.previousOperand !== '') {
            this.compute()
      }
      this.operation = operation
        this.previousOperand = this.currentOperand
            this.currentOperand = ''
    }
  
    compute(){
      let computation
        const prev = parseFloat(this.previousOperand)
            const current = parseFloat(this.currentOperand)
                if (isNaN(prev) || isNaN(current)) return
        switch(this.operation) {
            case '+':
                computation = prev + current
                    break
            case '-':
                computation = prev - current
                    break
            case '*':
                computation = prev * current
                    break
            case '÷':
                computation = prev / current
                    break
            default:
                    return
      }
      //this current operand stores the calculated computation 
      //operation becomes undefined with operand becoming an empty strong
      this.currentOperand = computation
        this.operation = undefined
            this.previousOperand = ''
    }
  
    getDisplayNumber(number){
      const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
            const decimalDigits = stringNumber.split('.')[1]
                let integerDisplay

      if(isNaN(integerDigits)){
        integerDisplay = ''
      } else{
        integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
      }
      if(decimalDigits != null){
        return `${integerDisplay}.${decimalDigits}`
      } else{
        return integerDisplay
      }
    }
  
    //updates the Calculator display with the entered operand  or calculated result
    updateDisplay(){
      this.currentOperandTextElement.innerText =
        this.getDisplayNumber(this.currentOperand)
      if (this.operation != null){
        this.previousOperandTextElement.innerText =
          `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
      } else{
            this.previousOperandTextElement.innerText = ''
      }
    }
  }
  
  //constants store the values of the javascript classes in html buttons
  const numberButtons = document.querySelectorAll('[data-number]')
  const operationButtons = document.querySelectorAll('[data-operation]')
  const equalsButton = document.querySelector('[data-equals]')
  const deleteButton = document.querySelector('[data-delete]')
  const allClearButton = document.querySelector('[data-all-clear]')
  const previousOperandTextElement = document.querySelector('[data-previous-operand]')
  const currentOperandTextElement = document.querySelector('[data-current-operand]')
  
  const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)
  
  //when a number is entered the screen is updated with a respective value
  numberButtons.forEach(button => {
    button.addEventListener('click', () => {
      calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
  })
 
  //operations are logged for each event operation that is performed on the  calculator when using the interface
  operationButtons.forEach(button => {
    button.addEventListener('click', () => {
      calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
  })
  
  equalsButton.addEventListener('click', button =>{
    calculator.compute()
        calculator.updateDisplay()
  })
  
  //listens for when the allClearButton is clicked 
  allClearButton.addEventListener('click', button =>{
    calculator.clear()
        calculator.updateDisplay()
  })
  
  //listens for when the delete button is clicked
  deleteButton.addEventListener('click', button =>{
    calculator.delete()
        calculator.updateDisplay()
  })