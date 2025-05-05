import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  List,
  Clock,
  CheckCircle,
  Loader,
  Plus,
  Users,
  Bell,
  Calendar,
  Search,
} from "lucide-react";
import Drawer from "../components/Drawer";
import Header from "../components/Header";
import StatCard from "../components/StatCard";

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  // Quick stats data
  const stats = [
    {
      icon: <List className="text-indigo-600" size={24} />,
      title: "Total Tasks",
      value: "24",
      linkText: "View all tasks",
      bgColor: "bg-indigo-100",
    },
    {
      icon: <CheckCircle className="text-green-600" size={24} />,
      title: "Completed",
      value: "16",
      linkText: "View completed",
      bgColor: "bg-green-100",
    },
    {
      icon: <Loader className="text-blue-600" size={24} />,
      title: "In Progress",
      value: "5",
      linkText: "View in progress",
      bgColor: "bg-blue-100",
    },
    {
      icon: <Clock className="text-red-600" size={24} />,
      title: "Due Today",
      value: "3",
      linkText: "View urgent",
      bgColor: "bg-red-100",
    },
  ];

  // Quick actions data
  const quickActions = [
    {
      icon: <Plus className="text-white" size={20} />,
      title: "New Task",
      description: "Create a new task or project",
      color: "bg-indigo-600",
      action: () => navigate("/task-create"),
    },
    {
      icon: <Users className="text-white" size={20} />,
      title: "Team Tasks",
      description: "View team workload",
      color: "bg-blue-600",
      action: () => navigate("/team"),
    },
    {
      icon: <Calendar className="text-white" size={20} />,
      title: "Schedule",
      description: "Plan your week",
      color: "bg-green-600",
      action: () => navigate("/schedule"),
    },
    {
      icon: <Bell className="text-white" size={20} />,
      title: "Notifications",
      description: "View updates",
      color: "bg-amber-600",
      action: () => navigate("/notifications"),
    },
  ];

  // Recent tasks data
  const recentTasks = [
    {
      title: "Update user authentication",
      status: "In Progress",
      assignee: "Michael Brown",
      dueDate: "Today",
    },
    {
      title: "Review team collaboration features",
      status: "Pending",
      assignee: "Emily Davis",
      dueDate: "Tomorrow",
    },
    {
      title: "Fix notification system bugs",
      status: "Completed",
      assignee: "James Wilson",
      dueDate: "Yesterday",
    },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 font-sans">
      <Drawer sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        
        <main className="flex-1 overflow-y-auto p-4 sm:px-6 lg:px-8">
          {/* Welcome Section */}
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-gray-900">Welcome back, Alex 👋</h1>
              <p className="mt-1 text-sm text-gray-500">
                Here's what's happening with your tasks today.
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
              {stats.map((stat, index) => (
                <StatCard key={index} {...stat} />
              ))}
            </div>

            {/* Quick Actions */}
            <div className="mb-8">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    onClick={action.action}
                    className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow duration-200"
                  >
                    <div className={`w-10 h-10 ${action.color} rounded-lg flex items-center justify-center mb-3`}>
                      {action.icon}
                    </div>
                    <h3 className="text-sm font-medium text-gray-900">{action.title}</h3>
                    <p className="text-xs text-gray-500 mt-1">{action.description}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Recent Tasks</h3>
              </div>
              <ul className="divide-y divide-gray-200">
                {recentTasks.map((task, index) => (
                  <li key={index} className="px-4 py-4 sm:px-6 hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <div className={`w-2 h-2 rounded-full ${
                            task.status === 'Completed' ? 'bg-green-400' :
                            task.status === 'In Progress' ? 'bg-blue-400' : 'bg-gray-400'
                          }`}></div>
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-medium text-gray-900">{task.title}</p>
                          <p className="text-sm text-gray-500">Assigned to {task.assignee}</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          task.status === 'Completed' ? 'bg-green-100 text-green-800' :
                          task.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {task.status}
                        </span>
                        <span className="ml-4 text-sm text-gray-500">{task.dueDate}</span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="px-4 py-4 sm:px-6 border-t border-gray-200">
                <button
                  onClick={() => navigate("/dashboard")}
                  className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                >
                  View all tasks
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}