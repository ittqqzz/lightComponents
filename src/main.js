/* 一定要在第一行引入 polyfill */
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick'
import VueLazyLoad from "vue-lazyload"

import 'common/stylus/index.styl'

Vue.config.productionTip = false

Vue.use(VueLazyLoad,{
  loading: require("common/image/default.png")
})

fastclick.attach(document.body)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router
})
