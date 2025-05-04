import { MoreVertical } from "lucide-react";
import StatusBadge from "./StatusBadge";
import PriorityBadge from "./PriorityBadge";

const TaskCard = ({ task, isOverdue = false, onEdit }) => {
  return (
    <li>
      <div
        className={`px-6 py-4 flex items-center transition-all duration-200 hover:bg-gray-50 ${
          isOverdue ? "border-l-4 border-red-500" : ""
        }`}
      >
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-medium text-gray-800">
                {task.title}
              </h3>
              <div className="mt-1 flex items-center">
                {task.assignedBy ? (
                  <span className="text-sm text-gray-500">
                    Assigned by {task.assignedBy} •{" "}
                  </span>
                ) : (
                  <span className="text-sm text-gray-500">
                    Assigned to {task.assignedTo} •{" "}
                  </span>
                )}
                {isOverdue ? (
                  <span className="ml-1 text-sm text-red-500 font-medium">
                    Due {task.dueDate} ({task.overdueDays} day
                    {task.overdueDays > 1 ? "s" : ""} overdue)
                  </span>
                ) : (
                  <span className="ml-1 text-sm text-gray-500">
                    Due {task.dueDate}
                  </span>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <PriorityBadge priority={task.priority} />
              <StatusBadge status={task.status} />
            </div>
          </div>
          <div className="mt-2">
            <p className="text-sm text-gray-600 line-clamp-2">
              {task.description}
            </p>
          </div>
        </div>
        <div className="ml-5 flex-shrink-0">
          <button
            className="p-1 rounded-full text-gray-400 hover:text-gray-500"
            onClick={() => {
              onEdit(task);
            }}
          >
            <MoreVertical size={16} />
          </button>
        </div>
      </div>
    </li>
  );
};
export default TaskCard;
