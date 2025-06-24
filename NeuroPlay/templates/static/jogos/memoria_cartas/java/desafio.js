window.onload = () => {
  const challengeText = localStorage.getItem('challenge') || 'Desafio não encontrado.';
  document.getElementById('challenge-text').innerText = challengeText;
};


function validateAnswer() {
  const userAnswer = document.getElementById('user-answer').value.trim().toLowerCase();
  const challenge = localStorage.getItem('challenge');

  console.log(`Desafio: ${challenge}`);
console.log(`Resposta do usuário: "${userAnswer}"`);

  let correct = false;

  switch (challenge) {
    case 'Qual letra minúscula combina com a maiúscula A?':
      correct = userAnswer === 'a';
      break;
    case 'As letras p e q são as mesmas?':
      correct = userAnswer === 'nao';
      break;
    case 'Qual a letra que vem depois do M?':
      correct = userAnswer === 'n';
      break;
    case 'Qual é o par minúsculo correto para a letra maiúscula T?':
      correct = userAnswer === 't';
      break;
    case 'Qual a letra que falta para a seguinte palavra:  ':
      correct = userAnswer === 'q';
      break;
    case 'Qual é o par correto para a letra minúscula d?':
      correct = userAnswer === 'd';
      break;
    case 'Qual palavra está escrita corretamente? bola, dola ou qola':
      correct = userAnswer === 'bola';
      break;
    case 'Qual dessas letras está de cabeça para baixo? T, b, d ou q?':
      correct = userAnswer === 'q';
      break;
    default:
      correct = false;
  }

  const feedback = document.getElementById('feedback');
  if (correct) {
    feedback.innerText = 'Resposta correta! Voltando ao jogo...';
    localStorage.removeItem('challenge');
    localStorage.setItem('errors', '0');

    setTimeout(() => {
      window.location.href = 'game.html';
    }, 1500);
  } else {
    feedback.innerText = 'Resposta incorreta! Tente novamente.';
  }
}



