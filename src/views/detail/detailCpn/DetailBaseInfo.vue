<template>
  <div class="base-infor" v-if="Object.keys(goods).length !== 0">
    <div class="info-title">{{goods.title}}</div>
    <div class="info-price">
      <span class="n-price">{{goods.newprice}}</span>
      <span class="o-price">{{goods.oldprice}}</span>
      <span class="goods-discount" v-if="goods.discount">{{goods.discount}}</span>
    </div>
    <div class="info-other">
      <span>{{goods.columns[0]}}</span>
      <span>{{goods.columns[1]}}</span>
      <!-- 显示的是services的最后一个数据 -->
      <span>{{goods.services[goods.services.length-1].name}}</span>
    </div>
    <div class="info-service">
      <!-- -- index 的取值是从 1.2... index，和数组下标差 1   -->
      <span class="info-service-item" v-for="n in goods.services.length-1" :key="n">
        <img :src="goods.services[n-1].icon" v-if="goods.services[n-1].icon" alt />
        <span> {{goods.services[n-1].name}}</span>
      </span>
    </div>
  </div>
</template>
<script>
export default {
  name: "DetailBaseInfo",
  props: {
    goods: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>
<style scoped>
.base-infor {
  margin-top: 15px;
  padding: 0 8px;
  color: #999;
  border-bottom: 5px solid #f2f5f8;
}

.info-title {
  color: #222222;
}

.info-price {
  margin-top: 10px;
}

.info-price .n-price {
  font-size: 24px;
  color: var(--color-high-text);
}

.info-price .o-price {
  font-size: 12px;
  margin-left: 5px;
  text-decoration: line-through;
}
.goods-discount {
  color: #ffffff;
  font-size: 12px;
  border-radius: 100px;
  padding: 2px 6px;
  background: var(--color-high-text);
}
.info-other {
  display: flex;
  font-size: 12px;
  color: #333;
  padding: 10px 4px;
  justify-content: space-between;
  border-bottom: 1px solid #ededed
}
.info-other span {
  flex: 1;
}
.info-service {
  display: flex;
  font-size: 12px;
  color: #333;
  padding: 10px 4px;
  justify-content: space-between;
  border-bottom: 4px solid #ededed;
}
.info-service img {
    width: 12px;
    height: 12px;
    vertical-align: middle;
}
</style>