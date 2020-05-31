<template>
  <div class="toTop">
    <icon name="rocket"></icon>
  </div>
</template>

<script>
  import icon from "./icon"
  export default {
    name: "toTop",
    components: {
      icon
    },
    data() {
      return {
        showTop: '60px'
      }
    },
    methods: {

    }
  }
</script>

<style scoped>
  .toTop{
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    right: 40px;
    bottom: 150px;
    background-color: white;
    border-radius: 4px;
    width: 1.6em;
    height: 1.6em;
    font-size: 1.8em;
    cursor: pointer;
  }
</style>
