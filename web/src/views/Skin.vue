<template>
    <div class="skin">
       <div class="topbar bg-black text-white py-2 px-3 d-flex ai-center">
            <img src="../assets/images/logo.png" height="30">
            <div class="px-2 flex-1">
                <span class="">王者荣耀</span>
                <span class="ml-3">攻略战</span>
            </div>
        </div> 
        <swiper ref="mySwiper" :options="swiperOptions">
      <swiper-slide>
        <img class="w-100" src="../assets/images/7bdae20d18f295e3b450a86385fb8ef7.jpeg" alt="">
      </swiper-slide>
      <swiper-slide>
        <img class="w-100 " src="../assets/images/7bdae20d18f295e3b450a86385fb8ef7.jpeg" alt="">
      </swiper-slide>
      <div class="swiper-pagination pagination-home text-right px-3 pb-1" slot="pagination"></div>
    </swiper>
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
      skins:[]
    }
  }
}
</script>