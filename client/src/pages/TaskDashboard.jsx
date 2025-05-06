import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { List, Clock, CheckCircle, Loader, X, Plus } from "lucide-react";

import Drawer from "../components/Drawer";
import Header from "../components/Header";
import TaskSection from "../components/TaskSection";
import StatCard from "../components/StatCard";
import TaskEditModal from "../components/TaskEditModal";
import Dropdown from "../components/Dropdown";
import axios from "axios";
import { useCookies } from "react-cookie";
import { buildQueryParams } from "../hooks/buildQueryParams";
import { toast } from "react-toastify";

export default function TaskDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [cookie] = useCookies(["id"]);
  const [selectedStatus, setSelectedStatus] = useState("All Statuses");
  const [selectedPriority, setSelectedPriority] = useState("All Priorities");
  const [selectedDueDate, setSelectedDueDate] = useState("Due Date");
  const apiUrl = import.meta.env.VITE_API_URL;
  const previousTasksRef = useRef([]);

  const handleEditTask = (task) => {
    setCurrentTask({ ...task });
    setIsEditModalOpen(true);
    console.log("Edit clicked:", task);
  };

  const handleDeleteClick = async (task) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this task?"
    );
    if (!isConfirmed) return;
    console.log(task);

    try {
      const response = await axios.delete(`${apiUrl}/api/v1/tasks`, {
        params: { taskId: task },
      });
      console.log("Deleted task:", response.data);
      toast.success("Task deleted successfully!");
      await fetchTaskData();
    } catch (error) {
      console.error("Failed to delete task:", error);
      toast.error("Failed to delete task. Please try again.");
    } finally {
      setIsEditModalOpen(false);
      setCurrentTask(null);
    }
  };

  const handleSaveTask = async (task) => {
    try {
      const updateTask = await axios.patch(`${apiUrl}/api/v1/tasks`, task, {
        params: { taskId: task._id },
      });
      toast.success("Task updated successfully!");
      await fetchTaskData();
      console.log("Updated task:", updateTask.data);
    } catch (error) {
      console.error("Error updating task:", error);
      toast.error("Failed to update task. Please try again.");
    } finally {
      setIsEditModalOpen(false);
      setCurrentTask(null);
    }
  };

  const fetchTaskData = useCallback(async () => {
    try {
      const params = buildQueryParams(
        selectedStatus,
        selectedPriority,
        selectedDueDate
      );

      const response = await axios(`${apiUrl}/api/v1/tasks`, {
        params: { userId: cookie.id, ...params },
      });

      const { data } = await response.data;
      if (!Array.isArray(data.allTasks)) {
        console.error("Expected an array but got:", data);
        return;
      }

      const previousTasks = previousTasksRef.current;
      const previousIds = new Set(previousTasks?.map(task => task._id));
      const newTasks = data?.allTasks?.filter(task => !previousIds.has(task._id));
  
      if (previousTasks?.length > 0 && newTasks?.length > 0) {
        toast.info(`${newTasks.length} new task added!`);
  
        // Optional browser notification
        if (document.hidden && Notification.permission === "granted") {
          new Notification("🆕 New Task Added", {
            body: newTasks[0]?.title || "Check your task list.",
          });
        }
      }
      previousTasksRef.current = data.allTasks;
      setTasks(data);
    } catch (error) {
      toast.error("Failed to fetch tasks. Please check your connection.");

      console.error("Error fetching task data:", error);
    }
  }, [cookie.id, selectedStatus, selectedPriority, selectedDueDate]);

  useEffect(() => {
    if (!cookie.id) return;
  
    fetchTaskData(); 
  
    const interval = setInterval(() => {
      fetchTaskData();
    }, 5000); 
  
    return () => clearInterval(interval);
  }, [fetchTaskData, cookie.id]);
  
  const stats = useMemo(
    () => [
      {
        icon: <List className="text-indigo-600" size={24} />,
        title: "Total Tasks",
        value: tasks?.allTasks?.length || 0,
        bg: "bg-indigo-100",
      },
      {
        icon: <CheckCircle className="text-green-600" size={24} />,
        title: "Completed",
        value:
          tasks?.allTasks?.filter((task) => task.status === "Completed")
            .length || 0,
        bg: "bg-green-100",
      },
      {
        icon: <Loader className="text-blue-600" size={24} />,
        title: "In Progress",
        value:
          tasks?.allTasks?.filter((task) => task.status === "In Progress")
            .length || 0,
        bg: "bg-blue-100",
      },
      {
        icon: <Clock className="text-red-600" size={24} />,
        title: "Overdue",
        value:
          tasks?.allTasks?.filter(
            (task) =>
              new Date(task.dueDate) < new Date() && task.status !== "Completed"
          ).length || 0,
        bg: "bg-red-100",
      },
    ],
    [tasks]
  );

  const filters = useMemo(
    () => ({
      status: [
        "All Statuses",
        "Completed",
        "In Progress",
        "Pending",
        "Overdue",
      ],
      priority: ["All Priorities", "High", "Medium", "Low"],
      dueDate: ["Due Date", "Today", "This Week", "This Month"],
    }),
    []
  );

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

          {/* Task List & Filters */}
          <div className="mt-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">Your Tasks</h3>
              <div className="flex space-x-2">
                <Dropdown
                  name="status"
                  options={filters.status}
                  value={selectedStatus}
                  onChange={(name, value) => setSelectedStatus(value)}
                />

                <Dropdown
                  name="priority"
                  options={filters.priority}
                  value={selectedPriority}
                  onChange={(name, value) => setSelectedPriority(value)}
                />

                <Dropdown
                  name="dueDate"
                  options={filters.dueDate}
                  value={selectedDueDate}
                  onChange={(name, value) => setSelectedDueDate(value)}
                />
              </div>
            </div>

            <TaskSection
              title="ASSIGNED TO YOU"
              tasks={tasks.assignedToYou}
              onEdit={handleEditTask}
            />
            <TaskSection
              title="CREATED BY YOU"
              tasks={tasks.createdByYou}
              onEdit={handleEditTask}
            />
            <TaskSection
              title="OVERDUE TASKS"
              tasks={tasks.overdueTasks}
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
          onDelete={handleDeleteClick}
          onSave={handleSaveTask}
        />
      )}
    </div>
  );
}
