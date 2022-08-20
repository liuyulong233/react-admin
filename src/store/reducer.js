import { combineReducers } from "redux";
import { loginAction } from "./action";

import * as actionTypes from "./constants";

// const cReducer = combineReducers({
//   recommend: recommendReducer,
//   player: playerReducer
// });
let isLogin =!!sessionStorage.getItem("isLogin") ;
let menus = JSON.parse(localStorage.getItem("menus") || "[]");
let userinfo = JSON.parse(localStorage.getItem("userinfo") || "{}");
let permission = JSON.parse(sessionStorage.getItem("permission") || "{}");
let role = JSON.parse(sessionStorage.getItem("role") || "{}");
let initState = {
  isLogin,
  userinfo,
  menuList: menus,
  permission,
  role,
};
function reducer(state = initState, action) {
  switch (action.type) {
    case actionTypes.SET_MENULIST:
      return { ...state, menuList: action.list };
    case actionTypes.SET_LOGIN:
      return { ...state, isLogin: action.isLogin };
    case actionTypes.SET_USERINFO:
      return { ...state, userinfo: action.userinfo };
    case actionTypes.SET_PERMISSION:
      return { ...state, userinfo: action.permission };
    case actionTypes.SET_ROLE:
      return { ...state, userinfo: action.role };
    default:
      return state;
  }
}

export default reducer;
