// Selectors
const todoInput = document.querySelector('.todo-input')
const todoButton = document.querySelector('.todo-button')
const todoList = document.querySelector('.todo-list')
const filterOption = document.querySelector('.filter-todo')


// Event Listeners
document.addEventListener('DOMContentLoaded', getTodos)
todoButton.addEventListener('click', addTodo)
todoList.addEventListener('click', deleteCheck)
filterOption.addEventListener('click', filterTodo)


// Functions
function addTodo(event) {
  // Prevent form from submitting
  event.preventDefault()
  
  // Todo Div
  const todoDiv = document.createElement('div');
  todoDiv.classList.add('todo');

  // Create LI
  const newTodo = document.createElement('li');
  newTodo.innerText = todoInput.value;
  newTodo.classList.add('todo-item');
  todoDiv.appendChild(newTodo);

  // Add Todo to local Storage
  saveLocalTodos(todoInput.value)
  // Check Mark button
  const completedButton = document.createElement('button');
  completedButton.innerHTML = '<i class="fas fa-check"><?i>'
  completedButton.classList.add('complete-btn')
  todoDiv.appendChild(completedButton);

  // Trash button
  const trashButton = document.createElement('button');
  trashButton.innerHTML = '<i class="fas fa-trash"><?i>'
  trashButton.classList.add('trash-btn')
  todoDiv.appendChild(trashButton);


  // Append to List
  todoList.appendChild(todoDiv)

  // Clear Input
  todoInput.value = '';

}

function deleteCheck(e) {
  const item = e.target;

  // Delete Todo
  if(item.classList[0] === 'trash-btn') {
    let todo = item.parentElement;
    todo.classList.add('fall')
    removeLocalTodos(todo)
    todo.addEventListener('transitionend', function() {
      todo.remove()
    })
  }


  // Check Mark
  if(item.classList[0] === 'complete-btn') {
    let todo = item.parentElement;
    todo.classList.toggle('completed')
  }
} 

function filterTodo(e) {
  const todos = document.querySelectorAll('.todo-list li');
  todos.forEach(function(todo) {
    let parent = todo.parentElement;
    switch(e.target.value){
      case 'all':
        parent.style.display = 'flex';
        break;
      case 'completed':
          if(parent.classList.contains('completed')) {       
          parent.style.display = 'flex';
        }
        else{
          parent.style.display = 'none';
        }
        break
      case 'uncompleted':
        if(!parent.classList.contains('completed')) {       
        parent.style.display = 'flex';
      }
      else{
        parent.style.display = 'none';
      }
      break
    }
  });
}


function saveLocalTodos(todo) {
  // Check if todo is in local Storage
  let todos;
  if(localStorage.getItem('todos') == null ) {
    todos  = [];
  }
  else{
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  todos.push(todo);
  localStorage.setItem('todos', JSON.stringify(todos))
   
}


function getTodos() {
  let todos;
  if(localStorage.getItem('todos') == null ) {
    todos  = [];
  }
  else{
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  todos.forEach(function(todo) {
     // Todo Div
  const todoDiv = document.createElement('div');
  todoDiv.classList.add('todo');

  // Create LI
  const newTodo = document.createElement('li');
  newTodo.innerText = todo;
  newTodo.classList.add('todo-item');
  todoDiv.appendChild(newTodo);

  // Check Mark button
  const completedButton = document.createElement('button');
  completedButton.innerHTML = '<i class="fas fa-check"><?i>'
  completedButton.classList.add('complete-btn')
  todoDiv.appendChild(completedButton);

  // Trash button
  const trashButton = document.createElement('button');
  trashButton.innerHTML = '<i class="fas fa-trash"><?i>'
  trashButton.classList.add('trash-btn')
  todoDiv.appendChild(trashButton);


  // Append to List
  todoList.appendChild(todoDiv)
  });
}

function removeLocalTodos(todo) {
  if(localStorage.getItem('todos') == null ) {
    todos  = [];
  }
  else{
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1)
  localStorage.setItem('todos', JSON.stringify(todos) )
}

