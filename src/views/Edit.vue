<template>
  <div>
    <mavon-editor
            ref="editor"
            @save="saveArticle"
            v-model="value"
            @imgAdd="$imgAdd"
            @imgDel="$imgDel"
    />
  </div>
</template>

<script>
  import websiteManageAPI from "../api/websiteManageAPI"
  import base from '../api/base'
  export default {
    name: "Edit",
    data() {
      return {
        value: '',
        article: {

        },
        articleId: 17
      }
    },
    methods: {
      saveArticle(value, ele) {
        // let title = ele.match(/(?<=<\/a>).*(?=<\/h1>)/)[0] || ''
        if (!value.match(/(?<=#\s+).*(?=\s)/)) {
          console.log('请输入标题')
          return
        }
        const title = value.match(/(?<=#\s+).*(?=\s)/)[0]
        const content = value.replace(/^#\s+.*\s+/, '')
        websiteManageAPI.uploadArticle({
          title,
          content
        })
          .then(res => {
            console.log(res)
          })
          .catch(err => {
            console.log(err)
          })
      },
      getAllArticle() {
        websiteManageAPI.getAllArticle()
          .then(res => {
            console.log(res)
          })
      },
      $imgAdd(pos, $file) {
        let formData = new FormData()
        formData.append('image', $file)
        websiteManageAPI.loadImage(formData)
        .then(res => {
          let path = res.path.match(/(?<=static).*/)[0].replace(/\\/g, '/')
          this.$refs.editor.$img2Url(pos, `${base.remote}${path}`);
        })
        .catch(err => {
          console.log(err)
        })
      },
      $imgDel(pos) {
        websiteManageAPI.deleteImage({
          picPath: '/static' + pos[0].replace(`${base.remote}`, '')
        })
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
      }
    },
  }
</script>


<style scoped lang="scss">
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
</style>
