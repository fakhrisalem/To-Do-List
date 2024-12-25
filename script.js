 let tasks = [];

    const taskForm = document.getElementById('taskForm');
    const taskInput = document.getElementById('taskInput');
    const todoList = document.getElementById('todoList');
    const finishedList = document.getElementById('finishedList');

    function createTask(content) {
      const task = {
        content: content,
        finished: false
      };

      tasks.push(task);
      renderTasks();
    }

    function editTask(index, newContent) {
      tasks[index].content = newContent;
      renderTasks();
    }

    function deleteTask(index) {
      tasks.splice(index, 1);
      renderTasks();
    }

    function toggleTask(index) {
      tasks[index].finished = !tasks[index].finished;
      renderTasks();
    }

    function renderTasks() {
      todoList.innerHTML = '';
      finishedList.innerHTML = '';

      tasks.forEach((task, index) => {
        const taskItem = document.createElement('div');
        taskItem.classList.add('task');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.finished;

        const taskContent = document.createElement('span');
        taskContent.innerText = task.content;

        const editButton = document.createElement('button');
        editButton.innerText = 'Edit';
        editButton.className = 'edit';
        editButton.addEventListener('click', () => {
          const newContent = prompt('Enter the new content:', task.content);
          if (newContent !== null) {
            editTask(index, newContent.trim());
          }
        });

        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'Delete';
        deleteButton.className = 'delete';
        deleteButton.addEventListener('click', () => {
          deleteTask(index);
        });

        checkbox.addEventListener('change', () => {
          toggleTask(index);
        });

        taskItem.appendChild(checkbox);
        taskItem.appendChild(taskContent);
        taskItem.appendChild(editButton);
        taskItem.appendChild(deleteButton);

        if (task.finished) {
          finishedList.appendChild(taskItem);
        } else {
          todoList.appendChild(taskItem);
        }
      });
    }

    taskForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const taskContent = taskInput.value.trim();
      if (taskContent !== '') {
        createTask(taskContent);
        taskInput.value = '';
      }
    });

    renderTasks();