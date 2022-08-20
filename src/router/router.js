import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import React, { lazy, Suspense } from "react";
import Layout from "../pages/layout/layout";
import Login from "../pages/login/login";
import { connect } from "react-redux";

function Loading() {
  return <div></div>;
}

// const Layout = lazy(() => import("./pages/layout/layout"));
//const notfound = lazy(() => import("./pages/NotFound/NotFound"));
// const Login = lazy(() => import("./pages/login/login"));

function RouterView(props) {
  console.log(props);
  return (
    //
    <Router>
      <Switch>
        <Route path="/login" component={Login}></Route>

        <Suspense fallback={<Loading />}>
          <Route
            path="/"
            render={() => {
              if (props.isLogin) {
                return <Layout></Layout>;
              } else {
                return <Redirect to="/login"></Redirect>;
              }
            }}
          ></Route>
        </Suspense>
      </Switch>
    </Router>
    //
  );
}
const mapStateToProps = (state) => {
  return {
    isLogin: state.isLogin,
  };
};

export default connect(mapStateToProps)(RouterView);
