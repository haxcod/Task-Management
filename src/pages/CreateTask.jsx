import { useState } from 'react';
import { Search, BarChart2, Bell, Menu, List, Users, Calendar, PieChart, Crown, Settings, ArrowLeft, X, Clock, AlertCircle } from 'lucide-react';

export default function CreateTaskPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    dueTime: '12:00',
    priority: 'Medium',
    status: 'Pending',
    assignedTo: '',
  });
  const [errors, setErrors] = useState({});

  const teamMembers = [
    { id: 1, name: 'Michael Brown', email: 'michael@example.com' },
    { id: 2, name: 'Emily Davis', email: 'emily@example.com' },
    { id: 3, name: 'Sarah Parker', email: 'sarah@example.com' },
    { id: 4, name: 'James Wilson', email: 'james@example.com' },
    { id: 5, name: 'Alex Johnson (You)', email: 'alex@example.com' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Task title is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Task description is required';
    }
    
    if (!formData.dueDate) {
      newErrors.dueDate = 'Due date is required';
    }
    
    if (!formData.assignedTo) {
      newErrors.assignedTo = 'Please select a team member';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Here you would typically submit the form data to your backend
      console.log('Form submitted:', formData);
      alert('Task created successfully!');
      // Reset form or redirect
    }
  };

  const handleCancel = () => {
    if (confirm('Are you sure you want to discard this task?')) {
      // Reset form or redirect back
      console.log('Task creation cancelled');
    }
  };

  // Generate today's date in YYYY-MM-DD format for min date attribute
  const today = new Date().toISOString().split('T')[0];

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
                className="flex items-center px-4 py-3 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              >
                <BarChart2 className="mr-3" size={18} />
                Dashboard
              </a>
              <a 
                href="#" 
                className="flex items-center px-4 py-3 text-sm font-medium rounded-md text-indigo-600 bg-indigo-50 border-l-4 border-indigo-600"
              >
                <List className="mr-3" size={18} />
                My Tasks
              </a>
              <a 
                href="#" 
                className="flex items-center px-4 py-3 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              >
                <Users className="mr-3" size={18} />
                Team Tasks
              </a>
              <a 
                href="#" 
                className="flex items-center px-4 py-3 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              >
                <Calendar className="mr-3" size={18} />
                Calendar
              </a>
              <a 
                href="#" 
                className="flex items-center px-4 py-3 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
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
            <div className="flex items-center">
              <a href="#" className="flex items-center text-indigo-600 hover:text-indigo-700">
                <ArrowLeft className="mr-1" size={16} />
                <span className="text-sm font-medium">Back to Tasks</span>
              </a>
              <h2 className="ml-4 text-lg font-medium text-gray-800">Create New Task</h2>
            </div>
          </div>
        </header>

        {/* Main content area */}
        <main className="flex-1 overflow-y-auto p-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-3xl mx-auto">
            <form onSubmit={handleSubmit} className="bg-white shadow-sm rounded-lg overflow-hidden">
              {/* Form header */}
              <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                <h3 className="text-lg font-medium text-gray-700">Task Details</h3>
                <p className="mt-1 text-sm text-gray-500">Fill in the information below to create a new task.</p>
              </div>
              
              {/* Form content */}
              <div className="px-6 py-4 space-y-6">
                {/* Task title */}
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                    Task Title <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-1 relative">
                    <input
                      type="text"
                      name="title"
                      id="title"
                      className={`block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md ${errors.title ? 'border-red-300' : ''}`}
                      placeholder="Enter task title"
                      value={formData.title}
                      onChange={handleChange}
                    />
                    {errors.title && (
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <AlertCircle className="h-5 w-5 text-red-500" aria-hidden="true" />
                      </div>
                    )}
                  </div>
                  {errors.title && <p className="mt-2 text-sm text-red-600">{errors.title}</p>}
                </div>
                
                {/* Task description */}
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-1 relative">
                    <textarea
                      id="description"
                      name="description"
                      rows={4}
                      className={`block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md ${errors.description ? 'border-red-300' : ''}`}
                      placeholder="Describe the task in detail"
                      value={formData.description}
                      onChange={handleChange}
                    />
                    {errors.description && (
                      <div className="absolute top-0 right-0 pr-3 pt-2 flex items-center pointer-events-none">
                        <AlertCircle className="h-5 w-5 text-red-500" aria-hidden="true" />
                      </div>
                    )}
                  </div>
                  {errors.description && <p className="mt-2 text-sm text-red-600">{errors.description}</p>}
                </div>
                
                {/* Due date and time */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">
                      Due Date <span className="text-red-500">*</span>
                    </label>
                    <div className="mt-1 relative">
                      <input
                        type="date"
                        name="dueDate"
                        id="dueDate"
                        min={today}
                        className={`block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md ${errors.dueDate ? 'border-red-300' : ''}`}
                        value={formData.dueDate}
                        onChange={handleChange}
                      />
                      {errors.dueDate && (
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                          <AlertCircle className="h-5 w-5 text-red-500" aria-hidden="true" />
                        </div>
                      )}
                    </div>
                    {errors.dueDate && <p className="mt-2 text-sm text-red-600">{errors.dueDate}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="dueTime" className="block text-sm font-medium text-gray-700">
                      Due Time
                    </label>
                    <div className="mt-1">
                      <input
                        type="time"
                        name="dueTime"
                        id="dueTime"
                        className="block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                        value={formData.dueTime}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
                
                {/* Priority and Status */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="priority" className="block text-sm font-medium text-gray-700">
                      Priority
                    </label>
                    <div className="mt-1">
                      <select
                        id="priority"
                        name="priority"
                        className="block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                        value={formData.priority}
                        onChange={handleChange}
                      >
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                      </select>
                    </div>
                    <div className="mt-2 flex items-center space-x-2">
                      <span className={`inline-block w-3 h-3 rounded-full ${formData.priority === 'High' ? 'bg-red-500' : formData.priority === 'Medium' ? 'bg-amber-500' : 'bg-green-500'}`}></span>
                      <span className="text-xs text-gray-500">
                        {formData.priority === 'High' 
                          ? 'Needs immediate attention' 
                          : formData.priority === 'Medium' 
                            ? 'Address when possible' 
                            : 'Handle when convenient'}
                      </span>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                      Initial Status
                    </label>
                    <div className="mt-1">
                      <select
                        id="status"
                        name="status"
                        className="block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                        value={formData.status}
                        onChange={handleChange}
                      >
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                {/* Assign to */}
                <div>
                  <label htmlFor="assignedTo" className="block text-sm font-medium text-gray-700">
                    Assign To <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-1 relative">
                    <select
                      id="assignedTo"
                      name="assignedTo"
                      className={`block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md ${errors.assignedTo ? 'border-red-300' : ''}`}
                      value={formData.assignedTo}
                      onChange={handleChange}
                    >
                      <option value="">Select a team member</option>
                      {teamMembers.map(member => (
                        <option key={member.id} value={member.id}>
                          {member.name}
                        </option>
                      ))}
                    </select>
                    {errors.assignedTo && (
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <AlertCircle className="h-5 w-5 text-red-500" aria-hidden="true" />
                      </div>
                    )}
                  </div>
                  {errors.assignedTo && <p className="mt-2 text-sm text-red-600">{errors.assignedTo}</p>}
                </div>
                
                {/* Additional options */}
                <div className="pt-2">
                  <div className="flex items-center">
                    <input
                      id="sendNotification"
                      name="sendNotification"
                      type="checkbox"
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      defaultChecked
                    />
                    <label htmlFor="sendNotification" className="ml-2 block text-sm text-gray-700">
                      Send notification to assigned team member
                    </label>
                  </div>
                </div>
              </div>
              
              {/* Form actions */}
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-end space-x-3">
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={handleCancel}
                >
                  <X className="mr-2 h-4 w-4" />
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Create Task
                </button>
              </div>
            </form>
            
            {/* Form help card */}
            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <Clock className="h-5 w-5 text-blue-400" aria-hidden="true" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-blue-800">Task Tips</h3>
                  <div className="mt-2 text-sm text-blue-700">
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Break down complex tasks into smaller, manageable subtasks</li>
                      <li>Set realistic due dates to avoid creating overdue tasks</li>
                      <li>Provide clear descriptions to help assignees understand requirements</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}