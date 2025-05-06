const {
    createTask,
    retrieveTasks,
    updateTask,
    deleteTask
} = require('../services/task.service');

const createTaskResponse = async (req, res) => {
    try {
        const data = req.body;
        const response = await createTask(data);
        if (!response) {
            return res.status(400).json({ data: {}, err: "Failed to create task", success: false });
        }
        res.status(200).json({ data: response, err: {}, success: true });
    } catch (err) {
        console.error('Update Task Error:', err);
        res.status(400).json({ data: {}, err: err.message || err, success: false });
    }
}

const retrieveTaskResponse = async (req, res) => {
    try {
        const { status, priority, dueBefore, userId } = req.query;
        const tasks = await retrieveTasks({ status, priority, dueBefore, userId });
        if (!tasks || tasks.length === 0) {
            return res.status(404).json({ data: {}, err: "No tasks found", success: true });
        }
        res.status(200).json({ data: tasks, err: {}, success: true });
    } catch (err) {
        console.error('Update Task Error:', err);
        res.status(400).json({ data: {}, err: err.message || err, success: false });
    }

}

const updateTaskResponse = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        const updated = await updateTask(id, updateData);
        if (!updated) {
            return res.status(404).json({ data: {}, err: "Task not found", success: false });
        }
        res.status(200).json({ data: updated, err: {}, success: true });
    } catch (err) {
        console.error('Update Task Error:', err);
        res.status(400).json({ data: {}, err: err.message || err, success: false });
    }
}

const deleteTaskResponse = async (req, res) => {
    try {
        const { taskId } = req.query;
        
        const deleted = await deleteTask(taskId);
        res.status(200).json({ data: deleted, err: {}, success: true });
    } catch (err) {
        console.error('Delete Task Error:', err);
        res.status(400).json({ data: {}, err: err.message || err, success: false });
    }
}

module.exports = { createTaskResponse, retrieveTaskResponse, updateTaskResponse, deleteTaskResponse }