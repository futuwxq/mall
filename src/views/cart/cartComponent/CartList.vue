<template>
  <div class="cart-list-wrap">
    <scroll class="content">
      <cart-list-item v-for="(item, index) in cartList" :key="index" :proudcts="item" />
    </scroll>
  </div>
</template>
<script>
import CartListItem from "./CartListItem";
import Scroll from "components/common/scroll/Scroll";

import { mapGetters } from "vuex";
export default {
  name: "CartList",
  components: {
    CartListItem,
    Scroll,
  },
  computed: {
    ...mapGetters(["cartList"]),
  },
};
</script>
<style scoped>
.cart-list-wrap {
  height: 100%;
}
.content {
  position: absolute;
  top: 44px;
  left: 0;
  right: 0;
  bottom: 89px;
  overflow: hidden;
}
</style>