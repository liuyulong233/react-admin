import React, { memo } from "react";
import { Link } from "react-router-dom";
import { AppstoreOutlined, PieChartOutlined } from "@ant-design/icons";
import { Menu } from "antd";
const { SubMenu } = Menu;
const renderMenu = (list, path = "") => {
  return list.map((item) => {
    if (!item.children && item.isLeaf === 1) {
      return (
        <Menu.Item key={item.id} icon={<PieChartOutlined />}>
          <Link to={path + item.path}> {item.name}</Link>
        </Menu.Item>
      );
    } else {
      if (item.isLeaf === 0) {
        return (
          <SubMenu key={item.id} icon={<AppstoreOutlined />} title={item.name}>
            {renderMenu(item.children, item.path)}
          </SubMenu>
        );
      } else {
        return void 0;
      }
    }
  });
};
function MenuList(props) {
  console.log("menuList 渲染了");
  const { list } = props;
  console.log(renderMenu(list));

  return (
    <Menu
      style={{ height: "100%" }}
      defaultSelectedKeys={["1"]}
      defaultOpenKeys={["sub1"]}
      mode="inline"
    >
      {renderMenu(list)}
    </Menu>
  );
}
export default memo(MenuList);
