<template>
  <div class="page-hero" v-if="model">
    <div class="topbar bg-black text-white py-2 px-3 d-flex ai-center">
      <img @click="$router.push('/')" src="../assets/images/logo.png" height="30">
      <div class="px-2 flex-1">
        <span>王者荣耀</span>
        <span class="ml-3">攻略战</span>
      </div>
      <router-link to="/" tag="div">更多英雄 &gt;</router-link>
    </div>
    <div class="top" :style="{'background-image':`url(${model.banner})`}">
      <div class="info text-white p-3 h-100 d-flex flex-col jc-end">
        <div class="ani hero-title py-1 fs-sm">{{model.title}}</div>
        <h3 class="ani hero-name fs-xl">{{model.name}}</h3>
        <div class="ani hero-category pt-2 fs-sm">{{model.categories.map(v=>v.name).filter(v=> v!=='热门').join('/')}}</div>
        <div class="d-flex jc-between ai-center">
          <div class="hero-scores d-flex pt-2 fs-sm" v-if="model.scores">
            <div class="ani-li">
              <span>难度</span>
              <span class="badge bg-primary-1">{{model.scores.difficult}}</span>
            </div>
            <div class="ani-li">
              <span>技能</span>
              <span class="badge bg-blue-1">{{model.scores.skills}}</span>
            </div>
            <div class="ani-li">
              <span>攻击</span>
              <span class="badge bg-danger">{{model.scores.attack}}</span>
            </div>
            <div class="ani-li">
              <span>生存</span>
              <span class="badge bg-dark-1">{{model.scores.survive}}</span>
            </div>
          </div>
          <router-link to="/" tag="div" class="skin fs-sm text-grey-0">皮肤: {{model.skins.length}} &gt;</router-link>
        </div>
      </div>
    </div>
    <div class="bg-white px-3">
      <div class="nav d-flex jc-around pt-3 pb-2 border-bottom">
        <div class="nav-item" :class="{'active': active === 0}" @click="changeNavItem(0)">
          <div class="nav-link">英雄初始</div>
        </div>
        <div class="nav-item" :class="{'active': active === 1}" @click="changeNavItem(1)">
          <div class="nav-link">进阶攻略</div>
        </div>
      </div>
    </div>
    <swiper ref="swiperList">
        <swiper-slide>
          <div>
            <div class="p-3 bg-white border-bottom">
              <!-- banner -->
              <div class="d-flex">
                <router-link tag="button" to="/" class="btn btn-lg flex-1">
                  <i class="iconfont icon-news1"></i>
                    英雄介绍视频
                </router-link>
                <router-link tag="button" to="/" class="btn btn-lg flex-1 ml-2">
                  <i class="iconfont icon-news1"></i>
                    一图识英雄
                </router-link>
              </div>
              <!-- skills -->
              <div class="skills mt-4 bg-white">
                <div v-if="model.skills" class="d-flex jc-around">
                  <img 
                  class="icon"
                  :class="{active:currentIndex===i}"
                  @click="currentIndex=i"
                  v-for="(item,i) in model.skills"
                  :key="item.name"
                  :src="item.icon"
                  width="60"
                  height="60">
                </div>
                <div class="mt-3" v-if="currentSkills">
                  <div class="d-flex ai-center">
                    <h3 class="py-3 pr-3">{{currentSkills.name}}</h3>
                    <span class="fs-sm text-grey">(冷却值：{{currentSkills.delay}}</span>
                    <span class="pl-2 fs-sm text-grey">消耗：{{currentSkills.cost}})</span>
                  </div>
                  <p class="pb-3 border-bottom fs-m">{{currentSkills.description}}</p>
                  <p class="tips pt-3 text-grey">{{currentSkills.tips}}</p>
                </div>
              </div>
            </div>
            <!-- tips + 出装推荐 -->
            <div class="mt-3">
              <m-card icon="news1" title="出装推荐" class="hero-item" plain>
                <div class="fs-xl">顺风出装</div>
                <div class="pt-3 d-flex jc-around text-center">                  
                  <div v-for="(item,i) in model.item1" :key="i">
                    <img 
                      class="icon"          
                      :src="item.icon">
                    <div class="fs-xs mt-1">{{item.name}}</div>
                  </div>
                </div>
                <div class="border-bottom mt-2"></div>
                <div class="fs-xl mt-3">逆风出装</div>
                <div class="pt-3 d-flex jc-around text-center">                  
                  <div v-for="(item,i) in model.item2" :key="i">
                    <img 
                      class="icon"          
                      :src="item.icon">
                    <div class="fs-xs mt-1">{{item.name}}</div>
                  </div>
                </div>
              </m-card> 
            </div>
            <!-- 铭文推荐 -->
            <m-card icon="news1" title="铭文推荐" plain>
              <div class="d-flex jc-between text-center">
                <div v-for="(item,i) in model.inscriptions" :key="i">
                  <img 
                    class="icon"          
                    :src="item.icon">
                  <div class="fs-xs mt-1">{{item.name}}</div>
                  <p>{{item.attackbonus}}</p>
                  <p>{{item.spellbonus}}</p>
                </div>
              </div>
            </m-card>
            <!-- 使用技巧 -->
            <m-card icon="news1" title="使用技巧" plain>
              <p>{{model.usageTips}}</p>
            </m-card>
            <!-- 对抗技巧 -->
            <m-card icon="news1" title="对抗技巧" plain>
              <p>{{model.battleTips}}</p>
            </m-card>
            <!-- 团战思路 -->
            <m-card icon="news1" title="团战思路" plain>
              <p>{{model.teamTips}}</p>
            </m-card>
            <!-- 英雄关系 -->
            <m-card icon="news1" title="英雄关系" plain>
              <div class="partners">
                <div class="fs-lg">最佳搭档</div>
                <div v-for="(item,i) in model.partners" :key="i"
                class="d-flex pt-3">
                  <img :src="item.hero.avatar" height="50">
                  <p class="ml-3">{{item.description}}</p>
                </div>
              </div>
              <div class="border-bottom mt-3"></div>
              <div class="partners mt-2">
                <div class="fs-lg">被谁克制</div>
                <div v-for="(item,i) in model.beRestrained" :key="i"
                class="d-flex pt-3">
                  <img :src="item.hero.avatar" height="50">
                  <p class="ml-3">{{item.description}}</p>
                </div>
              </div>
              <div class="border-bottom mt-3"></div>
              <div class="partners mt-2">
                <div class="fs-lg">克制谁</div>
                <div v-for="(item,i) in model.restrain" :key="i"
                class="d-flex pt-3">
                  <img :src="item.hero.avatar" height="50">
                  <p class="ml-3">{{item.description}}</p>
                </div>
              </div>
            </m-card>
          </div>
        </swiper-slide>
        <swiper-slide>
          <h3 class="text-center m-5">暂时还啥也木有~~~</h3>
        </swiper-slide>
    </swiper>
  </div>
</template>

<script>
export default {
  props:{
    id:{ type: String,required: true}
  },
  data(){
    return {
      model: null,
      currentIndex: 0,
      active: 0,
    }
  },
  computed:{
    currentSkills(){
      return this.model.skills[this.currentIndex]
    }
  },
  methods:{
    async fetchDetail(){
      const res = await this.$http.get(`heroes/${this.id}`)
      //console.log(res.data);
      this.model = res.data
    },
    changeNavItem(index){
      this.active = index
      this.$refs.swiperList.$swiper.slideTo(index, 300, false)
    }
  },
  created(){
    this.fetchDetail()
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/_varibles.scss';

.page-hero{
  .top{
    height: 50vw;
    background: #fff no-repeat top center;
    background-size: auto 100%;
    .info{
      background: linear-gradient(rgba(0,0,0,0),rgba(0,0,0,1));
      color: #fff;
      .badge{
        display: inline-block;
        margin: 0 0.35rem;
        width: 1rem;
        height: 1rem;
        line-height: 1rem;
        border-radius: 50%;
        border: 1px solid rgba($color: #fff, $alpha: 0.2);
        font-size: 0.5rem;
        text-align: center;
      }
      //hero-info animation
      .ani{
        opacity: 0;
        -webkit-animation: txtshow .5s;
        animation: txtshow 1s;
        -webkit-animation-fill-mode: forwards;
        animation-fill-mode: forwards;
      }
      //txtshow 动画名
      @keyframes txtshow {
        0%{
          opacity: 0;
          transform: translateX(-100px);
        }
        100%{
          opacity: 1;
          transform: none;
        }
      }
      
      .hero-title{
        animation-delay: 0s;
      }
      .hero-name{
        animation-delay: .2s;
      }
      .hero-category{
        animation-delay: .4s;
      }

      //ani2
      .ani-li{
        -webkit-animation: lishow .5s .5s;
        animation: lishow .5s .5s;
        animation-fill-mode: forwards;
        -webkit-animation-fill-mode: forwards;
        opacity: 0;
      }
      //lishow 动画名
      @keyframes lishow {
        0%{
          opacity: 0;
          transform: translateX(-100px);
        }
        100%{
          opacity: 1;
          transform: none;
        }
      }
      .hero-scores{
        div:nth-child(1){
          animation-delay: 0s;
        }
        div:nth-child(2){
          animation-delay: .7s;
        }
        div:nth-child(3){
          animation-delay: .9s;
        }
        div:nth-child(4){
          animation-delay: 1.1s;
        }
      }
    }
  } 
  .skills{
    img.icon{
      width: 65px;
      height: 65px;
      border: 3px solid map-get($colors, "white");
      border-radius: 50%;
      &.active{
      border-color: map-get($colors, "primary");
     }
    }
  } 
  .hero-item{
    img.icon{
      width: 45px;
      height: 45px;
      border-radius: 50%;
    }
  }
}
</style>