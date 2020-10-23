//创建动态路由 
import Home from "../Pages/Home";

const dynamicRoutes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    children:[]// 后期动态获取的
  },
  {
    path: "*",
    component: () => import(/* webpackChunkName:'page404' */ "../Pages/Page404")
  }
  
];

export default dynamicRoutes;
