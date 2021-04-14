<template>
  <div class="strategy bg-light2 pb-4">
    <!-- swiper-strategy -->
    <swiper ref="mySwiper" :options="swiperOptions">
      <swiper-slide v-for="(item,i) in swiperData" :key="i">
        <a :href="item.url">
          <img class="w-100" :src="item.image" alt="">
        </a>
      </swiper-slide>
      <div class="swiper-pagination pagination-strategy text-right px-3 pb-1" slot="pagination"></div>
    </swiper>

    <!-- 热门视频 -->
    <div class="card mt-2 p-2 bg-white">
      <div class="card-header p-2">
        <div class="d-flex ai-center">
          <i class="iconfont icon-video"></i>
          <strong class="text-dark px-2 fs-xl flex-1">热门视频</strong>
          <div class="nav">
            <div class="nav-item mx-2" :class="{'active': active === 0}" @click="changeItem(0)">日</div>
            <div class="nav-item mx-2" :class="{'active': active === 1}" @click="changeItem(1)">周</div>
            <div class="nav-item ml-2" :class="{'active': active === 2}" @click="changeItem(2)">月</div>
          </div>
        </div>
      </div>
      <div class="card-body p-2 text-dark-2">
        <swiper ref="swiperList"
        @slide-change="()=>active=$refs.swiperList.$swiper.realIndex">
          <swiper-slide v-for="(item,i) in hotVideos" :key="i">
            <div class="hotVideoList" :class="{'hidden':!isShowMore}">
              <!-- item1 -->
              <div class="video-item video-item-1 d-flex border-bottom" >
                <div class="cover p-1">
                  <img :src="item.videoList[0].cover" style="width:150px;height:80px;" alt="" >
                </div>
                <div class="info m-2">
                  <p class="title text-ellipsis-1">{{item.videoList[0].title}}</p>
                  <div class="other d-flex mt-4">
                    <i class="iconfont icon-video px-1"></i>
                    {{item.videoList[0].play}}
                  </div>
                </div>
              </div>
              <!-- item2++ -->
              <div class="video-item video-item-2+"
                v-for="(itemVideo,i) in item.videoList.slice(1)" :key="i">
                <div class="info d-flex jc-between py-2 border-bottom">
                  <p class="title text-ellipsis flex-1">
                    {{itemVideo.title}}
                  </p>
                  <div class="other d-flex ml-2">
                    <i class="iconfont icon-video"></i>
                    <span class="fs-xs ml-1">{{itemVideo.play}}</span>
                  </div>
                </div>
              </div>
              <!-- 显示/隐藏 -->
              <div 
                @click="isShowMore=!isShowMore"
                class="fold-btn bg-white py-2 text-center">
                <span class="fs-sm text-dark-1 ml-1">{{isShowMore?'收起榜单':'查看完整榜单'}}</span>
              </div>
            </div>
          </swiper-slide>
          
        </swiper>
      </div>
    </div>

    <!-- 精彩栏目 -->
    <m-card-video icon="news" title="精品栏目" :categories="boutique">
      <!-- #itmes vue@2.6 关联 具名插槽  {category} 子组件传递给父组件的数据-->
      <template #items="{category}">
        <div class="d-flex flex-wrap text-center" style="margin:0 -0.5rem;">
          <a :href="video.url"
            class="px-2 pt-2" style="width: 50%;" 
            v-for="(video,i) in category.videoList" :key="i">
            <img class="w-100" style="width:168px;height:95px;" :src="video.cover" alt="">
            <p class="flex-1 text-dark text-ellipsis-1 pr-2 pt-2">{{video.title}}</p>
            <div class="vidoe-info m-1 pt-1 fs-sm text-grey d-flex jc-between">
              <span class="d-flex">
                <i class="iconfont icon-video mx-1"></i>
                {{video.play}}
              </span>
              <span>{{video.date}}</span>
            </div>
          </a>
        </div>
      </template>
    </m-card-video>
    <div class="bg-white p-2 text-center">
      <router-link to="/">
        加载更多 <span class="text-primary">最新</span>内容
      </router-link>
    </div>
    <!-- 赛事精品 -->
    <m-card-video icon="news" title="赛事精品" :categories="raceBoutique">
      <!-- #itmes vue@2.6 关联 具名插槽  {category} 子组件传递给父组件的数据-->
      <template #items="{category}">
        <div class="d-flex flex-wrap text-center" style="margin:0 -0.5rem;">
          <a :href="video.url"
            class="px-2 pt-2" style="width: 50%;" 
            v-for="(video,i) in category.videoList" :key="i">
            <img class="w-100" style="width:168px;height:95px;" :src="video.cover" alt="">
            <p class="flex-1 text-dark text-ellipsis-1 pr-2 pt-2">{{video.title}}</p>
            <div class="vidoe-info m-1 pt-1 fs-sm text-grey d-flex jc-between">
              <span class="d-flex">
                <i class="iconfont icon-video mx-1"></i>
                {{video.play}}
              </span>
              <span>{{video.date}}</span>
            </div>
          </a>
        </div>
      </template>
    </m-card-video>
    <div class="bg-white p-2 text-center">
      <router-link to="/">
        加载更多 <span class="text-primary">最新</span>内容
      </router-link>
    </div>
    <!-- 精彩视频 -->
    <m-card-list icon="news" title="精彩视频" :categories="wonderful">
      <!-- #itmes vue@2.6 关联 具名插槽  {category} 子组件传递给父组件的数据-->
      <template #items="{category}">
        <div class="d-flex flex-wrap text-center" style="margin:0 -0.5rem;">
          <a :href="video.url"
            class="px-2 pt-2" style="width: 50%;" 
            v-for="(video,i) in category.videoList" :key="i">
            <img class="w-100" style="width:168px;height:95px;" :src="video.cover" alt="">
            <p class="flex-1 text-dark text-ellipsis-1 pr-2 pt-2">{{video.title}}</p>
            <div class="vidoe-info m-1 pt-1 fs-sm text-grey d-flex jc-between">
              <span class="d-flex">
                <i class="iconfont icon-video mx-1"></i>
                {{video.play}}
              </span>
              <span>{{video.date}}</span>
            </div>
          </a>
        </div>
      </template>
    </m-card-list>
    <div class="bg-white p-2 text-center">
      <router-link to="/">
        加载更多 <span class="text-primary">精彩</span>内容
      </router-link>
    </div>

  </div>
</template>

<script>
export default {
  data(){
    return {
      swiperOptions: {
        pagination: {
          el: '.swiper-pagination',
        },
        autoplay:{
          delay: 3000,
          disableOnInteraction: false
        }
        // Some Swiper option/callback...
      },
      
      active: 0,
      isShowMore: false,
      swiperData:[],
      hotVideos:[],
      boutique:[],
      raceBoutique:[],
      wonderful:[]
    }
  },
  created(){
    this.fetchSwiperData()
    this.fetchHotVideos()
    this.fetchBoutique()
    this.fetchRaceBoutique()
    this.fetchWonderful()
  },
  methods:{
    /* async fetchDetail(){
      const res = await this.$http.get(`articles/${this.id}`)
      //console.log(res.data);
      this.model = res.data
    } */
    async fetchSwiperData(){
      const res = await this.$http.get('ads/list')
      //筛选 '主页' swiperData
      const data = res.data.filter(v=>v.name==='赛事')[0].items
      this.swiperData = data
    },
    async fetchHotVideos(){
      const res = await this.$http.get('videos/list')
      //筛选 'hot-video'
      const data = res.data.filter(v=>v.name==='热门视频')[0].videoList
      //console.log(data)
      this.hotVideos = data
    },
    changeItem(index){
      this.active = index
      this.$refs.swiperList.$swiper.slideTo(index, 300, false)
    },
    
    async fetchBoutique(){
      const res = await this.$http.get('videos/list')
      const data = res.data.filter(v=>v.name==='精品栏目')[0].videoList
      this.boutique = data
    },
    async fetchRaceBoutique(){
      const res = await this.$http.get('videos/list')
      const data = res.data.filter(v=>v.name==='赛事精品')[0].videoList
      this.raceBoutique = data
    },
    async fetchWonderful(){
      const res = await this.$http.get('videos/list')
      const data = res.data.filter(v=>v.name==='精彩视频')[0].videoList
      this.wonderful = data
    },
  },
  
}
</script>

<style lang="scss">
@import '../assets/scss/varibles.scss';

.strategy{
  //轮播图
  .pagination-strategy {
    //轮播点
    .swiper-pagination-bullet{
      opacity: 1;
      border-radius: 30%;
      background: map-get($colors,'white');
      &.swiper-pagination-bullet-active{
        background: map-get($colors,'info');
      }
    }
  }
  //热门视频
  .card{
    .card-header{
      border-bottom: 1px solid $border-color;
    }
    .card-body{
      .hotVideoList{
        &.hidden{
          /* 选取第4个以后的video-item */
          .video-item:nth-child(n+4){
            display: none;
            content: ' ';
          }
        }
      }
    }
  }
}
</style>