<template>
  <div class="goods">
    <goods-list-item v-for="(item, index) in goods" :key="index" :goodsItem="item"></goods-list-item>
  </div>
</template>

<script>
import GoodsListItem from './GoodsListItem';
export default {
  name: 'GoodsList',
  components: {
    GoodsListItem
  },
  props: {
    goods: { //不同 type 的 page 累加数据 ，遍历之后 item 就是每个展示的图片价格信息等等
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
  }
}
</script>

<style scoped>
.goods {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
</style>