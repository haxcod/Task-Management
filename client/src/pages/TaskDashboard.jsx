import { useState } from "react";
import { List, Clock, CheckCircle, Loader, X, Plus } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import Drawer from "../components/Drawer";
import Header from "../components/Header";
import TaskSection from "../components/TaskSection";
import StatCard from "../components/StatCard";
import TaskEditModal from "../components/TaskEditModal";
import Dropdown from "../components/Dropdown";

const chartData = [
  { name: "Mon", completed: 3, created: 5 },
  { name: "Tue", completed: 5, created: 7 },
  { name: "Wed", completed: 2, created: 4 },
  { name: "Thu", completed: 4, created: 6 },
  { name: "Fri", completed: 6, created: 8 },
  { name: "Sat", completed: 8, created: 10 },
  { name: "Sun", completed: 5, created: 7 },
];

const taskData = {
  assignedToYou: [
    {
      id: 1,
      title: "Update user authentication system",
      description:
        "Implement secure password hashing and JWT token authentication for the new user portal.",
      assignedBy: "Sarah Parker",
      dueDate: "May 5, 2025",
      priority: "High",
      status: "In Progress",
    },
    {
      id: 2,
      title: "Create new dashboard components",
      description:
        "Design and implement new analytics dashboard components for the admin panel.",
      assignedBy: "James Wilson",
      dueDate: "May 8, 2025",
      priority: "Medium",
      status: "Pending",
    },
  ],
  createdByYou: [
    {
      id: 3,
      title: "Review team collaboration features",
      description:
        "Test and review all team collaboration features before the next release.",
      assignedTo: "Michael Brown",
      dueDate: "May 10, 2025",
      priority: "Medium",
      status: "Pending",
    },
    {
      id: 4,
      title: "Implement search functionality",
      description:
        "Implement advanced search functionality with filtering options across the application.",
      assignedTo: "Emily Davis",
      dueDate: "May 7, 2025",
      priority: "High",
      status: "In Progress",
    },
  ],
  overdue: [
    {
      id: 5,
      title: "Fix notification system bugs",
      description:
        "Fix critical bugs in the notification system for task assignments and updates.",
      assignedTo: "You",
      dueDate: "April 30, 2025",
      overdueDays: 1,
      priority: "High",
      status: "Overdue",
    },
  ],
};

export default function TaskDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [taskToDelete, setTaskToDelete] = useState(null);

  const handleEditTask = (task) => {
    setCurrentTask({ ...task });
    setIsEditModalOpen(true);
    console.log("Edit clicked:", task);
  };

  const handleDeleteClick = (task) => {
    setTaskToDelete(task);
  };

  const stats = [
    {
      icon: <List className="text-indigo-600" size={24} />,
      title: "Total Tasks",
      value: "24",
      bg: "bg-indigo-100",
    },
    {
      icon: <CheckCircle className="text-green-600" size={24} />,
      title: "Completed",
      value: "16",
      bg: "bg-green-100",
    },
    {
      icon: <Loader className="text-blue-600" size={24} />,
      title: "In Progress",
      value: "5",
      bg: "bg-blue-100",
    },
    {
      icon: <Clock className="text-red-600" size={24} />,
      title: "Overdue",
      value: "3",
      bg: "bg-red-100",
    },
  ];

  const filters = {
    status: ["All Statuses", "Completed", "In Progress", "Pending", "Overdue"],
    priority: ["All Priorities", "High", "Medium", "Low"],
    dueDate: ["Due Date", "Today", "This Week", "This Month"],
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 font-sans">
      <Drawer sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="flex-1 overflow-y-auto p-4 sm:px-6 lg:px-8 bg-gray-50">
          {/* Stat Cards */}
          <div className="grid grid-cols-1 gap-5 mt-2 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s, i) => (
              <StatCard
                key={i}
                icon={s.icon}
                title={s.title}
                value={s.value}
                bgColor={s.bg}
              />
            ))}
          </div>

          {/* Task Chart */}
          <div className="mt-6 bg-white shadow rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                Task Progress
              </h3>
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
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#f0f0f0"
                  />
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
                  />
                  <Line
                    type="monotone"
                    dataKey="created"
                    name="Created"
                    stroke="#4F46E5"
                    strokeWidth={2}
                    activeDot={{ r: 6 }}
                    dot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Task List & Filters */}
          <div className="mt-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">Your Tasks</h3>
              <div className="flex space-x-2">
                <Dropdown options={filters.status} />
                <Dropdown options={filters.priority} />
                <Dropdown options={filters.dueDate} />
              </div>
            </div>

            <TaskSection
              title="ASSIGNED TO YOU"
              tasks={taskData.assignedToYou}
              onEdit={handleEditTask}
            />
            <TaskSection
              title="CREATED BY YOU"
              tasks={taskData.createdByYou}
              onEdit={handleEditTask}
            />
            <TaskSection
              title="OVERDUE TASKS"
              tasks={taskData.overdue}
              isOverdue={true}
              onEdit={handleEditTask}
            />
          </div>
        </main>
      </div>

      {/* Floating Action Button */}
      <button className="fixed bottom-10 right-10 sm:hidden px-4 py-4 flex justify-center items-center gap-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition">
        <Plus size={18} />
      </button>

      {isEditModalOpen && currentTask && (
        <TaskEditModal
          task={currentTask}
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          status={filters.status}
          priority={filters.priority}
          dueDate={filters.dueDate}
          // onSave={handleSaveTask}
          onDelete={handleDeleteClick}
        />
      )}
    </div>
  );
}
