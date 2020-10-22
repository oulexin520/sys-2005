import axios from "axios";
import router from "../router";
import ElementUI from "element-ui";

axios.defaults.baseURL =
  process.env.NODE_ENV === "development" ? "/api" : "http://www.chst.vip";
axios.defaults.withCredentials = true; //允许请求携带认证
//创建请求拦截器，可以给每个请求都携带上想要传递的内容
//config指的是每一个请求对象,每次请求的时候，携带token
axios.interceptors.request.use(config => {
  // 将token给到一个前后台约定好的key中，作为请求发送
  //不能给登录和注册携带token 因为要先登录才可以

  //验证码和校验验证码都不需要token

  if (config.url == "/users/login") {
    return config;
  } else {
    let token = localStorage.getItem("wf-token");
    config.headers["authorization"] = token;
    return config;
  }
});

//响应式拦截
axios.interceptors.response.use(config => {
  //console.log(config);
  let { data } = config;
  if (data.code == "1004") {
    //在当前api1004代表校验失败，提示错误，并且让页面跳转到登录页
    ElementUI.Message.error("登录信息失效，请重新登录");
    router.push("/login");
  }
  return config;
});

axios.create({
  timeout: 4000
});

export default axios;
