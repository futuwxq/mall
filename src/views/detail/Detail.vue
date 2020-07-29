<template>
  <div id="detail">
    <detail-nav-bar class="nav-bar" />
    <scroll class="content" ref="scroll">
      <detail-swiper :swpiperImage="swpiperImage" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detailInfo="detailInfo" @imageLoad="imageLoad" />
      <detail-param-info :paramInfo="paramInfo" />
    </scroll>
  </div>
</template>

<script>
import DetailNavBar from "./detailCpn/DetailNavBar";
import DetailSwiper from "./detailCpn/DetailSwiper";
import DetailBaseInfo from "./detailCpn/DetailBaseInfo";
import DetailShopInfo from "./detailCpn/DetailShopInfo";
import DetailGoodsInfo from "./detailCpn/DetailGoodsInfo";
import DetailParamInfo from "./detailCpn/DetailParamInfo";

import Scroll from "components/common/scroll/Scroll";

import { getDetails, Goods, Shop, GoodsParam } from "network/detail";
export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    Scroll,
  },
  data() {
    return {
      iid: null,
      swpiperImage: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
    };
  },
  created() {
    this.iid = this.$route.params.iid;

    // 获取详情页的数据
    getDetails(this.iid).then((res) => {
      console.log(res);
      const data = res.result;
      // 1. 轮播图照片
      this.swpiperImage = data.itemInfo.topImages;
      // 2. 商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      // 3. 获取店铺信息
      this.shop = new Shop(data.shopInfo);
      // 4. 获取商品详细信息
      this.detailInfo = data.detailInfo;
      // 5. 获取商品参数信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );
    });
  },
  methods: {
    imageLoad() {
      this.$refs.scroll.refresh();
    },
  },
};
</script>
<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background: #fff;
  height: 100vh;
}
.content {
  height: calc(100% - 44px);
}

.nav-bar {
  position: relative;
  z-index: 9;
  background: #fff;
}
</style>