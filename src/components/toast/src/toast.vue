<template>
  <div class="wrap" v-show="visible">
    <div class="toast">
      <header>
        {{title}}
        <button v-if="showClose" @click="handleClose">
          <icon name="cancel" ></icon>
        </button>
      </header>
      <p>
        <icon :name="type"></icon>
        <span>{{message}}</span>
      </p>
      <footer>
        <p-button @click="handleCancel" size="small" v-if="showCancelButton">{{cancelButtonText}}</p-button>
        <p-button @click="handleConfirm" size="small" type="primary" v-if="showConfirmButton">{{confirmButtonText}}</p-button>
      </footer>
    </div>
  </div>
</template>

<script>
  import pButton from '../../button/src/p-button'
  import icon from "../../icon"
  export default {
    name: "toast",
    components: {
      icon,
      pButton
    },
    data() {
      return {
        type: 'warning',
        message: '',
        title: '提示',
        closed: false,
        visible: true,
        showClose: true,
        showCancelButton: false,
        showConfirmButton: true,
        cancelButtonText: '取消',
        confirmButtonText: '确认',
      }
    },
    watch: {
      closed(newVal) {
        if (newVal) {
          this.visible = false
        }
      }
    },
    methods: {
      handleClose() {
        // 删除节点
        this.closed = true
        if (typeof this.onClose === 'function') {
          this.onClose(this);
        }
        this.$destroy()
        document.body.removeChild(this.$el)
      },
      handleCancel() {
        // reject
        this.cancel(this.params)
        // 处理关闭
        this.handleClose()
      },
      handleConfirm() {
        // resolve
        this.confirm(this.params)
        // 处理关闭
        this.handleClose()
      }
    },
    mounted() {
      const maxIndex = [...document.body.querySelectorAll('*')].reduce((r, e) => Math.max(r, +window.getComputedStyle(e).zIndex || 0), 0)
      this.$el.style.zIndex = maxIndex+1
    }
  }
</script>

<style scoped lang="scss">
  .wrap{
    color: #2c2f38;
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    z-index: 2;
    background-color: rgba(0,0,0,.6);
    letter-spacing: .05em;
    .toast{
      @include normal-wrap;
      background-color: white;
      position: absolute;
      top: 50%;
      left: 50%;
      width: 320px;
      padding: 15px;
      transform: translate(-50%, -50%);
      header{
        font-size: 1.25em;
        button{
          box-sizing: border-box;
          background-color: transparent;
          outline: none;
          border: none;
          cursor: pointer;
          font-size: 1em;
          float: right;
        }
      }
      p{
        display: flex;
        padding: 15px 0;
        font-size: 1.25em;
        span{
          padding-left: 15px;
          font-size: .8em;
          color: #606266;
        }
      }
      footer{
        display: flex;
        flex-direction: row-reverse;
      }
    }
  }
</style>
