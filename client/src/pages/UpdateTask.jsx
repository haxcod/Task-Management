import { useState } from 'react';
import { Search, BarChart2, Bell, Menu, List, Users, Calendar, PieChart, Crown, Settings, Plus, Clock, CheckCircle, Loader, MoreVertical, X, Trash2, Edit, Save, ChevronDown } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const chartData = [
  { name: 'Mon', completed: 3, created: 5 },
  { name: 'Tue', completed: 5, created: 7 },
  { name: 'Wed', completed: 2, created: 4 },
  { name: 'Thu', completed: 4, created: 6 },
  { name: 'Fri', completed: 6, created: 8 },
  { name: 'Sat', completed: 8, created: 10 },
  { name: 'Sun', completed: 5, created: 7 },
];

const taskData = {
  assignedToYou: [
    {
      id: 1,
      title: 'Update user authentication system',
      description: 'Implement secure password hashing and JWT token authentication for the new user portal.',
      assignedBy: 'Sarah Parker',
      dueDate: '2025-05-05',
      priority: 'High',
      status: 'In Progress'
    },
    {
      id: 2,
      title: 'Create new dashboard components',
      description: 'Design and implement new analytics dashboard components for the admin panel.',
      assignedBy: 'James Wilson',
      dueDate: '2025-05-08',
      priority: 'Medium',
      status: 'Pending'
    }
  ],
  createdByYou: [
    {
      id: 3,
      title: 'Review team collaboration features',
      description: 'Test and review all team collaboration features before the next release.',
      assignedTo: 'Michael Brown',
      dueDate: '2025-05-10',
      priority: 'Medium',
      status: 'Pending'
    },
    {
      id: 4,
      title: 'Implement search functionality',
      description: 'Implement advanced search functionality with filtering options across the application.',
      assignedTo: 'Emily Davis',
      dueDate: '2025-05-07',
      priority: 'High',
      status: 'In Progress'
    }
  ],
  overdue: [
    {
      id: 5,
      title: 'Fix notification system bugs',
      description: 'Fix critical bugs in the notification system for task assignments and updates.',
      assignedTo: 'You',
      dueDate: '2025-04-30',
      overdueDays: 1,
      priority: 'High',
      status: 'Overdue'
    }
  ]
};

// Format date for display
const formatDisplayDate = (dateString) => {
  const date = new Date(dateString);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
};

// Priority Badge Component
const PriorityBadge = ({ priority }) => {
  const bgColors = {
    'High': 'bg-red-100 text-red-500',
    'Medium': 'bg-amber-100 text-amber-500',
    'Low': 'bg-green-100 text-green-500'
  };
  
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${bgColors[priority]}`}>
      {priority}
    </span>
  );
};

// Status Badge Component
const StatusBadge = ({ status }) => {
  const bgColors = {
    'Completed': 'bg-green-100 text-green-500',
    'In Progress': 'bg-blue-100 text-blue-500',
    'Pending': 'bg-gray-100 text-gray-500',
    'Overdue': 'bg-red-100 text-red-500'
  };
  
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${bgColors[status]}`}>
      {status}
    </span>
  );
};

// Dropdown Component
const Dropdown = ({ options, value, onChange, label, id }) => {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={onChange}
          className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
          <ChevronDown className="text-gray-400" size={16} />
        </div>
      </div>
    </div>
  );
};

// Task Edit Modal
const TaskEditModal = ({ task, isOpen, onClose, onSave, onDelete }) => {
  const [editedTask, setEditedTask] = useState(task);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedTask({
      ...editedTask,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(editedTask);
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        
        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
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
                {task.id ? 'Edit Task' : 'Create New Task'}
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    value={editedTask.title}
                    onChange={handleChange}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows="3"
                    value={editedTask.description}
                    onChange={handleChange}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  ></textarea>
                </div>
                
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Dropdown
                    id="priority"
                    label="Priority"
                    value={editedTask.priority}
                    onChange={(e) => handleChange(e)}
                    options={['High', 'Medium', 'Low']}
                  />
                  
                  <Dropdown
                    id="status"
                    label="Status"
                    value={editedTask.status}
                    onChange={(e) => handleChange(e)}
                    options={['Completed', 'In Progress', 'Pending', 'Overdue']}
                  />
                </div>
                
                <div>
                  <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-1">
                    Due Date
                  </label>
                  <input
                    type="date"
                    name="dueDate"
                    id="dueDate"
                    value={editedTask.dueDate}
                    onChange={handleChange}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
                
                {task.assignedTo && (
                  <div>
                    <label htmlFor="assignedTo" className="block text-sm font-medium text-gray-700 mb-1">
                      Assigned To
                    </label>
                    <input
                      type="text"
                      name="assignedTo"
                      id="assignedTo"
                      value={editedTask.assignedTo}
                      onChange={handleChange}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                )}
                
                {task.assignedBy && (
                  <div>
                    <label htmlFor="assignedBy" className="block text-sm font-medium text-gray-700 mb-1">
                      Assigned By
                    </label>
                    <input
                      type="text"
                      name="assignedBy"
                      id="assignedBy"
                      value={editedTask.assignedBy}
                      onChange={handleChange}
                    //   className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      readOnly
                      className="bg-gray-50 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                )}
                
                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    <Save size={16} className="mr-2" /> Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                  >
                    Cancel
                  </button>
                  {task.id && (
                    <button
                      type="button"
                      onClick={() => onDelete(task.id)}
                      className="mt-3 w-full inline-flex justify-center rounded-md border border-red-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-red-700 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:mt-0 sm:w-auto sm:text-sm"
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

// Delete Confirmation Modal
const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, taskTitle }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        
        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
          <div className="sm:flex sm:items-start">
            <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
              <Trash2 className="h-6 w-6 text-red-600" />
            </div>
            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Delete Task
              </h3>
              <div className="mt-2">
                <p className="text-sm text-gray-500">
                  Are you sure you want to delete "{taskTitle}"? This action cannot be undone.
                </p>
              </div>
            </div>
          </div>
          <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              onClick={onConfirm}
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Delete
            </button>
            <button
              type="button"
              onClick={onClose}
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Task Action Menu Component
const TaskActionMenu = ({ isOpen, onClose, onEdit, onDelete }) => {
  if (!isOpen) return null;
  
  return (
    <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
      <div className="py-1" role="menu" aria-orientation="vertical">
        <button
          onClick={onEdit}
          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
          role="menuitem"
        >
          <Edit size={16} className="mr-3" /> Edit Task
        </button>
        <button
          onClick={onDelete}
          className="w-full text-left px-4 py-2 text-sm text-red-700 hover:bg-gray-100 flex items-center"
          role="menuitem"
        >
          <Trash2 size={16} className="mr-3" /> Delete Task
        </button>
      </div>
    </div>
  );
};

// Task Card Component
const TaskCard = ({ task, isOverdue = false, onEdit, onDelete }) => {
  const [actionMenuOpen, setActionMenuOpen] = useState(false);
  
  return (
    <li>
      <div className={`px-6 py-4 flex items-center transition-all duration-200 hover:bg-gray-50 ${isOverdue ? 'border-l-4 border-red-500' : ''}`}>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-medium text-gray-800">{task.title}</h3>
              <div className="mt-1 flex items-center">
                {task.assignedBy ? (
                  <span className="text-sm text-gray-500">Assigned by {task.assignedBy} • </span>
                ) : (
                  <span className="text-sm text-gray-500">Assigned to {task.assignedTo} • </span>
                )}
                {isOverdue ? (
                  <span className="ml-1 text-sm text-red-500 font-medium">
                    Due {formatDisplayDate(task.dueDate)} ({task.overdueDays} day{task.overdueDays > 1 ? 's' : ''} overdue)
                  </span>
                ) : (
                  <span className="ml-1 text-sm text-gray-500">Due {formatDisplayDate(task.dueDate)}</span>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <PriorityBadge priority={task.priority} />
              <StatusBadge status={task.status} />
            </div>
          </div>
          <div className="mt-2">
            <p className="text-sm text-gray-600 line-clamp-2">{task.description}</p>
          </div>
        </div>
        <div className="ml-5 flex-shrink-0 relative">
          <button 
            className="p-1 rounded-full text-gray-400 hover:text-gray-500"
            onClick={() => setActionMenuOpen(!actionMenuOpen)}
          >
            <MoreVertical size={16} />
          </button>
          <TaskActionMenu 
            isOpen={actionMenuOpen}
            onClose={() => setActionMenuOpen(false)}
            onEdit={() => {
              setActionMenuOpen(false);
              onEdit(task);
            }}
            onDelete={() => {
              setActionMenuOpen(false);
              onDelete(task);
            }}
          />
        </div>
      </div>
    </li>
  );
};

// Task Section Component
const TaskSection = ({ title, tasks, isOverdue = false, onEditTask, onDeleteTask }) => {
  return (
    <div className={`${title !== 'OVERDUE TASKS' ? 'mt-6' : ''} bg-white shadow rounded-lg overflow-hidden`}>
      <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
        <h4 className="text-sm font-medium text-gray-500">{title}</h4>
      </div>
      <ul className="divide-y divide-gray-200">
        {tasks.length > 0 ? (
          tasks.map(task => (
            <TaskCard 
              key={task.id} 
              task={task} 
              isOverdue={isOverdue} 
              onEdit={onEditTask}
              onDelete={onDeleteTask}
            />
          ))
        ) : (
          <li className="px-6 py-4 text-center text-gray-500">No tasks found</li>
        )}
      </ul>
    </div>
  );
};

// Stat Card Component
const StatCard = ({ icon, title, value, linkText, bgColor }) => {
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <div className="flex items-center">
          <div className={`flex-shrink-0 ${bgColor} rounded-md p-3`}>
            {icon}
          </div>
          <div className="ml-5">
            <p className="text-sm font-medium text-gray-500 truncate">{title}</p>
            <p className="mt-1 text-3xl font-semibold text-gray-900">{value}</p>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 px-4 py-2">
        <div className="text-sm">
          <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">{linkText}</a>
        </div>
      </div>
    </div>
  );
};

export default function TaskDashboard() {
  const [activeView, setActiveView] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [allTasks, setAllTasks] = useState({
    assignedToYou: [...taskData.assignedToYou],
    createdByYou: [...taskData.createdByYou],
    overdue: [...taskData.overdue],
  });
  
  // Modal states
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [taskToDelete, setTaskToDelete] = useState(null);
  
  // Create empty task template
  const emptyTask = {
    id: null,
    title: '',
    description: '',
    assignedTo: 'You',
    dueDate: new Date().toISOString().split('T')[0],
    priority: 'Medium',
    status: 'Pending'
  };
  
  // Open edit modal with task data
  const handleEditTask = (task) => {
    setCurrentTask({...task});
    setIsEditModalOpen(true);
  };
  
  // Open create task modal
  const handleCreateTask = () => {
    setCurrentTask({...emptyTask, id: Date.now()});
    setIsEditModalOpen(true);
  };
  
  // Open delete confirmation
  const handleDeleteClick = (task) => {
    setTaskToDelete(task);
    setIsDeleteModalOpen(true);
  };
  
  // Save task changes
  const handleSaveTask = (updatedTask) => {
    const newAllTasks = {...allTasks};
    
    // Determine which array the task belongs to
    let taskArray = null;
    let taskIndex = -1;
    
    if (updatedTask.status === 'Overdue') {
      // Handle task moved to overdue
      Object.keys(newAllTasks).forEach(key => {
        const index = newAllTasks[key].findIndex(t => t.id === updatedTask.id);
        if (index !== -1) {
          newAllTasks[key].splice(index, 1);
        }
      });
      
      // Add overdue days if not present
      if (!updatedTask.overdueDays) {
        const today = new Date();
        const dueDate = new Date(updatedTask.dueDate);
        const diffTime = Math.abs(today - dueDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        updatedTask.overdueDays = diffDays;
      }
      
      newAllTasks.overdue.push(updatedTask);
    } else {
      // Find task in existing arrays
      for (const key of Object.keys(newAllTasks)) {
        const index = newAllTasks[key].findIndex(t => t.id === updatedTask.id);
        if (index !== -1) {
          taskArray = key;
          taskIndex = index;
          break;
        }
      }
      
      // Update existing task
      if (taskIndex !== -1) {
        newAllTasks[taskArray][taskIndex] = updatedTask;
      } else {
        // This is a new task, add to appropriate array
        if (updatedTask.assignedTo === 'You') {
          newAllTasks.createdByYou.push(updatedTask);
        } else {
          newAllTasks.assignedToYou.push(updatedTask);
        }
      }
    }
    
    setAllTasks(newAllTasks);
    setIsEditModalOpen(false);
  };
  
  // Delete task
  const handleDeleteTask = () => {
    const newAllTasks = {...allTasks};
    
    // Remove task from all arrays
    Object.keys(newAllTasks).forEach(key => {
      newAllTasks[key] = newAllTasks[key].filter(task => task.id !== taskToDelete.id);
    });
    
    setAllTasks(newAllTasks);
    setIsDeleteModalOpen(false);
    setTaskToDelete(null);
  };
  
  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 font-sans">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 transform bg-white border-r border-gray-200 md:relative md:translate-x-0 transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-center h-16 px-4 border-b border-gray-200">
          <h1 className="text-xl font-semibold text-gray-800">TaskFlow</h1>
        </div>
        <div className="flex flex-col flex-grow p-4 overflow-y-auto">
          <div className="flex flex-col flex-grow">
            <nav className="flex-1 space-y-1">
              <a 
                href="#" 
                className={`flex items-center px-4 py-3 text-sm font-medium rounded-md ${activeView === 'dashboard' ? 'text-indigo-600 bg-indigo-50 border-l-4 border-indigo-600' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
                onClick={() => setActiveView('dashboard')}
              >
                <BarChart2 className="mr-3" size={18} />
                Dashboard
              </a>
              <a 
                href="#" 
                className={`flex items-center px-4 py-3 text-sm font-medium rounded-md ${activeView === 'mytasks' ? 'text-indigo-600 bg-indigo-50 border-l-4 border-indigo-600' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
                onClick={() => setActiveView('mytasks')}
              >
                <List className="mr-3" size={18} />
                My Tasks
              </a>
              <a 
                href="#" 
                className={`flex items-center px-4 py-3 text-sm font-medium rounded-md ${activeView === 'teamtasks' ? 'text-indigo-600 bg-indigo-50 border-l-4 border-indigo-600' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
                onClick={() => setActiveView('teamtasks')}
              >
                <Users className="mr-3" size={18} />
                Team Tasks
              </a>
              <a 
                href="#" 
                className={`flex items-center px-4 py-3 text-sm font-medium rounded-md ${activeView === 'calendar' ? 'text-indigo-600 bg-indigo-50 border-l-4 border-indigo-600' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
                onClick={() => setActiveView('calendar')}
              >
                <Calendar className="mr-3" size={18} />
                Calendar
              </a>
              <a 
                href="#" 
                className={`flex items-center px-4 py-3 text-sm font-medium rounded-md ${activeView === 'reports' ? 'text-indigo-600 bg-indigo-50 border-l-4 border-indigo-600' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
                onClick={() => setActiveView('reports')}
              >
                <PieChart className="mr-3" size={18} />
                Reports
              </a>
            </nav>
          </div>
          <div className="mt-6">
            <div className="px-4 py-3 bg-indigo-50 rounded-lg">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Crown className="text-indigo-500" size={16} />
                </div>
                <div className="ml-3">
                  <p className="text-xs font-medium text-indigo-800">Upgrade to Pro</p>
                  <p className="text-xs text-indigo-500">Get more features</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center px-4 py-3 border-t border-gray-200">
          <img className="w-8 h-8 rounded-full" src="/api/placeholder/40/40" alt="User profile" />
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-700">Alex Johnson</p>
            <p className="text-xs text-gray-500">alex@example.com</p>
          </div>
          <button className="p-1 ml-auto text-gray-400 rounded-full hover:text-gray-500">
            <Settings size={16} />
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top navbar */}
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
            <button 
              className="md:hidden p-2 text-gray-500 rounded-md hover:bg-gray-100"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <Menu size={20} />
            </button>
            
            <div className="flex-1 px-4 md:px-0">
              <div className="relative max-w-md">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Search className="text-gray-400" size={16} />
                </div>
                <input 
                  type="text" 
                  className="block w-full py-2 pl-10 pr-3 text-sm bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" 
                  placeholder="Search tasks..." 
                />
              </div>
            </div>
            
            <div className="flex items-center ml-4 space-x-4">
              <button className="p-1 text-gray-400 bg-white rounded-full hover:text-gray-500 focus:outline-none">
                <Bell size={20} />
              </button>
              <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full">3</span>
            </div>
          </div>
          <div className="px-4 py-2 bg-white border-t border-gray-200 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-medium text-gray-800">Dashboard</h2>
                <p className="text-sm text-gray-500">Welcome back, Alex. Here's what's happening today.</p>
              </div>
              <div>
                <button 
                  className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={handleCreateTask}
                >
                  <Plus className="inline mr-2" size={16} /> New Task
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main content area */}
        <main className="flex-1 overflow-y-auto p-4 sm:px-6 lg:px-8 bg-gray-50">
          {/* Dashboard stats */}
          <div className="grid grid-cols-1 gap-5 mt-2 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard 
              icon={<List className="text-indigo-600" size={24} />}
              title="Total Tasks"
              value={allTasks.assignedToYou.length + allTasks.createdByYou.length + allTasks.overdue.length}
              linkText="View all tasks"
              bgColor="bg-indigo-100"
            />
            <StatCard 
              icon={<CheckCircle className="text-green-600" size={24} />}
              title="Completed"
              value={Object.values(allTasks).flat().filter(task => task.status === 'Completed').length}
              linkText="View completed"
              bgColor="bg-green-100"
            />
            <StatCard 
              icon={<Loader className="text-blue-600" size={24} />}
              title="In Progress"
              value={Object.values(allTasks).flat().filter(task => task.status === 'In Progress').length}
              linkText="View in progress"
              bgColor="bg-blue-100"
            />
            <StatCard 
              icon={<Clock className="text-red-600" size={24} />}
              title="Overdue"
              value={allTasks.overdue.length}
              linkText="View overdue"
              bgColor="bg-red-100"
            />
          </div>

          {/* Task progress */}
          <div className="mt-6">
            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">Task Progress</h3>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                    This Week
                  </button>
                  <button className="px-3 py-1 text-xs font-medium text-white bg-indigo-600 border border-indigo-600 rounded-md">
                    This Month
                  </button>
                </div>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} />
                    <Tooltip />
                    <Legend align="right" iconType="circle" iconSize={8} />
                    <Line 
                      type="monotone" 
                      dataKey="completed" 
                      name="Completed"
                      stroke="#10B981" 
                      strokeWidth={2}
                      activeDot={{ r: 6 }} 
                      dot={{ r: 4 }}
                      fill="rgba(16, 185, 129, 0.2)"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="created" 
                      name="Created"
                      stroke="#4F46E5" 
                      strokeWidth={2}
                      activeDot={{ r: 6 }} 
                      dot={{ r: 4 }}
                      fill="rgba(79, 70, 229, 0.2)"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Tasks sections with filters */}
          <div className="mt-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">Your Tasks</h3>
              <div className="flex space-x-2">
                <div className="relative">
                  <select className="block w-full pl-3 pr-10 py-2 text-sm border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white shadow-sm">
                    <option>All Statuses</option>
                    <option>Completed</option>
                    <option>In Progress</option>
                    <option>Pending</option>
                    <option>Overdue</option>
                  </select>
                </div>
                <div className="relative">
                  <select className="block w-full pl-3 pr-10 py-2 text-sm border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white shadow-sm">
                    <option>All Priorities</option>
                    <option>High</option>
                    <option>Medium</option>
                    <option>Low</option>
                  </select>
                </div>
                <div className="relative">
                  <select className="block w-full pl-3 pr-10 py-2 text-sm border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white shadow-sm">
                    <option>Due Date</option>
                    <option>Today</option>
                    <option>This Week</option>
                    <option>This Month</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Tasks assigned to you */}
            <TaskSection 
              title="ASSIGNED TO YOU" 
              tasks={allTasks.assignedToYou}
              onEditTask={handleEditTask}
              onDeleteTask={handleDeleteClick}
            />

            {/* Tasks created by you */}
            <TaskSection 
              title="CREATED BY YOU" 
              tasks={allTasks.createdByYou}
              onEditTask={handleEditTask}
              onDeleteTask={handleDeleteClick}
            />

            {/* Overdue tasks */}
            <TaskSection 
              title="OVERDUE TASKS" 
              tasks={allTasks.overdue}
              isOverdue={true}
              onEditTask={handleEditTask}
              onDeleteTask={handleDeleteClick}
            />
          </div>
        </main>
      </div>
      
      {/* Task Edit Modal */}
      {isEditModalOpen && currentTask && (
        <TaskEditModal 
          task={currentTask}
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleSaveTask}
          onDelete={handleDeleteClick}
        />
      )}
      
      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && taskToDelete && (
        <DeleteConfirmationModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleDeleteTask}
          taskTitle={taskToDelete.title}
        />
      )}
    </div>
  );
}