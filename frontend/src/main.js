import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueSocketIO from 'vue-socket.io'
import vuetify from './plugins/vuetify'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import VueKonva from 'vue-konva'

Vue.use(VueKonva)

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
  vuetify,
  render: h => h(App)
}).$mount('#app')

