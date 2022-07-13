<template>
  <div>
    <el-button type="primary" @click="dialogFormVisible = true">添加</el-button>
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
    <!-- 添加的弹出框 -->
    <el-dialog title="添加" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="添加:">
          <template>
            <el-radio v-model="form.is_knowledge_point" label="0">添加题目</el-radio>
            <el-radio v-model="form.is_knowledge_point" label="1">添加知识点</el-radio>
          </template>
        </el-form-item>
        <div v-if="form.is_knowledge_point==1">
          <el-form-item label="选择知识点分类:">
            <el-cascader v-model="knowledgeType" :options="knowledgeOptions" @change="handleChange"></el-cascader>
            <el-button class="el-icon-plus" @click="addKeyTypeFormVisible = true" style="margin-left:10px">新建</el-button>
          </el-form-item>
          <el-form-item label="知识点名称:">
            <el-input v-model="form.name" style="width:300px"></el-input>
          </el-form-item>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 新建知识点分类的弹出框 -->
    <el-dialog title="新建" :visible.sync="addKeyTypeFormVisible">
      <el-form :model="form">
        <el-form-item label="选择同级分类:">
          <el-cascader v-model="knowledgeType" :options="knowledgeOptions" @change="handleChange"></el-cascader>
        </el-form-item>
        <el-form-item label="新建分类名称:">
          <el-input v-model="newKeyType" style="width:300px"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addKeyTypeFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addKeyTypeFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getDataStructureList, getDataStructureKeyTypeList } from "../../api/GyKnowledge";

export default {
  data() {
    return {
      structureListData: [],//算法/数据结构数据列表
      dialogFormVisible: false,//是否显示添加弹出框
      addKeyTypeFormVisible: false,//是否显示添加知识点分类弹出框
      knowledgeType: [],//选择的知识分类
      knowledgeOptions: [],//算法/数据结构的分类
      form: {
        is_knowledge_point: '0',//是否是知识点 0 不是 是题目 1 是知识点
      },//添加收集的表单
      newKeyType: '',//新建的知识点分类名称
    }
  },
  created() {
    this.getDataStructureList()
    this.getDataStructureKeyTypeList()
  },
  methods: {
    // 获取算法/数据结构数据列表
    async getDataStructureList() {
      let data = await getDataStructureList()
      this.structureListData = data.data
    },
    // 获取数据结构/算法知识点分类列表
    async getDataStructureKeyTypeList() {
      let data = await getDataStructureKeyTypeList()
      data.data.forEach((value, index, array) => {
        if (value.father_id == 1) {
          this.knowledgeOptions.push({ value: value.id, label: value.name })
        }
      });
    }
  }
}
</script>

<style>
</style>