const baseUrl = 'http://localhost:3000/api/v1';
const loginForm = document.getElementById('login_form');

const signin = (e) => {
  e.preventDefault();
  const form = document.forms.login_form;
  const email = form.email.value;
  const password = form.pass.value;

  fetch(`${baseUrl}/auth/signin`, {
    method: 'POST',
    body: JSON.stringify({
      email,
      password
    }),
    headers: { 'Content-Type': 'application/json' }
  })
    .then(response => response.json())
    .then((newUser) => {
      if (newUser.status === 'success') {
        window.localStorage.token = newUser.token;
        displayMessage(newUser.message);
        setTimeout(() => {
          window.location.replace('entries.html');
        }, 4000);
      } else {
        displayMessage(newUser.message, 'error');
      }

      form.email.value = '';
      form.pass.value = '';
    })
    .catch(err => displayMessage('Connection Error. Please try again', 'serverError'));
};

loginForm.addEventListener('submit', signin, false);
