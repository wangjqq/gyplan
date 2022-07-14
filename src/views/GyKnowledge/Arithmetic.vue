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
    <el-dialog title="添加" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
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
            <el-input v-model="form.key_point_name" style="width:300px"></el-input>
          </el-form-item>
          <el-form-item label="知识点内容:">
            <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="form.key_point_content">
            </el-input>
          </el-form-item>
        </div>
        <div v-if="form.is_knowledge_point==0">
          <el-form-item label="题目:">
            <el-input v-model="form.name" style="width:300px"></el-input>
          </el-form-item>
          <el-form-item label="题目解答:">
            <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="form.answer">
            </el-input>
          </el-form-item>
          <el-form-item label="题目状态:">
            <template>
              <el-radio v-model="form.state" label="1">未开始</el-radio>
              <el-radio v-model="form.state" label="2">已解答</el-radio>
              <el-radio v-model="form.state" label="3">尝试过</el-radio>
              <el-radio v-model="form.state" label="4">已牢记</el-radio>
            </template>
          </el-form-item>
          <el-form-item label="难度:">
            <template>
              <el-radio v-model="form.difficulty" label="1" style="margin-left:27px">简单</el-radio>
              <el-radio v-model="form.difficulty" label="2" style="margin-left:16px">中等</el-radio>
              <el-radio v-model="form.difficulty" label="3" style="margin-left:13px">困难</el-radio>
            </template>
          </el-form-item>
          <el-form-item label="我的答案:">
            <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="form.my_answer">
            </el-input>
          </el-form-item>
        </div>
        <el-form-item label="备注:">
          <el-input type="textarea" autosize placeholder="请输入内容" v-model="form.note">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 新建知识点分类的弹出框 -->
    <el-dialog title="新建" :visible.sync="addKeyTypeFormVisible">
      <el-form :model="newKeyTypeForm">
        <el-form-item label="选择分类:">
          <el-cascader v-model="knowledgeType" :options="knowledgeOptions" @change="handleChange" style="margin-left:28px"></el-cascader>
        </el-form-item>
        <el-form-item label="新建:">
          <template>
            <el-radio v-model="newKeyTypeForm.newKeyType" label="0" style="margin-left:63px">父级分类</el-radio>
            <el-radio v-model="newKeyTypeForm.newKeyType" label="1">同级分类</el-radio>
            <el-radio v-model="newKeyTypeForm.newKeyType" label="2">子级分类</el-radio>
          </template>
        </el-form-item>
        <el-form-item label="新建分类名称:">
          <el-input v-model="newKeyTypeForm.newKeyName" style="width:204px"></el-input>
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
        id: '',//题目id
        name: '',//题目名称
        answer: '',//题目解答
        state: '',//题目状态  1 未开始 2 已解答 3 尝试过 4 已牢记
        difficulty: '',//题目难度  1 简单 2  中等 3 困难
        my_answer: '',//我的答案
        is_knowledge_point: '0',//是否是知识点 0 不是 是题目 1 是知识点
        key_point_id: '',//知识点分类id
        key_point_name: '',//知识点的名字
        key_point_content: '',//知识点的内容
        note: '', //备注
      },//添加收集的表单
      newKeyTypeForm: {
        newKeyType: '',//新建分类类型 0 同级分类 1 子级分类
        newKeyName: '',//新建的知识点分类名称
      },//新建知识点表单

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
      // let cloneData = JSON.parse(JSON.stringify(data.data))    // 对源数据深度克隆
      // console.log(cloneData);
      data.data.forEach(element => {
        element.value = element.id
      });

      var rJson = [];
      //将所有的pid的数据加到对应的id数据对象里面去，需要添加一个属性children

      for (var i = 0; i < data.data.length; i++) {
        var arr = [];
        for (var j = 0; j < data.data.length; j++) {
          if (data.data[i].id == data.data[j].father_id) {
            data.data[i].children = arr;
            arr.push(data.data[j]);
          }
        }
      }
      for (var i = 0; i < data.data.length; i++) {
        if (data.data[i].father_id == 0) {
          rJson.push(data.data[i]);
        }
      }
      console.info(rJson);
      this.knowledgeOptions = rJson
    }
  }
}
</script>

<style>
</style>