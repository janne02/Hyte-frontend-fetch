import './style.css';
import javascriptLogo from './javascript.svg';
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js';
import { show_joke } from './joke.js';
import { showPics} from './catpics.json';

document.querySelector('#app').innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
    </a>
    <h1>Hello Vite!</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite logo to learn more
    </p>
  </div>
`
document.querySelector('#app').innerHTML = 'Moro';


let element = setupCounter(document.querySelector('.chuck'));
console.log(element);
show_joke(element);
show_joke(document.querySelector('.chuck'));

showPics(document.querySelector('.catpics'));


