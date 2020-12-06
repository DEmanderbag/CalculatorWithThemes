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

themeSwitch.addEventListener("pointerdown", () =>{
  themesMenu.classList.toggle("themes--open");
});

themeCard.forEach(e => {
  e.addEventListener("pointerdown", () => {
    eventValue = e.innerText;
    if(eventValue === "Round Calculator"){
      roundCalculator();
    } else if(eventValue === "Round Calculator Dark Mode"){
      roundDarkMode();
    } else if(eventValue === "Minimal Calculator"){
      minimalCalculator();
    }else if(eventValue === "Minimal Calculator Dark Mode"){
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