<template>
  <el-container>
    <el-aside width="200">
      <h1 class="logo"></h1>
      <!-- 侧边栏 -->
      <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
      </el-radio-group>
      <el-menu
        :default-active="$route.path"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        :router="true"
        :collapse="isCollapse"
      >
        <qf-sub-menu :sideMenu="menuList"></qf-sub-menu>
      </el-menu>
    </el-aside>
    <el-container>
      <!-- 顶部栏 -->
      <el-header>
        <el-row type="flex" class="row-bg" justify="space-around">
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <em
                class="iconfont icon-shouqi"
                @click="isCollapse = !isCollapse"
              ></em>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple-light">千锋管理系统</div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <img :src="imgSrc" alt="" />
              <span>欢迎您</span>
              <span class="nickname" @click="$router.push('/Mine')"
                >{{ $store.state.userInfo.nickname }}
              </span>
              <span class="quit" @click="quit">退出</span>
            </div>
          </el-col>
        </el-row>
      </el-header>
      <!-- 主页内容 -->
      <el-main>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/Welcome' }"
            >首页</el-breadcrumb-item
          >
          <el-breadcrumb-item
            :to="{ path: crumbs.path }"
            v-for="crumbs in crumbs"  :key="crumbs.id"
          >
            {{ crumbs.meta.name }}
          </el-breadcrumb-item>
        </el-breadcrumb>
        <router-view> </router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
//权限菜单
//一个菜单名字对个路由(页面)

// import { getLoginLog } from "@/api";
// import subMenu from "../../components/subMenu"
import { mapState } from "vuex";
export default {
  data() {
    return {
      isCollapse: false,
      imgSrc:
        "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1603280281956&di=b78fade8f0f99e851c85600dda019149&imgtype=0&src=http%3A%2F%2Fpic36.nipic.com%2F20131201%2F13022407_190847577169_2.jpg"
    };
  },
  computed: {
    ...mapState(["userInfo", "menuList", "crumbs"])
  },
  mounted() {
    // getLoginLog().then(res => {
    //   console.log(res);
    // });
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    quit() {
      //退出登录
      //清楚token和userInfo
      //跳转到登录页
      localStorage.removeItem("wf-token");
      localStorage.removeItem("wf-userInfo");
      this.$router.push("/login");
      // 刷新页面
      window.location.reload();
    }
  }
};
</script>
<style>
.el-header {
  background: #003cff3f;
}
.el-row {
  text-align: center;
  vertical-align: middle;
  margin-bottom: 20px;
  /* &:last-child {
    margin-bottom: 0;
  }; */
}
.el-col {
  border-radius: 4px;
  color: #fff;
}
.el-col .icon-shouqi {
  font-size: 30px;
  margin-right: 300px;
}
.el-col img {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  vertical-align: middle;
}
.el-col span {
  margin-left: 20px;
  font: 20px;
}
.el-col a {
  text-decoration: none;
  margin-left: 30px;
  color: #fff;
  font: 20px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
}
.el-footer {
  background-color: #4051eb70;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #4051eb70;
  color: #333;
  text-align: center;
  /* line-height: 200px; */
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-menu-item .iconfont {
  font-size: 20px;
  color: #000;
}

.quit {
  cursor: pointer;
}
</style>
