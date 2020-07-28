<template>
  <div class="shop-info" v-if="Object.keys(shop).lenght !== 0">
    <div class="shop-name-info">
      <img :src="shop.logo" alt />
      <span class="shop-name">{{shop.name}}</span>
    </div>
    <div class="shop-other-info">
      <div class="shop-other-item shop-left">
        <div class="info-sells">
          <span class="sells-count">{{shop.sells|sellNum}}</span>
          <span class="sells-text">总销量</span>
        </div>
        <div class="info-goods">
          <span class="goods-count">{{shop.goodsCount}}</span>
          <span class="goods-text">全部宝贝</span>
        </div>
      </div>
      <div class="shop-other-item shop-right">
        <div class="shop-score" v-for="item in shop.score" :key="item.id">
          <span>{{item.name}}</span>
          <span class="score" :class="{'score-better':item.isBetter}">{{item.score}}</span>
          <span class="better" :class="{'score-better':item.isBetter}">{{item.isBetter?'低':'高'}}</span>
        </div>
      </div>
    </div>
    <div class="shop-bottom">
      <div class="enter-shop">进店逛逛</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailShopInfo",
  props: {
    shop: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  filters: {
    sellNum(value){
      if(value < 10000 ) return value
      return (value/1000).toFixed(1) + '万'
    }
  }
};
</script>

<style lang="less" scoped>
.shop-info {
  margin-top: 15px;
  padding: 0 10px;
  border-bottom: 5px solid #f2f5f8;
  // color: var(--color-text);
  .shop-name-info {
    padding: 10px 0;
    img {
      width: 50px;
      height: 50px;
      vertical-align: middle;
      border-radius: 100%;
      border: 1px solid #e0dede;
    }
    .shop-name {
      padding-left: 5px;
    }
  }
  .shop-other-info {
    font-size: 12px;
    align-items: center;
    line-height: 22px;
    display: flex;
    .shop-other-item {
      flex: 1;
    }
    .shop-left {
      border-right: 1px solid #cccbcb;
      display: flex;
      justify-content: space-around;
      padding: 0 15px;
      .info-sells,
      .info-goods {
        // flex: 1;
         display: flex;
        text-align: center;
         flex-direction: column;
         justify-content: space-around;
      }
      .sells-count,
      .goods-count {
        font-size: 16px;
      }
    }
    .shop-right {
      box-sizing: border-box;
      padding:0 25px;
      .shop-score {
        display: flex;
        justify-content: space-between;
        padding-top: 5px;
        .score {
            display: inline-block;
          width: 30px;
          color: #6acb8f;
          &.score-better{
            color: var(--color-high-text);
				}
        }
        .better {
            background-color: #6acb8f;
            color: #fff;
            padding: 1px 4px;
            font-size: 12px;
            &.score-better{
              background-color: var(--color-tint);
            }
        }
      }
    }
  }
  .shop-bottom {
    		text-align: center;
		.enter-shop {
			display: inline-block;
			background-color: #f2f2f2;
			font-size: 12px;
			padding: 6px 30px;
			border-radius: 100px;
			margin: 10px;
		}
  }
}
</style>