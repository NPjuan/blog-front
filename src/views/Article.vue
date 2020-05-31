<template>
  <div>
    <md-article :article-id="numberId"></md-article>
    <to-top></to-top>
  </div>
</template>

<script>
  import mdArticle from '../components/md-article'
  import curtain from "../components/curtain"
  import toTop from "../components/toTop"
  export default {
    props: ['id'],
    name: "Article",
    components: {
      mdArticle,
      curtain,
      toTop
    },
    computed: {
      numberId() {
        return parseInt(this.id, 10)
      }
    }
  }
</script>

<style scoped>

</style>
