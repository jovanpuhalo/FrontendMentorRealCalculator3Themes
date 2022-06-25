//theme switcher selectors
const labels = document.querySelector(".switcher__labels");
const button = document.querySelector(".switcher__button");
const circle = document.querySelector(".switcher__button__circle");

//keypad selectors
const keypads = document.querySelector(".keypads");
const keypadPlus = document.querySelector(".keypad--plus");
const keypadMinus = document.querySelector(".keypad--minus");
const keypadDivide = document.querySelector(".keypad--divide");
const keypadMultiply = document.querySelector(".keypad--multiply");
const dot = document.querySelector(".dot");
const keypadDel = document.querySelector(".keypad--del");
const keypadReset = document.querySelector(".keypad--reset");
const keypadEqual = document.querySelector(".keypad--equal");
const previousOperand = document.querySelector(".first-operand");

const result = document.querySelector(".result");

//theme switcher
button.addEventListener("click", (e) => {
  e.preventDefault();
  console.log("click");
  if (circle.classList.contains("circle-position-1")) {
    circle.classList.remove("circle-position-1");
    circle.classList.add("circle-position-2");

    document.documentElement.className = "theme-2";
    return;
  }
  if (circle.classList.contains("circle-position-2")) {
    circle.classList.remove("circle-position-2");
    circle.classList.add("circle-position-3");

    document.documentElement.className = "theme-3";

    return;
  }
  if (circle.classList.contains("circle-position-3")) {
    circle.classList.remove("circle-position-3");
    circle.classList.add("circle-position-1");

    document.documentElement.className = "theme-1";

    return;
  }
});

labels.addEventListener("click", (e) => {
  const clicked = e.target.closest(".switcher__label");
  circle.classList.remove("circle-position-1", "circle-position-2", "circle-position-3");
  circle.classList.add(`circle-position-${clicked.textContent}`);
  document.documentElement.className = `theme-${clicked.textContent}`;
});

//keypad
let currentOperand = "";
let res = 0;
let operands = "";
let display = "";
let lastKey = "0";
let lastOperation = "";

let operations = ["/", "x", "-", "+"];

keypads.addEventListener("click", (e) => {
  const clickedNumber = e.target.closest(".number");
  if (clickedNumber && result.textContent.length < 15) {
    if (operations.includes(lastKey)) {
      // kada se klikne na operaciju resetuje se ono sto se treba prikazati u rezultat
      display = "";
    }

    // lastKey = clickedNumber.textContent;
    currentOperand = currentOperand + clickedNumber.textContent;
    console.log("currentOperand", currentOperand);
    // display = display + lastKey;
    result.textContent = currentOperand;
  }
});
keypadPlus.addEventListener("click", () => {
  // if (operations.includes(lastKey) || lastKey === "0") {
  //   lastOperation = keypadPlus.textContent;
  //   operands = operands + lastKey;
  //   // operands = operands.slice(-1) + lastOperation;
  //   console.log(operands.slice(0, -1)) + lastOperation;
  //   return;
  // } // ne smije dvije operacije zaredom kliknuti
  if (lastOperation === "-") {
    lastOperation = keypadPlus.textContent;
    res = res - +currentOperand;
    previousOperand.textContent = res + lastOperation;
    currentOperand = "";
    result.textContent = currentOperand;
    return;

    return;
  }
  // if (lastOperation === "/") {
  //   lastOperation = keypadPlus.textContent;
  //   lastKey = keypadPlus.textContent;
  //   operands = operands + display + lastKey;
  //   previousOperand.textContent = operands;
  //   currentOperand = currentOperand / +display;

  //   result.textContent = currentOperand;
  //   console.log("uso");
  //   return;
  // }
  // if (lastOperation === "x") {
  //   lastOperation = keypadPlus.textContent;
  //   lastKey = keypadPlus.textContent;
  //   operands = operands + display + lastKey;
  //   previousOperand.textContent = operands;
  //   currentOperand = currentOperand * +display;

  //   result.textContent = currentOperand;
  //   console.log("uso");
  //   return;
  // }
  lastOperation = keypadPlus.textContent;
  // lastOperation = keypadPlus.textContent;
  // console.log("desio se klik na plus");
  // operands = operands + display + lastKey;
  // currentOperand = currentOperand + +display;
  // previousOperand.textContent = operands;
  res = res + +currentOperand;
  previousOperand.textContent = res + lastOperation;
  currentOperand = "";
  result.textContent = currentOperand;
});

keypadMinus.addEventListener("click", () => {
  // if (operations.includes(lastKey) || lastKey === "0") {
  //   lastOperation = keypadMinus.textContent;
  //   return;
  // } // ne smije dvije operacije zaredom kliknuti
  if (lastOperation === "+") {
    lastOperation = keypadMinus.textContent;
    res = res + +currentOperand;
    previousOperand.textContent = res + lastOperation;
    currentOperand = "";
    result.textContent = currentOperand;
    return;
  }
  // if (lastOperation === "/") {
  //   lastOperation = keypadMinus.textContent;
  //   lastKey = keypadMinus.textContent;
  //   operands = operands + display + lastKey;
  //   previousOperand.textContent = operands;
  //   currentOperand = currentOperand / +display;

  //   result.textContent = currentOperand;
  //   return;
  // }
  // if (lastOperation === "x") {
  //   lastOperation = keypadMinus.textContent;
  //   lastKey = keypadMinus.textContent;
  //   operands = operands + display + lastKey;
  //   previousOperand.textContent = operands;
  //   currentOperand = currentOperand * +display;

  //   result.textContent = currentOperand;
  //   return;
  // }
  // if (lastOperation === "") {
  //   currentOperand = +display;
  //   console.log(currentOperand);
  // } else {
  //   console.log(currentOperand, +display);
  //   currentOperand = currentOperand - +display;
  // }

  lastOperation = keypadMinus.textContent;

  res = res - +currentOperand;
  console.log("res,+currentOperand", res, +currentOperand);
  previousOperand.textContent = res + lastOperation;
  currentOperand = "";
  result.textContent = currentOperand;
  // lastOperation = keypadMinus.textContent;
  // operands = operands + display + lastKey;

  // // currentOperand = currentOperand - +display;
  // // display = currentOperand;
  // previousOperand.textContent = operands;
  // result.textContent = currentOperand;
});
keypadDivide.addEventListener("click", () => {
  // if (operations.includes(lastKey) || lastKey === "0") {
  //   lastOperation = keypadDivide.textContent;
  //   return;
  // } // ne smije dvije operacije zaredom kliknuti
  // if (lastOperation === "+") {
  //   lastOperation = keypadDivide.textContent;
  //   lastKey = keypadDivide.textContent;
  //   operands = operands + display + lastKey;
  //   previousOperand.textContent = operands;
  //   currentOperand = currentOperand + +display;

  //   result.textContent = currentOperand;
  //   return;
  // }
  // if (lastOperation === "-") {
  //   lastOperation = keypadDivide.textContent;
  //   lastKey = keypadDivide.textContent;
  //   operands = operands + display + lastKey;
  //   previousOperand.textContent = operands;
  //   currentOperand = currentOperand - +display;

  //   result.textContent = currentOperand;
  //   console.log("uso");
  //   return;
  // }
  // if (lastOperation === "x") {
  //   lastOperation = keypadDivide.textContent;
  //   lastKey = keypadDivide.textContent;
  //   operands = operands + display + lastKey;
  //   previousOperand.textContent = operands;
  //   currentOperand = currentOperand * +display;

  //   result.textContent = currentOperand;
  //   return;
  // }

  // lastKey = keypadDivide.textContent;
  // if (lastOperation === "") {
  //   currentOperand = +display;
  // } else {
  //   currentOperand = currentOperand / +display;
  //   if (currentOperand % 1 !== 0) currentOperand = currentOperand.toFixed(2); //ovo isto uraditi za ostale slucajeve
  // }

  lastKey = keypadDivide.textContent;
  res = res / +currentOperand;
  // console.log("res,+currentOperand", res, +currentOperand);
  previousOperand.textContent = res + lastKey;
  currentOperand = "";
  result.textContent = currentOperand;
  //////////////////////////////////////////
  // lastOperation = keypadDivide.textContent;
  // operands = operands + display + lastKey;

  // previousOperand.textContent = operands;
  // result.textContent = currentOperand;
});

keypadMultiply.addEventListener("click", () => {
  if (operations.includes(lastKey) || lastKey === "0") {
    lastOperation = keypadMultiply.textContent;
    return;
  } // ne smije dvije operacije zaredom kliknuti
  if (lastOperation === "+") {
    lastOperation = keypadMultiply.textContent;
    lastKey = keypadMultiply.textContent;
    operands = operands + display + lastKey;
    previousOperand.textContent = operands;
    currentOperand = currentOperand + +display;

    result.textContent = currentOperand;
    return;
  }
  if (lastOperation === "-") {
    lastOperation = keypadMultiply.textContent;
    lastKey = keypadMultiply.textContent;
    operands = operands + display + lastKey;
    previousOperand.textContent = operands;
    currentOperand = currentOperand - +display;

    result.textContent = currentOperand;
    console.log("uso");
    return;
  }
  if (lastOperation === "/") {
    lastOperation = keypadMultiply.textContent;
    lastKey = keypadMultiply.textContent;
    operands = operands + display + lastKey;
    previousOperand.textContent = operands;
    currentOperand = currentOperand / +display;

    result.textContent = currentOperand;
    console.log("uso");
    return;
  }

  lastKey = keypadMultiply.textContent;
  console.log("display", display);
  if (lastOperation === "") {
    currentOperand = +display;
  } else {
    currentOperand = currentOperand * +display;
    console.log("jo", currentOperand * +display, currentOperand / +display);
  }
  lastOperation = keypadMultiply.textContent;
  operands = operands + display + lastKey;
  display = "";
  previousOperand.textContent = operands;
  result.textContent = currentOperand;
});
// const clickedNumber = e.target.closest(".number");
// const clickedAritmetic = e.target.closest(".aritmetic-operation");
// console.log(clickedNumber, currentOperand.length);
// if (clickedNumber && result.textContent.length < 15) {
//   console.log(clickedNumber.textContent);
//   if (clickedNumber.textContent === "0" && lastKey === "0" && currentOperand.length == 1) return;
//   console.log(clickedNumber.textContent);

//   if (clickedNumber.textContent !== "0" && currentOperand === "0") currentOperand = ""; //if clicked 0 twice reset
//   console.log(clickedNumber.textContent);

//   if (aritmetics.includes(lastKey)) {
//     currentOperand = "";
//   }
//   console.log(clickedNumber.textContent);
//   lastKey = clickedNumber.textContent;
//   currentOperand = currentOperand + clickedNumber.textContent;
//   result.textContent = currentOperand;
//   // result.textContent = +previousOperand.textContent + +clickedNumber.textContent;
// }

// // console.log(aritmetics.includes(lastKey));
// if (clickedAritmetic && !aritmetics.includes(lastKey)) {
//   console.log(previousOperand.textContent === "");
//   if (previousOperand.textContent === "") {
//     currentOperand = currentOperand;
//     console.log(currentOperand);
//   } else {
//     currentOperand = +currentOperand + +lastKey;
//     console.log("else", currentOperand);
//   }

//   lastKey = clickedAritmetic.textContent;
//   previousOperand.textContent = previousOperand.textContent + currentOperand + lastKey;
//   result.textContent = currentOperand;
//   // result.textContent = +previousOperand.textContent + +clickedNumber.textContent;
// }
