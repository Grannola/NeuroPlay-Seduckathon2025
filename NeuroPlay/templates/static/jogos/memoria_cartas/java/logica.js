const emailInput = document.querySelector('.login_input');
const button = document.querySelector('.login_button');
const form = document.querySelector('.login-form');
const validateInputs = () => {
  if (emailInput.value.length > 2) {
    button.removeAttribute('disabled');
  } else {
    button.setAttribute('disabled', '');
  }
};

const handlesubmit = (event) => {
  event.preventDefault();

  localStorage.setItem('player' , emailInput.value);
  window.location = '../paginas/game.html';
}

emailInput.addEventListener('input', validateInputs);
form.addEventListener('submit', handlesubmit);