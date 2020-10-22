import Attendance from "../Pages/Home/Attendance";
import Mine from "../Pages/Home/Mine";
import Statistics from "../Pages/Home/Statistics";
import Users from "../Pages/Home/Users";
import Welcome from "../Pages/Home/Welcome";
import StudentManager from "../Pages/Home/StudentManager";
import studentProduct from "../Pages/Home/StudentManager/studentProduct";
import studentDormitory from "../Pages/Home/StudentManager/studentDormitory";
import studentProfile from "../Pages/Home/StudentManager/studentProfile";
const allRoutes = [
  {
    path: "Welcome",
    name: "Welcome",
    component: Welcome,
    meta: {
      //数据缓存区
      name: "管理首页", //菜单名
      icon: "iconfont icon-shouye", //菜单图标类名
      fullPath: "/Welcome" // 为了后面的跳转
    }
  },
  {
    path: "StudentManager",
    name: "StudentManager",
    redirect: "/StudentManager/studentProduct",
    component: StudentManager,
    meta: {
      name: "学员管理",
      icon: "iconfont icon-xueyuan"
    },
    children: [
      {
        path: "studentProduct",
        name: "studentProduct",
        component: studentProduct,
        meta: {
          name: "学员项目管理",
          icon: "iconfont icon-wode1"
        }
      },
      {
        path: "studentProfile",
        name: "studentProfile",
        component: studentProfile,
        meta: {
          name: "学员资料",
          icon: "iconfont icon-kaoqin2"
        }
      },
      {
        path: "studentDormitory",
        name: "studentDormitory",
        component: studentDormitory,
        meta: {
          name: "学员宿舍",
          icon: "iconfont icon-shuju2"
        }
      }
    ]
  },
  {
    path: "Attendance",
    name: "Attendance",
    component: Attendance,
    meta: {
      name: "考勤管理",
      icon: "iconfont icon-kaoqin"
    }
  },
  {
    path: "Users",
    name: "Users",
    component: Users,
    meta: {
      name: "用户管理",
      icon: "iconfont icon-yonghu"
    }
  },
  {
    path: "Statistics",
    name: "Statistics",
    component: Statistics,
    meta: {
      //用来储存临时信息 数据缓存区
      name: "数据统计", //菜单名
      icon: "iconfont icon-shuju1" //菜单的图标
    }
  },
  {
    path: "Mine",
    name: "Mine",
    component: Mine,
    meta: {
      name: "我的中心",
      icon: "iconfont icon-wode"
    }
  }
];

export default allRoutes;
