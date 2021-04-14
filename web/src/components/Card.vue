<template>
  <div class="card mt-3 p-3 bg-white">
      <div class="card-header"
        :class="{'border-bottom': !plain,'pb-3':!plain}">
        <div class="d-flex ai-center">
          <i class="iconfont" :class="`icon-${icon}`"></i>
          <strong class="text-dark px-2 fs-xl flex-1">{{title}}</strong>
          <i class="iconfont icon-menu" v-if="!plain"></i>
        </div>
        <slot name="banner"></slot>
      </div>
      <div class="card-body pt-3 px-1">
        <slot></slot>
      </div>
  </div>    
</template>
<script>
export default {
  props: {
    title: { type: String, required: true},
    icon:  { type: String, required: true},
    /* 布尔值 默认为 false */
    plain: { type: Boolean}, 
  }
}
</script>
<style lang="scss" scoped>
@import '../assets/scss/varibles.scss';

.card{
  border-bottom: 0.0769rem solid $border-color;
}
</style>