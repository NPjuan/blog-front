import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
// main.js
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
Vue.use(mavonEditor)

// toast
import toast from "./components/toast/src/main"
Vue.use(toast)
// message
import message from "./components/message/src/main"
Vue.use(message)
// aside
import aside from './components/admin-aside/src/main'
Vue.use(aside)

// bug
import Bus from "./plugins/bus"
Vue.use(Bus)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
