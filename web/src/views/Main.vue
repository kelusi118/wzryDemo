<template>
  <div class="main">
    <!-- topbar -->
    <div class="topbar bg-black text-white py-2 px-3 d-flex ai-center">
      <img @click="$router.push('/')" src="../assets/images/logo.png" height="30">
      <div class="px-2 flex-1">
        <div class="fs-md pb-1">王者荣耀</div>
        <div class="fs-sm text-grey-1">团队成就更多</div>
      </div>
      <button class="btn bg-primary">立即下载</button>
    </div>
    <!-- topNav -->
    <div class="bg-primary pt-3 pb-2">
      <div class="nav nav-inverse jc-around text-white">
        <router-link class="nav-item" tag="div" to="/">首页</router-link> 
        <router-link class="nav-item" tag="div" to="/strategies">攻略中心</router-link> 
        <router-link class="nav-item" tag="div" to="/races">赛事中心</router-link> 
        <router-link class="nav-item" tag="div" to="/news">IP新游</router-link> 
      </div>
    </div>
    <!-- routerview路由 -->
    <router-view/>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
.topbar{
  position: sticky;
  top: 0;
  z-index: 999;
}
</style>
