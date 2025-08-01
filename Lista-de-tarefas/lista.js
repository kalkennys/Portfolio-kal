// ======================
// 1. Referências do DOM
// ======================
const form = document.getElementById('add-task-form');
const input = document.getElementById('new-task');
const taskList = document.getElementById('task-list');
const emptyState = document.getElementById('empty-state');

// ======================
// 2. Carregar Tarefas do localStorage
// ======================
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// ======================
// 3. Modo Escuro
// ======================
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  body.classList.add('dark-mode');
  themeToggle.textContent = '☀️ Modo Claro';
}

themeToggle.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
  if (body.classList.contains('dark-mode')) {
    localStorage.setItem('theme', 'dark');
    themeToggle.textContent = '☀️ Modo Claro';
  } else {
    localStorage.setItem('theme', 'light');
    themeToggle.textContent = '🌓 Modo Escuro';
  }
});

// ======================
// 4. Renderizar Tarefas
// ======================
function renderTasks() {
  taskList.innerHTML = '';
  if (tasks.length === 0) {
    emptyState.classList.remove('hidden');
    return;
  }
  emptyState.classList.add('hidden');

  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.classList.add('task-item');
    if (task.completed) li.classList.add('completed');

    li.innerHTML = `
      <span class="task-text">${task.text}</span>
      <div class="task-actions">
        <button class="btn-complete">${task.completed ? 'Desfazer' : 'Concluir'}</button>
        <button class="btn-delete">Excluir</button>
      </div>
    `;

    // Botão de concluir
    li.querySelector('.btn-complete').addEventListener('click', () => {
      toggleTask(index);
    });

    // Botão de excluir
    li.querySelector('.btn-delete').addEventListener('click', () => {
      deleteTask(index);
    });

    taskList.appendChild(li);
  });
}

// ======================
// 5. Adicionar Nova Tarefa
// ======================
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (text === '') return;

  tasks.push({
    text,
    completed: false
  });

  saveToStorage();
  renderTasks();
  input.value = '';
});

// ======================
// 6. Concluir/Desfazer Tarefa
// ======================
function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  saveToStorage();
  renderTasks();
}

// ======================
// 7. Excluir Tarefa
// ======================
function deleteTask(index) {
  tasks.splice(index, 1);
  saveToStorage();
  renderTasks();
}

// ======================
// 8. Salvar no localStorage
// ======================
function saveToStorage() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// ======================
// 9. Iniciar ao carregar
// ======================
renderTasks();