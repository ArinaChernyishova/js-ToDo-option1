const dom = {
    new: document.getElementById('new'),
    add: document.getElementById('add'),
    tasks: document.getElementById('tasks'),
    count: document.getElementById('count'),
}
// Массив задач:
const tasks = [];

// Отслеживаем клик по кнопке Добавить задачу:
dom.add.onclick = () => {
    const newTaskText = dom.new.value;
    if(newTaskText && isNotHaveTask(newTaskText, tasks)) {
        addTask(newTaskText, tasks)
        dom.new.value = ''
        tasksRender(tasks)
    }
}

// Функция добавления задач:
function addTask(text, list) {
    const timeStamp = Date.now()
    const task = {
        id: timeStamp,
        text,
        isComplete: false
    }
    list.push(task)
}

// Проверка существования задачи в массиве задач:
function isNotHaveTask(text, list) {
    let isNotHave = true;

    list.forEach((task) => {
        if(task.text === text) {
            alert('Задача уже существует!')
            isNotHave = false
        }
    })

        return isNotHave
}

// Функция вывода списка задач:
function tasksRender(list) {
    let htmlList = ''

    list.forEach((task) => {
        const cls = task.isComplete 
            ? 'todo_task todo_task-complate' 
            : 'todo_task'
            const checked = task.isComplete ? 'checked' : ''

        const taskHtmlk = `
        <div id="${task.id}" class="${cls}">
            <label class="todo__checkbox">
                <input type="checkbox" ${checked}>
                <div class="todo__checkbox-div"></div>
        </label>
        <div class="todo__task-text">${task.text}.</div>
        <div class="todo__tasl-del">-</div>
    </div>
        `

        htmlList = htmlList + taskHtmlk
    })

    dom.tasks.innerHTML = htmlList
    renderTasksCount(list)
}

// Отслеживаем клик по чекбоксу задачи:
dom.tasks.onclick = (event) => {
    const target = event.target
    const isCheckboxEl = target.classList.contains('todo__checkbox-div')
    const isDeleteEl = target.classList.contains('todo__tasl-del')

    if (isCheckboxEl) {
        const task = target.parentElement.parentElement
        const taskId = task.getAttribute('id')
        changeTaskStatus(taskId, tasks)
        tasksRender(tasks)
    }
    if(isDeleteEl) {
        const task = target.parentElement
        const taskId = task.getAttribute('id')
        deleteTask(taskId, tasks)
        tasksRender(tasks)
    }
}

// Функция изменения стутуса задачи:
function changeTaskStatus(id, list) {
    list.forEach((task) => {
        if(task.id == id) {
            task.isComplete = !task.isComplete
        }
    })
}

// Функция удаления задачи:
function deleteTask(id, list) {
    list.forEach((task, idx) => {
        if(task.id == id) {
            list.splice(idx, 1)
        }
    })
}

// Функция вывода количества задач:
function renderTasksCount(list) {
    dom.count.innerHTML = list.length
}