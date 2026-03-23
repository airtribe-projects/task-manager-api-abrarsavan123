const express = require('express');
const app = express();
const port = 3000;

// Load seed data from task.json as in-memory store
let tasks = require('./task.json').tasks;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Validation helper
function validateTask(body) {
    const { title, description, completed } = body;
    if (
        typeof title !== 'string' ||
        typeof description !== 'string' ||
        typeof completed !== 'boolean'
    ) {
        return false;
    }
    return true;
}

// GET /tasks - Retrieve all tasks
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

// GET /tasks/:id - Retrieve a single task by id
app.get('/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const task = tasks.find((t) => t.id === id);
    if (!task) {
        return res.status(404).json({ error: 'Task not found' });
    }
    res.json(task);
});

// POST /tasks - Create a new task
app.post('/tasks', (req, res) => {
    if (!validateTask(req.body)) {
        return res.status(400).json({ error: 'Invalid task data. title (string), description (string), and completed (boolean) are required.' });
    }
    const newTask = {
        id: tasks.length > 0 ? Math.max(...tasks.map((t) => t.id)) + 1 : 1,
        title: req.body.title,
        description: req.body.description,
        completed: req.body.completed,
    };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

// PUT /tasks/:id - Update an existing task
app.put('/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const taskIndex = tasks.findIndex((t) => t.id === id);
    if (taskIndex === -1) {
        return res.status(404).json({ error: 'Task not found' });
    }
    if (!validateTask(req.body)) {
        return res.status(400).json({ error: 'Invalid task data. title (string), description (string), and completed (boolean) are required.' });
    }
    tasks[taskIndex] = {
        id,
        title: req.body.title,
        description: req.body.description,
        completed: req.body.completed,
    };
    res.json(tasks[taskIndex]);
});

// DELETE /tasks/:id - Delete a task
app.delete('/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const taskIndex = tasks.findIndex((t) => t.id === id);
    if (taskIndex === -1) {
        return res.status(404).json({ error: 'Task not found' });
    }
    const deleted = tasks.splice(taskIndex, 1);
    res.json(deleted[0]);
});

app.listen(port, (err) => {
    if (err) {
        return console.log('Something bad happened', err);
    }
    console.log(`Server is listening on ${port}`);
});

module.exports = app;