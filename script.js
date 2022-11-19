var number = ""; //stored pressed number button as string
var numbers = []; //array of inputed numbers
var operations = []; //array of inputed operations
const text = document.getElementById("result-text");

function recordNumber(n) {
  //when the user has just caculated a equation but wants to get rid of the result
  //clear the history of numbers
  if (operations.length === 0) {
    numbers = [];
  }
  //store and add the strings together
  //add digit
  number += n;
  updateDisplay(number);
}

function recordOperation(operation) {
  //when the user has recored a number (result or regular input) and has inputed a current number
  //record operation and current inputed number and clear the current number
  if (numbers.length >= 0 && number !== "") {
    operations.push(operation);
    numbers.push(Number(number));
    number = "";
  }
  //when the user wants to reuse the result of a previous calculation
  //record the operation
  else if (numbers.length === 1 && number === "") {
    operations.push(operation);
  }
  //when the user has inputed an operation at least once, display the result after every operation press
  if (operations.length > 1) {
    updateDisplay(calculate());
  }
}

function clear() {
  //when the use has a current number they want to clear
  //clear number
  if ((number !== "" && operations.length > 0) || operations.length === 0) {
    number = "";
  }
  //when the user wants to clear everything
  //clear history of numbers and operations
  else if (number === "") {
    numbers = [];
    operations = [];
  }
  updateDisplay(0);
}

function backspace() {
  //when the user wants to remove the last digit they inputed
  //delete last digit inputed
  if (number !== "") {
    number = number.slice(0, -1);
    updateDisplay(number);
    //when the user has deleted a digit and there is no more to delete
    if (number === "") {
      updateDisplay(0);
    }
  }
}

function equals() {
  let result = 0;
  //if the user pressed the equal with a current number stored
  //record number and clear the current number
  if (number !== "") {
    numbers.push(Number(number));
    number = "";

    //when the user pressed the equals with no current number stored
    //push the latest number from the history into the numbers array
  } else if (number === "") {
    numbers.push(numbers[numbers.length - 1]);
  }

  //calculate the current sum with appropriate operations
  result = calculate();
  updateDisplay(result);
  //clear operation and number history
  operations = [];
  numbers = [];
  //push the calcuated result in the number array
  numbers.push(result);
}

function calculate() {
  //copy the numbers array and operations array
  let operationsCopy = [...operations];
  let numbersCopy = [...numbers];
  //perform a summation depending on the operation in each operation array index
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
  if (n % 1 != 0) {
    text.textContent = n.toFixed(8);
  } else text.textContent = n;
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
// recognize only desired inputs, ignore the rest
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
