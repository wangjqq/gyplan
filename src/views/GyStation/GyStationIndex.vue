<template>
  <div>
    <el-container>
      <el-header>
        <el-menu :default-active="activeIndex" class="top-menu" mode="horizontal" router @select="handleSelect" background-color="#333" text-color="#0b0b0b" active-text-color="#fff">
          <div class="fl">
            <el-menu-item style="color: #b0b0b0;" index="/1">顾渊工作站</el-menu-item>
            <el-menu-item style="color: #b0b0b0;" index="/1">WYUI</el-menu-item>
            <el-menu-item style="color: #b0b0b0;" index="/1">IoT</el-menu-item>
            <el-menu-item style="color: #b0b0b0;" index="/1">云服务</el-menu-item>
            <el-menu-item style="color: #b0b0b0;" index="/1">开放平台</el-menu-item>
            <el-menu-item style="color: #b0b0b0;" index="/1">企业团购</el-menu-item>
            <el-menu-item style="color: #b0b0b0;" index="/1">协议规则</el-menu-item>
            <el-menu-item style="color: #b0b0b0;" index="/1">下载App</el-menu-item>
            <el-menu-item style="color: #b0b0b0;" index="/1">智能生活</el-menu-item>
          </div>

          <div class="fr">
            <el-menu-item style="color: #b0b0b0;" index="1">登录</el-menu-item>
            <el-menu-item style="color: #b0b0b0;" index="1">注册</el-menu-item>
          </div>

        </el-menu>
      </el-header>
      <el-main></el-main>
      <el-footer></el-footer>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: '/1'//顶部导航菜单索引
    }
  },
}
</script>

<style lang="less" scoped>
.el-header {
  padding: 0px;
}
.el-menu-item {
  height: 40px;
  line-height: 40px;
  display: inline;
}
.top-menu {
  padding: 0 50px 0 50px;
}
</style>