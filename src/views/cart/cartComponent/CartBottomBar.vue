<template>
  <div class="car-bottom-bar">
    <div class="check-content">
      <check-button
        :isChecked="isSelectAll"
        @click.native="checkClick"
        class="check-button"
        id="check"
      />
      <label for="check">全部</label>
    </div>
    <div class="price">合计:{{totalPrice}}</div>
    <div class="calculate" @click="calcClick">去计算 ({{checkLength}})</div>
  </div>
</template>

<script>
import CheckButton from "components/content/checkButton/CheckButton";
import { mapGetters } from "vuex";
export default {
  name: "CartBottomBar",
  components: {
    CheckButton,
  },
  computed: {
    ...mapGetters(["cartList"]),
    totalPrice() {
      return (
        "￥" +
        this.cartList
          .filter((item) => {
            return item.isChecked;
          })
          .reduce((preValue, item) => {
            return preValue + item.price * item.count;
          }, 0)
          .toFixed(2)
      );
    },
    checkLength() {
      return this.cartList
        .filter((item) => {
          return item.isChecked;
        })
        .reduce((preValue, item) => {
          return preValue + item.count;
        }, 0);
    },
    /**
     * 是否全选
     */
    isSelectAll() {
      //  find 找到就返回该成员，否则 undefined
      if (this.cartList.length === 0) return false;
      return !this.cartList.find((item) => !item.isChecked);
    },
  },
  methods: {
    checkClick() {
      // 现在处于全部选中状态
      if (this.isSelectAll)
        this.cartList.forEach((item) => (item.isChecked = false));
      // 不全选中状态
      else this.cartList.forEach((item) => (item.isChecked = true));
    },
    calcClick() {
      if (!this.isSelectAll) this.$toast.show("请选择购买的商品");
      else {
        this.$toast.show("支付界面未完善");
      }
    },
  },
};
</script>

<style scoped>
.car-bottom-bar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 49px;
  height: 40px;
  background: #eee;
  display: flex;
  text-align: center;
  line-height: 40px;
  font-size: 14px;
}

.check-content {
  display: flex;
  width: 80px;
}
.check-content .check-button {
  padding: 0 5px;
  /* width: 20px; */
  display: flex;
  align-items: center;
}
.price {
  flex: 1;
  /* text-align: left; */
}
.calculate {
  width: 100px;
  color: #fff;
  background: red;
}
</style>

