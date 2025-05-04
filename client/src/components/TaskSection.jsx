import TaskCard from "./TaskCard";

const TaskSection = ({ title, tasks = [], isOverdue = false, onEdit}) => {
  const hasTasks = tasks.length > 0;

  return (
    <div
      className={`bg-white shadow rounded-lg overflow-hidden ${
        title !== "OVERDUE TASKS" ? "mt-6" : ""
      }`}
    >
      <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
        <h4 className="text-sm font-medium text-gray-500">{title}</h4>
      </div>

      <ul className="divide-y divide-gray-200">
        {hasTasks ? (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              isOverdue={isOverdue}
              onEdit={onEdit}
            />
          ))
        ) : (
          <li className="px-6 py-4 text-center text-gray-500">No tasks found</li>
        )}
      </ul>
    </div>
  );
};

export default TaskSection;
