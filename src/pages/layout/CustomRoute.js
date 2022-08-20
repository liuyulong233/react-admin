import React from "react";
import { connect } from "react-redux";
import { Route, Redirect, Switch } from "react-router-dom";
import * as routeMap from "../../router/routeMap";
import { capitalize } from "../../util/func.js";
const getRouteFromMenuList = (List, path = "") => {
  return List.map((item) => {
    if (item.isLeaf === 1) {
      return (
        <Route
          exact
          key={item._id}
          path={path + item.path}
          component={routeMap[capitalize(item.component)]}
        ></Route>
      );
    } else {
      if (item.isLeaf === 0) {
        return getRouteFromMenuList(item.children, item.path);
      } else {
        return void 0;
      }
    }
  });
};
//菜单重定向
const getRedirectFromMenuList = (List) => {
  return List.filter((item) => item.isLeaf === 0).map((item) => {
    return (
      <Redirect
        key={item._id}
        exact
        from={item.path}
        to={item.path + item.children[0].path}
      ></Redirect>
    );
  });
};
function CustomRoute(props) {
  console.log("CustomRoute", props);
  let { menus } = props;

  return (
    <Switch>
      {/* <Redirect exact from="/system" to="/system/role"></Redirect> */}
      {getRedirectFromMenuList(menus)}
      {getRouteFromMenuList(menus)}
      <Route path="/404" component={routeMap.notfound}></Route>
      <Redirect exact from="/" to="/home"></Redirect>
      {/* 404页面 */}
      <Route path="*" render={() => <Redirect to="/404"></Redirect>}></Route>
    </Switch>
  );
}
const mapStateToProps = (state) => {
  return {
    menus: state.menuList,
  };
};
export default connect(mapStateToProps)(CustomRoute);
