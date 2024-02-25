import './style.css';
import javascriptLogo from './javascript.svg';
import viteLogo from '/vite.svg';
import { setupCounter } from './counter.js';
import { showJoke } from './joke.js';
import { showPics } from './catpics.js';
import { showDiary } from './diary.js';

document.querySelector('#app').innerHTML = 'Moi täällä ollaan';
//Tehtävä 1
// haetaan nappula ja tarjotaan showJoke funktiolle
let element = document.querySelector('.chuck');
console.log(element);
showJoke(element);
//Tehtävä 2
showPics(document.querySelector('.pics'));
//Tehtävä 4
showDiary(document.querySelector('.container1'));