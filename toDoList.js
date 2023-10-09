/**
 * get value 
 * render to do list
 * save database
 */

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const ToDoList_STORAGE_KEY = 'To_Do_List';

const input = $('.body__input');
const listTask = $('.body__list');
const btn = $('.body__submit');

render(getTaskFromLocalStorage());

btn.addEventListener('click', function() {
    const taskId = this.getAttribute('id');
    let tasks = getTaskFromLocalStorage();
    const valueInput = {name: input.value};

    if(!input.value) {
        alert("Please write something !!");
        return false;
    } 
    if(this.hasAttribute("id")) {
        tasks[taskId] = valueInput;
        this.removeAttribute('id');
        this.innerText = "Add";
    } else {
        tasks.push(valueInput);
    }
    saveTaskintoLocalStorage(tasks);  
    input.value = '';
    render(tasks);
})

input.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    btn.click();
  }
});


function render(tasks = []) {
    let html = tasks.map((task, index) => {
        return `
        <li class="item " >
            <div class="item__check-btn"
                style="background-image: url(./assets/icon/uncheck.png);"
                onclick="checkTask(${index})"
            ></div>
            <p class="item__content">${task.name}</p>         
            <img src="./assets/icon/pen.png" alt="" class="item__edit-icon" onclick="editTask(${index})">                 
            <img src="./assets/icon/close.png" alt="" class="item__close-icon" onclick="removeTask(${index})">                       
        </li>
        `
    })
    listTask.innerHTML = html.join(' ');
}

function getTaskFromLocalStorage() {
    const getItemLS = localStorage.getItem(ToDoList_STORAGE_KEY)
    return getItemLS ? JSON.parse(getItemLS) : [];
}

function saveTaskintoLocalStorage(tasks) {
    localStorage.setItem(ToDoList_STORAGE_KEY, JSON.stringify(tasks))
}

function editTask(id) {
    const tasks = getTaskFromLocalStorage();
    if(tasks.length > 0) {
        input.value = tasks[id].name;
        btn.setAttribute("id", id);
        btn.innerText = "Edit";
    }
}

function removeTask(id) {
    if(confirm("Do you want to remove?")) {
        const tasks = getTaskFromLocalStorage();
        tasks.splice(id, 1);
        saveTaskintoLocalStorage(tasks);
        render(getTaskFromLocalStorage());
    }
}

function checkTask(id) {
    const childrenOfListTask = Array.from(listTask.children);
    childrenOfListTask[id].classList.toggle('checked');  
}






   
    
    


