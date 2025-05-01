import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthenticationPage from "./pages/Authentication";
import CreateTaskPage from "./pages/CreateTask";
import TaskDashboard from "./pages/TaskDashboard";

function App() {
  const routes = createBrowserRouter([
    {
      path: "/auth",
      element: <AuthenticationPage />,
    },
    {
      path: "/",
      element: <TaskDashboard />,
    },
    {
      path: "/task-create",
      element: <CreateTaskPage />,
    },
  ]);

  return <RouterProvider router={routes} />;
}

export default App;
