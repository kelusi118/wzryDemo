<template>
  <div class="">
    <h3>{{ id?'编辑':'新建'}}物品</h3>
    <!-- 新建/编辑 物品界面 -->
    <el-card style="width: 80%;">
      <el-form ref="model" label-width="120px">
        <el-form-item label="名称">
          <el-input v-model="model.name"></el-input>
        </el-form-item>
        <el-form-item  label="类型">
          <el-select v-model="model.categories" multiple placeholder="请选择">
            <el-option 
              v-for="item of categories"
              :key="item._id"
              :label="item.name"
              :value="item._id">
            </el-option> 
          </el-select>
        </el-form-item>
        <el-form-item label="攻速加成" label-width="120px">
          <el-input v-model="model.attackbonus"></el-input>
        </el-form-item>
        <el-form-item label="法术加成" label-width="120px">
          <el-input v-model="model.spellbonus"></el-input>
        </el-form-item>
        <el-form-item label="图标">
          <el-upload
            class="avatar-uploader"
            :action="uploadUrl" 
            :headers="getAuthHeaders()"
            :show-file-list="false"
            :on-success="res=>$set(model,'icon',res.url)">
            <img v-if="model.icon" :src="model.icon" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
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
        //关联模型数据
        categories: [],
        model: {},
      }
    },
    methods: {
      async save() {
        /* 判断是新建还是编辑
          1.新建 post
          2.编辑 更新put
        */
        let res //eslint-disable-line
        if(this.id){
          res = await this.$http.put(`rest/items/${this.id}`,this.model)//eslint-disable-line
        }else{
          res = await this.$http.post('rest/items',this.model)//eslint-disable-line
        }
        this.$router.push('/items/list')
        this.$message({
          type:'success',
          message: '保存成功'
        })
      },
      async fecth(){
        const res = await this.$http.get(`rest/items/${this.id}`)
        this.model = res.data
      },
      async fecthCategory(){
        const res = await this.$http.get('rest/categories')
        //console.log(res.data)
        //筛选出物品分类的数据
        let cates = res.data
        cates = cates.filter(v=>v.name==='物品分类')[0].children
        //console.log(cates);
        this.categories = cates
      }
    },
    created(){
      //id存在即位编辑页面，有初始的数据显示
      this.id && this.fecth()
      this.fecthCategory()
    }
  }
</script>
