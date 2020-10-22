//创建动态路由

const dynamicRoutes = [
  {
    path: "*",
    component: () => import(/* webpackChunkName:'page404' */ "../pages/page404")
  }
];

export default dynamicRoutes;
