import './style.scss';

const clickMeBtn = document.querySelector('#clickMe');
clickMeBtn.addEventListener('click', helloWorld);

function helloWorld() {
  alert('Hej Världen!');
}
