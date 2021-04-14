<template>
  <div id="video-edit">
    <h1 class="title">{{ id ? '编辑' : '新建' }}视频</h1>
    <!-- 新建/编辑 视频界面 -->
    <el-card>
      <el-form label-width="120px">
        <el-form-item label="标题">
          <el-input v-model="model.title" placeholder="请输入视频标题"></el-input>
        </el-form-item>
        <el-form-item label="类型">
          <el-select v-model="model.categories" multiple placeholder="请选择">
            <el-option 
              v-for="item of categories"
              :key="item._id"
              :label="item.name"
              :value="item._id">
            </el-option> 
          </el-select>
        </el-form-item>
        <el-form-item label="播放量">
          <el-input v-model="model.play" placeholder="请输入视频播放量"></el-input>
        </el-form-item>   
        <el-form-item label="封面">
          <el-upload
            class="avatar-uploader"
            :action="uploadUrl" 
            :headers="getAuthHeaders()"
            :show-file-list="false"
            :on-success="res=>$set(model,'cover',res.url)">
            <img v-if="model.cover" :src="model.cover" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>    
        </el-form-item>  
        <el-form-item label="跳转链接">
          <el-input v-model="model.url" placeholder="请输入视频跳转链接"></el-input>
        </el-form-item>
        <el-form-item label="视频">
          <el-upload
            class="upload-demo"
            drag
            :action="uploadUrl" 
            :headers="getAuthHeaders()"
            :show-file-list="false"
            multiple
            :on-success="res=>$set(model,'video',res.url)">
            <video v-if="model.video" controls :src="model.video" class=" "></video>
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将视频文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">上传视频</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div class="save">
        <el-button type="primary" @click="save">保存</el-button>
      </div>
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
        categories:[]
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
          res = await this.$http.put(`rest/videos/${this.id}`,this.model)//eslint-disable-line
        }else{
          res = await this.$http.post('rest/videos',this.model)//eslint-disable-line
        }
        this.$router.push('/videos/list')
        this.$message({
          type:'success',
          message: '保存成功'
        })
      },
      async fecth(){
        const res = await this.$http.get(`rest/videos/${this.id}`)
        this.model = res.data
        //console.log(res.data);
      },
      async fecthCategory(){
        const res = await this.$http.get('rest/categories')
        //筛选出视频分类的数据
        let cates = res.data
        cates = cates.filter(v=>v.name==='视频分类')[0].children
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
