import Vue from 'vue'
import App from './App'
import axios from "axios";
import VueAxios from "vue-axios"
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false

Vue.use(router)
Vue.use(ElementUI)
Vue.use(VueAxios,axios)

//基础的url路径
axios.defaults.baseURL = 'http://localhost:8081'

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
