<template>
  <div class="container">
    <div class="fence"></div>
    <div class="editor">
      <div class="title">
        <p>新随笔</p>
        <input type="text" placeholder="请输入文章标题" v-model="title">
      </div>
      <mavon-editor
              ref="editor"
              @save="saveArticle"
              v-model="content"
              @imgAdd="$imgAdd"
              @imgDel="$imgDel"
              style="flex: auto"
      />
    </div>
    <aside>
      <input type="text" placeholder="搜索文章"  @keydown.enter="vagueFind" v-model="search">
      <div class="articles-container">
        <div v-for="item in articles" :key="item.id" class="article">
          <span class="article__tittle">{{item.title}}</span>
          <button @click="getArticleById(item.id)">
            <icon name="change"></icon>
          </button>
          <button @click="handleDelete(item)">
            <icon name="error"></icon>
          </button>
        </div>
      </div>
    </aside>
    <div></div>
  </div>
</template>

<script>
  import icon from "../components/icon"
  import toast from "../components/toast/src/toast"
  import websiteManageAPI from "../api/websiteManageAPI"
  import base from '../api/base'
  export default {
    name: "Edit",
    components: {
      icon,
      toast
    },
    data() {
      return {
        search: '', // 搜索
        articleId: 0,
        title: '',  // 文章标题
        content: '', // 文章内容
        articles: [], // 文章数组
      }
    },
    watch: {
      search(newVal) {
        if (newVal === '') {
          this.getAllArticle()
        } else {
          this.vagueFind()
        }
      }
    },
    methods: {
      updateArticle(id) {
        const { title, content } = this
        websiteManageAPI.updateArticle({
          id,
          title,
          content
        })
        .then(res => {
          this.getAllArticle()
        })
        .then(res => {
          this.$message({
            type: 'success',
            content: '更新成功'
          })
        })
      },
      saveArticle(value, ele) {
        if (this.title === '') {
          console.log('请输入标题')
          return
        }
        // 如果 articleId存在，就是修改文章而非直接保存
        if (this.articleId) {
          console.log('现在是更改状态')
          this.updateArticle(this.articleId)
          return
        }
        const { title, content } = this
        websiteManageAPI.uploadArticle({
          title,
          content
        })
          .then(res => {
            let content = '保存成功'
            let type = 'success'
            if (res.err) {
              content = res.err
              type = 'warning'
            }
            this.$message({
              type,
              content
            })
            return websiteManageAPI.getAllArticle()
          })
          .then(res => {
            this.articles = res.r
          })
          .catch(err => {
            console.log(err)
          })
      },
      getAllArticle() {
        websiteManageAPI.getAllArticle()
          .then(res => {
            this.articles = res.r
          })
      },
      getArticleById(id) {
        websiteManageAPI.getArticleById({
          id
        })
        .then(res => {
          console.log('res', res)
          this.title = res.title
          this.content = res.content
          this.articleId = res.id
        })
      },
      handleDelete(article) {
        this.$toast({
          message: `确认删除文章 ${article.title}?`,
          params: {
            article
          },
          onClose() {
            console.log('关闭')
          }
        })
        .then(res => {
          const id = res.article.id
          return websiteManageAPI.deleteArticle({
            id
          })
        })
        .then(res => {
          console.log('res', res)
          this.getAllArticle()
        })
        .then(res => {
          this.$message({
            type: 'success',
            content: '删除成功'
          })
        })
      },
      vagueFind() {
        websiteManageAPI.vagueFind({
          title: this.search
        })
        .then(res => {
          this.articles = res.articles
        })
      },
      $imgAdd(pos, $file) {
        let formData = new FormData()
        formData.append('image', $file)
        websiteManageAPI.loadImage(formData)
        .then(res => {
          const path = res.path.replace(/\\/g, '/')
          this.$refs.editor.$img2Url(pos, `${base.remote}${path}`);
        })
        .catch(err => {
          console.log(err)
        })
      },
      $imgDel(pos) {
        websiteManageAPI.deleteImage({
          picPath: pos[0].replace(`${base.remote}`, '')
        })
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
      }
    },
    mounted() {
      this.getAllArticle()
    }
  }
</script>


<style scoped lang="scss">
  .container{
    line-height: 1.5;
    width: 100%;
    display: flex;
    flex-direction: row;
    overflow: auto;
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
      background-image: url("http://localhost:3000/images/editBg.jpg");
      background-size: cover;
      background-repeat: no-repeat;
    }
    .fence{
      min-width: 0;
      max-width: 250px;
      margin: 15px 0;
      width: calc(100vw - 250px);
    }
    .editor{
      display: flex;
      flex-direction: column;
      margin: 125px 15px 15px 15px;
      width: 60%;
      max-width: 1400px;
      min-width: 900px;
      height: 800px;
      .title{
        p{
          font-size: 3em;
          color: white;
          padding-left: .5em;
          letter-spacing: 0.05em;
        }
        input{
          border: none;
          outline: none;
          width: 100%;
          padding: .5em 0;
          margin: 1em 0;
          text-indent: 1em;
          border-radius: 4px;
          font-size: 1.5em;
          letter-spacing: .05em;
        }
      }
    }
    aside{
      align-self: stretch;
      margin: 303px 15px 15px 15px;
      min-width: 300px;
      flex: 0 1 350px;
      input{
        @include normal-wrap;
        border-radius: 4px;
        display: inline-block;
        width: 100%;
        padding: .5em 0;
        text-indent: .5em;
        font-size: 1.25em;
        margin-bottom: 1em;
      }
      .articles-container{
        box-sizing:border-box;
        padding: 10px 0;
        margin-top: -.5em;
        .article {
          display: flex;
          margin-top: .5em;
          padding: .05em 10px;
          border-radius: 4px;
          transition: background-color .4s ease-in-out;
          &:hover{
            background-color: #2c3e50;
          }
          .article__tittle{
            width: 280px;
            text-overflow: ellipsis;
            font-size: 1.1em;
            color: white;
          }
          button{
            box-sizing: border-box;
            background-color: transparent;
            outline: none;
            border: none;
            width: 35px;
            cursor: pointer;
            font-size: 1.1em;
          }
        }
      }
    }
  }
</style>
