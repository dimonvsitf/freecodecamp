const numberInput = document.getElementById('number');
const convertBtn = document.getElementById('convert-btn');
const output = document.getElementById('output');

const romanLookup = [
    [1000, "M"],
    [900, "CM"],
    [500, "D"],
    [400, "CD"],
    [100, "C"],
    [90, "XC"],
    [50, "L"],
    [40, "XL"],
    [10, "X"],
    [9, "IX"],
    [5, "V"],
    [4, "IV"],
    [1, "I"]
];

const validateInput = (input) => {
    const inputInt = parseInt(input);
    const errors = {
        invalid: "Please enter a valid number",
        less1: "Please enter a number greater than or equal to 1",
        over3999: "Please enter a number less than or equal to 3999"
    };

    if (isNaN(inputInt)) return errors.invalid;
    if (inputInt < 1) return errors.less1;
    if (inputInt > 3999) return errors.over3999;
    return null;  // No errors
};

const toRoman = (num) => {
    let roman = '';
    
    for (const [value, block] of romanLookup) {
        while (num >= value) {
            roman += block;
            num -= value;
        }
    }

    return roman;
};

const handleConversion = () => {
    const inputValue = numberInput.value.trim();
    const errorMessage = validateInput(inputValue);

    if (errorMessage) {
        output.textContent = errorMessage;
        output.classList.add("error");
        return;
    }

    output.classList.remove("error");
    const inputInt = parseInt(inputValue);
    output.textContent = toRoman(inputInt);
};

convertBtn.addEventListener('click', handleConversion);
numberInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    handleConversion();
  }
});