<template>
  <div class="">
    <h3>{{ id?'编辑':'新建'}}文章</h3>
    <!-- 新建/编辑 文章界面 -->
    <el-card>
      <el-form ref="model" label-width="120px">
        <el-form-item  label="所属分类">
          <el-select v-model="model.categories" multiple placeholder="请选择">
            <el-option 
              v-for="item in categories"
              :key="item._id"
              :label="item.name"
              :value="item._id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标题">
          <el-input v-model="model.title"></el-input>
        </el-form-item>
        <el-form-item label="详情">
          <vue-editor id="editor" 
          useCustomImageHandler
          @image-added="handleImageAdded" 
          v-model="model.body">
          </vue-editor>
        </el-form-item>
        <el-form-item >
          <el-button type="primary" @click="save">保存</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
  export default {
    props: {
      id: {}
    },
    components: {
      VueEditor
    },
    data() {
      return {
        model: {},
        categories: []
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
          res = await this.$http.put(`rest/articles/${this.id}`,this.model)//eslint-disable-line
        }else{
          res = await this.$http.post('rest/articles',this.model)//eslint-disable-line
        }
        this.$router.push('/articles/list')
        this.$message({
          type:'success',
          message: '保存成功'
        })
      },
      async fecth(){
        const res = await this.$http.get(`rest/articles/${this.id}`)
        this.model = res.data
      },
      async fecthCategories(){
        const res = await this.$http.get('rest/categories')
        //筛选出新闻分类的数据
        let cates = res.data
        cates = cates.filter(v=>v.name==='新闻分类')[0].children
        this.categories = cates
      },
      async handleImageAdded(file, Editor, cursorLocation, resetUploader){
        const formData = new FormData();
        formData.append("file", file);
        const res = await this.$http.post('upload',formData)
        //插入元素，"image"
        Editor.insertEmbed(cursorLocation, "image", res.data.url);
        resetUploader();
      }   
    },
    created(){
      this.fecthCategories()
      //id存在即位编辑页面，有初始的数据显示
      this.id && this.fecth() 
    }
  }
</script>

