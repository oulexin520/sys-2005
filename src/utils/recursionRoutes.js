//recursionRoute 用来处理路由的
//根据服务器用户返回的menulist数据和allroute进行匹配，得到符合当前的用户的有效路由配置
/**
 * @param {Array} allroutes 用户的有效的完整路由配置
 * @param {Array} menuList 服务器返回的用户菜单名字
 *
 *
 */
import allRoutes from "../router/allRoutes";

const recursionRoutes = (allRoutes, menuList) => {
  let userRoutes = [];
  allRoutes.forEach(item => {
    menuList.forEach(v => {
      if (item.meta.name === v.name) {
        if (v.children && Array.isArray(v.children)) {
          item.children = recursionRoutes(item.children, v.children);
        }
        userRoutes.push(item);
      }
    });
  });
  return userRoutes;
};

export default recursionRoutes;

//进行调试的
// let menuList =[
//    {
//        "name":"管理首页"
//    },
//    {
//        "name":"学员管理",
//        "chidren":[
//            {
//                "name":"学员项目管理"
//            }
//        ]

//    },
//    {
//        "name":"我的中心"
//    }
// ]

//   console.log(recursionRoutes(allRoutes,menuList));
