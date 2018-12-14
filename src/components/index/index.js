// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import moment from 'moment'
import 'moment/locale/zh-cn'
import * as antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.less'
import '@/assets/css/style.css'
import '@/assets/js/commonComponents'

Vue.config.productionTip = false
Vue.config.devtools = false

moment.locale('zh-cn') // 设置中文时间格式

Vue.use(antd)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
