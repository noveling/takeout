import Vue from 'vue'
import App from './App'
import router from './router'
import store from '@/store/store.js'
import FirstClick from 'fastclick'
import "@/mock"
import '@/assets/iconfont/iconfont.css'

Vue.config.productionTip = false
// 解决移动端延时
FirstClick.attach(document.body)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
