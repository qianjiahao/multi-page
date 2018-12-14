// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Index from './index.vue'
import '@/assets/css/style.css'
import * as antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
Vue.config.productionTip = false
Vue.config.devtools = false
Vue.use(antd)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { Index },
  template: '<Index/>'
})
