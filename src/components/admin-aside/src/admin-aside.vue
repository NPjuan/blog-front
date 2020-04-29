<template>
  <aside :style="{
    left: show ? '0' : '-300px',
    width: show ? '300px' : '0'
  }">
    <p-form :rules="rules" ref="form">
      <p-input
              :required="true"
              label="账号"
              name="account"
              tips="账号归博主所有"
              placeholder="请输入账号"
              v-model="form.account">
      </p-input>
      <p-input
              :required="true"
              label="密码"
              name="password"
              tips="账号归博主所有"
              placeholder="请输入密码"
              v-model="form.password">
      </p-input>
      <p-button type="success" style="width: 100%" @click="submit">登录</p-button>
    </p-form>
  </aside>
</template>

<script>
  import websiteManageAPI from "../../../api/websiteManageAPI"
  import pInput from '../../input/src/p-input'
  import pForm from '../../form/src/p-form'
  import pButton from '../../button/src/p-button'
  export default {
    name: 'admin-aside',
    components: {
      pInput,
      pForm,
      pButton
    },
    data() {
      return {
        show: false,
        form: {
          account: '',
          password: ''
        },
        rules: [
          {
            name: 'account',
            reg: /.*@.*/
          },
          {
            name: 'password',
            reg: /\S/
          }
        ]
      }
    },
    methods: {
      submit() {
        let result = this.$refs.form.validator(this.rules).every(item => {
          return item.status === true
        })
        if (!result) return
        websiteManageAPI.login({
          email: this.form.account,
          password: this.form.password
        })
        .then(res => {
          if (res.nickname) {
            this.$message({
              type: 'success',
              content: `欢迎你 ${res.nickname}`
            })
            this.close()
          }
        })
        .catch(err => {
          this.$message({
            type: 'warning',
            content: `账号或密码错误`
          })
        })
      },
      appear() {
        setTimeout(() => {
          this.show = true
        })
      },
      close() {
        this.show = false
        setTimeout(() => {
          this.$destroy()
          document.body.removeChild(this.$el)
        }, 500)
      }
    },
    mounted() {
      const maxIndex = [...document.body.querySelectorAll('*')].reduce((r, e) => Math.max(r, +window.getComputedStyle(e).zIndex || 0), 0)
      this.$el.style.zIndex = maxIndex+1
    }
  }
</script>

<style scoped>
  aside{
    box-sizing: border-box;
    position: fixed;
    left: 0;
    top: 0;
    height: 100vh;
    width: 0;
    padding: 30px;
    transition: all .5s ease-in-out;
    background-color: white;
  }
</style>
