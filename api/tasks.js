// Ejemplo utilizando Express.js (serverless)
import { v4 as uuidv4 } from 'uuid';

let tasks = [
  { id: '956f', title: 'Hacer las compras de la semana', author: 'Miguel' },
  { id: 'deee', title: 'Terminar los pendientes', author: 'Felipe' },
  { id: 'a6a6', title: 'Terminar las tareas', author: 'Daniel' }
];

export default function handler(req, res) {
  if (req.method === 'GET') {
    res.status(200).json(tasks);
  } else if (req.method === 'POST') {
    const newTask = { id: uuidv4(), ...req.body };
    tasks.push(newTask);
    res.status(201).json(newTask);
  } else if (req.method === 'DELETE') {
    const { id } = req.query;
    tasks = tasks.filter(task => task.id !== id);
    res.status(204).end();
  } else {
    res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
