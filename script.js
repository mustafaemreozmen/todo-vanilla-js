const constants = {
    NOT_DONE: 'Not Done',
    DONE: 'Done',
    NOT_DONE_TODOS: 'NOT_DONE_TODOS',
    DONE_TODOS: 'DONE_TODOS'
}

const toDoInput = document.querySelector('#txtToDo');
const toDoSubmitButton = document.querySelector('#btn-todo-submit');
const toDoContainer = document.querySelector('#todo-container');
const toDoNotDoneSection = document.querySelector('#not-done-todos');
const toDoDoneSection = document.querySelector('#done-todos');
const btnToDoSave = document.querySelector('#btn-todo-save');


window.onload = loadLocalStorage;

btnToDoSave.addEventListener('click', saveButtonClicked);
toDoSubmitButton.addEventListener('click', (e) => {
    e.preventDefault();
    addNewTodoItem(toDoInput.value, toDoNotDoneSection);
});

function loadLocalStorage() {
    const savedNotDoneList = JSON.parse(localStorage.getItem(constants.NOT_DONE_TODOS));
    const savedDoneList = JSON.parse(localStorage.getItem(constants.DONE_TODOS));

    if (savedNotDoneList) {
        for (let item of savedNotDoneList)
            addNewTodoItem(item, toDoNotDoneSection);
    }

    if (savedDoneList) {
        for (let item of savedDoneList)
            addNewTodoItem(item, toDoDoneSection);
    }
}

function saveButtonClicked(e) {
    const savedNotDoneList = [];
    const savedDoneList = [];

    for (let i = 1; i < toDoDoneSection.childElementCount; i++) {
        if(toDoDoneSection.childElementCount != 0)
            savedDoneList.push(toDoDoneSection.children[i].firstChild.children[1].innerHTML);
    }
    localStorage.setItem(constants.DONE_TODOS, JSON.stringify(savedDoneList));

    for (let i = 1; i < toDoNotDoneSection.childElementCount; i++) {
        if(toDoNotDoneSection.childElementCount != 0)
            savedNotDoneList.push(toDoNotDoneSection.children[i]?.firstChild.children[1].innerHTML);
    }
    localStorage.setItem(constants.NOT_DONE_TODOS, JSON.stringify(savedNotDoneList));
}

function moveToDoCart(e) {
    if (e.target.parentNode.parentNode.parentNode.parentNode.children[0].innerHTML == constants.NOT_DONE) {
        addNewTodoItem(e.target.parentNode.parentNode.children[1].innerHTML, toDoDoneSection);
        e.target.parentNode.parentNode.parentNode.remove();

    }
    else if (e.target.parentNode.parentNode.parentNode.parentNode.children[0].innerHTML == constants.DONE) {
        addNewTodoItem(e.target.parentNode.parentNode.children[1].innerHTML, toDoNotDoneSection);
        e.target.parentNode.parentNode.parentNode.remove();
    }
}

function deleteToDoCart(e) {
    if (confirm('Are you sure for delete that?')) {
        e.target.parentNode.parentNode.parentNode.remove();
    }
}

function addNewTodoItem(toDoText, addTo) {
    const colDiv = document.createElement('div');
    colDiv.classList.add('col-4');
    colDiv.classList.add('mt-3');
    colDiv.classList.add('mb-3');
    colDiv.classList.add('todo-item');

    const newToDoCartDiv = document.createElement('div');
    newToDoCartDiv.className = 'card';

    const newToDoHeaderDiv = document.createElement('div');
    newToDoHeaderDiv.className = 'card-header';

    const newToDoBodyDiv = document.createElement('div');
    newToDoBodyDiv.className = 'card-body';

    const newToDoFooterDiv = document.createElement('div');
    newToDoFooterDiv.className = 'card-footer';

    const deleteButton = document.createElement('i');
    deleteButton.classList.add('fas');
    deleteButton.classList.add('fa-trash-alt');
    deleteButton.classList.add('delete-button');
    deleteButton.style.marginLeft = '10px';
    deleteButton.style.float = 'right';

    const moveButton = document.createElement('i');
    moveButton.classList.add('fas');
    moveButton.classList.add('fa-expand-arrows-alt');
    moveButton.classList.add('move-button');
    moveButton.style.marginLeft = '10px';
    moveButton.style.float = 'right';

    newToDoFooterDiv.appendChild(deleteButton);
    newToDoFooterDiv.appendChild(moveButton);

    deleteButton.addEventListener('click', deleteToDoCart);
    moveButton.addEventListener('click', moveToDoCart);

    newToDoCartDiv.appendChild(newToDoHeaderDiv);
    newToDoCartDiv.appendChild(newToDoBodyDiv);
    newToDoCartDiv.appendChild(newToDoFooterDiv);
    colDiv.appendChild(newToDoCartDiv);
    newToDoBodyDiv.innerHTML = toDoText;

    addTo.appendChild(colDiv);
}
