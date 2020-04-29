<template>
  <div class="article-container">
    <article type="md" v-show="complete">
      <aside :style="{
        top: asideTop
      }">
        <button @click="handleLike">
          <icon name="like" :class="likeClasses"></icon>
        </button>
        <p style="font-size: .8em">{{article.likes}}</p>
      </aside>
      <header>
        <span class="title">{{article.title}}</span>
        <span class="author">{{article.author}}</span>
      </header>
      <div class="content" v-html="md2html">
      </div>
      <footer></footer>
    </article>
  </div>
</template>

<script>
  import marked from "marked"
  import websiteManageAPI from "../api/websiteManageAPI"
  import icon from "./icon"
  import throttle from '../utils/throttle'
  export default {
    name: "md-article",
    components: {
      icon
    },
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
          content: '作者有点懒，还没写呢',
          likes: 0
        },
        asideTop: "100px",
        like: false,  // 当前用户是否点赞
      }
    },
    methods: {
      loadArticle() {
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
      },
      handleLike() {
        const ip = window.localStorage.getItem('ip')
        const titleId = this.articleId
        websiteManageAPI.like({
          ip,
          titleId
        })
        .then(res => {
          if (!res.code) {
            this.like = true
            this.article.likes++
          } else {
            this.like = false
            this.article.likes--
          }
        })
        .catch(err => {
          console.log('err', err)
        })
      },
      isLike() {
        const ip = window.localStorage.getItem('ip')
        const titleId = this.articleId
        websiteManageAPI.isLike({
          ip,
          titleId
        })
          .then(res => {
            this.like = res
          })
      }
    },
    computed: {
      md2html() {
        return marked(`${this.article.content ? this.article.content : '作者有点懒，还没写呢'}`)
      },
      likeClasses() {
        return this.like ? 'item-active' : 'item-normal'
      }
    },
    mounted() {
      this.loadArticle()
      document.body.onscroll = throttle(() => {
        this.asideTop = (document.body.scrollTop || window.pageYOffset) + 120 + 'px'
      }, 250, true)
      this.isLike()
    }
  }
</script>

<style lang="scss">
  .article-container{
    width: 40%;
    margin: 0 auto;
    min-width: 325px;
    max-width: 900px;
    article[type='md']{
      position: relative;
      animation: fade-up 1.5s ease-in-out;
      box-shadow:$main-box-shadow;
      padding: 1.5em;
      font-size: 1.25em;
      background-color: white;
      border-radius: 6px;
      aside{
        transition: top .3s ease-in-out;
        position: absolute;
        top: 60px;
        right: -80px;
        width: 40px;
        height: auto;
        background-color: white;
        border-radius: 4px;
        padding: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
        button{
          @include normal-wrap;
          font-size: 1.1em;
          background-color: transparent;
          .item-normal{
            animation: disLike .5s;
            animation-fill-mode: forwards;
          }
          .item-active{
            animation: like .5s;
            animation-fill-mode: forwards;
          }
        }
      }
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
  }
</style>
