//Faind Eliments
const todoInput = document.querySelector("#todoInput");
const submitBtn = document.getElementById("submitBtn");
const todoForm = document.querySelector("#todoForm");
const todoLists = document.querySelector(".todoLists");
const notification = document.querySelector("#notification");

//funtion

const itmAddNotification = () => {
  notification.innerHTML = `Add Todo`;
  notification.classList.add("todoAdd");
  setTimeout(() => {
    notification.innerHTML = "";
    notification.classList.remove("todoAdd");
  }, 1500);
};

const itmDeleteNotification = () => {
  notification.innerHTML = `Todo Delete`;
  notification.classList.add("todoDelete");
  setTimeout(() => {
    notification.innerHTML = "";
    notification.classList.remove("todoDelete");
  }, 1500);
};

const todoAdditm = (itmValue, todoId) => {
  const todoIdlist = todoId;
  const todolist = document.createElement("li");
  todolist.innerHTML = `<span>${itmValue}</span><button class="deleteBtn" id="deletedBtn"><i class="fa-solid fa-trash"></i></button>`;
  todolist.id = todoIdlist;
  todoLists.appendChild(todolist);
  const deletebutton = todolist.querySelector("#deletedBtn");
  deletebutton.addEventListener("click", deleteTodo);
};

// deleteTodo
const deleteTodo = (event) => {
  const selectTodo = event.target.parentElement.parentElement;

  todoLists.removeChild(selectTodo);
  itmDeleteNotification();

  let todosid = todoLocalstorage();
  todosid = todosid.filter((todo) => todo.todoId != selectTodo.id);
  localStorage.setItem("myTodo", JSON.stringify(todosid));
};

const todoLocalstorage = () => {
  return localStorage.getItem("myTodo")
    ? JSON.parse(localStorage.getItem("myTodo"))
    : [];
};

const todoInputShow = (event) => {
  event.preventDefault();
  const itmValue = todoInput.value;

  // unit id
  const todoId = Date.now().toString();
  todoAdditm(itmValue, todoId);
  itmAddNotification();

  // add todo locatstorage
  const addTodoLocalstorage = todoLocalstorage();
  addTodoLocalstorage.push({ itmValue, todoId });
  localStorage.setItem("myTodo", JSON.stringify(addTodoLocalstorage));
  todoInput.value = "";

  // delete todo
};

// loadTotod

const loadTotod = () => {
  const todos = todoLocalstorage();
  todos.map((todo) => todoAdditm(todo.itmValue, todo.todoId));
};

// addEventListener
todoForm.addEventListener("submit", todoInputShow);
window.addEventListener("DOMContentLoaded", loadTotod);
