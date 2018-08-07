const baseUrl = 'http://localhost:3000/api/v1';
const id = parseInt(window.location.search.substring(4), 10);
const token = `Bearer ${localStorage.token}`;

function getEntry() {
  fetch(`${baseUrl}/entries/${id}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', Authorization: token },
  })
    .then(response => response.json())
    .then((entry) => {
      if (entry.status === 'success') {
        const form = document.forms.modify_form;
        form.title.value = entry.entry.title;
        form.category.value = entry.entry.category;
        form.story.value = entry.entry.story;
      } else {
        displayMessage(entry.message, 'error');
      }
    })
    .catch(err => displayMessage('Connection Error. Please try again', 'serverError'));
}

function editEntry(e) {
  e.preventDefault();
  const form = document.forms.modify_form;
  const title = form.title.value;
  const category = form.category.value;
  const image = 'images/miss_u.jpg';
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
      } else {
        displayMessage(updatedEntry.message, 'error');
      }

      form.title.value = '';
      form.category.value = '';
      form.story.value = '';
    })
    .catch(err => displayMessage('Connection Error. Please try again', 'serverError'));
}

window.load = getEntry();
document.onsubmit = editEntry;
