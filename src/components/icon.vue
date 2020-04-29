<template>
  <svg class="svg-icon" aria-hidden="true">
    <use :xlink:href="iconName"></use>
  </svg>
</template>

<script>
  export default {
    name: 'icon',
    props: {
      name: {
        type: String,
        required: true
      }
    },
    computed: {
      iconName() {
        return `#icon-${this.name}`
      }
    }
  }
</script>

<style>
  .svg-icon {
    width: 1.25em;
    height: 1.25em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
</style>


