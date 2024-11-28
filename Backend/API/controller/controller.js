const { v4: uuidv4 } = require('uuid');

let tasks = [];

// [GET] Retorna todas as tarefas
const getAllTasks = (req, res) => {
  res.json(tasks);
};


// [POST] Cria uma nova tarefa
const createTask = (req, res) => {
  const { titulo, descricao } = req.body;

  if (!titulo || !descricao) {
    return res.status(400).json({ message: 'titulo and descricao are required' });
  }

  const newTask = {
    id: uuidv4(),
    titulo,
    descricao,
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
};

// [PUT] Atualiza uma tarefa pelo ID
const updateTask = (req, res) => {
  const { id } = req.params;
  const { titulo, descricao } = req.body;

  const taskIndex = tasks.findIndex((t) => t.id === id);

  if (taskIndex === -1) {
    return res.status(404).json({ message: 'Task not found' });
  }

  tasks[taskIndex] = {
    ...tasks[taskIndex],
    titulo: titulo || tasks[taskIndex].titulo,
    descricao: descricao || tasks[taskIndex].descricao,
  };

  res.json(tasks[taskIndex]);
};

// [DELETE] Remove uma tarefa pelo ID
const deleteTask = (req, res) => {
  const { id } = req.params;

  const taskIndex = tasks.findIndex((t) => t.id === id);

  if (taskIndex === -1) {
    return res.status(404).json({ message: 'Task not found' });
  }

  tasks.splice(taskIndex, 1);
  res.status(204).send();
};

module.exports = {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
};