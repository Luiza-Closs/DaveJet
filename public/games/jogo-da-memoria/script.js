const cards = document.querySelectorAll('.card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
// Adicione essas variáveis globais ao seu código JavaScript
let timerInterval;
let seconds = 0;
let isGameCompleted = false;

function startTimer() {
    timerInterval = setInterval(function() {
        seconds++;
        displayTimer();
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
}

function displayTimer() {
    const timerElement = document.getElementById('timer');
    timerElement.textContent = `Tempo: ${seconds} segundos`;
}

// Dentro da função checkForMatch, após a verificação de partida, verifique se o jogo está completo
function checkForMatch() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

    if (isMatch) {
        disableCards();
        if (document.querySelectorAll('.card:not(.matched)').length === 0) {
            isGameCompleted = true;
            stopTimer();
            alert(`Parabéns! Você completou o jogo em ${seconds} segundos.`);
        }
    } else {
        unflipCards();
    }
}


function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flipped');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    checkForMatch();
}

function disableCards() {
    firstCard.classList.add('matched');
    secondCard.classList.add('matched');

    resetBoard();
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');

        resetBoard();
    }, 1000);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

(function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * cards.length);
        card.style.order = randomPos;
    });
})();

cards.forEach(card => card.addEventListener('click', flipCard));

function createCards(){
    const memoryGameContainer = document.createElement('div');
    memoryGameContainer.classList.add('memory-game');

    const mainContainer = document.getElementById('game-board');

    const cardData = [
        {
            dataFramework : 'a',
            frontImg : '/image/logo.png',
            backImg : 'https://tezg10.vteximg.com.br/arquivos/ids/177030-292-292/700003000000039-LETRA-A-ROSA-CLARO-5CM.jpg?v=637830971128470000'
        },
        {
            dataFramework : 'a',
            frontImg : '/image/logo.png',
            backImg : 'https://static.vecteezy.com/system/resources/previews/017/340/147/non_2x/cute-bee-carrying-honey-pot-with-fresh-nature-honey-dripping-out-from-pot-cartoon-character-illustration-png.png'
        },
        {
            dataFramework : 'b',
            frontImg : '/image/logo.png',
            backImg : 'https://tezg10.vteximg.com.br/arquivos/ids/176939-292-292/700003000000040-LETRA-B-ROSA-CLARO-5CM.jpg?v=637830970793930000'
        },
        {
            dataFramework : 'b',
            frontImg : '/image/logo.png',
            backImg : 'https://dbdzm869oupei.cloudfront.net/img/sticker/preview/124.png'
        },
        {
            dataFramework : 'c',
            frontImg : '/image/logo.png',
            backImg : 'https://tezg10.vteximg.com.br//arquivos/ids/177221-450-450/700003000000041-LETRA-C-ROSA-CLARO-5CM.jpg?v=637830971801470000'
        },
        {
            dataFramework : 'c',
            frontImg : '/image/logo.png',
            backImg : 'https://static.vecteezy.com/system/resources/previews/018/732/209/non_2x/cartoon-cute-red-colour-car-with-happy-smiling-character-illustration-png.png'
        },
        {
            dataFramework : 'd',
            frontImg : '/image/logo.png',
            backImg : 'https://tezg10.vteximg.com.br//arquivos/ids/176978-342-318/700003000000042-LETRA-D-ROSA-CLARO-5CM.jpg?v=637830970946970000'
        },
        {
            dataFramework : 'd',
            frontImg : '/image/logo.png',
            backImg : 'https://creazilla-store.fra1.digitaloceanspaces.com/emojis/42541/game-die-emoji-clipart-md.png'
        },
        {
            dataFramework : 'e',
            frontImg : '/image/logo.png',
            backImg : 'https://tezg10.vteximg.com.br//arquivos/ids/177324-342-318/700003000000043-LETRA-E-ROSA-CLARO-5CM.jpg?v=637830972165600000'
        },
        {
            dataFramework : 'e',
            frontImg : '/image/logo.png',
            backImg : 'https://i.pinimg.com/originals/d0/6c/d7/d06cd7e26cb5b7e0d4b16e1f35712dca.png'
        },
        {
            dataFramework : 'f',
            frontImg : '/image/logo.png',
            backImg : 'https://tezg10.vteximg.com.br//arquivos/ids/176758-342-318/700003000000044-LETRA-F-ROSA-CLARO-5CM.jpg?v=637830970147430000'
        },
        {
            dataFramework : 'f',
            frontImg : '/image/logo.png',
            backImg : 'https://i.pinimg.com/originals/83/4a/31/834a31bd18af2bb08844eccc586f7a8d.png'
        },
    ]

    cardData.forEach(cardI =>{
        const card = document.createElement('div');
        card.addEventListener('click', flipCard)
        card.classList.add('card');
        card.dataset.framework = cardI.dataFramework;

        const frontFace = document.createElement('img');
        frontFace.classList.add('front-face');
        frontFace.src = cardI.frontImg;

        const backFace = document.createElement('img');
        backFace.classList.add('back-face');
        backFace.src = cardI.backImg;

        card.appendChild(frontFace);
        card.appendChild(backFace);
        memoryGameContainer.appendChild(card);
    })
    mainContainer.appendChild(memoryGameContainer)
}

window.onload = createCards