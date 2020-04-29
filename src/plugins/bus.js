import Vue from 'vue'

const install = (Vue) => {
  const Bus = new Vue({
    data() {
      return {
        ip: null
      }
    },
    methods: {
      set(key, value) {
        this.$data[key] = value
      },
      get(key) {
        return this.$data[key]
      },
      emit (event, ...args) {
        this.$emit(event, ...args)
      },
      on (event, callback) {
        this.$on(event, callback)
      },
      off (event, callback) {
        this.$off(event, callback)
      },
    }
  })

  Vue.prototype.$bus = Bus
}

export default  install
