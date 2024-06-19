import axios from 'axios';
import './style.css';

// VARIABLES
loadListeners();

// LISTENERS
function loadListeners() {
  document.addEventListener('DOMContentLoaded', readTasks);
  document.getElementById('task-form').addEventListener('submit', createTask);
}

// FUNCTIONS
async function readTasks() {
  const { data } = await axios.get('/api/tasks');
  const tbody = document.querySelector('#tasks-table tbody');
  tbody.innerHTML = '';
  data.forEach(task => {
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
}

async function createTask(event) {
  event.preventDefault();
  const title = document.getElementById('task-title').value;
  const author = document.getElementById('task-author').value;


  const taskToCreate = { title, author };
  const { data } = await axios.post('/api/tasks', taskToCreate);
  document.getElementById('task-form').reset();
  readTasks();
}

async function deleteTask(event) {
  const idToTaskDelete = event.target.getAttribute('data-id');
  await axios.delete(`/api/tasks?id=${idToTaskDelete}`);
  readTasks();
}
