const inputText = document.getElementById('inputText');
const addBtn = document.getElementById('addBtn');
const list = document.getElementById('list');
const pagination = document.getElementById('pagination');

const lists = [];
const itemPerPage = 5;
let currentPage = 1;

addBtn.addEventListener('click', () => {
  const text = inputText.value.trim();
  if (text === '') {
    showErrorMessage('Please enter a text');
    return;
  }

  lists.unshift(text);
  inputText.value = '';
  currentPage = 1;
  renderLists();
  renderPagination();
});

function renderLists() {
  list.innerHTML = '';

  const start = (currentPage - 1) * itemPerPage;
  const end = start + itemPerPage;
  const currentList = lists.slice(start, end);

  currentList.forEach((text, i) => {
    const li = document.createElement('li');
    li.className = 'list-item';

    const textSpan = document.createElement('span');
    textSpan.className = 'text-span';
    textSpan.textContent = text;

    const editBtn = document.createElement('button');
    editBtn.className = 'edit-btn';
    editBtn.textContent = 'Edit';
    editBtn.addEventListener('click', () => {
      editText(start + i, li, textSpan);
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => {
      deleteText(start + i);
    });

    li.appendChild(textSpan);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);
    list.appendChild(li);
  });
}

function renderPagination() {
  pagination.innerHTML = '';

  const totalPages = Math.ceil(lists.length / itemPerPage);

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement('button');
    btn.className = 'pagination-btn';
    btn.textContent = i;
    btn.disabled = i === currentPage;
    btn.addEventListener('click', () => {
      currentPage = i;
      renderLists();
      renderPagination();
    });

    pagination.appendChild(btn);
  }
}

function editText(index, li) {
  const input = document.createElement('input');
  input.type = 'text';
  input.value = lists[index];
  input.className = 'text-span';

  const saveBtn = document.createElement('button');
  const deleteBtn = document.createElement('button');
  saveBtn.className = 'save-btn';
  saveBtn.textContent = 'Save';
  deleteBtn.className = 'delete-btn';
  deleteBtn.textContent = 'Delete';

  li.innerHTML = '';
  li.appendChild(input);
  li.appendChild(saveBtn);
  li.appendChild(deleteBtn);

  saveBtn.addEventListener('click', () => {
    const updateText = input.value.trim();
    if (updateText != '') {
      lists[index] = updateText;
      renderLists();
    } else {
      showErrorMessage('Text cannot be empty');
    }
  });
}

function deleteText(i) {
  lists.splice(i, 1);
  if ((currentPage - 1) * itemPerPage >= lists.length) {
    currentPage = Math.max(currentPage - 1, 1);
  }
  renderLists();
  renderPagination();
}

function showErrorMessage(message) {
  const errorMessage = document.querySelector('.error-message');
  errorMessage.textContent = message;
  errorMessage.style.display = 'block';
  setTimeout(() => {
    errorMessage.style.display = 'none';
  }, 3000);
}
