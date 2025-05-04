import { Navigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const PrivateRoute = ({ children }) => {
  const [cookies] = useCookies(['token']);

  const isAuthenticated = cookies.token !== undefined && cookies.token !== null;

  return isAuthenticated ? children : <Navigate to="/auth" />;
};

export default PrivateRoute;
