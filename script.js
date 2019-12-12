const container = document.querySelector('.container');
container.style.height = '500px';
container.style.width = '500px';

// determine if mouse is in square at any given time
let allowDraw = true;
let mouseOverTarget = '';
container.addEventListener('mouseover', isSquare);
container.addEventListener('mouseleave', () => mouseOverTarget = '');
window.addEventListener('keydown', pauseDraw);
window.addEventListener('keyup', continueDraw);

const resetButton = document.querySelector('.reset');
const fadeButton = document.querySelector('.fade');
resetButton.addEventListener('click', resetBoard);
fadeButton.addEventListener('click', changeEffect);

const colorInput = document.querySelector('.draw-color');

function createBoard(size = 5) {
  for (let i = 0; i < size * size; i++) {
    let div = document.createElement('div');
    div.classList.add('square');
    div.style.height = parseInt(container.style.height) / size + 'px';
    div.style.width = parseInt(container.style.width) / size + 'px';
    div.style.opacity = 0.2;
    container.appendChild(div);
  }
}

function changeEffect(e) {
  container.classList.toggle('fade');
  fadeButton.classList.toggle('button-on');
  fadeButton.classList.toggle('button-off');

  if (container.classList.contains('fade')) {
    fadeButton.textContent = 'Fade Effect On';
  } else {
    fadeButton.textContent = 'Fade Effect Off';
  }
}

function checkColor(color) {
  if (!color) return false;
  let test = new Option().style;
  test.color = color;
  console.log('test color: ' + test.color);
  return test.color === color.toLowerCase();
}

function isSquare(e) {
  if (e.target.classList.contains('square')) {
    mouseOverTarget = e;
    if (allowDraw) { 
      colorSquare(e);
    }
  }
}

function colorSquare(e) {
  if (checkColor(colorInput.value)) {
    e.target.style.backgroundColor = colorInput.value;
  } else {
    e.target.style.backgroundColor = '#444';
  }

  if (container.classList.contains('fade')) {
    if (e.target.style.opacity < 1) {
      e.target.style.opacity = Number(e.target.style.opacity) + 0.1;
    } 
  } else {
    e.target.style.opacity = 1.0;
  }
}

// allows user to pause drawing to move mouse around
function pauseDraw(e) {
  if (e.keyCode === 16) {
    allowDraw = false;
  }
}

// checks if mouse is over a square when shift is released and fills it in if so
function continueDraw(e) { 
  if  (e.keyCode === 16) {
    allowDraw = true;
    if (mouseOverTarget) {
      colorSquare(mouseOverTarget);
    }
  }
}

function resetBoard() {
  let size = prompt('New Board Size: ');
  container.innerHTML = '';
  colorInput.value = '';
  createBoard(size);
}

createBoard();