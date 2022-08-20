import React from "react";
import { Layout } from "antd";
import SiderMenu from "../../components/siderMenu/siderMenu";
import HeaderNav from "../../components/header/header";
import CustomRoute from "./CustomRoute";
const { Header, Sider, Content } = Layout;
export default function layout(props) {
  console.log("layout 渲染了", props);
  return (
    <Layout>
      <Sider>
        <SiderMenu></SiderMenu>
      </Sider>
      <Layout>
        <Header>
          <HeaderNav></HeaderNav>
        </Header>
        <Content>
          <CustomRoute></CustomRoute>
        </Content>
      </Layout>
    </Layout>
  );
}
