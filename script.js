const chars = [" ", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "!", "@", "#", "$", "(", ")", "^", "-", "_", "+", "&", "=", ";", ":", "*", "'", '"', ",", ".", "<", ">", "/", "\\", "?", "%"];

const letters = document.querySelectorAll('.letter');

main();

setInterval(() => {
  main()
}, 7000);

function main() {
  // Get a random word
  let word = words[(Math.floor((Math.random() * words.length)))];

  // Attempt to space word in middle of row
  const spacesToAdd = 8 - Math.ceil(word.length / 2) 
  for (i = 1; i < spacesToAdd; i++) {
   word = ' ' + word;
  };

  // Fill the remaining spaces with blanks
  while (word.length < letters.length) {
   word += ' ';
  };

  // Turn the word into an associative array!
  const splitWord = word.toUpperCase().split('');
  const wordArray = [];
  for (const [index, value] of splitWord.entries()) {
   wordArray[index] = value;
  };

  // For each letter in the array, display it progressively 
  for (let [key, value] of Object.entries(wordArray)) {
    letterLoop(key, value, 0);
  };
}

function letterLoop(key, value, index) {
  // key = index of wordArray, value = letter, index = index of chars
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