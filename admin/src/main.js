import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router'
import TreeTable from 'vue-table-with-tree-grid'

import './style.css'

Vue.config.productionTip = false
//上传资源 验证
// Vue.mixin(...代码块：公共属性添加的公共方法)
Vue.mixin({
  computed: {
    uploadUrl(){
      return this.$http.defaults.baseURL + '/upload'
    }
  },
  methods: {
    getAuthHeaders(){
      return {
        Authorization: `Bearer ${localStorage.token || ''}`
      }
    }
  }
})
Vue.component('tree-table',TreeTable)

import http from './http'
Vue.prototype.$http = http

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
