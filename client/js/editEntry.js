const baseUrl = 'http://localhost:3000/api/v1';
const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dhscfltvv/upload';
const CLOUDINARY_UPLOAD_PRESET = 'q30emqym';
const id = parseInt(window.location.search.substring(4), 10);
const token = `Bearer ${localStorage.token}`;
const form = document.forms.modify_form;
const entryImage = document.getElementById('entry_image');
let image = 'images/miss_u.jpg';

function getEntry() {
  fetch(`${baseUrl}/entries/${id}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', Authorization: token },
  })
    .then(response => response.json())
    .then((result) => {
      if (result.code === 200) {
        form.title.value = result.entry.title;
        form.category.value = result.entry.category;
        form.story.value = result.entry.story;
      } else if (result.code === 401) {
        displayMessage(result.message, 'error');
        setTimeout(() => {
          window.location.href = 'login.html';
        }, 1000);
      } else {
        displayMessage(result.message, 'error');
      }
    })
    .catch(err => displayMessage('Connection Error. Please try again', 'serverError'));
}

entryImage.addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (file.type === 'image/png' || file.type === 'image/jpg' || file.type === 'image/jpeg') {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

    fetch(CLOUDINARY_URL, {
      method: 'POST',
      body: formData
    })
      .then(res => res.json())
      .then((data) => {
        image = data.secure_url;
      })
      .catch(err => displayMessage('Connection Error. Cannot verify image', 'serverError'));
  } else {
    displayMessage('Invalid image file', 'error');
  }
});

function editEntry(e) {
  e.preventDefault();
  const title = form.title.value;
  const category = form.category.value;
  const story = form.story.value;

  fetch(`${baseUrl}/entries/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', Authorization: token },
    body: JSON.stringify({
      title,
      category,
      image,
      story
    })
  })
    .then(response => response.json())

    .then((updatedEntry) => {
      if (updatedEntry.status === 'success') {
        displayMessage(updatedEntry.message);
        form.title.value = '';
        form.category.value = '';
        form.story.value = '';
        entryImage.value = '';
      } else if (updatedEntry.code === 401) {
        displayMessage(updatedEntry.message, 'error');
        setTimeout(() => {
          window.location.href = 'login.html';
        }, 1000);
      } else {
        displayMessage(updatedEntry.message, 'error');
      }
    })
    .catch(err => displayMessage('Connection Error. Please try again', 'serverError'));
}

window.load = getEntry();
document.onsubmit = editEntry;
