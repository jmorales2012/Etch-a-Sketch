const container = document.querySelector('.container');
container.style.height = '400px';
container.style.width = '400px';
container.addEventListener('mouseover', draw);
// let drawColor = '#444';

const resetButton = document.querySelector('.reset');
resetButton.addEventListener('click', resetBoard);

const fadeButton = document.querySelector('.fade');
fadeButton.addEventListener('click', changeEffect);

const colorInput = document.querySelector('.draw-color');

function createBoard(size = 5) {
  for (let i = 0; i < size * size; i++) {
    let div = document.createElement('div');
    div.classList.add('square');
    div.style.height = parseInt(container.style.height) / size + 'px';
    div.style.width = parseInt(container.style.width) / size + 'px';
    div.style.opacity = 0.1;
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
    fadeButton.textContnt = 'Fade Effect Off';
  }
}

function checkColor(color) {
  if (!color) return false;
  let test = new Option().style;
  test.color = color;
  console.log('test color: ' + test.color);
  return test.color === color.toLowerCase();
}

function draw(e) {
  if (e.target.classList.contains('square')) {
    // see if user input is valid color
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
} 

function resetBoard() {
  let size = prompt('New Board Size: ');
  container.innerHTML = '';
  colorInput.value = '';
  createBoard(size);
}

createBoard();