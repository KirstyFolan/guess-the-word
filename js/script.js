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

const word = "magnolia";

//======== PLACEHOLDER CIRCLES FOR WORD ==================

const placeholderCircles = function(word) {
    const placeholder = [];
    for (const letters of word) {
        placeholder.push("●");
        const wordCircles = placeholder.join("");
        wordInProgress.innerText = wordCircles;
    }
    
};
placeholderCircles(word);

//======= GUESS BUTTON EVENT LISTENER =================

button.addEventListener("click", function(e) {
    e.preventDefault();
    let userInput = playerInput.value;
    console.log(userInput);
    userInput = "";

})

//Create and name a variable to capture the value of the input. Log out the value of the variable capturing the input. Then, empty the value of the input. You should see the letter you enter into the input field in the console when the Guess button is clicked. 
