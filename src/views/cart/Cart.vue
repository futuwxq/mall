<template>
  <div id="cart">
    <!-- 导航 -->
    <nav-bar class="nav-bar">
      <template v-slot:center>购物车({{cartLength}})</template>
    </nav-bar>
    <!-- 购物车 -->
    <cart-list />
    <!-- 底部结算 -->
    <cart-bottom-bar />
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import CartList from "./cartComponent/CartList";
import CartBottomBar from "./cartComponent/CartBottomBar";
import { mapGetters } from "vuex";
export default {
  name: "Cart",
  components: {
    NavBar,
    CartList,
    CartBottomBar,
  },
  computed: {
    // getListLength() {
    //   return this.$store.state.cartList.length;
    // },
    // 两种语法
    // 语法1 数组语法
    ...mapGetters(["cartLength"]),
    // 语法2 对象语法，属性名可自定义
    // ...mapGetters({
    //   length: "cartLength",
    //   list: "cartList",
    // }),
  },
};
</script>
<style scoped>
#cart {
  height: 100vh;
}
.nav-bar {
  background: var(--color-tint);
  color: #fff;
}
</style>