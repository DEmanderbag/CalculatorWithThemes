const themeSwitch = document.querySelector(".theme__switch .box");
const themesMenu = document.querySelector(".themes");
const themeCard = themesMenu.querySelectorAll(".theme__card");

// Calculator buttons
const calculator = document.querySelector(".calculator");
const calculatorScreen = calculator.querySelector(".calculator__screen");
const calculatorKeys = calculator.querySelector(".calculator__keys");
const calculatorKeyOperator = calculator.querySelectorAll(".calculator__key--operator");
const calculatorKey = calculator.querySelectorAll(".calculator__key");
const calculatorKeyEquals = calculator.querySelector(".calculator__key--equals");
let eventValue;

// Calculator Logic
calculatorKeys.addEventListener("pointerdown", e =>{
  if(e.target.matches("button")){
    const key = e.target;
    const action = key.dataset.action;
    const keyValue = key.textContent;
    const displayNumber = calculatorScreen.textContent;
    
    console.log(keyValue);
    console.log(displayNumber);
    // Remove the class from the key
    Array.from(key.parentNode.children).forEach(k => k.classList.remove("is-pressed"));
    const previousKeyType = calculator.dataset.previousKeyType;

    if(!action){
      if(displayNumber === "0" || previousKeyType === "operator"){
        calculatorScreen.textContent = keyValue;
      } else{
        calculatorScreen.textContent = displayNumber + keyValue;
      }
      calculator.dataset.previousKeyType = "number";
    }
    

    if(action === "add" ||
      action === "subtract" ||
      action === "multiply" ||
      action === "divide"){
      const firstValue = calculator.dataset.firstValue;
      const operator = calculator.dataset.operator;
      const secondValue = displayNumber;

      // Fix issue for consecutive calculations here 
      if (firstValue && operator && previousKeyType !== "operator") {
        const calcValue = calculate(firstValue, operator, secondValue);
        calculatorScreen.textContent = calcValue;

        calculator.dataset.firstValue = calcValue;
      } else {
        calculator.dataset.firstValue = displayNumber;
      }
        key.classList.add("is-pressed");
        calculator.dataset.previousKeyType = "operator";
        calculator.dataset.firstValue = displayNumber;
        calculator.dataset.operator = action;
      }

    if (action === "decimal"){
      if(!displayNumber.includes(".")){
        calculatorScreen.textContent = displayNumber + ".";
      } else if (previousKeyType === "operator"){
        calculatorScreen.textContent = "0.";
      }
      calculator.dataset.previousKeyType = "decimal";
    } 

    if(action === "clear"){
      console.log(`${action} key!`);
      calculator.dataset.previousKeyType = "clear";
    }
    if(action === "calculate"){
      const firstValue = calculator.dataset.firstValue;
      const operator = calculator.dataset.operator;
      const secondValue = displayNumber;
      calculatorScreen.textContent = calculate(firstValue, operator, secondValue);

      calculator.dataset.previousKeyType = "calculate";
    }
  }
})

const calculate = (n1, operator, n2) => {
  let result = "";
  if(operator === "add"){
    result = parseFloat(n1) + parseFloat(n2);
  } else if (operator === "subtract"){
    result = parseFloat(n1) - parseFloat(n2);
  } else if (operator === "multiply"){
    result = parseFloat(n1) * parseFloat(n2);
  } else if (operator === "divide"){
    result = parseFloat(n1) / parseFloat(n2);
  }
  return result;
}

// Logic for theme switching
themeSwitch.addEventListener("pointerdown", () =>{
  themesMenu.classList.toggle("themes--open");
});

themeCard.forEach(e => {
  e.addEventListener("pointerdown", () => {
    if(eventValue = e.classList.contains("roundLight")){
      roundCalculator();
    } else if(eventValue = e.classList.contains("roundDark")){
      roundDarkMode();
    } else if(eventValue = e.classList.contains("minimalLight")){
      minimalCalculator();
    }else if(eventValue = e.classList.contains("minimalDark")){
      minimalCalculatorDark();
    }
  })
});

function removeClasses () {
  calculatorScreen.className = "calculator__screen";
  calculatorKeys.className = "calculator__keys";

  calculatorKey.forEach(e => {
    e.className = "calculator__key";
  });

  calculatorKeyOperator.forEach(e => {
    e.className = "calculator__key--operator";
  });
}

function roundCalculator (){
  removeClasses();
  calculatorScreen.classList.add("round__screen");
  loopElements(calculatorKeyOperator, "round__key");
  calculatorKeys.classList.add("round__keys");
  loopElements(calculatorKey, "round__key");
  calculatorKeyEquals.classList.add("round__key");
}

function roundDarkMode(){
  roundCalculator();
  calculatorScreen.classList.add("round__calculator--dark");
  calculatorKeys.classList.add("round__keys--dark");
  loopElements(calculatorKey, "round__key--dark");
}

function minimalCalculator(){
  roundCalculator();
  calculatorScreen.classList.add("minimal__screen");
  loopElements(calculatorKey, "minimal__key")
  loopElements(calculatorKeyOperator, "minimal__operator");
}

function minimalCalculatorDark(){
  roundCalculator()
  calculatorScreen.classList.add("minimal__screen--dark");
  calculatorKeys.classList.add("minimal__screen--dark");
  loopElements(calculatorKey, "minimal__key--dark");
  loopElements(calculatorKeyOperator, "minimal__key--operator");
}

function loopElements(name, className) {
  name.forEach(e => {
    e.classList.add(className);
  });
}