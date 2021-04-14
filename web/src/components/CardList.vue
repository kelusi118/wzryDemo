<template>
  <m-card :icon="icon" :title="title">
      <template v-slot:banner>
        <slot name="banner"></slot>
      </template>
      <div class="nav jc-between">
        <div class="nav-item" :class="{active: active ===i}"
          v-for="(category,i) in categories" :key="i"
          @click="$refs.list.$swiper.slideTo(i)">
            <div class="nav-link">{{category.name}}</div> 
        </div>
      </div>
      <div class="mt-3">
        <swiper ref="list" :options="{autoHeight: true}"
          @slide-change="()=>active=$refs.list.$swiper.realIndex">
          <swiper-slide v-for="(category,i) in categories" :key="i">
            <!-- slot 具名插槽 子向父传递值 -->
            <slot name="items" :category="category"></slot>
            <!-- <div class="py-2 d-flex" 
              v-for="n in 5" :key="n">
              <span>[新闻]</span>
              <span class="px-1">|</span>
              <span class="flex-1">2月24日净化游戏环境声明及处罚公告</span>
              <span>02/24</span>
            </div> -->
          </swiper-slide>
        </swiper>
      </div> 
    </m-card> 
</template>

<script>

export default {
  props: {
    title: { type: String, required: true},
    icon: { type: String, required: true},
    categories: { type: Array, required: true}
  },
  data(){
    return {
      active: 0,
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../assets/scss/varibles.scss';

</style>