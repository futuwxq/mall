<template>
  <div class="bottom-bar">
    <div class="bar-item bar-left">
      <div class="bar-left-item">
        <i class="icon service"></i>
        <span class="text">客服</span>
      </div>
      <div class="bar-left-item">
        <i class="icon shop"></i>
        <span class="text">店铺</span>
      </div>
      <div class="bar-left-item">
        <i class="icon select"></i>
        <span class="text">收藏</span>
      </div>
    </div>
    <div class="bar-item bar-right">
      <div class="cart" @click="addToCart">加入购物车</div>
      <div class="buy">购买</div>
    </div>
  </div>
</template>
<script>
export default {
  name: "DetailBottomBar",
  methods: {
    addToCart() {
      this.$emit("addToCart");
    },
  },
};
</script>
<style scoped>
.bottom-bar {
  position: relative;
  height: 58px;
  bottom: 0;
  left: 0;
  right: 0;
  background: #fff;
  display: flex;
  text-align: center;

  box-shadow: 0 -1px 1px rgba(180, 180, 180, 0.1);
}
.bar-item {
  flex: 1;
  display: flex;
}
.bar-item > div {
  flex: 1;
}
.bar-left .text {
  font-size: 13px;
}
.bar-left .icon {
  display: block;
  width: 22px;
  height: 22px;
  margin: 10px auto 3px;
  background: url("~assets/img/detail/detail_bottom.png") no-repeat;
  background-size: 22px;
}
.bar-left .service {
  background-position: 0 -53px;
}
.bar-left .shop {
  background-position: 0 -98px;
}

.bar-right {
  font-size: 15px;
  color: #ffffff;
  line-height: 58px;
}
.bar-right .cart {
  background-color: #ffe817;
}
.bar-right .buy {
  background-color: #f69;
}
</style>