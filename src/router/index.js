import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../Pages/Login";
import allroutes from "./allRoutes";

Vue.use(VueRouter);

const routes = [
  {
    name: "login",
    path: "/login",
    component: Login
  },
  {
    path: "/",
    name: "home",
    component: () => import(/* webpackChunkName: "about" */ "../Pages/Home"),
    children: []
  }
];

const router = new VueRouter({
  routes
});

export default router;
