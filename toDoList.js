/**
 * get value 
 * render to do list
 * save database
 */

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const input = $('.body__input');
const listTask = $('.body__list');
const addBtn = $('.body__submit');

const items = [];


function saveItem(element) {
    items.push(element.outerHTML);
}

function render(value) {
    const html = `   
        <div class="item__check-btn"
            style="background-image: url(./assets/icon/uncheck.png);"
        ></div>
        <p class="item__content">${value}</p>
        <img src="./assets/icon/close.png" alt="" class="item__close-icon">
       
    `
    let li = document.createElement("li");
    li.classList.add('item');  
    li.innerHTML = html;
    saveItem(li);
    listTask.appendChild(li);
}

// handle events
addBtn.onclick = function() {
    if(input.value === "") {
        alert('You must write something!');
    } else {
        render(input.value)    
    }
    input.value = '';
    saveData();
}

input.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        addBtn.onclick();
    }
  });

listTask.addEventListener('click', function(e) {
    const itemElement = e.target.closest(".item");
    if(!e.target.matches(".item__close-icon")) {
        itemElement.classList.toggle('checked');   
    } else  {
        itemElement.remove();
    }
    saveData(); 
}) 

// Save at localStorage

function saveData() {
    localStorage.setItem("data", listTask.innerHTML);
}

function showTask() {
    listTask.innerHTML = localStorage.getItem("data");
}
showTask();


   
    
    


