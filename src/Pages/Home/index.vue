<template>
  <el-container>
    <el-aside width="200">
      <!-- 侧边栏 -->
      <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
        <!-- <el-radio-button :label="false">展开</el-radio-button>
        <el-radio-button :label="true">收起</el-radio-button> -->
      </el-radio-group>
      <el-menu
        default-active="1-4-1"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        :router="true"
        :collapse="isCollapse"
      >
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span slot="title">导航一</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="1-1">选项1</el-menu-item>
            <el-menu-item index="1-2">选项2</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item index="/student">
          学员信息
        </el-menu-item>
        <el-menu-item index="/student">管理信息</el-menu-item>
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
              <span class="quit">退出</span>
            </div>
          </el-col>
        </el-row>
      </el-header>
      <el-main>
        <router-view> </router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
//权限菜单
//一个菜单名字对应一个路由(页面)
//
export default {
  data() {
    return {
      isCollapse: false,
      imgSrc:
        "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1603280281956&di=b78fade8f0f99e851c85600dda019149&imgtype=0&src=http%3A%2F%2Fpic36.nipic.com%2F20131201%2F13022407_190847577169_2.jpg"
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
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
/* .el-aside h1 {
  color: #fff;
} */
/* .el-aside {
    background: linear-gradient(135deg, #5635df, #4c67ff);
  }
  .el-menu {
    border-right: solid 1px #48a916 !important;
  } */
</style>
