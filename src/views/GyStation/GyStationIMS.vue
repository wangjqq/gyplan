<template>
  <div class="height: 100%; overflow: auto;">
    <el-row :gutter="10">
      <el-col :span="1">
        <el-button type="primary" @click="addFormVisible = true">添加</el-button>
      </el-col>
      <el-col :span="6">
        <el-cascader v-model="chooesType" @change="chooesTypeChange" :options="ImsOptions" :props="{ expandTrigger: 'hover' }" placeholder="选择分类"></el-cascader>
      </el-col>
    </el-row>
    <el-table :data="ImsList" style="width: 100%">
      <el-table-column prop="id" label="id" width="50"> </el-table-column>
      <el-table-column prop="type_name" label="类型" width="180"> </el-table-column>
      <el-table-column prop="package" label="封装"> </el-table-column>
      <el-table-column prop="name" label="名称"> </el-table-column>
      <el-table-column prop="description" label="描述"> </el-table-column>
      <el-table-column prop="quantity" label="数量"> </el-table-column>
      <el-table-column prop="description" label="描述"> </el-table-column>
      <el-table-column prop="voltage" label="最大电压">
        <template slot-scope="scope">
          <span>{{ scope.row.voltage == '' ? '' : scope.row.voltage + 'V' }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="electricity" label="最大电流">
        <template slot-scope="scope">
          <span>{{ scope.row.electricity == '' ? '' : scope.row.electricity + 'A' }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="size" label="尺寸"> </el-table-column>
      <el-table-column prop="smt" label="焊接方式">
        <template slot-scope="scope">
          <span>{{ scope.row.smt == '1' ? '贴片' : '直插' }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="price" label="参考价格"> </el-table-column>
    </el-table>

    <!-- 添加元器件的弹出框 -->
    <el-dialog title="添加元器件" :visible.sync="addFormVisible">
      <el-form :model="addform">
        <el-form-item label="元器件分类:">
          <el-cascader v-model="addform.type_id" :options="ImsOptions"></el-cascader>
          <el-button class="el-icon-plus" @click="addTypeVisible = true" style="margin-left: 10px">新建</el-button>
        </el-form-item>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="名称:">
              <el-input v-model="addform.name" style="width: 204px"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="封装:">
              <el-input v-model="addform.package" style="width: 204px"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="数量:">
              <el-input v-model="addform.quantity" style="width: 204px"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="单价:">
              <el-input v-model="addform.price" style="width: 204px"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="尺寸:">
              <el-input v-model="addform.size" style="width: 204px"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="最大电压:">
              <el-input v-model="addform.voltage" style="width: 204px"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="最大电流:">
              <el-input v-model="addform.electricity" style="width: 204px"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="存放位置:">
              <el-input v-model="addform.place" style="width: 204px"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="焊接方式:">
              <el-radio-group v-model="addform.smt">
                <el-radio :label="1">贴片</el-radio>
                <el-radio :label="0">直插</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="描述:" style="margin-left: 20px">
              <el-input type="textarea" :autosize="{ minRows: 3 }" v-model="addform.description" style="width: 300px"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addFormVisible = false">取 消</el-button>
        <el-button type="primary" @click=";(addFormVisible = false), addItem()">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 新建元器件分类的弹出框 -->
    <el-dialog title="新建元器件分类" :visible.sync="addTypeVisible">
      <el-form :model="newTypeForm">
        <el-form-item label="选择父级分类:">
          <el-cascader v-model="newTypeForm.type_father_id" :options="ImsOptions" :props="{ checkStrictly: true }"></el-cascader>
        </el-form-item>
        <el-form-item label="新建分类名称:">
          <el-input v-model="newTypeForm.type_name" style="width: 204px"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addTypeVisible = false">取 消</el-button>
        <el-button type="primary" @click=";(addTypeVisible = false), addItemType()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script> 
import { getAllImsList, getImsListByType, getTypeList, addItemType, addItem } from '@/api/GyStation.js'
export default {

  data() {
    return {
      ImsList: [],
      ImsOptions: [],//算法/数据结构的分类
      ImsOptionsOld: [],//算法/数据结构的分类
      chooesType: '',
      addFormVisible: false,
      addTypeVisible: false,
      addform: {
        type_id: '',
        type_name: '',
        type_father_id: '',
        package: '',
        electricity: '',
        description: '',
        voltage: '',
        name: '',
        quantity: '',
        price: '',
        smt: '',
        size: '',
        place: ''
      },
      newTypeForm: {
        type_name: '',
        type_father_id: ''
      }
    }
  },
  created() {
    this.getAllImsList();
    this.getTypeList();
  },
  methods: {
    async chooesTypeChange(val) {
      console.log(val.at(-1));
      let params = {
        type_id: val.at(-1),
      }
      let data = await getImsListByType(params);
      if (data.status == 200) {
        this.ImsList = data.data;
        this.$message.success(data.message)
      }

      console.log(data);
    },
    // 获取所有元器件列表
    async getAllImsList() {
      let data = await getAllImsList();
      this.ImsList = data.data;
      console.log(data);
    },
    // 获取元器件分类列表
    async getTypeList() {
      let data = await getTypeList()
      console.log(data);
      data.data.forEach(element => {
        element.value = element.id
        element.label = element.type_name
      });
      this.ImsOptionsOld = data.data
      var rJson = [];
      //将所有的pid的数据加到对应的id数据对象里面去，需要添加一个属性children
      for (var i = 0; i < data.data.length; i++) {
        var arr = [];
        for (var j = 0; j < data.data.length; j++) {
          if (data.data[i].id == data.data[j].type_father_id) {
            data.data[i].children = arr;
            arr.push(data.data[j]);
          }
        }
      }
      for (var i = 0; i < data.data.length; i++) {
        if (data.data[i].type_father_id == 0) {
          rJson.push(data.data[i]);
        }
      }
      this.ImsOptions = rJson
    },
    // 添加元器件分类
    async addItemType() {
      this.newTypeForm.type_father_id = this.newTypeForm.type_father_id.at(-1);
      console.log(this.newTypeForm.type_father_id);
      let params = {
        type_name: this.newTypeForm.type_name,
        type_father_id: this.newTypeForm.type_father_id,
      };
      let data = await addItemType(params)
      console.log(data);
      if (data.status == 200) {
        this.getTypeList()
        this.$message.success(data.message)
        this.newTypeForm = {
          type_name: '',
          type_father_id: ''
        }
      }
    },
    // 添加元器件
    async addItem() {
      this.addform.type_id = this.addform.type_id.at(-1);
      this.ImsOptionsOld.forEach(element => {
        if (element.id == this.addform.type_id) {
          this.addform.type_name = element.type_name;
          this.addform.type_father_id = element.type_father_id;
        }
      });
      let params = {
        type_id: this.addform.type_id,
        type_name: this.addform.type_name,
        type_father_id: this.addform.type_father_id,
        package: this.addform.package,
        voltage: this.addform.voltage,
        electricity: this.addform.electricity,
        description: this.addform.description,
        name: this.addform.name,
        quantity: this.addform.quantity,
        price: this.addform.price,
        smt: this.addform.smt,
        name: this.addform.name,
        size: this.addform.size,
        place: this.addform.place
      };
      let data = await addItem(params);
      if (data.status == 200) {
        this.getAllImsList()
        this.$message.success(data.message)
        this.addform = {
          type_id: '',
          type_name: '',
          type_father_id: '',
          package: '',
          electricity: '',
          description: '',
          voltage: '',
          name: '',
          quantity: '',
          price: '',
          smt: '',
          size: '',
          place: ''
        }
      }
    }

  },
}
</script>

<style>
</style>