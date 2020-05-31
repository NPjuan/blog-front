<template>
  <div class="intro" @click="toArticle">
    <header>{{article.title}}</header>
    <div class="content">
      <ellipsis-text>
        {{article.intro}}
      </ellipsis-text>
      <img v-if="article.sketch" :src="article.sketch" alt="文章缩略图">
    </div>
    <footer>
      <span>
        <icon name="like"></icon>
        <span>{{article.likes}}</span>
        人喜欢
      </span>
    </footer>
  </div>
</template>

<script>
  import ellipsisText from './ellipsis-text'
  import icon from "./icon"
  export default {
    name: "article-intro",
    components: {
      ellipsisText,
      icon
    },
    props: {
      article: {
        type: Object,
        default: {
          title: '无题',
          sketch: '',
          likes: 0,
          views: 0,
          id: 0,
          intro: '作者有点懒，还没写呢'
        }
      }
    },
    methods: {
      toArticle() {
        this.$router.push(`article/${this.article.id}`)
      }
    },
  }
</script>

<style scoped lang="scss">
  .intro{
    @include normal-wrap;
    margin-top: 25px;
    padding: 15px 30px;
    transition: all .4s ease-in-out;
    cursor: pointer;
    flex: auto;
    letter-spacing: .05em;
    &:hover{
      box-shadow: 0 8px 15px rgba(146,146,146,.39);
    }
    &:after{
      display: block;
      content: '';
      clear: both;
    }
    header{
      font-size: 2em;
    }
    .content{
      display: flex;
      padding-top: 10px;
      max-height: 8.5em;
      word-break: break-all;
      img{
        display: inline-block;
        width: 14em;
        height: auto;
        max-height: 100%;
      }
      @media screen and (max-width: 500px) {
        img {
          display: none;
        }
      }
    }
    @media screen and (max-width: 500px) {
      .content {
        height: 5.5em;
      }
    }
    footer{
      padding-top: .6em;
      height: 2.5em;
      vertical-align: baseline;
      span{
        display: flex;
        align-items: center;
        span{
          padding-left: 8px;
          padding-right: 5px;
        }
      }
    }
  }
  @media screen and (max-width: 500px) {
    .intro {
      margin-top: 1.5em;
      font-size: .8em;
      padding: 1em;
    }
  }
</style>
