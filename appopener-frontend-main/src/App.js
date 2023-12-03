import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Ads from "./components/Ads";

const Homepage = lazy(() => import("./pages/Home"));
const Splashpage = lazy(() => import("./pages/Splash"));
const Testpage = lazy(() => import("./pages/test"));
const Dashboard_home = lazy(() => import("./dashboard/homepage"));
const DiwaliPage = lazy(() => import("./pages/Diwali"));
const SharedCardPage = lazy(() => import("./pages/SharedCard"));
// const Ads = lazy(() => import('./components/GoogleAd') );
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
// const renderLoader = () => <p>Loading</p>;

const PrivateRoute = (props) => {
  const token = localStorage.getItem("aop_token");
  if (token) {
    return <Route exact={true} path={props.path} component={props.component} />;
  } else {
    return <Homepage {...props} />;
  }
};

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route exact path="/" component={Homepage}></Route>
          {/* <Route
            exact
            path="/:apptype/:shorturl"
            component={Splashpage}
          ></Route> */}

          <Route exact path="/diwali/:id/:name" component={SharedCardPage} />
          <Route exact path="/:apptype/:shorturl" component={DiwaliPage} />
          <Route exact path="/user" component={Testpage}></Route>
          <Route exact path="/privacypolicy" component={PrivacyPolicy}></Route>

          {/* <Route exact path='/ads.txt' component={Ads}></Route> */}
          <PrivateRoute
            path="/dashboard"
            component={Dashboard_home}
          ></PrivateRoute>
          {/* this if for error page 404 */}
          <Route component={Homepage}></Route>
        </Switch>
      </Suspense>
      {/* <Ads /> */}
    </Router>
  );
}

export default App;
