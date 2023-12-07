const letrasPintadas = new Set();
const palavra = "ABACAXI";
export const letras = palavra.split("");
export let indiceAtual = 0;

export function pintarLetra(letra) {
  const span = document.getElementById(`letra-${indiceAtual}`);
  span.style.color = "#C20029dd";
  letrasPintadas.add(letra);
  indiceAtual++;

  if (indiceAtual >= letras.length) {
    if (confirm(`${palavra} foi digitado corretamente!`)) {
      location = "/cobrinha";
    }
  }
  return;
}

module.exports = letrasPintadas;