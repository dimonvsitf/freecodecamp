const checkButton= document.getElementById('check-btn');
const resultOutput= document.getElementById('result');
const inputText = document.getElementById('text-input')

checkButton.addEventListener('click',palindromeChecker);

function palindromeChecker() {
  if(checkForError()) return;
  const cleanedString=cleanInputString(inputText.value.trim());
  if (cleanedString===cleanedString.split("").reverse().join("")) {
    resultOutput.innerText=`${inputText.value.trim()} is a palindrome`
  } else {resultOutput.innerText=`${inputText.value.trim()} is not a palindrome`}

}

function checkForError() {
if (inputText.value.trim()==="") {
alert("Please input a value");
return true;}
return false
}

function cleanInputString(str) {
  const regex = /[^A-Za-z0-9]/g;
  return str.replace(regex, '').toLowerCase();
}