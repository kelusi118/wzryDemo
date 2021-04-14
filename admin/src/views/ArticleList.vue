<template>
  <div class="about">
    <h1>文章列表</h1>
    <el-table :data="items" border height="400">
      <!-- <el-table-column prop="_id" label="ID" width="220">
      </el-table-column> -->
      <el-table-column fixed type="index" label="序号"></el-table-column>
      <el-table-column prop="categories" label="所属分类" width="120">
        <template slot-scope="scope">
          <span >{{scope.row.categories.map(v=>v.name).join('/') }}</span>
        </template> 
      </el-table-column>
      <el-table-column prop="title" label="标题" width="480">
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="$router.push(`/articles/edit/${scope.row._id}`)">编辑</el-button>
            <!-- 编辑处也可使用element 弹出层 -->
          <el-button
            size="mini"
            type="danger"
            @click="remove(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页器 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageParams.currentPage"
      :page-sizes="[5, 8, 10, 15]"
      :page-size="pageParams.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalNum">
    </el-pagination>
  </div>
</template>

<script>
export default {
  data(){
    return {
      items:[],
      pageParams:{
        currentPage: 1,
        pageSize: 5
      },
      totalNum: 0
    }
  },
  created(){
    //默认进入页面要做的事情
    this.fetch(this.pageParams)
  },
  methods: {
      async fetch(params){
        const res = await this.$http.get('rest/articles',{params})
        //console.log(res.data);
        this.items = res.data.data
        this.totalNum = res.data.totalNum
      },
      async remove(row){
          this.$confirm(`此操作将永久删除"${row.name}", 是否继续?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async() => {
          const res = await this.$http.delete(`rest/articles/${row._id}`)//eslint-disable-line
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
      },
      handleSizeChange(pageSize) {
        this.pageParams.pageSize = pageSize
        this.fetch(this.pageParams)
        //console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(currentPage) {
        this.pageParams.currentPage = currentPage
        //console.log(`当前页: ${currentPage}`);
        this.fetch(this.pageParams)
      }

  }
}
</script>
