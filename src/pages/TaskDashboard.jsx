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

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 font-sans">
      {/* Sidebar */}

      <Drawer sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top navbar */}

        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Main content area */}
        <main className="flex-1 overflow-y-auto p-4 sm:px-6 lg:px-8 bg-gray-50">
          {/* Dashboard stats */}
          <div className="grid grid-cols-1 gap-5 mt-2 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              icon={<List className="text-indigo-600" size={24} />}
              title="Total Tasks"
              value="24"
              // linkText="View all tasks"
              bgColor="bg-indigo-100"
            />
            <StatCard
              icon={<CheckCircle className="text-green-600" size={24} />}
              title="Completed"
              value="16"
              // linkText="View completed"
              bgColor="bg-green-100"
            />
            <StatCard
              icon={<Loader className="text-blue-600" size={24} />}
              title="In Progress"
              value="5"
              // linkText="View in progress"
              bgColor="bg-blue-100"
            />
            <StatCard
              icon={<Clock className="text-red-600" size={24} />}
              title="Overdue"
              value="3"
              // linkText="View overdue"
              bgColor="bg-red-100"
            />
          </div>

          {/* Task progress */}
          <div className="mt-6">
            <div className="bg-white shadow rounded-lg p-6">
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
              tasks={taskData.assignedToYou}
            />

            {/* Tasks created by you */}
            <TaskSection title="CREATED BY YOU" tasks={taskData.createdByYou} />

            {/* Overdue tasks */}
            <TaskSection
              title="OVERDUE TASKS"
              tasks={taskData.overdue}
              isOverdue={true}
            />
          </div>
        </main>
      </div>
      <button
        // onClick={handleCreateTask}
        className="fixed flex bottom-10 right-10 shadow-2xs sm:hidden px-4 py-4 justify-center items-center gap-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"
      >
        <Plus size={18} />
        {/* Create Task */}
      </button>
    </div>
  );
}
