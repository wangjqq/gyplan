<template>
  <div>
    <el-container>
      <el-header>
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" router>
          <el-menu-item v-for="(item, index) in knowledgeListData" :key="index" :index="item.routerName">{{item.name}}</el-menu-item>
        </el-menu>
      </el-header>
      <!-- <el-aside width="200px">
        <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
      </el-aside> -->
      <el-main>
        <router-view></router-view>
      </el-main>
      <el-footer></el-footer>
    </el-container>
  </div>
</template>

<script>
import { getKnowledgeList } from '../../api/GyKnowledge'

export default {
  data() {
    return {
      activeIndex: '/GyKnowledgeIndex',//顶部选中导航菜单栏
      knowledgeListData: [],//知识分组列表
      data: [{
        label: '一级 1',
        children: [{
          label: '二级 1-1',
          children: [{
            label: '三级 1-1-1'
          }]
        }]
      }, {
        label: '一级 2',
        children: [{
          label: '二级 2-1',
          children: [{
            label: '三级 2-1-1'
          }]
        }, {
          label: '二级 2-2',
          children: [{
            label: '三级 2-2-1'
          }]
        }]
      }, {
        label: '一级 3',
        children: [{
          label: '二级 3-1',
          children: [{
            label: '三级 3-1-1'
          }]
        }, {
          label: '二级 3-2',
          children: [{
            label: '三级 3-2-1'
          }]
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  created() {
    this.getKnowledgeList()
  },
  methods: {
    // 树形控件点击事件
    handleNodeClick(data) {
      console.log(data);
    },
    // 获取知识分组列表
    async getKnowledgeList() {
      let data = await getKnowledgeList()
      this.knowledgeListData = data.data
    }
  }
}
</script>

<style lang="less" scoped>
// .el-main {
//   background-color: #111;
// }
</style>