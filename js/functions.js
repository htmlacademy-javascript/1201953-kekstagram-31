const isValidLengthString = (text, textLength) => {
  const isValid = text.length <= textLength;
  return isValid;
};

const validString = isValidLengthString('the most long word', 17);
//console.log(validString);

const isPalindrome = (word) => {
  const lowerWord = word.toLowerCase();
  console.log(lowerWord);
  let anaphrase = '';
  console.log(anaphrase);
  for(let i = word.length;i >= 0; i--) {
    anaphrase += lowerWord[i];
  }
  console.log(anaphrase);
  return lowerWord === anaphrase;
};

isPalindrome('Казак');
