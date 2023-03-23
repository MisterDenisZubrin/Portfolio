const cvs = document.querySelector('#canvas');
const context = cvs.getContext("2d");
const bird = new Image();
const background = new Image();
const backgroundBase = new Image();
const pipeTop = new Image();
const pipeBottom = new Image();

bird.src = "./img/bird.png";
background.src = "./img/background.png";
backgroundBase.src = "./img/background_base.png";
pipeTop.src = "./img/pipe_top.png";
pipeBottom.src = "./img/pipe_bottom.png";

// Птица
let birdXPos = 10,
  birdYPos = 150;
let birdGravity = 1.5;

function jump() {
  birdYPos -= 40;
}
document.addEventListener('keydown', jump);
// Препятствия
let pipes = [];
pipes[0] = {
  x: cvs.width,
  y: 0
}
let gap = 90;
// Счёт
let score = 0;

function game() {
  // Отрисовка фона
  context.drawImage(background, 0, 0);
  context.drawImage(backgroundBase, 0, cvs.height - backgroundBase.height);
  // Генерация препятствий
  for (let i = 0; i < pipes.length; i++) {
    // Отрисовка блока
    context.drawImage(pipeTop, pipes[i].x, pipes[i].y);
    context.drawImage(pipeBottom, pipes[i].x, pipes[i].y + pipeTop.height + gap);
    // Движение блока
    pipes[i].x--;
    // Место создания нового блока
    if (pipes[i].x === 125) {
      pipes.push({
        x: cvs.width,
        y: Math.floor(Math.random() * pipeTop.height) - pipeTop.height
      })
    }
    // Проверка на столкновения
    if (
      // в пределах ширины блока
      (birdXPos + bird.width >= pipes[i].x 
      && birdXPos <= pipes[i].x + pipeTop.width) 
      &&
      // в пределах высоты блока
      (birdYPos <= pipes[i].y + pipeTop.height 
      || birdYPos + bird.height >= pipes[i].y + pipeTop.height + gap 
      // и не касается земли
      || birdYPos + bird.height >= cvs.height - backgroundBase.height)) {
      location.reload();
    }
    // Изменение счёта при прохождении препятствия
    if (pipes[i].x === 5) {
      score++;
    }
  }
  // Отрисовка птицы
  context.drawImage(bird, birdXPos, birdYPos);
  birdYPos += birdGravity;
  // Отрисовка счёта
  context.fillStyle = '#000';
  context.font = '24px Verdana';
  context.fillText(`Счёт: ${score}`, 10, cvs.height - 20);
  // Анимация
  requestAnimationFrame(game);
}

pipeBottom.onload = game;