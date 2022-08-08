<template>
  <div>
    <el-select v-model="typeValue" placeholder="请选择">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
      </el-option>
    </el-select>
    <el-button type="primary" @click="dialogFormVisible = true" class="addBtn">添加</el-button>
    <template>
      <el-table v-if="structureListDataNew[0].is_knowledge_point==0" :data="structureListDataNew" style="width: 100%" stripe border @row-click="tableRowClick">
        <el-table-column prop="id" label="id" width="180" header-align="center">
        </el-table-column>
        <el-table-column prop="name" label="题目名" width="180" header-align="center">
        </el-table-column>
        <el-table-column prop="answer" label="题解" width="180" header-align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="state" label="状态" width="220" header-align="center">
          <template slot-scope="scope">
            <el-rate v-model="scope.row.state" show-text disabled :texts="stateTexts"></el-rate>
          </template>
        </el-table-column>
        <el-table-column prop="difficulty" label="难度" width="200" header-align="center">
          <template slot-scope="scope">
            <el-rate v-model="scope.row.difficulty" show-text disabled :texts="difficultyTexts"></el-rate>
          </template>
        </el-table-column>
        <el-table-column prop="my_answer" label="我的答案" width="180" header-align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="createdTime" label="创建时间" width="200" header-align="center">
        </el-table-column>
      </el-table>

      <el-table v-else :data="structureListDataNew" style="width: 100%" stripe border @row-click="tableRowClick">
        <el-table-column prop="id" label="id" width="180" header-align="center">
        </el-table-column>
        <el-table-column prop="knowledgeType" label="知识点分类" width="180" header-align="center">
        </el-table-column>
        <el-table-column prop="key_point_name" label="知识点名称" width="180" header-align="center">
        </el-table-column>
        <el-table-column prop="key_point_content" label="知识点内容" width="180" header-align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="createdTime" label="创建时间" width="200" header-align="center">
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
            <el-cascader v-model="form.knowledgeType" :options="knowledgeOptions"></el-cascader>
            <el-button class="el-icon-plus" @click="addKeyTypeFormVisible = true" style="margin-left:10px">新建</el-button>
          </el-form-item>
          <el-form-item label="知识点名称:">
            <el-input v-model="form.key_point_name" style="width:300px"></el-input>
          </el-form-item>
          <el-form-item label="知识点内容:">
            <el-input type="textarea" autosize placeholder="请输入内容" v-model="form.key_point_content">
            </el-input>
          </el-form-item>
        </div>
        <div v-if="form.is_knowledge_point==0">
          <el-form-item label="题目:">
            <el-input v-model="form.name" style="width:300px"></el-input>
          </el-form-item>
          <el-form-item label="题目描述:">
            <el-input v-model="form.description" type="textarea" autosize placeholder="请输入内容"></el-input>
          </el-form-item>
          <el-form-item label="题目解答:">
            <el-input type="textarea" autosize placeholder="请输入内容" v-model="form.answer">
            </el-input>
          </el-form-item>
          <el-form-item label="题目状态:">
            <template>
              <el-radio v-model="form.state" label="1">未开始</el-radio>
              <el-radio v-model="form.state" label="2">尝试过</el-radio>
              <el-radio v-model="form.state" label="3">多次尝试过</el-radio>
              <el-radio v-model="form.state" label="4">已解答</el-radio>
              <el-radio v-model="form.state" label="5">已牢记</el-radio>
            </template>
          </el-form-item>
          <el-form-item label="难度:">
            <template>
              <el-radio v-model="form.difficulty" label="1" style="margin-left:27px">简单</el-radio>
              <el-radio v-model="form.difficulty" label="2" style="margin-left:16px">较简单</el-radio>
              <el-radio v-model="form.difficulty" label="3" style="margin-left:13px">较难</el-radio>
              <el-radio v-model="form.difficulty" label="4" style="margin-left:13px">难</el-radio>
              <el-radio v-model="form.difficulty" label="5" style="margin-left:13px">极难</el-radio>
            </template>
          </el-form-item>
          <el-form-item label="我的答案:">
            <el-input type="textarea" autosize placeholder="请输入内容" v-model="form.my_answer">
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
        <el-button type="primary" @click="dialogFormVisible = false,addDataStructure()">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 新建知识点分类的弹出框 -->
    <el-dialog title="新建" :visible.sync="addKeyTypeFormVisible">
      <el-form :model="newKeyTypeForm">
        <el-form-item label="选择分类:">
          <el-cascader v-model="knowledgeType" :options="knowledgeOptions" :props="{ checkStrictly: true }" style="margin-left:28px"></el-cascader>
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
        <el-button type="primary" @click="addKeyTypeFormVisible = false,addDataStructureKeyType()">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 点击知识的弹出框 -->
    <el-dialog title="知识详情" :visible.sync="knowledgeDetailPageVisible">
      <el-form :model="knowledgeDetail">
        <el-form-item label="知识ID:">
          {{knowledgeDetail.id}}
        </el-form-item>
        <div>
          <el-form-item label="题目名称:">
            <el-input v-model="knowledgeDetail.name" style="width:204px"></el-input>
          </el-form-item>
          <el-form-item label="创建时间:">
            {{knowledgeDetail.createdTime}}
          </el-form-item>
          <el-form-item label="题目状态:">
            <el-rate v-model="knowledgeDetail.state" show-text :texts="stateTexts"></el-rate>
          </el-form-item>
          <el-form-item label="题目难度:">
            <el-rate v-model="knowledgeDetail.difficulty" show-text :texts="difficultyTexts"></el-rate>
          </el-form-item>
          <el-form-item label="题目描述:">
            <el-input type="textarea" autosize placeholder="请输入内容" v-model="knowledgeDetail.description">
            </el-input>
          </el-form-item>
          <el-form-item label="我的答案:">
            <el-input type="textarea" autosize placeholder="请输入内容" v-model="knowledgeDetail.my_answer">
            </el-input>
          </el-form-item>
          <el-form-item label="题目答案:">
            <el-input type="textarea" autosize placeholder="请输入内容" v-model="knowledgeDetail.answer">
            </el-input>
          </el-form-item>
        </div>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="knowledgeDetailPageVisible = false">取 消</el-button>
        <el-button type="primary" @click="addDataStructure(1),knowledgeDetailPageVisible = false">保存编辑</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getDataStructureList, getDataStructureKeyTypeList, addDataStructureKeyType, addDataStructure } from "../../api/GyKnowledge";

export default {
  data() {
    return {
      stateTexts: ['未开始', '尝试过', '已解答', '已多次解答', '已牢记'],
      difficultyTexts: ["简单", "较简单", "较难", "难", "极难"],
      structureListData: [],//算法/数据结构数据列表
      structureListDataNew: [{ is_knowledge_point: 0 }],//处理过后的算法/数据结构数据列表 给了一个默认值,以免第一次进入网页值为空时报错
      dialogFormVisible: false,//是否显示添加弹出框
      addKeyTypeFormVisible: false,//是否显示添加知识点分类弹出框
      knowledgeDetailPageVisible: false,//是否显示知识详情弹出框
      knowledgeType: [],//选择的知识分类
      knowledgeOptions: [],//算法/数据结构的分类
      knowledgeOptionsOld: [],//算法/数据结构的原始分类列表
      options: [{
        value: '0',
        label: '题目'
      }, {
        value: '1',
        label: '知识点'
      }],//选项
      typeValue: '0',//选择的类型的值
      form: {
        id: '',//题目id
        name: '',//题目名称
        description: '',//题目描述
        answer: '',//题目解答
        state: '',//题目状态  1 未开始 2 已解答 3 尝试过 4 已牢记
        difficulty: '',//题目难度  1 简单 2  中等 3 困难
        my_answer: '',//我的答案
        is_knowledge_point: '0',//是否是知识点 0 不是 是题目 1 是知识点
        knowledgeType: [],//选择的知识分类
        key_point_name: '',//知识点的名字
        key_point_content: '',//知识点的内容
        note: '', //备注
      },//添加收集的表单
      newKeyTypeForm: {
        newKeyType: '',//新建分类类型 0 父级分类 1 同级分类 2 子级分类
        newKeyName: '',//新建的知识点分类名称
        newKeyFatherId: '',//新建的知识点父id
      },//新建知识点表单
      knowledgeDetail: {

      }//知识详情信息

    }
  },
  watch: {
    "newKeyTypeForm.newKeyType"() {
      if (this.newKeyTypeForm.newKeyType == '0') {
        let elementPos = ''
        this.knowledgeOptionsOld.map((x) => {
          if (x.id == this.knowledgeType[this.knowledgeType.length - 2]) {
            elementPos = x.father_id;
          }
        })
        this.newKeyTypeForm.newKeyFatherId = elementPos
      } else if (this.newKeyTypeForm.newKeyType == '1') {
        this.newKeyTypeForm.newKeyFatherId = this.knowledgeType[this.knowledgeType.length - 2]
      } else {
        this.newKeyTypeForm.newKeyFatherId = this.knowledgeType[this.knowledgeType.length - 1]
      }
      console.log(this.knowledgeType + ' ' + this.newKeyTypeForm.newKeyFatherId);
    },
    typeValue: {
      handler: 'getNewStructureListData',
      // immediate: true

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
      if (data.data == []) {
        return
      }
      this.structureListData = data.data
      this.getNewStructureListData()
    },
    // 获取数据结构/算法知识点分类列表
    async getDataStructureKeyTypeList() {
      let data = await getDataStructureKeyTypeList()
      // let cloneData = JSON.parse(JSON.stringify(data.data))    // 对源数据深度克隆
      // console.log(cloneData);
      data.data.forEach(element => {
        element.value = element.id
      });
      this.knowledgeOptionsOld = data.data
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
      this.knowledgeOptions = rJson
    },
    // 新增数据结构/算法知识点分类
    async addDataStructureKeyType() {
      let params = {
        name: this.newKeyTypeForm.newKeyName,
        father_id: this.newKeyTypeForm.newKeyFatherId,
      };
      let data = await addDataStructureKeyType(params)
      console.log(data);
      if (data.status == 200) {
        this.getDataStructureKeyTypeList()
        this.$message.success(data.message)
      }
    },
    // 新增数据结构/算法的题目/知识点
    async addDataStructure(val) {
      if (val != 1) {
        console.log(this.form.knowledgeType);
        this.form.knowledgeType = this.form.knowledgeType[this.form.knowledgeType.length - 1]
        console.log(this.form.knowledgeType);
      } else {
        this.form = this.knowledgeDetail;
      }
      let params = this.form
      let data = await addDataStructure(params)
      if (data.status == 200) {
        this.getDataStructureList()
        this.$message.success(data.message)
        this.form = {
          id: '',//题目id
          name: '',//题目名称
          description: '',//题目描述
          answer: '',//题目解答
          state: '',//题目状态  1 未开始 2 已解答 3 尝试过 4 已牢记
          difficulty: '',//题目难度  1 简单 2  中等 3 困难
          my_answer: '',//我的答案
          is_knowledge_point: '0',//是否是知识点 0 不是 是题目 1 是知识点
          knowledgeType: [],//选择的知识分类
          key_point_name: '',//知识点的名字
          key_point_content: '',//知识点的内容
          note: '', //备注
        }
        return
      }
      this.$message.error(data.message)
    },
    // 处理数据结构/算法的题目/知识点列表
    getNewStructureListData() {
      this.structureListDataNew = []
      if (this.typeValue == '0') {
        this.structureListData.forEach((value) => {
          if (value.is_knowledge_point == '0') {
            this.structureListDataNew.push(value)
          }
        })
      } else if (this.typeValue == '1') {
        this.structureListData.forEach((value) => {
          if (value.is_knowledge_point == '1') {
            this.structureListDataNew.push(value)
          }
        })
      }
    },
    // 当某一行被点击时会触发该事件
    tableRowClick(row, column, event) {
      // console.log(row);
      this.knowledgeDetailPageVisible = true;
      this.knowledgeDetail = row;
    }
  }
}
</script>

<style scoped>
.addBtn {
  margin-left: 20px;
}
</style>