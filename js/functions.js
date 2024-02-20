const isValidLengthString = (text, textLength) => {
  const isValid = text.length <= textLength;
  return isValid;
};

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
