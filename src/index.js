function eval() {
    // Do not use eval!!!
    return;
}

function div(arr) {
  for (let i = 0; i < arr.length; i++) {
    arr[i] = parseFloat(arr[i]);
    if (i != 0 && arr[i] == 0) throw new Error("TypeError: Division by zero.");
  }
  let res = arr[0];
  for (let i = 1; i < arr.length; i++) {
    res /= arr[i];
  }
  return res;
}

function mult(arr) {
  for (let i = 0; i < arr.length; i++) {
    arr[i] = arr[i].split("/");
    arr[i] = div(arr[i]);
  }
  let res = arr[0];
  for (let i = 1; i < arr.length; i++) {
    res *= arr[i];
  }
  return res;
}

function sub(arr) {
  for (let i = 0; i < arr.length; i++) {
    arr[i] = arr[i].split("*");
    arr[i] = mult(arr[i]);
  }
  let res = arr[0];
  for (let i = 1; i < arr.length; i++) {
    res -= arr[i];
  }
  return res;
}

function sum(arr) {
  for (let i = 0; i < arr.length; i++) {
    arr[i] = arr[i].split("-");
    arr[i] = sub(arr[i]);
  }
  let res = arr[0];
  for (let i = 1; i < arr.length; i++) {
    res += arr[i];
  }
  return res;
}

function calc(arr) {
  let buf = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] == "(") {
      let temp = calc(arr.slice(i+1));
      buf += (temp.end+1);
      if (temp.value < 0) {
        arr.splice(i, temp.end + 2, -temp.value);
        while (i > 0) {
          if (arr[i] == "-" && i != 0) {
            arr[i] = "+";
            break;
          }
          if (arr[i] == "+" && i != 0) {
            arr[i] = "-";
            break;
          }
          i--;
        }
        if (i == 0) {
          buf -= 1;
          arr.splice(0, 0, "0","-");
        }
      } else {
        arr.splice(i, temp.end + 2, temp.value);
      }
    }
    if (arr[i] == ")") {
      arr.splice(i);
      let expr = "";
      for (let j = 0; j < arr.length; j++) {
          expr += arr[j];
      }
      let strSum = expr.split("+");
      return {value: sum(strSum), end: i+buf};
    }
  }
  throw new Error("ExpressionError: Brackets must be paired");
}

function expressionCalculator(expr) {
  let arr = expr.split('');
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] == "(") {
      let temp = calc(arr.slice(i+1));
      if (temp.value < 0) {
        arr.splice(i, temp.end + 2, -temp.value);
        while (i > 0) {
          if (arr[i] == "-" && i != 0) {
            arr[i] = "+";
            break;
          }
          if (arr[i] == "+" && i != 0) {
            arr[i] = "-";
            break;
          }
          i--;
        }
        if (i == 0) {
          arr.splice(0, 0, "0","-");
        }
      } else {
        arr.splice(i, temp.end + 2, temp.value);
      }
    }
    if (arr[i] == ")") throw new Error("ExpressionError: Brackets must be paired");
  }
  expr = "";
  for (let i = 0; i < arr.length; i++) {
    expr += arr[i];
  }
  let strSum = expr.split("+");
  return sum(strSum);
}

module.exports = {
    expressionCalculator
}