<template>
  <form content="form">
    <slot></slot>
  </form>
</template>

<script>
  export default {
    name: "pjy-form",
    data() {
      return {
        items: [],
      }
    },
    methods: {
      validator(rules) {
        return rules.map(rule => {
          if (this.items.indexOf(rule.name) !== -1) {
            // 返回对应孩子对象
            let child = this.$children.filter(child => child.$props.name === rule.name)
            if (rule.reg.test(child[0].$data.value)) {
              console.log(rule.name + '符合要求')
              child[0].$data.warn = false
              return {
                name: rule.name,
                status: true
              }
            }
            child[0].$data.warn = true
            return {
              name: rule.name,
              status: false
            }
          }
        })
      }
    },
    mounted() {
      // 保存子项
      let items = this.$children.filter(child => child.$options.name === 'p-input')
      this.items = items.map(item => {
        return item.$props.name
      })
    }
  }
</script>

<style scoped>
  .form{
    overflow: hidden;
  }
</style>
