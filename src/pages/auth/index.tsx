import { AuthLayout } from 'components/layout';
import { UserProviderContainer } from 'context/user';
import React from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import Login from './login';
import Setup from './setup';
import Signup from './signup';
import Validation from './validation';

type routing = {
  path: string;
};

const Auth = () => {
  let { path }: routing = useRouteMatch();
  return (
    <UserProviderContainer>
      <AuthLayout>
        <Switch>
          <Route exact path={`${path}/login`} component={Login} />
          <Route exact path={`${path}/signup`} component={Signup} />
          <Route exact path={`${path}/setup`} component={Setup} />
          <Route exact path={`${path}/validation`} component={Validation} />
          <Redirect to={`${path}/login`} />
        </Switch>
      </AuthLayout>
    </UserProviderContainer>
  );
};

export default Auth;
