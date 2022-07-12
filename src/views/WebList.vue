<template>
  <div>
    <el-container>
      <el-header>
        <el-menu class="el-menu-demo" mode="horizontal" @select="handleSelect" :default-active="activeIndex" router>
          <el-menu-item index="/Index">
            <span>首页</span>
          </el-menu-item>
          <el-menu-item index="/GyStation">
            <span>顾渊工作站</span>
          </el-menu-item>
          <el-menu-item index="/GyKnowledge">
            <span>顾渊知识站</span>
          </el-menu-item>
          <el-menu-item index="/GyShop">
            <span>顾渊商城</span>
          </el-menu-item>
          <el-menu-item index="/House">
            <span>快客租房</span>
          </el-menu-item>
          <el-menu-item index="/StopWatch">
            <span>码表管理系统</span>
          </el-menu-item>
          <el-menu-item index="/Admin">
            <span>商城管理系统</span>
          </el-menu-item>
        </el-menu>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "WebList",
  data() {
    return {
      activeIndex: '/Index'
    }
  },
  methods: {
    // 菜单选中事件
    handleSelect(key, keyPath) {
      this.activeIndex = key
      // this.addTab(key);
    }
  }
}
</script>

<style>
</style>