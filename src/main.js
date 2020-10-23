import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@/assets/styles/base.css";
import "@/assets/styles/el-reset.css";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "./assets/iconfont/iconfont.css";
import "./utils/recursionRoutes.js";
//进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
//引入subMenu组件

import qfsubMenu from "qf-sub-menu"

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(qfsubMenu)
//a按需引入
//路由前置钩子-导航守卫 next 放行

router.beforeEach((to, from, next) => {
  NProgress.start()
  //用户登录之后会有token
  let token = localStorage.getItem("wf-token") || null;
  if (token) {
    //如果是注册或者登录页面直接放行
    if (store.state.menuList.length == 0) {
      //说明没有用户路由，触发action获取用户路由
      store.dispatch('FETCH_MENULIST')
        .then(() => {
          next({ path: to.path })
          //这里要注意，next里面要传参数即要进入的页面的路由信息，因为next传参数后，当前要进入的路由会被废止，转而进入参数对应的路由，虽然是同一个路由，这么做主要是为了确保addRoutes生效了

        })
    } else {
      next();
    }

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

//使用路由后置钩子
router.afterEach((to, from) => {
  let crumblist = to.matched.slice(1)
  console.log(crumblist);
  store.commit('SET_CRUMBS', crumblist)
  NProgress.done()
})


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
