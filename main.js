import axios from 'axios';

const JSONBIN_URL = 'https://api.jsonbin.io/v3/b/6672da4cacd3cb34a859d109';
const SECRET_KEY = '$2a$10$SBr5PzXiwwXHafVuv7x4Duddw9bppVFfXpOU/GG3EyEYtUBwrEM6C';

// Configuración global de Axios para manejar CORS
axios.defaults.baseURL = '/api';
axios.defaults.headers.common['X-Master-Key'] = SECRET_KEY;

// VARIABLES
loadListeners();

// LISTENERS
function loadListeners() {
  document.addEventListener('DOMContentLoaded', readTasks);
  document.getElementById('task-form').addEventListener('submit', createTask);
}

// FUNCTIONS
async function readTasks() {
  try {
    const { data } = await axios.get(`${JSONBIN_URL}/record`, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const tbody = document.querySelector('#tasks-table tbody');
    tbody.innerHTML = '';

    data.record.task.forEach(task => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${task.title}</td>
        <td>${task.author}</td>
        <td><button data-id="${task.id}">Delete</button></td>
      `;
      tbody.appendChild(row);
    });

    document.querySelectorAll('button[data-id]').forEach(button => {
      button.addEventListener('click', deleteTask);
    });
  } catch (error) {
    console.error('Error al leer las tareas:', error);
  }
}

async function createTask(event) {
  event.preventDefault();
  const title = document.getElementById('task-title').value;
  const author = document.getElementById('task-author').value;

  const taskToCreate = { title, author };

  try {
    await axios.post(`${JSONBIN_URL}/record`, taskToCreate, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    document.getElementById('task-form').reset();
    readTasks();
  } catch (error) {
    console.error('Error al crear la tarea:', error);
  }
}

async function deleteTask(event) {
  const idToTaskDelete = event.target.getAttribute('data-id');

  try {
    await axios.delete(`${JSONBIN_URL}/record/${idToTaskDelete}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    readTasks();
  } catch (error) {
    console.error('Error al eliminar la tarea:', error);
  }
}
