<template>
  <div id="app">
    <m-header></m-header>
    <tab></tab>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>

  </div>
</template>

<script>
  /* 组件的本质是一个类，类首字母要大写，但是标签可以小写，驼峰式转 - 的形式 */
  import MHeader from 'components/m-header/m-header'
  import Tab from 'components/tab/tab'

  export default {
    components: {
      MHeader,
      Tab
    }
  }
</script>

<style scoped lang='stylus'>
  @import "~common/stylus/variable"

  #app
    color: $color-theme
</style>
