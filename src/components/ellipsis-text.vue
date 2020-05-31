<template>
  <div class="text">
    <p>
      <slot></slot>
    </p>
    <i v-if="show" style="">
      ...
    </i>
  </div>
</template>

<script>
  import throttle from '../utils/throttle'
  export default {
    name: "ellipsis-text",
    props: {
      maxHeight: {
        type: String,
        default: '100%'
      }
    },
    data() {
      return {
        show: false
      }
    },
    methods: {
      resize() {
        const parent = parseInt(this.$el.parentElement.getClientRects()[0]['height'], 10)
        const child = parseInt(this.$el.firstElementChild.getClientRects()[0]['height'], 10)
        this.show = parent < child
      },
      throttleResize() {}
    },
    mounted() {
      this.throttleResize = throttle(this.resize, 250, true)
      window.addEventListener('resize', this.throttleResize)
      this.resize()
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.throttleResize)
    }
  }
</script>

<style scoped lang="scss">
  .text{
    position: relative;
    width: 100%;
    max-height: 8.5em;
    word-break: break-all;
    padding-right: 10px;
    font-size: 1.1em;
    overflow: hidden;
    p{
      word-break: break-all;
    }
    i{
      position: absolute;
      right: 10px;
      bottom: 0;
      width: 60px;
      font-size: 1.2em;
      letter-spacing: .2em;
      text-align: center;
      background-image: linear-gradient(to right, rgba(255,255,255,.8) 10%, white);
    }
  }
</style>
