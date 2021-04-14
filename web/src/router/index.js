import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import Home from '../views/Home.vue'
import Strategy from '../views/Strategy.vue'
import Race from '../views/Race.vue'
import New from '../views/New.vue'

import Article from '../views/Article.vue'
import Hero from '../views/Hero.vue'
import Skin from '../views/Skin.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'main',
    component: Main,
    //页面有共用的部分
    children: [
      { path:'/',name: 'home',component: Home},
      { path:'/strategies',name: 'strategy',component: Strategy},
      { path:'/races',name: 'race',component: Race},
      { path:'/news',name: 'new',component: New},

      { path:'/articles/:id',name: 'article',component: Article,props: true},
    ]
  },
  //新页面
  { 
    path:'/heroes/:id',
    name: 'hero',
    component: Hero,
    props: true,
    children:[
      { path:'/skins',name: 'skin',component: Skin},
    ]
  }
]

const router = new VueRouter({ 
  //配置激活时要使用的类名	
  //linkActiveClass: 'active',
  linkExactActiveClass: 'active',
  routes,
})

export default router
