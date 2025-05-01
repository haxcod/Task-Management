const TaskSection = ({ title, tasks, isOverdue = false }) => {
  return (
    <div
      className={`${
        title !== "OVERDUE TASKS" ? "mt-6" : ""
      } bg-white shadow rounded-lg overflow-hidden`}
    >
      <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
        <h4 className="text-sm font-medium text-gray-500">{title}</h4>
      </div>
      <ul className="divide-y divide-gray-200">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <TaskCard key={task.id} task={task} isOverdue={isOverdue} />
          ))
        ) : (
          <li className="px-6 py-4 text-center text-gray-500">
            No tasks found
          </li>
        )}
      </ul>
    </div>
  );
};

export default TaskSection;
