<template>
  <div class="about">
    <h1>分类列表</h1>
    
    <tree-table
        :data="items"
        show-index
        index-text="序号"
        :columns="columns"
        :expand-type="false"
        :selection-type="false"
        border
      >
        <template slot="operate" slot-scope="scope">
          <el-button size="mini" type="primary" icon="el-icon-edit" @click="edit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" icon="el-icon-delete" @click="remove(scope.row)">删除</el-button>
        </template>
      </tree-table>
  </div>
</template>

<script>
export default {
  data(){
    return {
      items:[],
      defaultProps: {
          children: 'children',
          label: 'name'
      },
      columns: [
        {
          label: '分类名称',
          prop: 'name',
          align: 'center',
          headerAlign: 'center'
        },
        {
          label: '操作',
          type: 'template',
          template: 'operate',
          align: 'center',
          headerAlign: 'center'
        }
      ]

    }
  },
  created(){
    //默认进入页面要做的事情
    this.fetch()
  },
  methods: {
      async fetch(){
        const res = await this.$http.get('rest/categories')
        this.items = res.data
        //console.log(res.data);
      },
      async remove(row){
          this.$confirm(`此操作将永久删除"${row.name}", 是否继续?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async() => {
          const res = await this.$http.delete(`rest/categories/${row._id}`)//eslint-disable-line
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
      edit(data){
        console.log(data)
        this.$router.push(`/categories/edit/${data._id}`)
      }
  }
}
</script>
