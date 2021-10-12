import { AppLayout } from "components";
import CompleteAd from "pages/main/ads/completeAd";
import ConfirmAd from "pages/main/ads/confirmAd";
import CreateOffer from "pages/main/ads/createOffer";
import CreateAds from "pages/main/ads/createAd";
import PostAd from "pages/main/ads/postAd";
import ViewAd from "pages/main/ads/viewAd";
import React from "react";
import { Switch, Route } from "react-router-dom";

const AdsRoute = () => {
  return (
    <div>
      <Switch>
        <Route path="/app/ads/createAd">
          <CreateAds />
        </Route>
        <Route path="/app/ads/postAd">
          <PostAd />
        </Route>
        <Route path="/app/ads/confirmAd">
          <ConfirmAd />
        </Route>
        <Route path="/app/ads/completeAd">
          <CompleteAd />
        </Route>
        <Route path="/app/ads/viewAd">
          <ViewAd />
        </Route>
        <Route path="/app/ads/createOffer">
          <CreateOffer />
        </Route>
      </Switch>
    </div>
  );
};

export default AdsRoute;
