import { UserProviderContainer } from 'context/user';
import React, { lazy, Suspense } from 'react';

import { Switch, Redirect } from 'react-router-dom';
import Loader from '../loader';
import GuardRoute from './guard';
import PrivateRoute from './protected';

const Auth = lazy(() => import(/* webpackChunkName: "Auth" */ 'pages/auth'));
const Main = lazy(() => import(/* webpackChunkName: "Main" */ 'pages/main'));

const AppRouter = () => (
  <UserProviderContainer>
    <Suspense fallback={<Loader />}>
      <Switch>
        <GuardRoute path="/auth" component={Auth} />
        <PrivateRoute path="/app" component={Main} />
        <PrivateRoute
          path="/"
          exact
          component={() => <Redirect to="/app/home" />}
        />
      </Switch>
    </Suspense>
  </UserProviderContainer>
);
export default AppRouter;
