const baseUrl = 'http://localhost:3000/api/v1';
const addNewForm = document.getElementById('add_new_form');

const addNewEntry = (e) => {
  e.preventDefault();
  const form = document.forms.add_new_form;
  const title = form.title.value;
  const category = form.category.value;
  const image = 'images/miss_u.jpg';
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
      if (newEntry.status === 'success') {
        displayMessage(newEntry.message);
        form.title.value = '';
        form.category.value = '';
        form.story.value = '';
      } else {
        displayMessage(newEntry.message, 'error');
      }
    })
    .catch(err => displayMessage('Connection Error. Please try again', 'serverError'));
};

addNewForm.addEventListener('submit', addNewEntry, false);
