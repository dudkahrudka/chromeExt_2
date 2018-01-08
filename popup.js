// how to check content of chrome.storage:

// chrome.storage.sync.get(null, function (data) { console.info(data) });

window.onload = ()=> {
    let btnAdd = document.querySelector('#btn-add')
    let newTodo = document.querySelector('#new-todo')
    btnAdd.addEventListener('click',  ()=> {
        addNewTodo()
    })
    newTodo.addEventListener('keypress', function (e) {
        var key = e.which || e.keyCode;
        if (key === 13) { 
            addNewTodo()
        }
    });
    loadTodoList() 
}

function addNewTodo() {
    let newTodo = document.querySelector('#new-todo').value
   
    if (newTodo.trim() !== '') {
        appendLi(newTodo)
    } else {
       alert('New todo field is empty')
    }
    saveTodoList()
    document.querySelector('#new-todo').value = ''
}

function saveTodoList() {
    let todoList = []
    let nodeList = document.getElementById('todo-list').childNodes

    for (i = 0; i < nodeList.length; i++) {
        let todoObj = {}
        todoObj.text = nodeList[i].childNodes[0].data
        todoList.push(todoObj)
    }

    chrome.storage.sync.set({'todos': todoList}, function() {
      });
}

function loadTodoList() {
    chrome.storage.sync.get('todos', function (res) {
        for (i = 0; i < res.todos.length; i++) {
            appendLi(res.todos[i].text)
        }
    });
}

function appendLi(text) {
    let newListItem = document.createElement('li')
    let closeBtn = document.createElement('button')
    let todoList = document.querySelector('#todo-list')

    newListItem.appendChild(document.createTextNode(text))

    // closeBtn.appendChild(document.createTextNode('X'))
    closeBtn.setAttribute("id", "close-btn");

    newListItem.appendChild(closeBtn) 
    closeBtn.addEventListener('click', (event)=>{
        deleteTodo(event)
    })

    todoList.appendChild(newListItem)
}

function deleteTodo(event) {
    let li = event.target.parentNode
    let list = li.parentNode
    list.removeChild(li)
    saveTodoList()
}


