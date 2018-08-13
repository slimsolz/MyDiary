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
      if (user.code === 200) {
        const {
          email, firstname, lastname, sex, bio, notification
        } = user.profile;
        profile.email.value = email;
        profile.firstname.value = firstname;
        profile.lastname.value = lastname;
        profile.sex.value = sex;
        profile.about.value = bio;
        profile.notification.value = notification;
      } else if (user.code === 401) {
        displayMessage(user.message, 'error');
        setTimeout(() => {
          window.location.href = 'login.html';
        }, 1000);
      }
    })
    .catch(err => displayMessage('Connection Error. Please try again', 'serverError'));
}

function editUserProfile(e) {
  e.preventDefault();
  const firstname = profile.firstname.value;
  const lastname = profile.lastname.value;
  const sex = profile.sex.value;
  const bio = profile.about.value;
  const notification = profile.notification.value;

  fetch(`${baseUrl}/account`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', Authorization: token },
    body: JSON.stringify({
      firstname,
      lastname,
      sex,
      bio,
      notification
    })
  })
    .then(response => response.json())
    .then((updatedUser) => {
      if (updatedUser.code === 200) {
        displayMessage(updatedUser.message);
      } else if (updatedUser.code === 401) {
        displayMessage(updatedUser.message, 'error');
        setTimeout(() => {
          window.location.href = 'login.html';
        }, 1000);
      } else {
        displayMessage(updatedUser.message, 'error');
      }
    })
    .catch(err => displayMessage('Connection Error. Please try again', 'serverError'));
}

window.load = getUserProfile();
document.onsubmit = editUserProfile;
