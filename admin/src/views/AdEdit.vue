<template>
  <div class="">
    <h3>{{ id?'编辑':'新建'}}广告位</h3>
    <!-- 新建/编辑 广告位界面 -->
    <el-card>
      <el-form ref="model" label-width="120px">
        <el-form-item label="名称">
          <el-input v-model="model.name"></el-input>
        </el-form-item>
        <el-form-item label="广告">
          <el-button size="sm" type="primary" @click="model.items.push({})"><i class="el-icon-plus"></i>添加广告</el-button>
            <el-row :gutter="20" type="flex" style="flex-wrap: wrap;">
              <el-col :span="24" v-for="(item,i) in model.items" :key="i">
                <el-card style="margin-top:1rem;">
                  <el-tag type="primary">广告{{i+1}}</el-tag>
                  <el-form-item label="跳转链接（url）">
                    <el-input v-model="item.url"></el-input>
                  </el-form-item>
                  <el-form-item label="图片" style="margin-top: 0.6rem">
                    <el-upload
                      class="avatar-uploader"
                      :action="uploadUrl" 
                      :headers="getAuthHeaders()"
                      :show-file-list="false"
                      :on-success="res=>$set(item,'image',res.url)">
                      <img v-if="item.image" :src="item.image" class="avatar">
                      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                  </el-form-item>
                  <el-form-item >
                    <el-button size="small" type="danger" @click="model.items.splice(i,1)">删除</el-button>
                  </el-form-item>
                </el-card>
              </el-col>
            </el-row>
        </el-form-item>
        <el-form-item >
          <el-button type="primary" @click="save">保存</el-button>
          <el-button >取消</el-button>
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
        model: {
          items:[]
        },
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
          res = await this.$http.put(`rest/ads/${this.id}`,this.model)//eslint-disable-line
        }else{
          res = await this.$http.post('rest/ads',this.model)//eslint-disable-line
        }
        this.$router.push('/ads/list')
        this.$message({
          type:'success',
          message: '保存成功'
        })
      },
      async fecth(){
        const res = await this.$http.get(`rest/ads/${this.id}`)
        //console.log(res.data);
        this.model = res.data
      }
    },
    created(){
      //id存在即位编辑页面，有初始的数据显示
      this.id && this.fecth()
    }
  }
</script>