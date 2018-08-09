const baseUrl = 'http://localhost:3000/api/v1';
const token = `Bearer ${localStorage.token}`;
const profile = document.forms.profile_form;

function getUserProfile() {
  fetch(`${baseUrl}/account`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', Authorization: token }
  })
    .then(response => response.json())
    .then((user) => {
      if (user.status === 'success') {
        const {
          email, firstname, lastname, sex, bio, notification
        } = user.profile;
        profile.email.value = email;
        profile.firstname.value = firstname;
        profile.lastname.value = lastname;
        profile.sex.value = sex;
        profile.about.value = bio;
        profile.notification.value = notification;
      } else {
        displayMessage(entry.message, 'error');
      }
    })
    .catch(err => displayMessage('Connection Error. Please try again', 'serverError'));
}

window.load = getUserProfile();
