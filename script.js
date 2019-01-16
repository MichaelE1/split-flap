const chars = [" ", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "!", "@", "#", "$", "(", ")", "^", "-", "_", "+", "&", "=", ";", ":", "*", "'", '"', ",", ".", "<", ">", "/", "\\", "?", "%"];

const letters = document.querySelectorAll('.letter');
const input = document.querySelector('input');
const generate = document.querySelector('.generate');
const urlParams = new URLSearchParams(window.location.search);
const message = urlParams.get('q') || false;
const refreshButton = document.querySelector('.refresh');
let running;

if (!message) {
  main();
  running = setInterval(() => {
    main();
  }, 7000);
} else {
  showRefresh();
  main(atob(decodeURIComponent(message)));
}

function main(message) {
  // Get user specified or random word
  let word = message || words[Math.floor(Math.random() * words.length)];

  // Add empty spaces
  while (word.length < 36) {
    word += ' ';
  }

  // Turn the word into an associative array!
  let splitWord = word.toUpperCase().split('');

  // If there are more letters than letter placeholders - slice!
  if (splitWord.length > 36) {
    splitWord = splitWord.slice(0, 36);
  }

  const wordArray = [];
  for (const [index, value] of splitWord.entries()) {
    wordArray[index] = value;
  }

  // For each letter in the array, display it
  for (let [key, value] of Object.entries(wordArray)) {
    letterLoop(key, value, 0);
  }
}

function letterLoop(key, value, index) {
  // key = index of wordArray, value = letter, index = index of chars
  setTimeout(() => {
    letters[key].innerHTML = chars[index];
    index++;
    if (index >= chars.length) {
      letters[key].innerHTML = '';
    } else if (chars[index - 1] !== value) {
      letterLoop(key, value, index);
    }
  }, 50);
}

function showRefresh() {
  refreshButton.style.visibility = 'visible';
}

function showToast() {
  const toast = document.querySelector('.toast')
  toast.className = 'toast show';
  setTimeout(() => toast.className = toast.className.replace("show", ""), 3000);
}

generate.onclick = () => {
  if (input.value.length > 0) {
    clearInterval(running);
    main(input.value);
    input.value = `${location.protocol}//${location.host}${location.pathname}?q=${encodeURIComponent(btoa(input.value))}`;
    input.select();
    document.execCommand('copy');
    showRefresh();
    showToast();
  }
};

refreshButton.onclick = () => {
  window.location.replace(location.pathname);
};

/* 
TO DO
- README
*/
