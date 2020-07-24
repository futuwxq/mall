<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name: 'Scroll',
  mounted() {
    // 1.创建 BScroll 对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true,
      // probeType
    })

    // 2.监听滚动事件
    thsi.scroll
  }
}
</script>
<style scoped>
</style>