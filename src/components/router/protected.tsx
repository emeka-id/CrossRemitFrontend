import { Constants } from 'core/utils/constants';
import { SecureStorage } from 'core/utils/storage';
import React, { FC } from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { AppLayout } from '../layout';

interface PrivateRouteProps extends Omit<RouteProps, "component"> {
  component: React.ElementType;
}

const PrivateRoute: FC<PrivateRouteProps> = ({ component: Component, ...args }) => {
  const secureStorage = new SecureStorage();
  const isAuthenticated = secureStorage.getItem(Constants.token);
  return (
    <Route
      {...args}
      render={(props) =>
        isAuthenticated ? (
          <AppLayout>
            <Component {...props} />
          </AppLayout>
        ) : (
          <Redirect to="/auth" />
        )
      }
    />
  );
};
export default PrivateRoute;
