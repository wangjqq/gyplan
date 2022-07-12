<template>
  <div>
    <template>
      <el-table :data="structureListData" style="width: 100%">
        <el-table-column prop="id" label="id" width="180">
        </el-table-column>
        <el-table-column prop="name" label="题目名" width="180">
        </el-table-column>
        <el-table-column prop="answer" label="题解" width="180">
        </el-table-column>
        <el-table-column prop="state" label="状态" width="180">
        </el-table-column>
        <el-table-column prop="difficulty" label="难度" width="180">
        </el-table-column>
        <el-table-column prop="my_answer" label="我的答案" width="180">
        </el-table-column>
        <el-table-column prop="note" label="备注" width="180">
        </el-table-column>
      </el-table>
    </template>
  </div>
</template>

<script>
import { getDataStructureList } from "../../api/GyKnowledge";

export default {
  data() {
    return {
      structureListData: [],//算法/数据结构数据列表
    }
  },
  created() {
    this.getDataStructureList()
  },
  methods: {
    // 获取算法/数据结构数据列表
    async getDataStructureList() {
      let data = await getDataStructureList()
      this.structureListData = data.data
      console.log(this.structureListData);
    }
  }
}
</script>

<style>
</style>