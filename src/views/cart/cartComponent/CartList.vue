<template>
  <div class="cart-list-wrap">
    <cart-list-item v-for="(item, index) in cartList" :key="index" :proudcts="item" />
  </div>
</template>
<script>
import CartListItem from "./CartListItem";
import { mapGetters } from "vuex";
export default {
  name: "CartList",
  components: {
    CartListItem,
  },
  computed: {
    ...mapGetters(["cartList"]),
  },
};
</script>
<style scoped>
</style>