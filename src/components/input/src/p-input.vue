<template>
  <div class="input-container" :style="{height: height}">
    <span :class="labelClasses">{{label}}</span>
    <input
            :key="name"
            :class="inputClasses"
            :type="type"
            :disabled="disabled"
            :placeholder="placeholder"
            v-model="value"
            aria-autocomplete="none"
            autocomplete="off"
            @click="isClick"
            @blur="isBlur"
            @input="input(value)">
    <transition name="fade">
      <span :key="tips" class="tips" v-show="tipShow">{{tips}}</span>
    </transition>
  </div>
</template>

<script>
  export default {
    name: "p-input",
    props: {
      label: {
        type: String,
        default: ''
      },
      name: { // 是否有input提示
        type: String,
        default: ''
      },
      type: { // input 的种类
        type: String,
        default: 'text',
        validator: function (value) {
          // 这个值必须匹配下列字符串中的一个
          return ['text', 'password', 'number'].indexOf(value) !== -1
        },
      },
      show: { // 展现形式
        type: String,
        default: 'normal',
        validator: function (value) {
          // 这个值必须匹配下列字符串中的一个
          return ['normal', 'line'].indexOf(value) !== -1
        },
      },
      tips: { // 错误提示
        type: String,
        default: ''
      },
      required: { // 是否必填
        type: Boolean,
        default: false
      },
      placeholder: {
        type: String,
        default: ''
      },
      disabled: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        value: '',
        click: false,
        height: '90px',
        warn: false
      }
    },
    methods: {
      input(val) {
        this.$emit('input', val)
        this.warn = false
      },
      isClick() {
        this.click = true
      },
      isBlur() {
        this.click = false
      }
    },
    watch: {
      tipShow(val) {
        if (val) {
          this.height = '105px'
        } else {
          this.height = '90px'
        }
      }
    },
    computed: {
      labelClasses() {
        let classes = []
        if (this.label !== '') {
          classes.push('label')
          if (this.required) {
            classes.push('label--required')
          }
        }
        return classes
      },
      inputClasses() {
        let classes = ['input--normal']
        if (this.warn) {
          classes.push('input--normal--warn')
        }
        return classes
      },
      tipShow() {
        return this.tips !== '' && (this.click || this.warn)
      }
    }
  }
</script>

<style scoped lang="scss">
  .input-container{
    box-sizing: border-box;
    padding-bottom: 10px;
    height: 100px;
    transition: height .2s ease-in-out;
    .label{
      font-size: 16px;
      display: inline-block;
      padding-bottom: 6px;
    }
    .label--required::before{
      display: inline-block;
      content: '*';
      color: red;
      width: 10px;
      height: 10px;
    }
    .input--normal{
      box-sizing: border-box;
      display: inline-block;
      padding: 0 15px;
      width: 100%;
      height: 40px;
      line-height: 40px;
      font-size: 14px;
      border: 1px solid #dcdfe6;
      border-radius: 4px;
      cursor: pointer;
      outline: none;
      transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    }
    .input--normal:focus{
      border-color: #409eff
    }
    .input--normal--warn{
      border-color: orangered;
    }
    .tips{
      display: inline-block;
      padding-top: 5px;
      padding-left: 10px;
      font-size: 12px;
      color: gray;
    }
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .2s;
  }
  .fade-enter, .fade-leave-to{
    opacity: 0;
  }
  .lift-enter-active, .lift-leave-active {
    transition: height .2s;
  }
  .lift-enter{
    height: 110px;
  }
  .lift-leave-to{
    height: 150px;
  }
</style>
