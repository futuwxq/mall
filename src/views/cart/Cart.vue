<template>
  <div id="cart">
    <nav-bar class="nav-bar">
      <template v-slot:center>购物车({{length}})</template>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import { mapGetters } from "vuex";
export default {
  name: "Cart",
  components: {
    NavBar,
  },
  computed: {
    // 两种语法
    // getListLength() {
    //   return this.$store.state.cartList.length;
    // },
    ...mapGetters({
      length: "cartLength",
      list: "cartList",
    }),
  },
};
</script>
<style scoped>
.nav-bar {
  background: var(--color-tint);
  color: #fff;
}
</style>