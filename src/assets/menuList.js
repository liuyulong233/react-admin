let arr = [
  {
    id: 1,
    path: "/home",
    component: "Home",
    name: "首页",
    isLeaf: 1,
    
  },
  {
    id: 2,
    path: "/system",
    name: "系统管理",
    isLeaf: 0,
    children: [
      {
        id: 3,
        path: "/user",
        component: "User",
        name: "用户",
        isLeaf: 1,
      },
      {
        id: 4,
        path: "/role",
        component: "Role",
        name: "角色",
        isLeaf: 1,
      },
    ],
  },
  {
    id: 5,
    path: "/center",
    name: "内容中心",
    isLeaf: 0,
    children: [
      {
        id: 6,
        path: "/category",
        component: "Category",
        name: "分类",
        isLeaf: 1,
      },
    
    ],
  },
];
export default arr;
