import React, { FC } from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { AppLayout } from '../layout';

interface PrivateRouteProps extends Omit<RouteProps, "component"> {
  component: React.ElementType;
}

const PrivateRoute: FC<PrivateRouteProps> = ({ component: Component, ...args }) => {
  
  const isAuthenticated = true;
  return (
    <Route
      {...args}
      render={(props) =>
        isAuthenticated ? (
          <AppLayout>
            <Component {...props} />
          </AppLayout>
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};
export default PrivateRoute;
