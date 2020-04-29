import Vue from 'vue'
import toast from "./toast"
const ToastConstructor = Vue.extend(toast)

const defaultOptions = {
  closed: false,
  visible: true, // 是否展现
  type: 'warning', // icon type
  showClose: true,  // 是否展现关闭按钮
  showCancelButton: false, // 是否展现取消按钮
  showConfirmButton: true, // 是否展现确认按钮
  cancelButtonText: '取消', // 取消按钮文字
  confirmButtonText: '确认', // 确认按钮文字
  params: {}
}

let instance = null
let instances = []
let seed = 1

const Toast = function (options) {
  let id = seed++
  options = Object.assign(defaultOptions, options)

  // close 函数
  let userOnClose = options.onClose
  options.onClose = function() {
    Toast.close(id, userOnClose)
  }
  instance = new ToastConstructor({
    data: options
  })
  // id
  instance.id = id
  // 挂载
  instance.$mount();
  document.body.appendChild(instance.$el);
  // 推入 instances
  instances.push(instance)

  return instance
}

Toast.close = function (id, userOnClose) {
  let index = instances.findIndex(item => item.id === id)
  if (typeof userOnClose === 'function') {
    userOnClose(instances[index]);
  }
  instances.splice(index, 1)
}

Toast.closeAll = function () {
  instances.map(item =>item.close())
}

const caller = options => {
  options = options || {}
  return new Promise((resolve, reject) => {
    options.confirm = function(val) {
      resolve(val)
    }
    options.cancel = function(val) {
      reject(val)
    }
    Toast(options)
  })
}

export default {
  install(vue) {
    vue.prototype.$toast = caller
  }
}
