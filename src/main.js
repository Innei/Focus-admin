import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'normalize.css/normalize.css'
import './permission'

import { PerfectScrollbar } from 'vue2-perfect-scrollbar'
import 'vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css'
Vue.component('ps', PerfectScrollbar)

import antInputDirective from 'ant-design-vue/es/_util/antInputDirective'
Vue.use(antInputDirective)

import './plugins/font-awesome'
import Message from 'ant-design-vue/lib/message'

import './socket'
Vue.config.productionTip = false
Vue.prototype.$message = Message
const app = new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')

export default app
