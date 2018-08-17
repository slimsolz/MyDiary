const baseUrl = 'https://mydiary-v1.herokuapp.com/api/v1';
const signupForm = document.getElementById('signup_form');

const signup = (e) => {
  e.preventDefault();
  const form = document.forms.signup_form;
  const email = form.email.value;
  const password = form.pass.value;
  const rePassword = form.pass2.value;

  if (password !== rePassword) {
    displayMessage('passwords do not match', 2);
  } else {
    fetch(`${baseUrl}/auth/signup`, {
      method: 'POST',
      body: JSON.stringify({
        email,
        password
      }),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => response.json())
      .then((newUser) => {
        if (newUser.code === 201) {
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
        form.pass2.value = '';
      })
      .catch(err => displayMessage('Connection Error. Please try again', 'serverError'));
  }
};

signupForm.addEventListener('submit', signup, false);
