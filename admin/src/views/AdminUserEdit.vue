<template>
  <div class="">
    <h3>{{ id?'编辑':'新建'}}管理员</h3>
    <!-- 新建/编辑 管理员界面 -->
    <el-card style="width: 60%;">
      <el-form ref="model" label-width="120px">
        <el-form-item label="用户名">
          <el-input v-model="model.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="text" v-model="model.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="save">保存</el-button>
          <el-button>取消</el-button>
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
          res = await this.$http.put(`rest/admin_users/${this.id}`,this.model)//eslint-disable-line
        }else{
          res = await this.$http.post('rest/admin_users',this.model)//eslint-disable-line
        }
        this.$router.push('/admin_users/list')
        this.$message({
          type:'success',
          message: '保存成功'
        })
      },
      async fecth(){
        const res = await this.$http.get(`rest/admin_users/${this.id}`)
        this.model = res.data
      }
    },
    created(){
      this.id && this.fecth()
      
    }
  }
</script>