<template>
  <div class="">
    <h3>{{ id?'编辑':'新建'}}分类</h3>
    <!-- 新建/编辑 分类界面 -->
    <el-card style="width: 80%">
      <el-form ref="model" label-width="120px">
        <el-form-item  label="上级分类">
          <!-- <el-select v-model="model.parent" placeholder="请选择">
            <el-option 
              v-for="item in parents"
              :key="item._id"
              :label="item.name"
              :value="item._id"></el-option>
          </el-select> -->
          <el-cascader
            v-model="model.parent"
            :options="parents"
            :props="cateProps"
            clearable>
          </el-cascader>
        </el-form-item>
        <el-form-item label="名称" label-width="120px">
          <el-input v-model="model.name"></el-input>
        </el-form-item>
        <el-form-item >
          <el-button type="primary" @click="save">保存</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    
  </div>
</template>

<script>
  export default {
    props: {
      id: {}
    },
    data() {
      return {
        model: {},
        parents: [],
        cateProps:{
          expandTrigger: 'hover',
          value: '_id',
          label: 'name',
          children: 'children',
          emitPath: false,
          checkStrictly: true
        }
      };
    },
    methods: {
      async save() {
        /* 判断是新建还是编辑
          1.新建 post
          2.编辑 更新put
        */
        let res //eslint-disable-line
        if(this.id){
          res = await this.$http.put(`rest/categories/${this.id}`,this.model)//eslint-disable-line
        }else{
          res = await this.$http.post('rest/categories',this.model)//eslint-disable-line
        }
        this.$router.push('/categories/list')
        this.$message({
          type:'success',
          message: '保存成功'
        })
      },
      async fecth(){
        const res = await this.$http.get(`rest/categories/${this.id}`)
        this.model = res.data
      },
      async fecthParents(){
        const res = await this.$http.get('rest/categories')
        //console.log(res.data);
        this.parents = res.data
      }
    },
    created(){
      this.fecthParents()
      //id存在即位编辑页面，有初始的数据显示
      this.id && this.fecth()
      
    }
  }
</script>