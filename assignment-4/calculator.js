let defaultValue = 0;
let isExpressionPresent = false;
let isEvaluated = false;
let previousOperator = null;
let outputElement = document.getElementById("output");
let expression = "";

//V2
//Function to update expression
function updateExpression(value, type) {
  if (value != undefined) {
    if (defaultValue == 0 || (isEvaluated && type == 'digit')) {
      expression = "";
      isEvaluated = false;
      defaultValue = 1;
    }
    if (type == 'digit' || (value != previousOperator && type == 'operator')) {
      expression += value;
      previousOperator = value;
    }

    outputElement.value = expression;
    isExpressionPresent = true;
    isEvaluated = false;
  }
  else {
    expression = "";
    outputElement.value = 0;
  }
}

//Function to evaluate the expression and to display the result.
function getExpressionOutput() {
  try {
    if (isExpressionPresent) {
      outputElement.value = expression = eval(expression);;
      isExpressionPresent = false;
      isEvaluated = true;
    }
  }
  catch (e) {
    outputElement.value = 'Invalid Expression';
    expression = "";
    isExpressionPresent = false;
  }
}
