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

const retrieveTasks = async ({ status, priority, dueBefore } = {}) => {
    try {
        const filter = {};

        // Apply filters from query params
        if (status) filter.status = status;
        if (priority) filter.priority = priority;
        if (dueBefore) filter.dueDate = { $lte: new Date(dueBefore) };

        const tasks = await Task.find(filter);
        return tasks;
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

const deleteTask = async (id) => {
    try {
        const deletedTask = await Task.findByIdAndDelete(id);
        return deletedTask;
    } catch (err) {
        console.error(`Error in deleteTask for ID ${id}:`, err);
        throw err;
    }
};

module.exports = { createTask, retrieveTasks, updateTask, deleteTask };
