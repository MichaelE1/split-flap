const chars = [" ", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "!", "@", "#", "$", "(", ")", "^", "-", "_", "+", "&", "=", ";", ":", "*", "'", '"', ",", ".", "<", ">", "/", "\\", "?", "%"];

let letters = document.querySelectorAll('.letter');
let message = 'PARTY PEOPLE';

// Turn the message into an associative array!
let splitMessage = message.toUpperCase().split('');
let messageArray = [];
for (const [index, value] of splitMessage.entries()) {
  messageArray[index] = value;
};

// For each letter in the array, display it progressively 
for (let [key, value] of Object.entries(messageArray)) {
  letterLoop(key, value, 0);
};

function letterLoop(key, value, index) {
  // key = index of messageArray, value = letter, index = index of chars
  setTimeout(() => { 
    letters[key].innerHTML = chars[index];
    index++;
    if (index >= chars.length) { 
      (letters[key]).innerHTML = ''; 
    } else if (chars[index - 1] !== value) {
      letterLoop(key, value, index);
    } 
 }, 50)
};


/* 
TO DO
- Add query string base64 sharing
- Algorithm to determine which line to put word on if there is no space left
- README
*/