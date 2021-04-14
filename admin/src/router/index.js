import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Main from '../views/Main.vue'

import CategoryEdit from '../views/CategoryEdit.vue'
import CategoryList from '../views/CategoryList.vue'

import ItemEdit from '../views/ItemEdit.vue'
import ItemList from '../views/ItemList.vue'

import HeroEdit from '../views/HeroEdit.vue'
import HeroList from '../views/HeroList.vue'

import ArticleEdit from '../views/ArticleEdit.vue'
import ArticleList from '../views/ArticleList.vue'

/* import VideoEdit from '../views/VideoEdit.vue'
import VideoList from '../views/VideoList.vue' */
import VideoEdit from '../views/VideoEdit.vue'
import VideoList from '../views/VideoList.vue'

import AdEdit from '../views/AdEdit.vue'
import AdList from '../views/AdList.vue'

import AdminUserEdit from '../views/AdminUserEdit.vue'
import AdminUserList from '../views/AdminUserList.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
    //客户端路由限制
    //--login可以公开访问，其他的不行
    meta: { isPublic: true }
  },
  {
    path: '/',
    name: 'Main',
    component: Main,
    children: [
      //两个页面使用同样的组件 =>导航守卫
      //:id也叫动态路由  props 将url参数传递到CategoryEdit组件 data 中 ，供CategoryEdit组件使用
      { path: '/categories/edit',name: 'CategoryEdit',component: CategoryEdit },
      { path: '/categories/edit/:id',name: 'CategoryEdit',component: CategoryEdit,props: true },
      { path: '/categories/list',name: 'CategoryList',component: CategoryList },

      { path: '/items/edit',name: 'ItemEdit',component: ItemEdit },
      { path: '/items/edit/:id',name: 'ItemEdit',component: ItemEdit,props: true },
      { path: '/items/list',name: 'ItemList',component: ItemList },

      { path: '/heroes/edit',name: 'HeroEdit',component: HeroEdit },
      { path: '/heroes/edit/:id',name: 'HeroEdit',component: HeroEdit,props: true },
      { path: '/heroes/list',name: 'HeroList',component: HeroList },

      { path: '/articles/edit',name: 'ArticleEdit',component: ArticleEdit },
      { path: '/articles/edit/:id',name: 'ArticleEdit',component: ArticleEdit,props: true },
      { path: '/articles/list',name: 'ArticleList',component: ArticleList },

      { path: '/videos/edit',name: 'VideoEdit',component: VideoEdit },
      { path: '/videos/edit/:id',name: 'VideoEdit',component: VideoEdit,props: true },
      { path: '/videos/list',name: 'VideoList',component: VideoList },

      { path: '/ads/edit',name: 'AdEdit',component: AdEdit },
      { path: '/ads/edit/:id',name: 'AdEdit',component: AdEdit,props: true },
      { path: '/ads/list',name: 'AdList',component: AdList },

      { path: '/admin_users/edit',name: 'AdminUserEdit',component: AdminUserEdit },
      { path: '/admin_users/edit/:id',name: 'AdminUserEdit',component: AdminUserEdit,props: true },
      { path: '/admin_users/list',name: 'AdminUserList',component: AdminUserList },
    ]
  }
]

const router = new VueRouter({
  /* mode:'hash',
  base: process.env.BASE_URL, */
  routes
})

router.beforeEach((to,from,next)=>{
  if(!to.meta.isPublic && !localStorage.token){
    return next('/login')
  }
  next()
})

export default router
