import ResetPassword from "components/reset-password";
import { UserProviderContainer } from "context/user";
import React, { lazy, Suspense } from "react";
import { Redirect, Switch } from "react-router-dom";
import Loader from "../loader";
import AdsRoute from "./AdsRoute";
import GuardRoute from "./guard";
import PrivateRoute from "./protected";

const Auth = lazy(() => import(/* webpackChunkName: "Auth" */ "pages/auth"));
const Main = lazy(() => import(/* webpackChunkName: "Main" */ "pages/main"));

const AppRouter = () => (
  <UserProviderContainer>
    <Suspense fallback={<Loader />}>
      <Switch>
        <GuardRoute path="/auth" component={Auth} />
        <PrivateRoute path="/app/ads/createAd" component={AdsRoute} />
        <PrivateRoute path="/app/ads/postAd" component={AdsRoute} />
        <PrivateRoute path="/app/ads/confirmAd" component={AdsRoute} />
        <PrivateRoute path="/app/ads/completeAd" component={AdsRoute} />
        <PrivateRoute path="/app/ads/viewAd" component={AdsRoute} />
        <PrivateRoute path="/app/ads/createOffer" component={AdsRoute} />
        <PrivateRoute path="/app" component={Main} />
        <PrivateRoute
          path="/"
          exact
          component={() => <Redirect to="/app/home" />}
        />
      </Switch>
    </Suspense>
    <ResetPassword />
  </UserProviderContainer>
);
export default AppRouter;
