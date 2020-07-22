<template>
  <ul id="tabBar">
  <slot></slot>
  </ul>
</template>

<script>
export default {
  name:"TabBar"
}
</script>

<style scoped>
#tabBar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 49px;
  text-align: center;
  display: flex;
  background: #f2f2f2;
  box-shadow: 0 -1px 1px rgba(180,180,180,.1);
}

</style>