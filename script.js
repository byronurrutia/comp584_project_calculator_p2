var number = "";
var previousNumber = 0;
var numbers = [];
var operations = [];
const text = document.getElementById("result-text");

function recordNumber(n) {
  if (operations.length === 0) {
    numbers = [];
  }
  number += n;
  updateDisplay(number);
}

function recordOperation(operation) {
  if (numbers.length >= 0 && number !== "") {
    operations.push(operation);
    numbers.push(Number(number));
    number = "";
  } else if (numbers.length === 1 && number === "") {
    operations.push(operation);
  }

  if (operations.length > 1) {
    updateDisplay(calculate());
  }
}

function clear() {
  if ((number !== "" && operations.length > 0) || operations.length === 0) {
    number = "";
  } else if (number === "") {
    numbers = [];
    operations = [];
  }
  updateDisplay(0);
}

function backspace() {
  if (number !== "") {
    number = number.slice(0, -1);
    updateDisplay(number);
    if (number === "") {
      updateDisplay(0);
    }
  }
}

function equals() {
  let result = 0;
  if (number !== "") {
    numbers.push(Number(number));
    number = "";
  } else if (number === "") {
    numbers.push(numbers[numbers.length - 1]);
  }

  result = calculate();
  updateDisplay(result);
  operations = [];
  numbers = [];
  numbers.push(result);
}

function calculate() {
  let operationsCopy = [...operations];
  let numbersCopy = [...numbers];
  let result = numbersCopy.reduce((accumulator, currentValue) => {
    if (operationsCopy[0] === "/") {
      operationsCopy.shift();
      return accumulator / currentValue;
    } else if (operationsCopy[0] === "x") {
      operationsCopy.shift();
      return accumulator * currentValue;
    } else if (operationsCopy[0] === "-") {
      operationsCopy.shift();
      return accumulator - currentValue;
    } else if (operationsCopy[0] === "+") {
      operationsCopy.shift();
      return accumulator + currentValue;
    }
  });
  return result;
}

function updateDisplay(n) {
  text.textContent = n;
}

// number buttons
document.getElementById("zero-btn").addEventListener("click", function () {
  recordNumber("0");
});
document.getElementById("one-btn").addEventListener("click", function () {
  recordNumber("1");
});
document.getElementById("two-btn").addEventListener("click", function () {
  recordNumber("2");
});
document.getElementById("three-btn").addEventListener("click", function () {
  recordNumber("3");
});
document.getElementById("four-btn").addEventListener("click", function () {
  recordNumber("4");
});
document.getElementById("five-btn").addEventListener("click", function () {
  recordNumber("5");
});
document.getElementById("six-btn").addEventListener("click", function () {
  recordNumber("6");
});
document.getElementById("seven-btn").addEventListener("click", function () {
  recordNumber("7");
});
document.getElementById("eight-btn").addEventListener("click", function () {
  recordNumber("8");
});
document.getElementById("nine-btn").addEventListener("click", function () {
  recordNumber("9");
});

//   operation buttons
document.getElementById("div-equa_btn").addEventListener("click", function () {
  recordOperation("/");
});
document.getElementById("mult-equa_btn").addEventListener("click", function () {
  recordOperation("x");
});
document.getElementById("sub-equa_btn").addEventListener("click", function () {
  recordOperation("-");
});
document.getElementById("add-equa_btn").addEventListener("click", function () {
  recordOperation("+");
});

// function butons
document.getElementById("clear-btn").addEventListener("click", clear);
document.getElementById("backspace-btn").addEventListener("click", backspace);

// equal button
document.getElementById("equal-equa_btn").addEventListener("click", equals);

// keyboard input
addEventListener("keydown", (event) => {
  if (Number(event.key) >= 0 && Number(event.key) < 10) {
    recordNumber(event.key);
  } else if (
    event.key === "/" ||
    event.key.toLowerCase() === "x" ||
    event.key === "-" ||
    event.key === "+"
  ) {
    recordOperation(event.key.toLowerCase());
  } else if (event.key === "=" || event.key === "Enter") {
    equals();
  } else if (event.key === "Backspace") {
    backspace();
  }
});
