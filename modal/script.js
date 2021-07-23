'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
const btnOpenModal = document.querySelectorAll('.show-modal');

const closeModal = function (){
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
}

const openModal = function (){
    console.log('Button clicked');
    modal.classList.remove('hidden');
    //will remove class named "hidden"
    //the dot in ".hidden" is only used for selectors, not in remove
    overlay.classList.remove('hidden');
}

btnCloseModal.addEventListener('click',closeModal);
overlay.addEventListener('click',closeModal);
//since there are multiple btnOpenModal buttons, they are listed similar to an array that's why in order to run a button click function on all of them, we create a for loop
for (let i = 0; i < btnOpenModal.length; i++)
    btnOpenModal[i].addEventListener('click',openModal);

//keyboard events
//we want the modal to close on Esc keypress

document.addEventListener('keydown', function(e){
    if(e.key === `Escape` && !modal.classList.contains('hidden')) {
        closeModal();
    }
})