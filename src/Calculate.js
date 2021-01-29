const doMultiplication = (x, y) => {
  return parseFloat(x) * parseFloat(y)
}

const doDivision = (x, y) => {
  return parseFloat(x) / parseFloat(y)
}

const doSummation = (x, y) => {
  return parseFloat(x) + parseFloat(y)
}

const doSubstraction = (x, y) => {
  return parseFloat(x) - parseFloat(y)
}

const operants = {
  "*/": {
    "pattern": new RegExp(/-?\d+\.?\d*(\*|\/)-?\d+\.?\d*/)
  },
  "-": {
    "pattern": new RegExp(/-?\d+\.?\d*--?\d+\.?\d*/),
    "method": doSubstraction
  },
  "+": {
    "pattern": new RegExp(/-?\d+\.?\d*\+-?\d+\.?\d*/),
    "method": doSummation
  }
}

const specialCases = {
  "--": "+",
  "++": "+",
  "+-": "-",
  "-+": "-"
};

const doCalculation = (input) => {
  
  const cleanse = (input) => {
    for (var specialCase in specialCases) {
      input = input.replace(specialCase, specialCases[specialCase]);
    }
    return input;
  }

  const correct = (matched_part, calculated) => {
    if (matched_part[0] === "-" && calculated >= 0) {
      return "+" + calculated.toString();
    }
    return calculated.toString();
  }

  const simpleCalculation = (input) => {
    let result = input;
    for (let op in operants) {
      let match = operants[op].pattern.exec(result);
      while (match && match[0]) {
        let matched_string = cleanse(match[0]);
        if (matched_string.includes("*")) {
          var [x, y] = matched_string.split("*");
          var method = doMultiplication;
        } else if (matched_string.includes("/")) {
          var [x, y] = matched_string.split("/");
          var method = doDivision;
        } else {
          var [x, y] = matched_string.split(op);
          var method = operants[op].method;
        }
        let calculated = correct(matched_string, method(x, y));
        result = cleanse(result.replace(matched_string, calculated));
        match = operants[op].pattern.exec(result);
      }
    }
    return result;
  }

  try {
    let result = input;
    let parenthesisRE = new RegExp(/\([^()]*\)/);
    let match = parenthesisRE.exec(result);
    while (match && match[0]) {
      let matched_string = match[0];
      let calculated = simpleCalculation(matched_string.slice(1,-1));
      result = cleanse(result.replace(matched_string, calculated));
      match = parenthesisRE.exec(result);
    }
    return simpleCalculation(result);
  }
  catch (err) {
    console.log(err);
    return "Zero division is not allowed";
  }
}

export default doCalculation;