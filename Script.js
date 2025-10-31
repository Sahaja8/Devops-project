document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskTitle = document.getElementById('task-title');
    const taskPriority = document.getElementById('task-priority');
    const taskList = document.getElementById('task-list');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const taskElement = document.createElement('div');
            taskElement.className = task ${task.done ? 'done' : ''};

            taskElement.innerHTML = `
                <input type="checkbox" ${task.done ? 'checked' : ''} data-index="${index}">
                <span class="title">${task.title}</span>
                <span class="priority ${task.priority}">${task.priority}</span>
                <button class="delete" data-index="${index}">Delete</button>
            `;

            taskList.appendChild(taskElement);
        });
    }

    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = taskTitle.value.trim();
        const priority = taskPriority.value;
        if (title) {
            tasks.push({ title, priority, done: false });
            saveTasks();
            renderTasks();
            taskTitle.value = '';
        }
    });

    taskList.addEventListener('change', (e) => {
        if (e.target.type === 'checkbox') {
            const index = e.target.dataset.index;
            tasks[index].done = e.target.checked;
            saveTasks();
            renderTasks();
        }
    });

    taskList.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete')) {
            const index = e.target.dataset.index;
            tasks.splice(index, 1);
            saveTasks();
            renderTasks();
        }
    });

    renderTasks();
});
