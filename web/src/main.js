import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

import Swiper2,{Navigation,Pagination,Autoplay} from 'swiper'
import VueAwesomeSwiper from 'vue-awesome-swiper'

// import style (>= Swiper 6.x)
import 'swiper/swiper-bundle.css'

Swiper2.use([Navigation,Pagination,Autoplay])
Vue.use(VueAwesomeSwiper, /* { default options with global component } */)

import './assets/scss/style.scss'
import './assets/iconfont/iconfont.css'

import Card from './components/Card.vue'
Vue.component('mCard',Card)

import CardList from './components/CardList.vue'
Vue.component('mCardList',CardList)

import CardVideo from './components/CardVideo.vue'
Vue.component('mCardVideo',CardVideo)

import axios from 'axios'
Vue.prototype.$http = axios.create({
  //baseURL: process.env.VUE_APP_API_URL || 'web/api'
  baseURL: 'http://localhost:3001/web/api'
})

import router from './router'

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
