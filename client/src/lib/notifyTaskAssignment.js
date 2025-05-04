export const notifyTaskAssignment = (taskTitle, assignedBy) => {
    if (Notification.permission === "granted") {
      new Notification("New Task Assigned", {
        body: `${assignedBy} assigned you: "${taskTitle}"`,
        icon: "/task-icon.png",
      });
    }
  };
  