import { AuthLayout } from 'components/layout';
import ForgotPasswordProvider from 'context/forgot-password';
import React from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import ForgotPassword from './forgot-password';
import Login from './login';
import ChangePassword from './set-new-password';
import Setup from './setup';
import Signup from './signup';
import Validation from './validation';

type routing = {
  path: string;
};

const Auth = () => {
  let { path }: routing = useRouteMatch();
  return (
    <AuthLayout>
      <ForgotPasswordProvider>
        <Switch>
          <Route exact path={`${path}/login`} component={Login} />
          <Route exact path={`${path}/signup`} component={Signup} />
          <Route exact path={`${path}/setup`} component={Setup} />
          <Route exact path={`${path}/validation`} component={Validation} />
          <Route
            exact
            path={`${path}/forgot-password`}
            component={ForgotPassword}
          />
          <Route
            exact
            path={`${path}/set-new-password`}
            component={ChangePassword}
          />
          <Redirect to={`${path}/login`} />
        </Switch>
      </ForgotPasswordProvider>
    </AuthLayout>
  );
};

export default Auth;
