const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');

const characters = [
  'AMaiusculo', 'Aminusculo',
  'BMaiusculo', 'Bminusculo',
  'DMaiusculo', 'Dminusculo',
  'FMaiusculo', 'Fminusculo',
  'HMaiusculo', 'Hminusculo',
  'IMaiusculo', 'Iminusculo',
  'MMaiusculo', 'Mminusculo',
  'NMaiusculo', 'Nminusculo',
  'PMaiusculo', 'Pminusculo',
  'QMaiusculo', 'Qminusculo',
  'SMaiusculo', 'Sminusculo',
  'TMaiusculo', 'Tminusculo',
  'UMaiusculo', 'Uminusculo',
  'VMaiusculo', 'Vminusculo'
];

const characterPairs = {
  'AMaiusculo': 'Aminusculo', 'Aminusculo': 'AMaiusculo',
  'BMaiusculo': 'Bminusculo', 'Bminusculo': 'BMaiusculo',
  'DMaiusculo': 'Dminusculo', 'Dminusculo': 'DMaiusculo',
  'FMaiusculo': 'Fminusculo', 'Fminusculo': 'FMaiusculo',
  'HMaiusculo': 'Hminusculo', 'Hminusculo': 'HMaiusculo',
  'IMaiusculo': 'Iminusculo', 'Iminusculo': 'IMaiusculo',
  'MMaiusculo': 'Mminusculo', 'Mminusculo': 'MMaiusculo',
  'NMaiusculo': 'Nminusculo', 'Nminusculo': 'NMaiusculo',
  'PMaiusculo': 'Pminusculo', 'Pminusculo': 'PMaiusculo',
  'QMaiusculo': 'Qminusculo', 'Qminusculo': 'QMaiusculo',
  'SMaiusculo': 'Sminusculo', 'Sminusculo': 'SMaiusculo',
  'TMaiusculo': 'Tminusculo', 'Tminusculo': 'TMaiusculo',
  'UMaiusculo': 'Uminusculo', 'Uminusculo': 'UMaiusculo',
  'VMaiusculo': 'Vminusculo', 'Vminusculo': 'VMaiusculo'
};

let firstCard = '';
let secondCard = '';
let errorCount = parseInt(localStorage.getItem('errors')) || 0;

const createElement = (tag, className) => {
  const element = document.createElement(tag);
  element.className = className;
  return element;
};

const checkEndGame = () => {
  const disabledCards = document.querySelectorAll('.disabled-card');
  if (disabledCards.length === characters.length) {
    clearInterval(this.loop);
    alert(`Parabéns, ${spanPlayer.innerHTML}! Seu tempo foi de: ${timer.innerHTML} segundos`);
  }
};

const checkCards = () => {
  const firstCharacter = firstCard.getAttribute('data-character');
  const secondCharacter = secondCard.getAttribute('data-character');

  if (characterPairs[firstCharacter] === secondCharacter) {
    firstCard.firstChild.classList.add('disabled-card');
    secondCard.firstChild.classList.add('disabled-card');

    saveMatchedCard(firstCharacter);
    saveMatchedCard(secondCharacter);

    firstCard = '';
    secondCard = '';
    checkEndGame();
  } else {
    errorCount++;
    localStorage.setItem('errors', errorCount);

    if (errorCount >= 5) {
      localStorage.setItem('time', timer.innerHTML);
      localStorage.setItem('player', spanPlayer.innerHTML);
      localStorage.setItem('matchedCards', JSON.stringify(getMatchedCards()));
      localStorage.setItem('deckOrder', JSON.stringify(deckOrder));
      alert(`Você errou 5 vezes, Vamos para a página do desafio!!`)

      const challenges = [
        'Qual letra minúscula combina com a maiúscula A?',
        'As letras p e q são as mesmas?',
        'Qual a letra que vem depois do M?',
        'Qual é o par minúsculo correto para a letra maiúscula T?',
        'Qual a letra que falta para a seguinte palavra: _ueijo',
        'Qual é o par correto para a letra minúscula d?',
        'Qual palavra está escrita corretamente? bola, dola ou qola',
        'Qual dessas letras está de cabeça para baixo? T, b, d ou q?',
      ];
      const randomChallenge = challenges[Math.floor(Math.random() * challenges.length)];
      localStorage.setItem('challenge', randomChallenge);
      window.location.href = 'desafio.html';
      return;
    }

    setTimeout(() => {
      firstCard.classList.remove('reveal-card');
      secondCard.classList.remove('reveal-card');
      firstCard = '';
      secondCard = '';
    }, 800);
  }
};

function getMatchedCards() {
  return Array.from(document.querySelectorAll('.disabled-card')).map(card =>
    card.parentNode.getAttribute('data-character')
  );
}

function saveMatchedCard(character) {
  const matched = JSON.parse(localStorage.getItem('matchedCards') || '[]');
  if (!matched.includes(character)) {
    matched.push(character);
    localStorage.setItem('matchedCards', JSON.stringify(matched));
  }
}

const revealCard = ({ target }) => {
  if (target.parentNode.classList.contains('reveal-card')) return;
  if (target.parentNode.firstChild.classList.contains('disabled-card')) return;
  if (secondCard) return;

  target.parentNode.classList.add('reveal-card');

  if (!firstCard) {
    firstCard = target.parentNode;
  } else {
    secondCard = target.parentNode;
    checkCards();
  }
};

const createCard = (character) => {
  const card = createElement('div', 'card');
  const front = createElement('div', 'face front');
  const back = createElement('div', 'face back');

  front.style.backgroundImage = `url('./imagens/${character}.png')`;

  card.appendChild(front);
  card.appendChild(back);
  card.setAttribute('data-character', character);
  card.addEventListener('click', revealCard);

  return card;
};

let deckOrder = [];

const loadGame = () => {
  const savedOrder = JSON.parse(localStorage.getItem('deckOrder'));

  deckOrder = savedOrder || [...characters].sort(() => Math.random() - 0.5);
  if (!savedOrder) localStorage.setItem('deckOrder', JSON.stringify(deckOrder));

  deckOrder.forEach(character => {
    const card = createCard(character);
    grid.appendChild(card);
  });

  const matched = JSON.parse(localStorage.getItem('matchedCards') || '[]');
  matched.forEach(character => {
    const card = [...document.querySelectorAll('.card')].find(c => c.getAttribute('data-character') === character);
    if (card) {
      card.classList.add('reveal-card');
      card.firstChild.classList.add('disabled-card');
    }
  });
};

const startTimer = () => {
  this.loop = setInterval(() => {
    const currentTime = +timer.innerHTML;
    timer.innerHTML = currentTime + 1;
  }, 1000);
};

window.onload = () => {
  spanPlayer.innerHTML = localStorage.getItem('player') || 'Jogador';
  timer.innerHTML = localStorage.getItem('time') || '0';

  const matchedCards = JSON.parse(localStorage.getItem('matchedCards') || '[]');
  if (matchedCards.length === characters.length) {
    timer.innerHTML = '0';
    localStorage.removeItem('time');
    localStorage.removeItem('errors');
    localStorage.removeItem('matchedCards');
  } else {
    timer.innerHTML = localStorage.getItem('time') || '0';
  }
  loadGame();
  startTimer();
};
