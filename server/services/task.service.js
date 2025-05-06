const Task = require('../models/task.model');

const createTask = async (data) => {
    try {
        const task = await Task.create(data);
        return task;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

const retrieveTasks = async ({ status, priority, dueBefore, userId } = {}) => {
    try {
        const filter = {};
        const now = new Date();
        // console.log(priority, status, dueBefore, userId);   
        
        // Apply filters from query params
        if (status) filter.status = status;
        if (priority) filter.priority = priority;
        if (dueBefore) filter.dueDate = { $lte: new Date(dueBefore) };
        
        const [allTasks, assignedToYou, createdByYou, overdueTasks] = await Promise.all([
            Task.find({
                $or: [
                    { assignedTo: userId },
                    { createdBy: userId }
                ]
            }),
            Task.find({ ...filter, assignedTo: userId }),
            Task.find({ ...filter, createdBy: userId }),
            Task.find({
                ...filter,
                dueDate: { $lt: now },
                status: { $ne: 'completed' },
                $or: [
                    { assignedTo: userId },
                    { createdBy: userId }
                ]
            })
        ]);

        return {
            allTasks,
            assignedToYou,
            createdByYou,
            overdueTasks
        };
    } catch (err) {
        console.error(err);
        throw err;
    }
};

const updateTask = async (id, updateData) => {
    try {
        const updatedTask = await Task.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
        return updatedTask;
    } catch (err) {
        console.error(`Error in updateTask for ID ${id}:`, err);
        throw err;
    }
};

const deleteTask = async (taskId) => {
    try {
        const deletedTask = await Task.findByIdAndDelete(taskId);
        return deletedTask;
    } catch (err) {
        console.error(`Error in deleteTask for ID ${taskId}:`, err);
        throw err;
    }
};

module.exports = { createTask, retrieveTasks, updateTask, deleteTask };
