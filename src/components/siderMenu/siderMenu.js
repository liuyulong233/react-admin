import React, { memo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AppstoreOutlined, PieChartOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import { useHistory } from "react-router-dom";
import { connect ,useDispatch,useSelector} from "react-redux";
const { SubMenu } = Menu;
const renderMenu = (list, path = "") => {
  return list.map((item) => {
    if (item.isLeaf === 1) {
      return (
        <Menu.Item key={item.menu_id} icon={<PieChartOutlined />}>
          <Link to={path + item.path}> {item.name}</Link>
        </Menu.Item>
      );
    } else {
      if (item.isLeaf === 0) {
        return (
          <SubMenu
            key={item.menu_id}
            icon={<AppstoreOutlined />}
            title={item.name}
          >
            {renderMenu(item.children, item.path)}
          </SubMenu>
        );
      } else {
        return void 0;
      }
    }
  });
};
function SideMenu(props) {
  // const { menus } = props;
  const menus=useSelector(state=>state.menuList)
  let history = useHistory();
  // console.log('history',history)
  //menu根据url实现自动高亮和展开
  //获取不到重定向后的地址？？
  let paths = history.location.pathname.split("/");
  let selectedKeys = [];
  // let defaultOpenKeys = [];
  const [openKeys, setOpenKeys] = useState([]);
  useEffect(() => {
    console.log("useEffect");
    let paths = history.location.pathname.split("/");
    setOpenKeys([paths[paths.length - 2]]);
  }, []);
  // defaultOpenKeys = [paths[paths.length - 2]];
  selectedKeys = [paths[paths.length - 1]];
  //一个展开，其他关闭
  const onOpenChange = (keys) => {
    console.log(keys, openKeys);
    if (keys.length != 0) {
      setOpenKeys([keys[keys.length - 1]]);
    } else {
      setOpenKeys([]);
    }
  };

  // console.log(paths, defaultOpenKeys);
  return (
    <>
      <Menu
        onOpenChange={onOpenChange}
        style={{ height: "100%" }}
        defaultSelectedKeys={selectedKeys}
        openKeys={openKeys}
        mode="inline"
      >
        {renderMenu(menus)}
      </Menu>
    </>
  );
}
const mapStateToProps = (state) => {
  return {
    menus: state.menuList,
  };
};
// export default connect(mapStateToProps)(SideMenu);
export default SideMenu;
