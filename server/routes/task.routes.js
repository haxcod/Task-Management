const TaskController = require('../controllers/task.controller');


const routes = (data) => {
    data.get('/api/v1/tasks', TaskController.retrieveTaskResponse);
    data.post('/api/v1/tasks', TaskController.createTaskResponse);
    data.patch('/api/v1/tasks', TaskController.updateTaskResponse);
    data.delete('/api/v1/tasks', TaskController.deleteTaskResponse);
}

module.exports = routes