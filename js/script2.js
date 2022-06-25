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
let res = "";
let lastOperation = "";
let lastkey = "";

keypads.addEventListener("click", (e) => {
  if (res === Infinity || isNaN(res)) return; // sprecava bilo kakvu dalju radnju dok se ne resetuje kada npr dijelimo sa nulom

  const clickedNumber = e.target.closest(".number");
  // ako smo kliknuli na broj i ako je dosadasnja duzina rezultatamanja od 15
  if (clickedNumber && result.textContent.length < 15) {
    lastkey = +clickedNumber.textContent;
    //ne smije biti prva tacka ili da vec postoji tacka trenutnom operandu
    if (
      (clickedNumber.textContent === "." && currentOperand === "") ||
      (clickedNumber.textContent === "." && currentOperand.includes("."))
    )
      return;

    //ako je trenutni operand nula i kada kliknemo na neki drugi broj mora da se pojavi taj broj a ne nula ispred nnjega. dozvoljena je tacka
    if (currentOperand === "0" && clickedNumber.textContent !== ".") {
      currentOperand = clickedNumber.textContent;
      result.textContent = currentOperand;
      return;
    }

    // if (currentOperand === "-") result.textContent = currentOperand;
    currentOperand = currentOperand + clickedNumber.textContent;
    result.textContent = currentOperand;
  }

  const clickedOperation = e.target.closest(".operation");
  if (clickedOperation && result.textContent.length < 15) {
    //ako poslednji key nije broj tj promijenili smo operaciju , treba je promijeniti i na ekranu i returnovati
    if (!Number.isFinite(lastkey)) {
      //   if (res === "" && clickedOperation.textContent === "-") {
      //     return;
      //   } // nema potrebe da se ista dogadja kada je res=""
      if (previousOperand.textContent === "") {
        if (clickedOperation.textContent === "-") {
          currentOperand = "-";
          result.textContent = clickedOperation.textContent;
        }
        return;
      }
      lastOperation = clickedOperation.textContent;
      previousOperand.textContent = res + " " + lastOperation;
      return;
    }

    lastkey = clickedOperation.textContent;
    //prije switcha provjeriti lastoperation, ako nema operacije trenutna
    // if (lastOperation === "") lastOperation = clickedOperation.textContent;
    if (currentOperand === "") return;
    switch (lastOperation) {
      case "+":
        res = res + parseFloat(currentOperand);
        break;

      case "-":
        res = res - parseFloat(currentOperand);
        break;

      case "/":
        res = res / parseFloat(currentOperand);
        break;

      case "x":
        res = res * parseFloat(currentOperand);

        break;

      default:
        res = parseFloat(currentOperand);
        lastOperation = clickedOperation.textContent;
        break;
    }
    if (res === Infinity || isNaN(res)) {
      keypadReset.style.backgroundColor = "red";
      previousOperand.textContent = res;
      currentOperand = "";
      result.textContent = currentOperand;
      return;
    }

    lastOperation = clickedOperation.textContent;
    previousOperand.textContent = res + " " + lastOperation;
    currentOperand = "";
    result.textContent = currentOperand;
  }
});
keypadReset.addEventListener("click", () => {
  keypadReset.style.backgroundColor = "";

  result.textContent = "0";
  previousOperand.textContent = "";
  currentOperand = "";
  res = "";
  lastOperation = "";
  lastkey = "";
});

keypadDel.addEventListener("click", () => {
  result.textContent = result.textContent.slice(0, -1);
  currentOperand = currentOperand.slice(0, -1);
  result.textContent = result.textContent === "" ? 0 : result.textContent;
});

keypadEqual.addEventListener("click", () => {
  switch (lastOperation) {
    case "+":
      res = res + parseFloat(currentOperand);
      break;

    case "-":
      res = res - parseFloat(currentOperand);
      break;

    case "/":
      res = res / parseFloat(currentOperand);
      break;

    case "x":
      res = res * parseFloat(currentOperand);

      break;

    default:
      res = parseFloat(currentOperand);
      lastOperation = keypadEqual.textContent;
      break;
  }
  result.textContent = res;
  previousOperand.textContent = "";
  res = "";
  currentOperand = "";
  lastkey = "";
  lastOperation = "";
});
