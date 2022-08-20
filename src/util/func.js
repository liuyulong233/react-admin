//将权限菜单列表树形结构化
export function formatMenus(menus, id = void 0) {
  let data = [];
  for (let i = 0; i < menus.length; i++) {
    let item = menus[i];

    if (item.pid === id) {
      data.push(item);
      //已经找出的数据，在自己的递归中不必再找，减少下一次递归中循环的次数
      let _menus = JSON.parse(JSON.stringify(menus));
      _menus.splice(i, 1);
      item.children = formatMenus(_menus, item.menu_id);
    }
  }
  //降序排列
  data.sort((a, b) => {
    return b.order - a.order;
  });
  return data;
}
//首字母大写
export function capitalize([first, ...rest]) {
  return first.toUpperCase() + rest.join("");
}
export function formatDate(value) {
  var date = new Date(value);
  var y = date.getFullYear(),
    m = date.getMonth() + 1,
    d = date.getDate(),
    h = date.getHours(),
    i = date.getMinutes(),
    s = date.getSeconds();
  if (m < 10) {
    m = "0" + m;
  }
  if (d < 10) {
    d = "0" + d;
  }
  if (h < 10) {
    h = "0" + h;
  }
  if (i < 10) {
    i = "0" + i;
  }
  if (s < 10) {
    s = "0" + s;
  }
  var t = y + "-" + m + "-" + d + " " + h + ":" + i + ":" + s;
  return t;
}
