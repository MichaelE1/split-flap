const chars = [" ", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "!", "@", "#", "$", "(", ")", "^", "-", "_", "+", "&", "=", ";", ":", "*", "'", '"', ",", ".", "<", ">", "/", "\\", "?", "%"];

const letters = document.querySelectorAll('.letter');
const input = document.querySelector('input');
const generate = document.querySelector('.generate');
const urlParams = new URLSearchParams(window.location.search);
const message = urlParams.get('q') || false;

if (!message) {
  main();
  setInterval(() => {
    main()
  }, 7000);
} else {
  main(atob(decodeURIComponent(message)));
};


function main(message) {
  // Get user specified or random word
  let word = message || words[(Math.floor((Math.random() * words.length)))];

  // Space message out if it's short
  const wordSpaces = word.split(' ');
  if (wordSpaces.length <= 3) {
    for (let i = 0; i < wordSpaces.length; i++) {
      while (wordSpaces[i].length < 11) {
        wordSpaces[i] += ' ';
      }
    }
    word = wordSpaces.join(' ');
  };
 
  // Turn the word into an associative array!
  let splitWord = word.toUpperCase().split('');
  
  // If there are more letters than letter placeholders - slicey slicey!
  if (splitWord.length > 36) {
    splitWord = splitWord.slice(0, 36);
  }

  const wordArray = [];
  for (const [index, value] of splitWord.entries()) {
   wordArray[index] = value;
  };

  // For each letter in the array, display it progressively 
  for (let [key, value] of Object.entries(wordArray)) {
    letterLoop(key, value, 0);
  }
};

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

generate.onclick = () => {
  input.value = `${location.protocol}//${location.host}${location.pathname}?q=${encodeURIComponent(btoa(input.value))}`;
  input.select();
  document.execCommand('copy');
};


/* 
TO DO
- Add query string base64 sharing -- toaster for copied text!
- Algorithm to determine which line to put word on if there is no space left
- README
*/
