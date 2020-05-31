<template>
  <div class="main">
    <p class="introduce" @click="edit">
      <span style="text-align: left">
        你好，<br/>我是潘俊渊
      </span>
    </p>
    <article-container>
      <article-intro v-for="item in articles" :article="item" :key="item.id">
      </article-intro>
    </article-container>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

import articleIntro from "../components/article-intro"
import articleContainer from "../components/article-container"
import curtain from "../components/curtain"
import websiteManageAPI from "../api/websiteManageAPI"
import { deconstruct } from '../utils/index'
import { MyPromise } from '../utils/myPromise'
export default {
  name: 'Home',
  components: {
    articleContainer,
    articleIntro,
    curtain
  },
  data() {
    return {
      nickname: '',
      articles: []
    }
  },
  methods: {
    edit() {
      this.$router.push('/edit')
    },
    // 登录
    login() {
      websiteManageAPI.login({
        "email":"1040589574@qq.com",
        "password":"7485963"
      })
        .then(res => {
          const token = res.token
          window.localStorage.setItem('token', token)
          deconstruct(this, res)
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 通过 token 无感登录
    loginByToken() {
      websiteManageAPI.loginByToken({
      })
        .then(res => {
          deconstruct(this, res)
        })
        .catch(err => {

        })
    }
  },
  mounted() {
    this.loginByToken()
    websiteManageAPI.getAllArticle()
    .then(res => {
      this.articles.push(...res.r)
    })
  }
}
</script>

<style scoped lang="scss">
  .main{
    .introduce{
      padding-top: .5em;
      text-align: center;
      font-size: 4em;
      color: white;
    }
  }
</style>
