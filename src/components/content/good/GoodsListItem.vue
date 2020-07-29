<template>
  <div class="goods-item" @click="itemClick">
    <img :src="getGoodImage" @load="imageLoad" />
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodsListItem",
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  computed: {
    getGoodImage() {
      return this.goodsItem.image || this.goodsItem.show.img;
      // return this.goodsItem.show.img || this.goodsItem.image;
    },
  },
  methods: {
    imageLoad() {
      // 根据路由判断是哪个路径 emit 哪个事件
      // if (this.$route.path.includes("/home")) {
      //   this.$bus.$emit("homeItemImageLoad");
      // } else if (this.$route.path.includes("/detail")) {
      //   this.$bus.$emit("detailItemImageLoad");
      // }
      this.$bus.$emit("ItemImageLoad");
    },
    itemClick() {
      //  路由挑战
      this.$router.push("/detail" + this.goodsItem.iid);
      // this.$router.push('/detail/' + 111)
    },
  },
};
</script>

<style scoped>
.goods-item {
  width: 48%;
  position: relative;
  padding-bottom: 40px;
}
.goods-item img {
  width: 100%;
  border-radius: 5px;
}
.goods-info {
  font-size: 12px;
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
  overflow: hidden;
  text-align: center;
}

.goods-info p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 3px;
}

.goods-info .price {
  color: var(--color-high-text);
  margin-right: 20px;
}

.goods-info .collect {
  position: relative;
}

.goods-info .collect::before {
  content: "";
  position: absolute;
  left: -15px;
  top: -1px;
  width: 14px;
  height: 14px;
  background: url("~assets/img/common/collect.svg") #fff 0/14px 14px;
}
</style>