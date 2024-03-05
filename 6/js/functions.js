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

const toMinutes = (timespan) => {
  const timeParts = timespan.split(':');
  return (+timeParts[0]) * 60 + (+timeParts[1]);
};

const isMeetingWorkTime = (workStart, workEnd, meetingStart, duration) => {
  const workStartMinutes = toMinutes(workStart);
  const workEndMinutes = toMinutes(workEnd);
  const meetingStartMinutes = toMinutes(meetingStart);

  if(workStartMinutes > meetingStartMinutes) {
    return false;
  }

  if(workEndMinutes < meetingStartMinutes + duration) {
    return false;
  }

  return true;
};

console.log(isMeetingWorkTime('08:00', '17:30', '8:0', 90));
console.log(isMeetingWorkTime('8:0', '10:0', '8:0', 120));
console.log(isMeetingWorkTime('08:00', '14:30', '14:00', 90));
console.log(isMeetingWorkTime('14:00', '17:30', '08:0', 90));
console.log(isMeetingWorkTime('8:00', '17:30', '08:00', 900));
