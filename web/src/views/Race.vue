<template>
  <div class="race bg-light2 pb-4">
    
    <!-- 赛事中心 -->
    <div class="race-nav mt-4 ">
      <div class="nav d-flex">
        <div class="nav-item ml-3"
          :class="{active: active ===i}"
           @click="$refs.swiperList.$swiper.slideTo(i)"
          v-for="(item,i) in raceData" :key="i">
          {{item.name}}
        </div>
      </div>
      <div class="nav-content py-2">
        <swiper ref="swiperList"
          @slide-change="()=>active=$refs.swiperList.$swiper.realIndex">
          <swiper-slide 
            v-for="(item,i) in raceData" :key="i">
            <div class="title mt-3">
              <strong class="text-blue-4 fs-xxl ml-3">{{item.title}}</strong>
              <span  v-if="item.newsList.length" class="descinfo_type">官方举办</span>
            </div>
            <div class="banner mt-4">
              <img class="w-100" :src="require(`../assets/images/race/${item.banner}`)" alt="">
            </div>
            <div class="bg-light-3 py-2 text-grey-2 fs-lg text-center my-2">赛事资讯</div>
            <div class="newsList mt-2 px-2">
              <div class="list">
                <router-link 
                  tag="div"
                  :to="`/articles/${news._id}`"
                  class="d-flex ai-center"
                  v-for="(news,j) in item.newsList" :key="j">
                  <p class="flex-1 text-ellipsis text-dark-1 py-1">{{news.title}}</p>
                  <span class="ml-3 text-grey-3">{{news.date}}</span>
                </router-link>
              </div>
            </div>
            <!-- 下拉加载更多 -->
            <div v-if="item.newsList.length" class="more m-2 bg-light-3">
              <div class="text-center p-2 fs-lg text-grey-1" @click="loadMore">
                {{ btnText(item.isMore) }}
              </div>
            </div>
          </swiper-slide>
        </swiper>  
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      active: 0,//当前选中的nav-item 
      raceData: [],
      raceCates:[],
      params: [], //请求参数
      //isMore: false,// 是否有更多内容
      isLoading: false //是否在加载中
    }
  },
  computed:{
    btnText(){
      return (isMore)=>{
        let text = " "
        if(!isMore){
          text = "已显示全部内容"
        }else if(isMore && this.isLoading){
          text = "正在加载当中..."
        }else {
           text = "下拉加载更多"
        }
        return text
      }
     // isMore ?(isLoading? "正在加载中":"下拉加载更多"):"已显示全部内容"
    }
  },
  created(){
    //this.fetchRaceData(this.params)
  },
  mounted() {
    this.fetchRaceCates()
    window.addEventListener('scroll', this.scrollEvent)
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.scrollEvent, false)
  },
  methods:{
    async fetchRaceCates(){
      //const res = await this.$http.get('/news/racecates')
      const res = await this.$http.get('/news/list')
      this.raceCates = res.data[2]
      //给raceCates 添加加载参数
      this.raceCates.forEach((cate,i)=>{//eslint-disable-line
        this.params.push({
          name: cate.name,
          page: 1
        })
      })
      this.fetchRaceData(this.params)
    },
    async fetchRaceData(params){
      this.isLoading = true
      const res = await this.$http.get('news/list',{params})
      this.isLoading = false
      const raceData = res.data[1]
      //对返回的数据进行处理,对每个类添加title,banner
      //this.raceData = Object.assign({},this.raceData,{'title':'','banner':''})
      this.handleRaceData(raceData)
    },
    handleRaceData(data){
      data.forEach((item,index)=>{//eslint-disable-line
        switch(index){
          case 0:
            item.title = '王者荣耀2021KPL春季赛'
            item.banner = 'race_01.jpg'
            break;
          case 1:
            item.title = '2020王者荣耀冬季冠军杯'
            item.banner = 'race_02.jpg'
            break;
          case 2:
            item.title = ' '//全国大赛
            item.banner = 'race_03.jpg'
            break;
          case 3:
            item.title = '王者荣耀甲级职业联赛（K甲）'
            item.banner = 'race_04.jpg'
            break;
          case 4:
            item.title = '王者荣耀城市赛'
            item.banner = 'race_05.jpg'
            break;
          case 5:
            item.title = '王者荣耀高校赛'
            item.banner = 'race_06.jpg'
            break;
          case 6:
            item.title = 'TGA'
            item.banner = 'race_07.jpg'
            break;
          case 7:
            item.title = 'WGI'
            item.banner = 'race_08.jpg'
            break;
        }
      })
      this.raceData = data
      //console.log(data);
    },
    //获取更多数据
    loadMore(){
      //当前nav-item下的newsList
      if(!this.raceData[this.active].isMore) return 
        //如果当前导航下数据没有加载完
        this.params[this.active].page++
        this.fetchRaceData(this.params)  
    },
    //滚动事件
    scrollEvent(){
      let pageHeight = Math.max(document.body.scrollHeight,document.body.offsetHeight)
      let viewportHeight = window.innerHeight || document.documentElement.clientHeight 
          || document.body.clientHeight || 0
      let scrollHeight = window.pageYOffset || document.documentElement.scrollTop
      let d = pageHeight - viewportHeight - scrollHeight < 30
      if(d && !this.isLoading){
        this.loadMore()
      }
    },
    
  },
  
}
</script>

<style lang="scss">
@import '../assets/scss/varibles.scss';

.nav{
    white-space: nowrap;
    overflow-x: scroll;
    overflow-y: hidden;
  .nav-item{
    margin-right: 1.153846rem;
  }
}
.descinfo_type{
  margin-left: 10px;
  padding: 0 7px;
  border:1px solid map-get($colors,'grey-2');
  border-radius: 20px;
  color: map-get($colors,'grey-2');
}
.more{
  border-radius: 20px;
}
</style>