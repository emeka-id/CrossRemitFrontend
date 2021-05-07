import React from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import Deposit from './deposit';
import Home from './home';
import Invest from './invest';
import MyInvestment from './my-investment';
import Transaction from './transaction';
import Settings from './settings';
import Withdrawal from './withdraw';

type routing = {
  path: string;
};

const Main = () => {
  let { path }: routing = useRouteMatch();
  return (
    <Switch>
      <Route exact path={`${path}/home`} component={Home} />
      <Route exact path={`${path}/invest`} component={Invest} />
      <Route exact path={`${path}/deposit`} component={Deposit} />
      <Route exact path={`${path}/withdraw`} component={Withdrawal} />
      <Route exact path={`${path}/my-investment`} component={MyInvestment} />
      <Route exact path={`${path}/transaction`} component={Transaction} />
      <Route exact path={`${path}/settings`} component={Settings} />
      <Redirect to={`${path}/home`} />
    </Switch>
  );
};

export default Main;
