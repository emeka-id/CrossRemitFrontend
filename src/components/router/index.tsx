import React, { lazy, Suspense } from 'react';

import { Route, Switch, Redirect } from 'react-router-dom';
import Loader from '../loader';
import PrivateRoute from './protected';

const Auth = lazy(() => import(/* webpackChunkName: "Auth" */ 'pages/auth'));
const Main = lazy(() => import(/* webpackChunkName: "Main" */ 'pages/main'));

const AppRouter = () => (
    <Suspense fallback={<Loader />}>
      <Switch>
        <Route path="/auth" component={Auth} />
        <PrivateRoute path="/app" component={Main} />
        <PrivateRoute
          path="/"
          exact
          component={() => <Redirect to="/app/home" />}
        />
      </Switch>
    </Suspense>
);
export default AppRouter;
