import React from "react";
import { connect } from "react-redux";
import { Button } from "antd";
import { useHistory } from "react-router-dom";
import { loginOutAction } from "../../store/action";
function Header(props) {
  let history = useHistory();

  const logout = () => {
    props.loginout();
    history.push({
      pathname:"/login"
    })
  };
  return (
    <div className="h-full flex justify-end align-middle">
      <Button onClick={logout}>退出</Button>
    </div>
  );
}
const mapDispatchToProps = (dispatch) => {
  return {
    loginout() {
      sessionStorage.clear()
      dispatch(loginOutAction);
    },
  };
};
const mapStateToProps = (state) => {
  return {
    isLogin: state.isLogin,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Header);
