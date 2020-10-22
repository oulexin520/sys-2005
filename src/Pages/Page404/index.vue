<template>
  <div>
    <p>对不起，您请求的页面不存在、或已被删除、或暂时不可用</p>
    <p>
      <a href="url" onclick="javascript:history.back(-1);return false;">
        返回上一个页面
      </a>
      <br />
    </p>
    <p>
      <router-link to="/">
        返回网站首页
      </router-link>
    </p>
  </div>
</template>
