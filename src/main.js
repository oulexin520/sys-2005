import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@/assets/styles/base.css";
import "@/assets/styles/el-reset.css";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "./assets/iconfont/iconfont.css";

Vue.config.productionTip = false;
Vue.use(ElementUI);
//a按需引入
//路由前置钩子-导航守卫 next 放行

router.beforeEach((to, from, next) => {
  // console.log(to);
  // console.log(from);
  //用户登录之后会有token
  let token = localStorage.getItem("wf-token");
  if (token) {
    //如果是注册或者登录页面直接放行
    next();
  } else {
    //没有token
    if (to.path === "/login") {
      next();
    } else {
      //访问的不是登陆页面就跳转到登录页
      next({ path: "/login" });
    }
  }
});
// import {Carousel,CarouselItem} from "element-ui";
// Vue.component("el-carousel",Carousel)
// Vue.component("el-carousel-item",CarouselItem)

import "./utils/recursionRoutes.js";
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

//全局引入：
// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
// Vue.use(ElementUI);

//按需引入：
// "presets": [["es2015", { "modules": false }]],
// "plugins": [
//   [
//     "component",
//     {
//       "libraryName": "element-ui",
//       "styleLibraryName": "theme-chalk"
//     }
//   ]
// ]
//import { 组件名,组件名-item  } from 'element-ui';
