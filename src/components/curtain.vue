<template>
  <div class="curtain" :style="{
    backgroundImage: src ? `url(${imgSrc})` : 'none',
    top: top ? top : '0',
    bottom: bottom ? bottom : '0',
    right: right ? right : '0',
    left: left ? left : '0'
  }">
  </div>
</template>

<script>
  import base from "../api/base"
  export default {
    name: "curtain",
    props: {
      src: String,
      top: String,
      bottom: String,
      left: String,
      right: String
    },
    computed: {
      imgSrc() {
        return `${base.select}${this.src}`
      }
    }
  }
</script>

<style scoped lang="scss">
  .curtain{
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
    background-size: cover;
    background-attachment: fixed;
    background-repeat: no-repeat;
    filter: brightness(50%); /*亮度*/
    background-color: transparent;
  }
</style>
