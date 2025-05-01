const StatusBadge = ({ status }) => {
  const bgColors = {
    Completed: "bg-green-100 text-green-500",
    "In Progress": "bg-blue-100 text-blue-500",
    Pending: "bg-gray-100 text-gray-500",
    Overdue: "bg-red-100 text-red-500",
  };

  return (
    <span
      className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${bgColors[status]}`}
    >
      {status}
    </span>
  );
};

export default StatusBadge;
