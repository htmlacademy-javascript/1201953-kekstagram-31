const isValidLengthString = (text, textLength) => text.length <= textLength;

const validString = isValidLengthString('the most long word', 17);
//console.log(validString);

const isPalindrome = (word) => {
  const lowerWord = word.toLowerCase().replaceAll(' ', '');

  let anaphrase = '';

  for(let i = lowerWord.length - 1; i >= 0; i--) {
    anaphrase += lowerWord[i];
  }
  return lowerWord === anaphrase;
};

const palindrome = isPalindrome('Лёша на полке клопа нашёл ');

const getNumbers = (string) => {
  if(typeof string === 'number') {
    return;
  }
  let numbers = '';
  for(let i = 0; i < string.length; i++) {
    if(!Number.isNaN(parseInt(string[i], 10))) {
      numbers += string[i];
    }
  }
  return parseInt(numbers, 10);
};

console.log(getNumbers(-1));
