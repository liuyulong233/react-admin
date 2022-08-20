import { lazy } from "react";

// const cuLazy=async (path='',isLazy=false)=>{
//     if(isLazy){
//         return  lazy(() => import(path))
//     }else{
//       return  await import(path)
//     }
// }

export const notfound = lazy(() => import("../pages/NotFound/NotFound"));
export const Home = lazy(() => import("../pages/home/home"));
export const User = lazy(() => import("../pages/user/user"));
export const Category = lazy(() => import("../pages/category/category"));
export const Role = lazy(() => import("../pages/role/role"));
export const Menu = lazy(() => import("../pages/Menu/Menu"));
export const Permission = lazy(() => import("../pages/Permission/Permission"));
export const Code = lazy(() => import("../pages/Code/Code"));
export const Config = lazy(() => import("../pages/Config/Config"));
export const Upgrade = lazy(() => import("../pages/Upgrade/Upgrade"));