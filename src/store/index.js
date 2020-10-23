import Vue from "vue";
import Vuex from "vuex";
import { getMenuList } from "@/api";
//引入allRoutes
import allRoutes from "../router/allRoutes"
//引入递归函数
import recursionRoutes from "../utils/recursionRoutes"
//引入动态路由dynamicRotes
import dynamicRoutes from "../router/dynamicRoutes"
//引入router
import router from "../router"



Vue.use(Vuex);
//刷新页面会丢失用户信息，所以要从localstorage中取
let userInfo = localStorage.getItem("wf-userInfo") || "{}";
userInfo = JSON.parse(userInfo)

export default new Vuex.Store({
  state: {
    userInfo: {},
    //定义用户侧边栏菜单
    sideMenu: [],
    menuList: [],//用户的侧边栏
    crumbs:[]
  },
  mutations: {
    //更改userInfo
    SET_USERINFO(state, payload) {
      state.userInfo = payload;
    },
    SET_MENULIST(state, payload) {
      state.menuList = payload;
      console.log(state.menuList);
      //动态将路由调价到routes中，核心方法：router.addRoutes(符合路由配置规则的数据)
      //将menuList赋值给dynamicRoutes的children
      let target = dynamicRoutes.find(item => item.path === "/")
      target.children=[...state.menuList]
      //动态添加路由配置到router
      router.addRoutes(dynamicRoutes)
    },
    SET_CRUMBS(state,payload){
      state.crumbs =payload
    }
  },
  actions: {
    //发送请求，获取用户菜单数据
    async FETCH_MENULIST({ commit }) {
      //通过allRoutes和请求回来的用户菜单数据进行对比，将结果提交给mutation
      let userMenu = await getMenuList()
      console.log(userMenu);
      let sideMenu = recursionRoutes(allRoutes, userMenu.data.menuList)
      //将结果提交给mutation
      commit("SET_MENULIST", sideMenu)
    }
  },
  modules: {}
});
