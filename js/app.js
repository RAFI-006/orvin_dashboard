const todoList = document.getElementById('todo-list');
const addBtn = document.getElementById('add-btn');
const deleteCheckedBtn = document.getElementById('delete-checked');
const newTodoInput = document.getElementById('new-todo');

let todos = JSON.parse(localStorage.getItem('todos')) || [];

function renderTodos() {
  todoList.innerHTML = '';
  todos.forEach((todo, index) => {
    const div = document.createElement('div');
    div.className = 'todo';
    div.innerHTML = `
      <input type="checkbox" ${todo.checked ? 'checked' : ''} onchange="toggleTodo(${index})" />
      <span style="${todo.checked ? 'text-decoration: line-through; color: gray;' : ''}">${todo.text}</span>
      <button class="delete-btn" onclick="deleteTodo(${index})">❌</button>
    `;
    todoList.appendChild(div);
  });
  localStorage.setItem('todos', JSON.stringify(todos));
}

function addTodo() {
  const text = newTodoInput.value.trim();
  if (text !== '') {
    todos.push({ text, checked: false });
    newTodoInput.value = '';
    renderTodos();
  }
}

function toggleTodo(index) {
  todos[index].checked = !todos[index].checked;
  renderTodos();
}

function deleteTodo(index) {
  todos.splice(index, 1);
  renderTodos();
}

function deleteCheckedTodos() {
  todos = todos.filter(todo => !todo.checked);
  renderTodos();
}

addBtn.addEventListener('click', addTodo);
deleteCheckedBtn.addEventListener('click', deleteCheckedTodos);
newTodoInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') addTodo(); });

renderTodos();
window.toggleTodo = toggleTodo;
window.deleteTodo = deleteTodo;