import { Save, Trash2, X } from "lucide-react";
import { useEffect, useState } from "react";
import Dropdown from "./Dropdown";
import axios from "axios";
import { toast } from "react-toastify";

const TaskEditModal = ({
  task,
  isOpen,
  onClose,
  onDelete,
  status,
  priority,
  onSave,
}) => {
  const [editedTask, setEditedTask] = useState(task || {});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedTask({
      ...editedTask,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
     onSave(editedTask)
  };


  useEffect(() => {
    setEditedTask(task);
  }, [task]);


  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 -z-10 transition-opacity"
          aria-hidden="true"
        >
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div className="inline-block align-bottom z-50 bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
          <div className="absolute top-0 right-0 pt-4 pr-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
            >
              <span className="sr-only">Close</span>
              <X size={20} />
            </button>
          </div>

          <div className="sm:flex sm:items-start">
            <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                {task._id ? "Edit Task" : "Create New Task"}
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    value={editedTask.title}
                    onChange={handleChange}
                    className="pl-3 pr-10 py-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md outline-none"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows="3"
                    value={editedTask.description}
                    onChange={handleChange}
                    className="pl-3 pr-10 py-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md outline-none"
                  ></textarea>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Dropdown
                    name="priority"
                    options={priority}
                    value={editedTask.priority}
                    onChange={(name, value) =>
                      setEditedTask({ ...editedTask, [name]: value })
                    }
                  />

                  <Dropdown
                    name="status"
                    options={status}
                    value={editedTask.status}
                    onChange={(name, value) =>
                      setEditedTask({ ...editedTask, [name]: value })
                    }
                  />
                </div>

                <div>
                  <label
                    htmlFor="dueDate"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Due Date
                  </label>
                  <input
                    type="date"
                    name="dueDate"
                    id="dueDate"
                    value={editedTask.dueDate}
                    onChange={handleChange}
                    className="pl-3 pr-10 py-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md outline-none"
                  />
                </div>


                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse gap-3">
                  <button
                    type="submit"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm outline-none"
                    onSubmit={handleSubmit}
                  >
                    <Save size={16} className="mr-2" /> Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm outline-none"
                  >
                    Cancel
                  </button>
                  {task._id && (
                    <button
                      type="button"
                      onClick={() => onDelete(task._id)}
                      className="mt-3 w-full inline-flex justify-center rounded-md border border-red-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-red-700 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:mt-0 sm:w-auto sm:text-sm outline-none"
                    >
                      <Trash2 size={16} className="mr-2" /> Delete
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskEditModal;
