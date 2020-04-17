<template>
  <article type="md" v-show="complete">
    <header>
      <span class="title">{{article.title}}</span>
      <span class="author">{{article.author}}</span>
    </header>
    <div class="content" v-html="md2html">
    </div>
    <footer></footer>
  </article>
</template>

<script>
  import marked from "marked"
  import websiteManageAPI from "../api/websiteManageAPI"

  export default {
    name: "md-article",
    props: {
      articleId: {
        type: Number,
        default: 0
      },
    },
    data() {
      return {
        complete: false,
        article: {
          title: '无题',
          content: '作者有点懒，还没写呢'
        }
      }
    },
    methods: {
      load() {
        websiteManageAPI.getArticleById({
          id: this.articleId
        })
          .then(res => {
            this.article = res
            this.complete = true
          })
          .catch(err => {
            console.log(err)
          })
      }
    },
    computed: {
      md2html() {
        return marked(`${this.article.content ? this.article.content : '作者有点懒，还没写呢'}`)
      }
    },
    mounted() {
      this.load()
    }
  }
</script>

<style lang="scss">
  article[type='md']{
    animation: fade-up 1.5s ease-in-out;
    box-shadow:$main-box-shadow;
    width: 40%;
    min-width: 325px;
    padding: 1.5em;
    margin: 0 auto;
    font-size: 1.25em;
    background-color: white;
    border-radius: 6px;
    header{
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      flex-wrap: wrap;
      padding-top: 0;
      padding-left: .8em;
      padding-bottom: .5em;
      font-size: 2.5em;
      .title{
        white-space: nowrap;
        padding-right: 2em;
      }
      .author{
        padding-right: 1em;
        font-size: .5em;
        white-space: nowrap;
        min-width: fit-content;
      }
      &+p{
        padding-top: 0;
      }
    }
    .content{
      margin-top: -.5em;
      p{
        text-indent: 2em;
        padding-top: .5em;
      }
      img{
        padding-top: .5em;
        max-width: 100%;
        width: 100%;
      }
    }
  }
</style>
