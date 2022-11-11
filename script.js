var number = "";
var previousNumber = 0;
var numbers = [];
var operations = [];
const text = document.getElementById("result-text");

function recordNumber(n) {
  return function () {
    number += n;
    // console.log(number);
    updateDisplay();
  };
}

function recordOperation(operation) {
  return function () {
    if (number !== "") {
      operations.push(operation);
      numbers.push(Number(number));
      number = "";
      //   console.log(typeof numbers[numbers.length - 1]);
      //   console.log(operations);
      //   console.log(numbers);
    }
    updateDisplay();
  };
}

function clear() {
  if (number !== "") {
    number = "";
    // console.log(number);
  } else {
    numbers = [];
    operations = [];
    // console.log(typeof numbers[numbers.length - 1]);
    // console.log(operations);
    // console.log(numbers);
  }
  updateDisplay();
}

function backspace() {
  if (number !== "") {
    number = number.slice(0, -1);
    updateDisplay();
    // console.log(number);
  }
}

function equals() {
  if (number !== "") {
    // console.log(operations);
    numbers.push(Number(number));
    number = numbers.reduce((accumulator, currentValue) => {
      if (operations[0] === "/") {
        operations.slice(1);
        return accumulator / currentValue;
      } else if (operations[0] === "x") {
        operations.slice(1);
        return accumulator * currentValue;
      } else if (operations[0] === "-") {
        operations.slice(1);
        return accumulator - currentValue;
      } else if (operations[0] === "+") {
        operations.slice(1);
        return accumulator + currentValue;
      }
    });
    updateDisplay();
    // console.log(numbers);
    // console.log(result);
    // console.log(operations);

    numbers = [];
    numbers.push(Number(number));
    number = "";
  }
}

function updateDisplay() {
  text.textContent = number;
}

// number buttons
document
  .getElementById("zero-btn")
  .addEventListener("click", recordNumber("0"));
document.getElementById("one-btn").addEventListener("click", recordNumber("1"));
document.getElementById("two-btn").addEventListener("click", recordNumber("2"));
document
  .getElementById("three-btn")
  .addEventListener("click", recordNumber("3"));
document
  .getElementById("four-btn")
  .addEventListener("click", recordNumber("4"));
document
  .getElementById("five-btn")
  .addEventListener("click", recordNumber("5"));
document.getElementById("six-btn").addEventListener("click", recordNumber("6"));
document
  .getElementById("seven-btn")
  .addEventListener("click", recordNumber("7"));
document
  .getElementById("eight-btn")
  .addEventListener("click", recordNumber("8"));
document
  .getElementById("nine-btn")
  .addEventListener("click", recordNumber("9"));

//   operation buttons
document
  .getElementById("div-equa_btn")
  .addEventListener("click", recordOperation("/"));
document
  .getElementById("mult-equa_btn")
  .addEventListener("click", recordOperation("x"));
document
  .getElementById("sub-equa_btn")
  .addEventListener("click", recordOperation("-"));
document
  .getElementById("add-equa_btn")
  .addEventListener("click", recordOperation("+"));

// function butons
document.getElementById("clear-btn").addEventListener("click", clear);
document.getElementById("backspace-btn").addEventListener("click", backspace);

// equal button
document.getElementById("equal-equa_btn").addEventListener("click", equals);
