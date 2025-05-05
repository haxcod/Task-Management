import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthenticationPage from "./pages/Authentication";
import CreateTaskPage from "./pages/CreateTask";
import { ToastContainer } from 'react-toastify';
import PrivateRoute from "./routes/PrivateRoute";
import TaskDashboard from "./pages/TaskDashboard";
import UpdateTask from "./pages/UpdateTask";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const routes = createBrowserRouter([
    {
      path: "/auth",
      element: <AuthenticationPage />,
    },
    {
      path: "/",
      element: (
        <PrivateRoute>
          <TaskDashboard />
        </PrivateRoute>
      ),
    },
    {
      path: "/task-create",
      element: (
        <PrivateRoute>
          <CreateTaskPage />
        </PrivateRoute>
      ),
    },
    {
      path: "/task-edit",
      element: (
        <PrivateRoute>
          <UpdateTask />
        </PrivateRoute>
      ),
    },
  ]);

  return (
    <>
      <RouterProvider router={routes} />
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;
