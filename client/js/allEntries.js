const baseUrl = 'http://localhost:3000/api/v1';
const createElement = element => document.createElement(element);
const append = (parent, child) => parent.appendChild(child);

function deleteEntry(entryId) {
  const token = `Bearer ${localStorage.token}`;
  const answer = confirm('Are You Sure??');
  if (answer) {
    fetch(`${baseUrl}/entries/${entryId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', Authorization: token }
    })
      .then(data => location.reload(true))
      .catch(err => displayMessage('Connection Error. Please try again', 'serverError'));
  }
}

function load() {
  const container = document.getElementById('content');
  const token = `Bearer ${localStorage.token}`;
  fetch(`${baseUrl}/entries`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', Authorization: token },
  })
    .then(response => response.json())
    .then((result) => {
      if (result.status === 'success' && result.entries) {
        result.entries.map((entry) => {
          const {
            id, title, category, image, story
          } = entry;
          const article = createElement('article');
          const img = createElement('img');
          const figure = createElement('figure');
          const figcaption = createElement('figcaption');
          const a = createElement('a');
          const h2 = createElement('h2');
          const p = createElement('p');
          const buttonDiv = createElement('div');
          const editbtn = createElement('a');
          const deletebtn = createElement('button');
          img.src = 'images/miss_u.jpg';
          img.alt = 'Missing you';
          article.setAttribute('class', 'col-4 col-m-2 col-s-4');
          a.setAttribute('class', 'link');
          buttonDiv.setAttribute('class', 'btn-footer');
          editbtn.setAttribute('class', 'btn btn-edit');
          deletebtn.setAttribute('class', 'btn btn-delete');
          h2.innerHTML = title;
          p.innerHTML = story.substring(0, 15);
          editbtn.innerHTML = 'Edit';
          deletebtn.innerHTML = 'Delete';
          append(buttonDiv, editbtn);
          append(buttonDiv, deletebtn);
          append(figcaption, h2);
          append(figcaption, p);
          append(a, figcaption);
          append(figure, img);
          append(figure, a);
          append(figure, buttonDiv);
          append(article, figure);
          append(content, article);
          deletebtn.onclick = () => deleteEntry(id);
        });
      } else {
        displayMessage(result.message, 'error');
      }
    })
    .catch(err => displayMessage('Connection Error. Please try again', 'serverError'));
}

window.load = load();

