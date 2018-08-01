const baseUrl = 'http://localhost:3000/api/v1/';
const signupForm = document.getElementById('signup_form');

const signup = (e) => {
  e.preventDefault(e);
  const form = document.forms.signup_form;
  const email = form.email.value;
  const password = form.pass.value;
  const rePassword = form.pass2.value;

  if (password !== rePassword) {
    alert('passwords do not match');
  } else {
    fetch(`${baseUrl}auth/signup`, {
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
          displayMessage(`${newUser.user.email} ${newUser.message}`);
          setTimeout(() => {
            window.location.replace('entries.html');
          }, 5000);
        } else {
          displayMessage(newUser.message, 2);
        }
      })
      .catch(err => displayMessage(err, 3));
  }
};

signupForm.addEventListener('submit', signup, false);
