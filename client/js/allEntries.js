const baseUrl = 'http://localhost:3000/api/v1';
const createElement = element => document.createElement(element);
const append = (parent, child) => parent.appendChild(child);

const container = document.getElementById('content');
const modalDiv = document.getElementById('myModal');
const modalContent = createElement('div');
const closeSpan = createElement('span');
const h1 = createElement('h1');
const storyParagraph = createElement('p');
const btnRow = createElement('div');
const modalBtn = createElement('div');
const editBtn = createElement('a');
const deleteBtn = createElement('button');

function deleteEntry(entryId, token) {
  const answer = confirm('Are You Sure??');
  if (answer) {
    fetch(`${baseUrl}/entries/${entryId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', Authorization: token }
    })
      .then(response => response.json())
      .then((result) => {
        if (result.code === 200) {
          displayMessage(result.message);
          setTimeout(() => {
            location.reload(true);
          }, 30);
        } else {
          displayMessage(result.message, 'error');
        }
      })
      .catch(err => displayMessage('Connection Error. Please try again', 'serverError'));
  }
}

function showEntry(id, token, e) {
  e.preventDefault();
  modalContent.setAttribute('class', 'modal-content');
  closeSpan.setAttribute('class', 'close');
  h1.setAttribute('id', 'story-title');
  storyParagraph.setAttribute('id', 'story');
  btnRow.setAttribute('class', 'row');
  modalBtn.setAttribute('class', 'modal_buttons');
  editBtn.innerHTML = 'Edit';
  deleteBtn.innerHTML = 'Delete';
  closeSpan.innerHTML = '&times;';
  deleteBtn.setAttribute('id', 'delete');
  append(modalBtn, editBtn);
  append(modalBtn, deleteBtn);
  append(btnRow, modalBtn);
  append(modalContent, closeSpan);
  append(modalContent, h1);
  append(modalContent, storyParagraph);
  append(modalContent, btnRow);
  append(modalDiv, modalContent);

  fetch(`${baseUrl}/entries/${id}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', Authorization: token }
  })
    .then(response => response.json())
    .then((entry) => {
      if (entry.code === 200) {
        const {
          title, image, story
        } = entry.entry;
        const innerstory = `<img src="${image}" width="300" height="300" align="left"> ${story}`;
        h1.innerHTML = title;
        storyParagraph.innerHTML = innerstory;
        editBtn.href = `edit_entry.html?id=${id}`;
        deleteBtn.onclick = () => deleteEntry(id, token);
      } else if (entry.code === 401) {
        displayMessage(entry.message, 'error');
        setTimeout(() => {
          window.location.href = 'login.html';
        }, 1000);
      } else {
        displayMessage(entry.message, 'error');
      }
    })
    .catch(err => displayMessage('Connection Error. Please try again', 'serverError'));

  modalDiv.style.display = 'block';
}

closeSpan.onclick = () => {
  modalDiv.style.display = 'none';
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = (event) => {
  if (event.target === modalDiv) {
    modalDiv.style.display = 'none';
  }
};

function load() {
  const token = `Bearer ${localStorage.token}`;
  fetch(`${baseUrl}/entries`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', Authorization: token },
  })
    .then(response => response.json())
    .then((result) => {
      if (result.code === 200 && result.entries) {
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
          const deletebtn = createElement('a');
          img.src = image;
          img.alt = 'Missing you';
          article.setAttribute('class', 'col-4 col-m-2 col-s-4');
          a.setAttribute('class', 'link');
          buttonDiv.setAttribute('class', 'btn-footer');
          editbtn.setAttribute('class', 'btn btn-edit');
          deletebtn.setAttribute('class', 'btn btn-delete');
          h2.innerHTML = title;
          p.innerHTML = story.substring(0, 20);
          editbtn.innerHTML = 'Edit';
          editbtn.href = `edit_entry.html?id=${id}`;
          deletebtn.innerHTML = 'Delete';
          deletebtn.style.cursor = 'pointer';
          a.style.cursor = 'pointer';
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
          a.onclick = () => showEntry(id, token, event);
          deletebtn.onclick = () => deleteEntry(id, token);
        });
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

window.load = load();

