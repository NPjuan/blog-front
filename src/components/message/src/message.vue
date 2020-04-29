<template>
  <div class="wrap">
    <transition-group name="flip-list">
      <div class="message" :class="[
        `msg--${item.type}`
      ]" v-for="item in notices" :key="item._name">
        <icon :name="item.type"></icon>
        <div class="content">{{item.content}}</div>
      </div>
    </transition-group>
  </div>
</template>

<script>
  import icon from "../../icon"
  const DefaultOptions = {
    duration: 3000,
    type: 'info',
    content: '这是一条信息'
  }
  let seed = 0
  export default {
    name: "message",
    components: {
      icon
    },
    data() {
      return {
        notices: []
      }
    },
    methods: {
      add(notice = {}) {
        // name 标识，用于移除弹窗
        let _name = this.getName()
        // 合并选项
        notice = Object.assign({
          _name
        }, DefaultOptions, notice)
        this.notices.push(notice)
        setTimeout(() => {
          this.removeNotice(_name)
        }, notice.duration)
      },
      getName() {
        return 'msg_' + (seed++)
      },
      removeNotice(_name) {
        let index = this.notices.findIndex(item => {
          return item._name === _name
        })
        this.notices.splice(index, 1)
      }
    },
    mounted() {
      const maxIndex = [...document.body.querySelectorAll('*')].reduce((r, e) => Math.max(r, +window.getComputedStyle(e).zIndex || 0), 0)
      this.$el.style.zIndex = maxIndex+1
    }
  }
</script>

<style scoped lang="scss">
  .flip-list-move {
    transition: transform .4s;
  }
  .flip-list-enter,
  .flip-list-leave-to {
    opacity: 0;
    transform: translateY(-30px);
  }
  .flip-list-leave-active {
    position: absolute;
  }
  .wrap {
    position: fixed;
    top: 30px;
    left: 50%;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: center;
    transform: translateX(-50%);
    font-size: 14px;
  }
  .message {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    --borderWidth: 1px;
    min-width: 240px;
    max-width: 500px;
    margin-bottom: 15px;
    padding: 12px 15px 12px 20px;
    border-radius: 6px;
    overflow: hidden;
    border: 1px solid $first-border-color;
    transition: all .4s ease-in-out;// 从Y轴的30px处渐渐移动到上面
  }
  .content{
    padding-left: 10px;
  }
  .msg-text{
    padding-left: 15px;
  }
  .msg--info{
    color: $info;
    background-color: #edf2fc;
  }
  .msg--success{
    color: $success;
    background: #f0f9eb;
    border-color: #e1f3d8;
  }
  .msg--warning{
    color: $warning;
    background-color: #fdf6ec;
    border-color: #faecd8;
  }
  .msg--error{
    color: $danger;
    background-color: #fef0f0;
    border-color: #fde2e2;
  }
</style>
