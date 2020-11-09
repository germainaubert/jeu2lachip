import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueSocketIO from 'vue-socket.io'


Vue.prototype.$axios = axios
axios.defaults.withCredentials = true

console.log('main.js : ', document.cookie)
Vue.use(
  new VueSocketIO({
    debug: true,
    connection: 'http://localhost:3000',
    options: {
      autoConnect: false
    }
  })
)

Vue.config.productionTip = false


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

