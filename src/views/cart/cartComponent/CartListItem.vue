<template>
  <div class="cart-list-item" @click="productClick">
    <div class="item-selector">
      <check-button @click.stop.native="checkClick" :isChecked="proudcts.isChecked" />
    </div>
    <div class="item-img">
      <img :src="proudcts.image" alt="商品图片" />
    </div>
    <div class="item-info">
      <div class="item-title">{{proudcts.title}}</div>
      <div class="item-desc">{{proudcts.desc}}</div>
      <div class="info-bottom">
        <div class="item-price left">{{proudcts.price | showPrice}}</div>
        <div class="item-count right">
          x{{proudcts.count}}
          <!-- <button @click="increase">+</button>
          <input type="text" :value="proudcts.count" />
          <button @click="decrease">-</button>-->
        </div>
        <!-- <div class="item-count right">x{{proudcts.count}}</div> -->
      </div>
    </div>
  </div>
</template>

<script>
import CheckButton from "components/content/checkButton/CheckButton";
export default {
  name: "CartListItem",
  components: {
    CheckButton,
  },
  props: {
    proudcts: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  filters: {
    showPrice(value) {
      return "￥" + value;
    },
  },
  methods: {
    checkClick() {
      this.proudcts.isChecked = !this.proudcts.isChecked;
    },
    // increase() {
    //   // 假设没有库存限制
    //   this.proudcts.count++;
    // },
    // decrease() {
    //   return this.proudcts.count == 1 ? 1 : this.proudcts.count--;
    // },
    productClick() {
      this.$router.push("/detail" + this.proudcts.iid);
    },
  },
};
</script>

<style scoped>
.cart-list-item {
  width: 100%;
  display: flex;
  padding: 5px;
  border-bottom: 4px solid #eee;
}

.item-selector {
  width: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.item-img {
  padding: 5px;
}
.item-img img {
  width: 80px;
  height: 100px;
  display: block;
  border-radius: 5px;
}

.item-info {
  overflow: hidden;
  font-size: 17px;
  color: #333;
  padding: 5px 10px;
  position: relative;
}
.item-title,
.item-desc {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.item-info .item-desc {
  font-size: 14px;
  color: #666;
  margin-top: 15px;
}

.info-bottom {
  margin-top: 10px;
  position: absolute;
  bottom: 10px;
  left: 10px;
  right: 10px;
}

.info-bottom .item-price {
  color: orangered;
}

.item-count {
  text-align: center;
  line-height: 26px;
  width: 26px;
  height: 26px;
  border: 1px solid #ddd;
  border-radius: 4px;
}
</style>


