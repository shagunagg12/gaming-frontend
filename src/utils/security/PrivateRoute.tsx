import React from 'react';
import { Route, Routes, Navigate,} from 'react-router-dom';

interface PrivateRouteProps {
  component: React.ComponentType<any>;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ component: Component, ...rest }) => {
  // Here, we check if the user is authenticated
  const isAuthenticated = localStorage.getItem('access_token'); // Or use context/redux to get authentication state


  return (
    <Routes>
      <Route
        {...rest}
        element={
          isAuthenticated ? (
            // If the user is authenticated, render the requested component
            <Component />
          ) : (
            // If not, redirect them to the login page
            <Navigate to="/login" />
          )
        }
      />
    </Routes>
  );
};

export default PrivateRoute;
