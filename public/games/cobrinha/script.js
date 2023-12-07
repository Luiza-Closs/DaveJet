import {
    update as updateSnake,
    draw as drawSnake,
    getSnakeHead,
    snakeIntersection,
    SNAKE_SPEED,
  } from "./snake.js";
  
  import { update as updateFood, draw as drawFood } from "./food.js";
  
  import { outsideGrid } from "./grid.js";

  import { letrasPintadas } from "./palavra.js";
  
  const gameBoard = document.querySelector("#game-board");
  

  // Lista de letras
  const letras = ['A', 'B', 'A', 'C', 'A', 'X', 'I'];

  // Elemento parágrafo
  const pickWord = document.querySelector("#pick-word");
  const p = document.createElement('p');
  const strong = document.createElement('strong');

  // Iterar sobre as letras e criar spans
  letras.forEach((letra, index) => {
      // Criar elemento span
      const span = document.createElement('span');
      span.textContent = letra;  // Adicionar a letra ao conteúdo do span
      span.id = `letra-${index}`;  // Definir o id do span

      // Adicionar o span ao parágrafo
      strong.appendChild(span);
  });
  p.appendChild(strong);
  pickWord.appendChild(p);
  
  let lastRenderTime = 0;
  let gameOver = false;
  
  requestAnimationFrame(main);
  
  function main(currentTime) {
    if (gameOver) {
      if (confirm("Você perdeu")) {
        location = "/cobrinha";
        return letrasPintadas;
      }
      return;
    }
  
    requestAnimationFrame(main);
  
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
  
    if (secondsSinceLastRender < 1 / SNAKE_SPEED) return;
  
    lastRenderTime = currentTime;
  
    update();
    draw();
  }
  
  function update() {
    updateSnake();
    updateFood();
    checkDeath();
  }
  
  function draw() {
    gameBoard.innerHTML = "";
    drawSnake(gameBoard);
    drawFood(gameBoard);
  }
  
  function checkDeath() {
    gameOver = outsideGrid(getSnakeHead()) || snakeIntersection();
  }
  