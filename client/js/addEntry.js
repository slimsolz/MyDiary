const baseUrl = 'https://mydiary-v1.herokuapp.com/api/v1';
const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dhscfltvv/upload';
const CLOUDINARY_UPLOAD_PRESET = 'q30emqym';
const addNewForm = document.getElementById('add_new_form');
const entryImage = document.getElementById('entry_image');
let image = 'images/miss_u.jpg';

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
      .catch(err => displayMessage('Connection Error. Please try again', 'serverError'));
  } else {
    displayMessage('Invalid image file', 'error');
  }
});


const addNewEntry = (e) => {
  e.preventDefault();
  const form = document.forms.add_new_form;
  const title = form.title.value;
  const category = form.category.value;
  const story = form.story.value;
  const token = `Bearer ${localStorage.token}`;

  fetch(`${baseUrl}/entries`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: token },
    body: JSON.stringify({
      title,
      category,
      image,
      story
    })
  })
    .then(response => response.json())
    .then((newEntry) => {
      if (newEntry.code === 201) {
        displayMessage(newEntry.message);
        form.title.value = '';
        form.category.value = '';
        form.story.value = '';
        entryImage.value = '';
      } else if (newEntry.code === 401) {
        displayMessage(newEntry.message, 'error');
        setTimeout(() => {
          window.location.href = 'login.html';
        }, 1000);
      } else {
        displayMessage(newEntry.message, 'error');
      }
    })
    .catch(err => displayMessage('Connection Error. Please try again', 'serverError'));
};

addNewForm.addEventListener('submit', addNewEntry, false);
