<template>
  <section>
    <slot></slot>
  </section>
</template>

<script>
  export default {
    name: "article-container",
    components: {

    },
    data() {
      return {
        page: 1,  //  1 页 10 篇
      }
    },
    methods: {

    },
    mounted() {
    }
  }
</script>

<style scoped>
 section{
   animation: fade-up 1.5s ease-in-out;
   max-width: 900px;
   min-width: 375px;
   margin: auto;
   display: flex;
   flex-direction: column;
   align-items: stretch;
 }
</style>
