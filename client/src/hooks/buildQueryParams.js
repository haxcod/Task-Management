export function buildQueryParams(selectedStatus, selectedPriority, selectedDueDate) {
    const query = {};
    const now = new Date();
  
    if (selectedStatus !== "All Statuses") {
      query.status = selectedStatus;
    }
  
    if (selectedPriority !== "All Priorities") {
      query.priority = selectedPriority;
    }
  
    if (selectedDueDate === "Today") {
      const endOfDay = new Date(now);
      endOfDay.setHours(23, 59, 59, 999);
      query.dueBefore = endOfDay.toISOString();
    } else if (selectedDueDate === "This Week") {
      const endOfWeek = new Date(now);
      const diff = 7 - endOfWeek.getDay();
      endOfWeek.setDate(now.getDate() + diff);
      endOfWeek.setHours(23, 59, 59, 999);
      query.dueBefore = endOfWeek.toISOString();
    } else if (selectedDueDate === "This Month") {
      const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);
      query.dueBefore = endOfMonth.toISOString();
    }
  
    return query;
  }
  