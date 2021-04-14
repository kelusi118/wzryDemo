<template>
  <div class="video-list">
    <h1>视频列表</h1>
    <el-table :data="items">
      <el-table-column fixed type="index" label="序号"></el-table-column>
      <el-table-column prop="categories[0].name" label="分类名称" width="120">
      </el-table-column>
      <el-table-column prop="title" label="标题" width="280">
      </el-table-column>
      <el-table-column prop="cover" label="封面" width="120">
        <template slot-scope="scope">
          <img :src="scope.row.cover" style="height: 3rem;" alt="">
        </template>
      </el-table-column>
      <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          type="primary"
          @click="$router.push(`/videos/edit/${scope.row._id}`)">编辑</el-button>
          <!-- 编辑处也可使用element 弹出层 -->
        <el-button
          size="mini"
          type="danger"
          @click="remove(scope.row)">删除</el-button>
      </template>
    </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data(){
    return {
      items:[]
    }
  },
  created(){
    //默认进入页面要做的事情
    this.fetch()
  },
  methods: {
      async fetch(){
        const res = await this.$http.get('rest/videos')
        //console.log(res.data);
        this.items = res.data
      },
      async remove(row){
          this.$confirm(`此操作将永久删除"${row.name}", 是否继续?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async() => {
          const res = await this.$http.delete(`rest/videos/${row._id}`)//eslint-disable-line
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.fetch()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      }
  }
}
</script>
