<template>
  <div class="page-article bg-light2 pb-4" v-if="model">
    <div class="header d-flex mx-2 py-3 border-bottom">
      <i class="iconfont icon-Back text-blue" @click="$router.push('/')"></i>
      <strong class="title flex-1 px-2 text-ellipsis text-blue">{{model.title}}</strong>
      <span class="date text-grey">{{model.date}}</span>
    </div>
    <div class="body px-4 mt-3 fs-xl" v-html="model.body"></div>
    <div class="my-3">
      <div class="d-flex px-4">
        <router-link to="/" tag="div"><i class="iconfont icon-Back text-blue" ></i></router-link>
        <strong class="title flex-1 text-ellipsis text-blue">相关资讯</strong>
      </div>
      <div class="px-2 pt-3">
        <router-link 
        class="d-flex ai-center"
        tag="div"          
        :to="`/articles/${item._id}`" 
        v-for="item in model.related" :key="item._id">
          <span class="px-4 py-1 flex-1 text-ellipsis fs-lg">{{item.title}}</span>
          <span class="text-grey">{{item.date}}</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    id: { type: String, required: true}
  },
  data(){
    return {
      model: null
    }
  },
  //监听id变化，组件重新加载
  watch:{
    id(){
      this.fetchDetail()
    }
  },
  methods:{
    async fetchDetail(){
      const res = await this.$http.get(`articles/${this.id}`)
      //console.log(res.data);
      this.model = res.data
    }
  },
  created(){
    this.fetchDetail()
  }
}
</script>

<style lang="scss">
.page-article{
  .body{
    img{
      max-width: 100%;
      height: auto;
    }
    iframe{
      width: 100%;
      height: auto;
    }
  }
}
</style>