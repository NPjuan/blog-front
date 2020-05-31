<template>
  <div id="app" @keydown="adminSystem">
    <curtain src="/images/background.jpg"></curtain>
    <transition name="fade">
      <router-view
              :class="classes"
              tabindex="0"
      >
      </router-view>
    </transition>
    <to-top></to-top>
  </div>
</template>

<script>
  import websiteManageAPI from "./api/websiteManageAPI"
  import toTop from "./components/toTop"
  import curtain from "./components/curtain"
  import adminAside from './components/admin-aside/src/admin-aside'
  export default {
    data() {
      return {
        normal: true,
        state: 0, // 状态机
      }
    },
    components: {
      adminAside,
      curtain,
      toTop
    },
    watch: {
      state(newVal) {
        if (newVal === 3) {
          this.normal = false
          this.$aside(true)
        }
      }
    },
    methods: {
      close() {
        this.state = 0
        this.normal = true
        this.$aside(false)
      },
      adminSystem(e) {
        if (e.key === 'Escape') {
          this.close()
          return
        }
        if (!this.normal) return
        switch (e.key) {
          case 'p':
            this.state = 1
            break
          case 'j':
            if (this.state === 1) {
              this.state = 2
            } else {
              this.state = 0
            }
            break
          case 'y':
            if (this.state === 2) {
              this.state = 3
            } else {
              this.state = 0
            }
            break
          default:
            this.state = 0
        }
      }
    },
    computed: {
      classes() {
        const classes = ['normal']
        if (!this.normal) {
          classes.push('abbreviation')
        }
        return classes
      }
    },
    mounted() {
      this.$bus.on('normal', () => {
        this.close()
      })
    }
  }
</script>

<style lang="scss" scoped>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  overflow-x: hidden;

  .normal{
    width: 100%; /*防止切换时页面崩塌*/
    min-height: 100vh;
    overflow: hidden;
    transform: translate3d(0, 0, 0);
    transition: all .5s ease-in-out;
    background-color: transparent;
  }
  .abbreviation{
    transform: translate3d(150px, 0, -300px);
  }
  .fade-enter-active, .fade-leave-active {
    position: absolute;
    transition: all .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
    transform: translate3d(0, -300px, -300px);
  }
}
</style>
