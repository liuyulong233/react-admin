import React, { memo } from "react";
import { Button } from "antd";
import { useSelector } from "react-redux";
let rightsMap = {
    d: "D",//能删除模块内容
    u: "U",//能修改模块内容
    c: "C",//能增加模块内容
    r: "R", //能显示模块内容
    check: "CHECK",// 模块有审核功能 
   
}
let checkRight = (operation,permission=[]) =>{
    let right=rightsMap[operation];
    return permission.join('').includes(right)
}
 function AuthButton(props) {
  let permissions=  useSelector(state=>state.permission)
  // console.log( permissions);
  let { auth, children } = props;
  let [model,operation]=auth.split(":")

  let newProps={
      ...children.props,
      disabled:!checkRight(operation,permissions[model])
  }
//   console.log( checkRight(operation,permissions[model]));
  return React.cloneElement(children, newProps);
}
export default memo(AuthButton)