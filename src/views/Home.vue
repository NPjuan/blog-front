<template>
  <div class="main">
    <h1 class="introduce" @click="edit">你好，<br/>我是潘俊渊</h1>
    <md-article :articleId="articleId">
    </md-article>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

import mdArticle from "../components/md-article"
import websiteManageAPI from "../api/websiteManageAPI"
import { deconstruct } from '../utils/index'
import { MyPromise } from '../utils/myPromise'
export default {
  name: 'Home',
  components: {
    mdArticle
  },
  data() {
    return {
      nickname: '',
      articleId: 1
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
          console.log(err)
        })
    },
    musicLogin() {
      let http = new XMLHttpRequest()
      // http.withCredentials = true //部分请求或许需要该配置，具体请先查看文档
      http.onreadystatechange=function()
      {
        if (http.readyState===4 && http.status===200) {
          console.log(JSON.parse(http.responseText))
        }
      }
      http.open("GET",`http://musicapi.leanapp.cn/login/cellphone?phone=13642943515&password=7485963`,true);
      http.send();
    }
  },
  mounted() {
    this.loginByToken()
  }
}
</script>

<style scoped lang="scss">
  .main{
    min-height: 100vh;
    line-height: 1.5;
    width: 100%;
    &:before{
      content: '';
      display: block;
      width: 100%;
      height: 100%;
      position: fixed;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      z-index: -1;
      filter: brightness(50%);
      background-image: url("http://localhost:3000/images/background.jpg");
      background-size: cover;
      background-repeat: no-repeat;
    }
    .introduce{
      padding-top: .5em;
      padding-left: 2em;
      font-size: 4em;
      color: white;
    }
    article{
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
          max-width: 100%;
          width: 100%;
          padding-top: .5em;
        }
      }
    }
  }
</style>
