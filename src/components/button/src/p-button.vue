<template>
  <button :class="[
    'p-button',
    type ? `p-button--${type}` : '',
    size ? `${size}` : ``,
    {
      'is-disabled': disabled || loading,
      'is-loading': loading
    }]"
          @click="handleClick">
    <i class="button-icon loading" v-if="loading"></i>
    <i class="button-icon" v-if="icon && !loading"></i>
    <span><slot></slot></span>
  </button>
</template>

<script>
  export default {
    name: "p-button",
    props: {
      type: {
        type: String,
        default: 'default'
      },
      size: String,
      disabled: {
        type: Boolean,
        default: false
      },
      loading: {
        type: Boolean,
        default: false
      },
      icon: String
    },
    methods: {
      handleClick(evt) {
        this.$emit('click', evt)
      }
    }
  }
</script>

<style scoped>
  .p-button{
    position: relative;
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    background: #fff;
    border: 1px solid #dcdfe6;
    color: #606266;
    -webkit-appearance: none;
    text-align: center;
    box-sizing: border-box;
    outline: none;
    margin: 0;
    transition: .1s;
    font-weight: 500;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    padding: 12px 20px;
    font-size: 14px;
    border-radius: 4px;
    letter-spacing: 0.1em;
  }
  .p-button + .p-button{
    margin-left: 5px;
  }
  .medium{
    padding: 10px 20px;
    font-size: 14px;
    border-radius: 4px;
  }
  .small{
    padding: 9px 15px;
    font-size: 12px;
    border-radius: 3px;
  }
  .mini{
    padding: 7px 15px;
    font-size: 12px;
    border-radius: 3px;
  }
  .p-button--default{

  }
  .p-button--default:hover{
    color: #409eff;
    border-color: #c6e2ff;
    background-color: #ecf5ff;
  }
  .p-button--default:active{
    color: #409eff;
    border-color: #409eff;
    background-color: #ecf5ff;
  }
  .p-button--primary{
    color: #fff;
    background-color: #409eff;
    border-color: #409eff;
  }
  .p-button--primary:hover{
    background: #66b1ff;
    border-color: #66b1ff;
    color: #fff;
  }
  .p-button--primary:active{
    background: #3a8ee6;
    border-color: #3a8ee6;
    color: #fff;
  }
  .p-button--success{
    color: #fff;
    background-color: #67c23a;
    border-color: #67c23a;
  }
  .p-button--success:hover{
    background: #85ce61;
    border-color: #85ce61;
    color: #fff;
  }
  .p-button--success:active{
    background: #5daf34;
    border-color: #5daf34;
    color: #fff;
  }
  .p-button--info{
    color: #fff;
    background-color: #909399;
    border-color: #909399;
  }
  .p-button--info{
    background: #a6a9ad;
    border-color: #a6a9ad;
    color: #fff;
  }
  .p-button--info:active{
    background: #a6a9ad;
    border-color: #a6a9ad;
    color: #fff;
  }
  .p-button--warning{
    color: #fff;
    background-color: #e6a23c;
    border-color: #e6a23c;
  }
  .p-button--warning:hover{
    background: #ebb563;
    border-color: #ebb563;
    color: #fff;
  }
  .p-button--warning:active{
    background: #ebb563;
    border-color: #ebb563;
    color: #fff;
  }
  .p-button--danger{
    color: #fff;
    background-color: #f56c6c;
    border-color: #f56c6c;
  }
  .p-button--danger:hover{
    background: #f78989;
    border-color: #f78989;
    color: #fff;
  }
  .p-button--danger:active{
    background: #f78989;
    border-color: #f78989;
    color: #fff;
  }
  .is-disabled{
    color: #c0c4cc;
    cursor: not-allowed;
    background-image: none;
    background-color: #fff;
    border-color: #ebeef5;
  }
  .is-loading{
    position: relative;
    pointer-events: none;
    text-align: center;
  }
  .button-icon{
    display: inline-block;
    width: 16px;
    height: 16px;
    margin-top: -1px;
    vertical-align: top;
  }
  [class*='small']>i{
    width: 14px;
    height: 14px;
  }
  [class*='mini']>i{
    width: 12px;
    height: 12px;
    margin-top: 0;
  }
  @keyframes rotating {
    0%{-webkit-transform:rotate(0deg);}
    100%{-webkit-transform:rotate(360deg);}
  }
</style>
