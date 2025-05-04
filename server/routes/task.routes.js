const TaskController = require('../controllers/task.controller');


const routes = (data) => {
    data.get('/api/vi/tasks', TaskController.retrieveTaskResponse);
    data.post('/api/vi/tasks', TaskController.createTaskResponse);
    data.patch('/api/vi/tasks', TaskController.updateTaskResponse);
    data.delete('/api/vi/tasks', TaskController.deleteTaskResponse);
}

module.exports = routes