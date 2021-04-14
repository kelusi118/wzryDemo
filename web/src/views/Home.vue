<template>
  <div class="home">
    <!-- swiper -->
    <swiper ref="mySwiper" :options="swiperOptions">
      <swiper-slide v-for="(item,i) in swiperData" :key="i">
        <a :href="item.url">
          <img class="w-100" :src="item.image" alt="">
        </a>
      </swiper-slide>
      <div class="swiper-pagination pagination-home text-right px-3 pb-1" slot="pagination"></div>
    </swiper>

    <!-- sprites -->
    <div class="sprites mt-3 bg-white text-center">
      <div class="sprite-list d-flex flex-wrap"
          :class="{'down':!isFold}">
        <div class="sprite-item mt-3 mb-2"
          v-for="(item,i) in spriteData" :key="i">
          <a :href="item.url">
            <i :style="item.position"></i>
            <div class="py-2 text-grey">{{item.text}}</div>
          </a>
        </div>
      </div>    
      <div 
        @click="isFold=!isFold"
        class="fold-btn bg-light py-2 d-flex ai-center jc-center">
        <i :class="{down: !isFold}"></i>
        <span class="fs-sm text-dark-1 ml-1">{{isFold?'收起':'展开'}}</span>
      </div>
    </div>

    <!-- cardlist-news-->
    <m-card-list icon="news1" title="新闻资讯" :categories="newsCates">
      <!-- #itmes 关联 具名插槽  {category} 子组件传递给父组件的数据-->
      <template #items="{category}">
        <router-link
          tag="div"
          :to="`/articles/${news._id}`" 
          class="py-2 d-flex fs-lg" 
          v-for="(news,i) in category.newsList" :key="i">
          <span class="news-cate" :class="calcNewsClass(category.name)">{{category.name}}</span>
          <span class="px-1"></span>
          <span class="title flex-1 text-dark text-ellipsis pr-2">{{news.title}}</span>
          <span class="text-grey-1 fs-sm">{{news.createdAt|date}}</span>
        </router-link>
      </template>
    </m-card-list>

    <!-- cardlist-heroes-->
    <m-card-list icon="card-hero" title="英雄列表" :categories="heroCates">
      <template  v-slot:banner>
        <div class="banner" @click="$router.push('/heroes/6070a963439f5a14484994b4')">
          <img src="../assets/images/new_hero.jpg" class="new-hero" alt="new_hero">
        </div>
      </template>
      <!-- #itmes 关联 具名插槽  {category} 子组件传递给父组件的数据-->
      <template #items="{category}">
        <div class="d-flex flex-wrap text-center" style="margin:0 -0.5rem;">
          <router-link
            tag="div"
            :to="`/heroes/${hero._id}`" 
            class="p-2" style="width: 20%;" 
            v-for="(hero,i) in category.heroList" :key="i">
            <img class="w-100" :src="hero.avatar" alt="">
            <span class="flex-1 text-dark text-ellipsis pr-2">{{hero.name}}</span>
          </router-link>
        </div>
      </template>
    </m-card-list>

    <!-- cardlist-videos-->
    <m-card-list icon="video" title="精彩视频" :categories="videoCates">
      <!-- #items vue@2.6 关联 具名插槽  {category} 子组件传递给父组件的数据-->
      <template #items="{category}">
        <div class="d-flex flex-wrap text-center" style="margin:0 -0.5rem;">
          <a
            :href="video.url" 
            class="px-2 pt-2" style="width: 50%;" 
            v-for="(video,i) in category.videoList" :key="i">
            <img class="w-100" style="width:168px;height:95px;" :src="video.cover" alt="">
            <p class="flex-1 text-dark text-ellipsis-1 pr-2 pt-2">{{video.title}}</p>
            <div class="vidoe-info m-1 pt-1 fs-sm text-grey d-flex jc-between">
              <span class="d-flex">
                <i class="iconfont icon-video mx-1"></i>
                {{video.play}}
              </span>
              <span>{{video.date|date}}</span>
            </div>
          </a>
        </div>
      </template>
    </m-card-list>

    <!-- 加载更多内容 -->
    <router-link 
      class="bg-white text-center py-2 text-grey fs-sm"
      tag="div"
      to="/strategies">
      加载更多内容
    </router-link>

  </div>
</template>

<script>
import dayjs from 'dayjs'

export default {
  name: 'Home',
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
      swiperData:[],
      newsCates:[],
      heroCates:[],
      videoCates:[],
      spriteData: [{
            text: '爆料站',
            position: {
              'background-position': '63.546% 15.517%'
            },
            url: "https://pvp.qq.com/m/m201706/coming/index.htm"
          },
          {
            text: '故事站',
            position: {
              'background-position': '90.483% 15.614%'
            },
            url: "https://pvp.qq.com/act/a20160510story/index.htm?ADTAG=PC.QrCode.TG"
          },
          {
            text: '周边商城',
            position: {
              'background-position': '36.746% 0.924%'
            },
            url: "https://pvp.qq.com/mall/m"
          },
          {
            text: '体验服',
            position: {
              'background-position': '10.408% 15.517%'
            },
            url: "https://pvp.qq.com/cp/a20161116tyf/page01.htm"
          },
          {
            text: '新人专区',
            position: {
              'background-position': '89.733% 1.266%'
            },
            url: "https://pvp.qq.com/m/m201606/goCenter.shtml"
          },
          {
            text: '荣耀传承',
            position: {
              'background-position': '36.467% 15.287%'
            },
            url: "https://pvp.qq.com/m/memory/index.shtml"
          },
          {
            text: '王者营地',
            position: {
              'background-position': '63.3% 0.927%'
            },
            url: "https://image.ttwz.qq.com/wzry/wzryzs_download_4001.htm?ADTAG=mpvp.qq.com"
          },
          {
            text: '公众号',
            position: {
              'background-position': '0 96.207%'
            },
            url: "https://game.weixin.qq.com/cgi-bin/comm/openlink?noticeid=90102708&appid=wx95a3a4d7c627e07d&url=https%3A%2F%2Fgame.weixin.qq.com%2Fcgi-bin%2Fh5%2Fstatic%2Fsubscribe%2Findex.html%3Fappid%3Dwx95a3a4d7c627e07d#wechat_redirect"
          },
          {
            text: '版本介绍',
            url: "https://pvp.qq.com/cp/a20190320bbgxsmm/index.html"
          },
          {
            text: '对局环境',
            url: "https://pvp.qq.com/cp/a20190917station/index.html"
          },
          {
            text: '无限王者团',
            url: "https://pvp.qq.com/cp/a20190827boundlessp/index.html"
          },
          {
            text: '创意互动营',
            url: "https://pvp.qq.com/m/hdy/p1/index.html"
          }
        ],
      //收起展开
      isFold: false,
    }
  },
  filters:{
    date(val){
      return dayjs(val).format('MM/DD')
    }
  },
  methods:{
    async fetchSwiperData(){
      const res = await this.$http.get('ads/list')
      //console.log(res.data);
      //筛选 '主页' swiperData
      const data = res.data.filter(v=>v.name==='主页')[0].items
      //console.log(data);
      this.swiperData = data
    },
    async fetchNewsCates(){
      const res = await this.$http.get('news/list')
      //console.log(res);
      this.newsCates = res.data[0]
    },
    async fetchHeroCates(){
      const res = await this.$http.get('heroes/list')
      //console.log(res.data);
      this.heroCates = res.data
    },
    async fetchVideoCates(){
      const res = await this.$http.get('videos/list')
      //const data = res.data[0].videoList.filter(v=>v.name !== '热门视频')
      const data = res.data[0].videoList[0].slice(0,3)
      //console.log(data);
      this.videoCates = data
    },
    //不同新闻分类 添加不同类名
    calcNewsClass (categoryName) {
        let className = ''
        switch (categoryName) {
          case '新闻': className = 'one'
            break
          case '公告': className = 'two'
            break
          case '活动': className = 'three'
            break
          case '赛事': className = 'four'
            break
          default: categoryName = 'one'
        }
        return className
    }
  },
  created(){
    this.fetchNewsCates()
    this.fetchHeroCates()
    this.fetchVideoCates()
    this.fetchSwiperData()
  }
}
</script>

<style lang="scss">
@import '../assets/scss/varibles.scss';

.pagination-home {
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

.sprites{
  .sprite-list{
    //隐藏第5（n+4）个之后的 sprite-item
    &.down{
      /* 选取第5个以后的sprite-item */
      .sprite-item:nth-child(n+5){
        display: none;
        content: ' ';
        width: 12.923077rem;
        height: 7.269231rem;;
      }
    }
  }
  .sprite-item{
    width: 25%;
    border-right: 0.0769rem solid $border-color;
    &:nth-child(4n){
      border-right: none;
    }
    i{
      display: inline-block;
      background: url('../assets/images/index.png') no-repeat;
      background-size: 28.846154rem 35rem;
      width: 2.384615rem;
      height: 1.923077rem;
    }
    &:nth-child(9){
        i{
          background: url('../assets/images/version-icon.png') no-repeat;
          background-size: 1.923077rem 1.923077rem;
          width: 1.846154rem;
          height: 1.846154rem;
        }
    }
    &:nth-child(10){
        i{
          background: url('../assets/images/djhj.png') no-repeat;
          background-size: 2.615385rem 1.615385rem;
        }
    }
    &:nth-child(11){
      text-align: center;
        i{
          background: url('../assets/images/wxwzt.png') no-repeat;
          /* background-size: 2.461538rem .692308rem; */
          background-size: 3.076923rem .865385rem;
          width: 3.076923rem;
          height: .865385rem;
        }
        div{
          margin-top: .769231rem;
        }
    }
    &:nth-child(12){
      i{
        background: url('../assets/images/cyhdy.png') no-repeat;
        /* background-size:  3.692308rem 3.692308rem; */
        background-size: 2.384615rem 2.384615rem;
        width: 2.384615rem;
        height: 2.384615rem；
      }
      div{
        margin-top: -0.615385rem;
      }  
    }
  }
  //收起展开按钮
  .fold-btn{
    i{
      background: url('../assets/images/index.png') no-repeat 38.577% 52.076%;
      background-size: 375px 455px;
      width: 10px;
      height: 10px;
      &.down{
        transform: rotate(180deg);
      }
    }
  }
}
.news-cate{
  border: 1px solid map-get($colors,'red');
  color:map-get($colors,'red');
  font-size: 12px;
  padding: 0 2px;
  border-radius: 2px;
  &.one{
    border-color: map-get($colors,'blue-2');
    color:map-get($colors,'blue-2');
  }
  &.two{
    border-color: map-get($colors,'primary-2');
    color:map-get($colors,'primary-2');
  }
  &.three{
    border-color: map-get($colors,'red');
    color: map-get($colors,'red');
  }
  &.four{
    border-color: map-get($colors,'blue-3');
    color: map-get($colors,'blue-3');
  }
}
        
.new-hero{
  width: 100%;
  height: auto;
  margin-top:10px;
}

</style>
