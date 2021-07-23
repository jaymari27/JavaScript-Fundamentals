'use strict';

// selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// Initialization/Reset

let scores, currentScore, activePlayer, playing;

const init = function() {
    scores = [0, 0]; //final scores for both players
    currentScore = 0;
    //setting player to Player 1
    activePlayer = 0;
    playing = true;
    score0El.textContent = 0;
    score1El.textContent = 0;
    diceEl.classList.add('hidden');
    current0El.textContent = 0;
    current1El.textContent = 0;
    player0El.classList.remove(`player--winner`);
    player1El.classList.remove(`player--winner`);
    player0El.classList.add(`player--active`);
    player1El.classList.remove(`player--active`);
}

//initializing upon page load
init();

const switchPlayer = function() {
    //if activePlayer is player 1, then switch to 2
    //but reset players score first
    currentScore = 0;
    document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        activePlayer = activePlayer === 0 ? 1 : 0;
        
        //toggle will add the class if its not existing, vice versa
    player0El.classList.toggle(`player--active`);
    player1El.classList.toggle(`player--active`);
}

// roll dice function
btnRoll.addEventListener('click',function(){
    if (playing) {
        //generate random dice roll
        const dice = Math.trunc(Math.random()*6)+1;
        
        //displace dice img
        diceEl.classList.remove('hidden');
        diceEl.src = `dice-${dice}.png`;

        //check for rolled 1
        if (dice !== 1) {
            //add dice to current score
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        } else {
            switchPlayer();
        }
    }
    
});

btnHold.addEventListener('click',function() {
    if (playing) {
        //Add current score to active player's score
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

        //Check if player's score is 100
        if (scores[activePlayer] >= 100) {
            //disables all buttons after game is finished
            playing = false;

            //stylizes box of winner
            document.querySelector(`.player--${activePlayer}`).classList.add(`player--winner`);
            document.querySelector(`.player--${activePlayer}`).classList.remove(`player--active`);
        }
        else {
            switchPlayer();
        }
    }
});

btnNew.addEventListener('click', init);