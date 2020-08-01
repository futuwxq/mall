<template>
  <div class="check-button">
    <img src="~assets/img/cart/tick.svg" :class="{active:isChecked}" alt />
  </div>
</template>

<script>
export default {
  name: "CheckButton",
  props: {
    isChecked: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
.check-button img {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 1px solid #ccc;
}
.check-button .active {
  background: red;
  border-color: #eee;
}
</style>>
