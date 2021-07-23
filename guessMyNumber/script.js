'use strict';

let secretNumber = Math.trunc(Math.random()*20) + 1;
//math random will only generate until 19.9999~ so we will add 1 to make 20.9999~, then truncate so it will become only 20
let score = 20;
let highscore = 0;
console.log(secretNumber);

const displayMessage = function(message) {
    document.querySelector('.message').textContent = message;
}

document.querySelector('.check').addEventListener('click',function(){
    //querySelector will select the item with the corresponding id/class. So in this case, we are selecting the item with the "check" class.
    //addEventListener will add an event when the selected item is "clicked"
    //so when it is clicked, a "function" will be created and called
    
    const guess = Number(document.querySelector('.guess').value);
    //creating a const that will hold our "guest" value

    if(!guess){
        //guess textbox is left blank
        displayMessage(`No number! 🔫😠`);
    } else if (guess === secretNumber) {
        document.querySelector('.number').textContent = secretNumber;
        displayMessage(`✨✨ Correct! ✨✨`);

        //changing background color
        //all properties with two words can be changed to one word, with the second word being capitalized
        document.querySelector('body').style.backgroundColor = '#60b347';
        //increasing width of number box
        document.querySelector('.number').style.width = '30rem';

        //checking of highscore
        if (score > highscore) {
            highscore = score;
            document.querySelector('.highscore').textContent = highscore;
        }
    } else if (guess !== secretNumber) {
        if (score > 1) {
            displayMessage(guess > secretNumber ? `Too high 🔫😠` : `Too low! 🔫😠`);
            score--;
            document.querySelector('.score').textContent = score;
        } else {
            displayMessage(`Game Over! 🤪🤙🏻`);
            document.querySelector('.score').textContent = 0;
        }
    }
});

document.querySelector('.again').addEventListener('click',function(){
    //resetting score and secret number
    score = 20;
    secretNumber = Math.trunc(Math.random()*20) + 1;

    //resetting text values
    document.querySelector('.score').textContent = score;
    document.querySelector('body').style.backgroundColor = '#222';
    document.querySelector('.number').style.width = '15rem';
    document.querySelector('.number').textContent = `?`;
    displayMessage(`Start guessing...`);
    document.querySelector('.guess').value = ``;
});