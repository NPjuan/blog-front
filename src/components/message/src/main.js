import Vue from 'vue'
import message from "./message"

let messageInstance = null
let MessageConstructor = Vue.extend(message)

let init = () => {
  messageInstance = new MessageConstructor()
  messageInstance.$mount()
  document.body.appendChild(messageInstance.$el)
}

let caller = options => {
  if (!messageInstance) {
    init()
  }
  messageInstance.add(options)
}

export default {
  install(Vue) {
    Vue.prototype.$message = caller
  }
}
