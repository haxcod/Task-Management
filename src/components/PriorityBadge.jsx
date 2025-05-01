const PriorityBadge = ({ priority }) => {
  const bgColors = {
    High: "bg-red-100 text-red-500",
    Medium: "bg-amber-100 text-amber-500",
    Low: "bg-green-100 text-green-500",
  };

  return (
    <span
      className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${bgColors[priority]}`}
    >
      {priority}
    </span>
  );
};

export default PriorityBadge;
