import Vue from 'vue'
import adminAside from './admin-aside'


let aside = null
let asideConstructor = Vue.extend(adminAside)


let init = () => {
  aside = new asideConstructor()
  aside.$mount()
  document.body.appendChild(aside.$el)
  aside.appear()
}

let caller = option => {
  if (!aside && option) {
    init()
  } else {
    aside.close()
    aside = null
  }
}

export default {
  install(Vue) {
    Vue.prototype.$aside = caller
  }
}
