import * as actionTypes from "./constants";
export const menuAction = (list) => ({
  type: actionTypes.SET_MENULIST,
  list,
});
export const roleAction = (role) => ({
  type: actionTypes.SET_ROLE,
  role,
});
export const permissionAction = (permission) => ({
  type: actionTypes.SET_ROLE,
  permission,
});
export const userinfoAction = (userinfo) => ({
  type: actionTypes.SET_USERINFO,
  userinfo,
});
export const loginAction = (status) => ({
  type: actionTypes.SET_LOGIN,
  isLogin: true,
});
export const loginOutAction = (status) => ({
  type: actionTypes.SET_LOGIN,
  isLogin: false,
});
//异步
export const login = () => {
  return (dispatch, getState) => {
    sessionStorage.setItem("isLogin", true);
    dispatch(loginAction(true));
    // setTimeout(() => {
    //   localStorage.setItem("menus", JSON.stringify(menuList));
    //   dispatch(menuAction(menuList));
    // }, 300);
  };
};
