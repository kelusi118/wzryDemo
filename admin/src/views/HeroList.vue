<template>
  <div class="hero-list">
    <h1>英雄列表</h1>
    <!-- 查询列表 -->
    <el-row style="margin-bottom:10px;">
        <el-col :span="6">
          <el-input  maxlength="8" clearable placeholder="请输入英雄名称" v-model="heroQuery"></el-input>
        </el-col>
        <el-col :span="3">
          <el-button style="margin-left:20px" type="primary" icon="el-icon-search" @click="searchHero">搜索</el-button>
        </el-col>
        <el-col :span="4" >
          <el-button type="primary" icon="el-icon-plus" @click="$router.push('/heroes/edit')">添加英雄</el-button>
        </el-col>
    </el-row>

    <!-- 英雄信息 -->
    <el-table :data="items" max-height="500" style="width: 100%" border>
      <!-- <el-table-column prop="_id" label="ID" width="220">
      </el-table-column> -->
      <el-table-column fixed type="index" label="序号"></el-table-column>
      <el-table-column prop="name" label="英雄名称" width="120">
      </el-table-column>
      <el-table-column label="英雄称号" prop="title"></el-table-column>
      <el-table-column prop="categories" label="所属分类">
         <template slot-scope="scope">
          <span >{{scope.row.categories.map(v=>v.name).join('/') }}</span>
        </template> 
      </el-table-column>
      <el-table-column prop="avatar" label="头像" width="120">
        <template slot-scope="scope">
          <img :src="scope.row.avatar" style="height: 3rem;" alt="">
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="$router.push(`/heroes/edit/${scope.row._id}`)">编辑</el-button>
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
      heroQuery:'',
      pageParams:{                   
        currentPage: 1,//当前页
        pageSize:5,//当前显示5条一页
      },
      totalNum: 0,
    }
  },
  created(){
    //默认进入页面要做的事情
    this.fetch(this.pageParams)
  },
  methods: {
      async fetch(params){
        const res = await this.$http.get('rest/heroes',{params})
        //console.log(res);
        this.totalNum = res.data.totalNum
        //const res = await this.$http.get('rest/heroes')
        this.items = res.data.data
      },
      async remove(row){
          this.$confirm(`此操作将永久删除"${row.name}", 是否继续?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async() => {
          const res = await this.$http.delete(`rest/heroes/${row._id}`)//eslint-disable-line
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
      searchHero(){
        this.pageParams.queryData = this.heroQuery
        this.pageParams.currentPage = 1
        this.fetch(this.pageParams)
      },
      handleSizeChange(pageSize) {
        this.pageParams.pageSize = pageSize
        this.fetch(this.pageParams)
        //console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(currentPage) {
        this.pageParams.currentPage = currentPage
        console.log(`当前页: ${currentPage}`);
        this.fetch(this.pageParams)
      }
  }
}
</script>
