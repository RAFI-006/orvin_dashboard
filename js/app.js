const todoList = document.getElementById('todo-list');
const addBtn = document.getElementById('add-btn');
const deleteCheckedBtn = document.getElementById('delete-checked');
const newTodoInput = document.getElementById('new-todo');

let todos = JSON.parse(localStorage.getItem('todos')) || [
  { text: "Upload the report: Upload the report/prescriptions", checked: false },
  { text: "Change button style of onboarding pages", checked: false },
  { text: "Welcome to report tracker to orvin (continue with google page)", checked: false },
  { text: "New profile is causing error and showing old data", checked: false },
  { text: "Scroll should animate slowly.", checked: false },
  { text: "Remove arrow from animated cards.", checked: false },
  { text: "Daily digest is not working", checked: false },
  { text: "Add sugar/Add BP button should be in centre instead of below", checked: false },
  { text: "Sugar type should change to random", checked: false },
  { text: "Blood pressure graph colour issue", checked: false },
  { text: "Adjust blood pressure graph abnormal value is cutting the graph.", checked: false },
  { text: "Button gradient colour should be changed.", checked: false },
  { text: "No reports found image and copy should be changed", checked: false },
  { text: "Donut chart position issue", checked: false },
  { text: "Account/profile delete should also delete bp/sugar data from firestore", checked: false },
  { text: "Add weight feature with linear chart (should just allow weight)", checked: false },
  { text: "Low: Ability to navigate to scan page, bp, sugar sheet when user clicks on scrolling cards.", checked: false },
  { text: "Low: View all button for showing all the digest in web view", checked: false }
];

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