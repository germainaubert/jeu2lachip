import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueSession from  'vue-session'
import axios from 'axios'
import VueSocketIO from 'vue-socket.io'


Vue.use(
  new VueSocketIO({
    debug: true,
    connection: 'http://localhost:3000',
  })
)

Vue.use(VueSession)
Vue.config.productionTip = false

Vue.prototype.$axios = axios

axios.defaults.withCredentials = true

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
