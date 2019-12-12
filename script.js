const container = document.querySelector('.container');
container.style.height = '400px';
container.style.width = '400px';
createBoard();

container.addEventListener('mouseover', draw);

const resetButton = document.querySelector('.reset');
resetButton.addEventListener('click', resetBoard);

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

function draw(e) {
  if (e.target.classList.contains('square')) {
    e.target.style.backgroundColor = 'gray';
    if (e.target.style.opacity < 1) {
      e.target.style.opacity = Number(e.target.style.opacity) + 0.1;
    } 
  } 
}

function resetBoard() {
  let size = prompt('New Board Size: ');
  container.innerHTML = '';
  createBoard(size);
}