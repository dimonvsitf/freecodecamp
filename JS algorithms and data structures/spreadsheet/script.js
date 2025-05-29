// Mapping operators to actual functions
const infixToFunction = {
  "+": (x, y) => x + y,
  "-": (x, y) => x - y,
  "*": (x, y) => x * y,
  "/": (x, y) => x / y,
};

// Evaluate a single infix operation (e.g. "3 + 2")
const infixEval = (str, regex) =>
  str.replace(regex, (_match, arg1, operator, arg2) =>
    infixToFunction[operator](parseFloat(arg1), parseFloat(arg2))
  );

// Recursively resolve * and / first (high precedence)
const highPrecedence = str => {
  const regex = /([\d.]+)([*\/])([\d.]+)/;
  const str2 = infixEval(str, regex);
  return str === str2 ? str : highPrecedence(str2);
};

// Math helpers
const isEven = num => num % 2 === 0;
const sum = nums => nums.reduce((acc, el) => acc + el, 0);
const average = nums => sum(nums) / nums.length;

// Calculate the median of a list
const median = nums => {
  const sorted = nums.slice().sort((a, b) => a - b);
  const length = sorted.length;
  const middle = length / 2 - 1;
  return isEven(length)
    ? average([sorted[middle], sorted[middle + 1]])
    : sorted[Math.ceil(middle)];
};

// Main spreadsheet function registry
const spreadsheetFunctions = {
  sum,
  average,
  median,
  even: nums => nums.filter(isEven),
  someeven: nums => nums.some(isEven),
  everyeven: nums => nums.every(isEven),
  firsttwo: nums => nums.slice(0, 2),
  lasttwo: nums => nums.slice(-2),
  has2: nums => nums.includes(2),
  increment: nums => nums.map(num => num + 1),
  random: ([x, y]) => Math.floor(Math.random() * y + x),
  range: nums => range(...nums),
  nodupes: nums => [...new Set(nums)],
  "": num => num,
};

// Parse and apply spreadsheet-style function calls
const applyFunction = str => {
  const noHigh = highPrecedence(str); // resolve * and /
  const infix = /([\d.]+)([+-])([\d.]+)/;
  const str2 = infixEval(noHigh, infix); // resolve + and -
  const functionCall = /([a-z0-9]*)\(([0-9., ]*)\)(?!.*\()/i;
  const toNumberList = args => args.split(",").map(parseFloat);
  const apply = (fn, args) =>
    spreadsheetFunctions[fn.toLowerCase()](toNumberList(args));

  return str2.replace(functionCall, (match, fn, args) =>
    spreadsheetFunctions.hasOwnProperty(fn.toLowerCase())
      ? apply(fn, args)
      : match
  );
};

// Generate number or letter ranges
const range = (start, end) =>
  Array(end - start + 1)
    .fill(start)
    .map((el, i) => el + i);

const charRange = (start, end) =>
  range(start.charCodeAt(0), end.charCodeAt(0)).map(code =>
    String.fromCharCode(code)
  );

// Evaluate an expression like =sum(A1:A3)
const evalFormula = (x, cells) => {
  const idToText = id => cells.find(cell => cell.id === id).value;

  const rangeRegex = /([A-J])([1-9][0-9]?):([A-J])([1-9][0-9]?)/gi;
  const rangeFromString = (num1, num2) => range(parseInt(num1), parseInt(num2));
  const elemValue = num => char => idToText(char + num);
  const addCharacters =
    c1 => c2 => num => charRange(c1, c2).map(elemValue(num));

  // Replace A1:C3 style ranges with actual values
  const rangeExpanded = x.replace(
    rangeRegex,
    (_match, c1, n1, c2, n2) =>
      rangeFromString(n1, n2).map(addCharacters(c1)(c2)).flat().join(",")
  );

  const cellRegex = /[A-J][1-9][0-9]?/gi;
  const cellExpanded = rangeExpanded.replace(cellRegex, match =>
    idToText(match.toUpperCase())
  );

  const functionExpanded = applyFunction(cellExpanded);

  return functionExpanded === x
    ? functionExpanded
    : evalFormula(functionExpanded, cells);
};

// Build spreadsheet UI
window.onload = () => {
  const container = document.getElementById("container");

  const createLabel = name => {
    const label = document.createElement("div");
    label.className = "label";
    label.textContent = name;
    container.appendChild(label);
  };

  const letters = charRange("A", "J");

  letters.forEach(createLabel);
  range(1, 99).forEach(number => {
    createLabel(number);
    letters.forEach(letter => {
      const input = document.createElement("input");
      input.type = "text";
      input.id = letter + number;
      input.ariaLabel = letter + number;
      input.onchange = update;
      container.appendChild(input);
    });
  });
};

// Update cell values when a formula is entered
const update = event => {
  const element = event.target;
  const value = element.value.replace(/\s/g, "");
  if (!value.includes(element.id) && value.startsWith("=")) {
    const allCells = Array.from(
      document.getElementById("container").children
    );
    element.value = evalFormula(value.slice(1), allCells);
  }
};