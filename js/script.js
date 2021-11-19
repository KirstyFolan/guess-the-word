const lettersGuessed = document.querySelector("ul", ".guessed-letters");
//The unordered list where the player’s guessed letters will appear

const button = document.querySelector("button", ".guess");
//The button with the text “Guess!” in it.

const playerInput = document.querySelector("input", ".letter");
//The text input where the player will guess a letter.

const wordInProgress = document.querySelector("p", ".word-in-progress");
//The empty paragraph where the word in progress will appear.

const remainingGuesses = document.querySelector("p", "remaining");
//The paragraph where the remaining guesses will display.

const numGuesses = document.querySelector("span");
//The span inside the paragraph where the remaining guesses will display.

const message = document.querySelector("p", "message");
//The empty paragraph where messages will appear when the player guesses a letter.

const playAgain = document.querySelector("button", ".hide");
//The hidden button that will appear prompting the player to play again.

let word = "magnolia";

const guessedLetters = [];

let guessesRemaining = 8;

const getWord = async function () {
const response = await fetch('https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt');
const data = await response.text();
//console.log(data);
const wordArray = data.split("\n");
//console.log(wordArray);
const randomIndex = Math.floor(Math.random()*wordArray.length);
    word = wordArray[randomIndex].trim();
    placeholderCircles(word);

};
getWord();



//======== PLACEHOLDER CIRCLES FOR WORD ==================

const placeholderCircles = function(word) {
    const placeholder = [];
    for (const letters of word) {
        placeholder.push("●");
        const wordCircles = placeholder.join("");
        wordInProgress.innerText = wordCircles;
    }
    
};


//======= GUESS BUTTON EVENT LISTENER =================

button.addEventListener("click", function(e) {
    e.preventDefault();
    message.innerText = "";
    let userInput = playerInput.value;
    //console.log(userInput);
    const inputChecker = checkInput(userInput);
    //console.log(inputChecker);
    if(inputChecker) {
        makeGuess(userInput);
    }
    userInput.value = "";

})

//=====CHECK PLAYER'S INPUT==================

const checkInput = function(input) {
    const acceptedLetter = /[a-zA-Z]/;
    if(input.length === 0){
        message.innerText = "Please input a letter";
    } else if(input.length > 1) {
        message.innerText = "Please just enter one letter at a time";
    } else if(!input.match(acceptedLetter)) {
        message.innerText = "Please enter a letter"
    } else {
        return input;
    }
};

//=======CAPTURE INPUT ==================

const makeGuess = function(userInput){
    userInput = userInput.toUpperCase();
        if(guessedLetters.includes(userInput)){
            message.innerText = "You've already tried this letter. Try again"
        } else {
            guessedLetters.push(userInput);
            console.log(guessedLetters);
            countGuessesRemaining(userInput);
            showGuessedLetters();
            updateWordInProgress(guessedLetters);
        }
    };

//======== SHOW GUESSED LETTERS ===========

const showGuessedLetters = function() {
    lettersGuessed.innerHTML = "";
    for(const letter of guessedLetters) {
    let li = document.createElement("li");
    li.innerText = letter;
    lettersGuessed.append(li);
    }

};

//========= UPDATE WORD IN PROGRESS ===========

const updateWordInProgress = function(guessedLetters) {
const wordUpper = word.toUpperCase();
const wordArray = wordUpper.split("");
//console.log(wordArray);
const updatedWord = [];
for (let letter of wordArray) {
    if (guessedLetters.includes(letter)) {
        updatedWord.push(letter.toUpperCase());
    } else {
        updatedWord.push("●")
    }
}
        wordInProgress.innerText = updatedWord.join("");
        didPlayerWin();

};

//=============== NUMBER OF GUESSES ========================

const countGuessesRemaining = function (userInput) {
    const upperWord = word.toUpperCase();
    if (!upperWord.includes(userInput)) {
        message.innerText = `Sorry, the word has no ${userInput}.`;
        guessesRemaining -= 1;
      } else {
        message.innerText = `Good guess! The word has the letter ${userInput}.`;
      }

        if (guessesRemaining === 0) {
            message.innerHTML = `Game over. The word was <span class = "highlight> ${word}</span>`;
        } else if (guessesRemaining === 1) {
            numGuesses.innerText = "1 guess";
        } else {
            numGuesses.innerText = `${guessesRemaining} guesses`
        }
    

};

//================ DID PLAYER WIN? =========================

const didPlayerWin = function() {
    if (wordInProgress.innerText === word.toUpperCase()) {
        message.classList.add("win");
        message.innerHTML = '<p class="highlight">You guessed correct the word! Congrats!</p>';

    }
};

