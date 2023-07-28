import React, { } from 'react';
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
  element: any;
  isAuthenticated: boolean;
  [key: string]: any;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element: Element, isAuthenticated, ...rest }) => {
  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return <Element {...rest} />;
};

export default PrivateRoute;
