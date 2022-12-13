// Tum elementleri secme
const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearButton = document.querySelector("#clear-todos");

eventListeners();

function eventListeners(){ // Tum event listenerlar
    form.addEventListener("submit", addTodo);
    document.addEventListener("DOMContentLoaded", loadAllTodosToUI);
    secondCardBody.addEventListener("click", deleteTodo);
    filter.addEventListener("keydown", filterTodos);
    clearButton.addEventListener("click", clearAllTodos);
}

function clearAllTodos(e){
    if (confirm("tumunu silmek istediginize emin misiniz? ")) {
        // Arayuzden todolari temizleme
        // todoList.innerHTML = ""; //yavas
        while(todoList.firstChild != null){
            todoList.removeChild(todoList.firstElementChild);
        }
        localStorage.removeItem("todos");
        

    }
}

function filterTodos(e){
    const filterValue = e.target.value.toLowerCase();
    const listItems = document.querySelectorAll(".list-group-item");

    listItems.forEach(function(listItem){
        const text = listItem.textContent.toLowerCase();
        if (text.indexOf(filterValue) === -1){
            // Bulamadi
            listItem.setAttribute("style", "display : none !important");
        }
        else {
            listItem.setAttribute("style", "display: block");
        }
    });

}

function deleteTodo(e){
    if (e.target.className === "fa fa-remove"){
        e.target.parentElement.parentElement.remove();
        deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
        showAlert("success", "todo basariyla silindi");
    }
}
function deleteTodoFromStorage(deleteTodo){
    let todos = getTodosFromStorage();
    todos.forEach(function(todo,index){
        if (todo === deleteTodo){
            todos.splice(index,1); //arrayden degeri silebiliriz
        }
    });
    localStorage.setItem("todos", JSON.stringify(todos));
}
function loadAllTodosToUI(){
    let todos = getTodosFromStorage();
    todos.forEach(function(todo){
        addTodoToUI(todo); 
    })
    
}

function addTodo(e){
    const newTodo = todoInput.value.trim();
    if (newTodo === ""){
        // <div class="alert alert-danger" role="alert">
        // This is a danger alert—check it out!
        // </div>
        showAlert("danger", "Lutfen bir todo girin");
    }
    else {
        addTodoToUI(newTodo);
        addTodoStorage(newTodo);
        showAlert("success", "todo basariyla eklendi")
    }
    e.preventDefault();
}

function getTodosFromStorage(){ // Storagedan Todolari Alma
    let todos; 
    if (localStorage.getItem("todos")===null){
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos;
}

function addTodoStorage(newTodo){
    let todos = getTodosFromStorage();
    todos.push(newTodo);
    localStorage.setItem("todos", JSON.stringify(todos));

}

function showAlert(type, message){
    const alert = document.createElement("div");
    alert.className = `alert alert-${type}`;
    alert.textContent = message;
    firstCardBody.appendChild(alert);
    // setTimeout
    setTimeout(function(){
        alert.remove();
    }, 1000);
}

function addTodoToUI(newTodo){ // String degerini list item olarak UI'ya ekleyecek
    // List item olusturma
    const listItem = document.createElement("li");
    // Link olusturma
    const link = document.createElement("a");
    link.href = "#";
    link.className = "delete-item";
    link.innerHTML = "<i class = 'fa fa-remove'></i>";
    listItem.className = "list-group-item d-flex justify-content-between";
    // Text Node Ekleme
    listItem.appendChild(document.createTextNode(newTodo));
    listItem.appendChild(link);
    // Todo List'e List Item'i ekleme
    todoList.appendChild(listItem);
    todoInput.value = "";   
}