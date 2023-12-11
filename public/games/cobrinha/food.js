import { onSnake, expandSnake } from "./snake.js";
import { randomGridPosition } from "./grid.js";

import { letras, indiceAtual, pintarLetra } from "./palavra.js";

console.log(letras);
console.log(indiceAtual);
let food = getRandomFoodPosition();

const EXPANSION_RATE = 1;

export function update() {
  if (onSnake(food)) {
    expandSnake(EXPANSION_RATE);
    food = getRandomFoodPosition();
    pintarLetra(letras);
  }
}

export function draw(gameBoard) {
  const foodElement = document.createElement("div");
  const letraElement = document.createElement("div"); // Cria um elemento <p>
  letraElement.classList.add("letra");
  const letra = document.createElement("p");
  letra.textContent = letras[indiceAtual];
  letraElement.appendChild(letra); // Atribui o texto desejado ao elemento
  foodElement.appendChild(letraElement);
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  gameBoard.appendChild(foodElement);
}

function getRandomFoodPosition() {
  let newFoodPosition;

  while (newFoodPosition == null || onSnake(newFoodPosition)) {
    newFoodPosition = randomGridPosition();
  }

  return newFoodPosition;
}
