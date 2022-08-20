import React, {  } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { login,menuAction,userinfoAction ,permissionAction,roleAction} from "../../store/action";
// import style from "./style.module.css";
import "./style.scss";
// import { Wrapper } from "./style";
import { Form, Input, Button,message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import api from "../../api/login";
import roleApi from "../../api/role";
import {formatMenus} from "../../util/func.js";
function Login(props) {
  console.log(props);
  let history = useHistory();
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
let {setMenuList,setUserInfo,setPermissionList,setRoleInfo} =props
    api
      .login(values)
      .then(async (res) => {
        console.log("res", res);
        setUserInfo(res.data)
        sessionStorage.setItem('token',res.token)
        let { data: menus } = await api.getPermissionMenuList();
        let menuList = formatMenus(menus);
        console.log(menuList);
        setMenuList(menuList);
        roleApi
          .getPermissionByRole({ role: res.data.role })
          .then((res) => {
            setPermissionList(res.data.permission);
            setRoleInfo(res.data);
          });
        props.login();
        message.success('登录成功');
        history.push({
          pathname: "/",
        });
      })
      .catch((err) => {});
  };
  return (
    <div className="wrap">
      <div className="card">
        <h2>登录</h2>
        <Form
          name="normal_login"
          className="form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your Username!" }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="账号"
              allowClear
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="密码"
              allowClear
            />
          </Form.Item>
          <Form.Item name="code">
            <div className="form-item">
              <Input
                type="text"
                className="code"
                placeholder="验证码"
                allowClear
              />

              <img src="" className="img" alt="" />
            </div>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              block
            >
              立即登录
            </Button>
          </Form.Item>
        </Form>
      </div>

      {/* <div className={style.card}>
        登录
        <Button onClick={e=>handleLogin()}>登录</Button>
        <h3>{props.isLogin ? "已登录" : "未登录"}</h3>
        <HYButton>登录</HYButton>
      </div> */}
    </div>
  );
}
const mapDispatchToProps = (dispatch) => {
  return {
    login() {
      dispatch(login());
    },
    setMenuList(list){
      localStorage.setItem('menus',JSON.stringify(list))
      dispatch(menuAction(list))
    },
    setUserInfo(val){
      localStorage.setItem('userinfo',JSON.stringify(val))
      dispatch(userinfoAction(val))
    },
    setPermissionList(val){
      sessionStorage.setItem('permission',JSON.stringify(val))
      dispatch(permissionAction(val))
    },
    setRoleInfo(val){
      sessionStorage.setItem('role',JSON.stringify(val))
      dispatch(roleAction(val))
    }
  };
};
const mapStateToProps = (state) => {
  return {
    isLogin: state.isLogin,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
