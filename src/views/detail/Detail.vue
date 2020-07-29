<template>
  <div id="detail">
    <detail-nav-bar class="nav-bar" />
    <scroll class="content" ref="scroll">
      <detail-swiper :swpiperImage="swpiperImage" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detailInfo="detailInfo" @imageLoad="imageLoad" />
      <detail-param-info :paramInfo="paramInfo" />
      <detail-comment-info :commentInfo="commentInfo" />
      <goods-list :goods="recommendInfo" />
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
import DetailCommentInfo from "./detailCpn/DetailCommentInfo";

import GoodsList from "../../components/content/good/GoodsList";

import Scroll from "components/common/scroll/Scroll";

import { debounce } from "common/utils";

import {
  getDetails,
  getRecommends,
  Goods,
  Shop,
  GoodsParam,
} from "network/detail";
export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
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
      commentInfo: {},
      recommendInfo: [],
      itemImageListener: null,
    };
  },
  created() {
    this.iid = this.$route.params.iid;

    /**
     * 获取详情页的数据
     */

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
      // 6. 获取商品的评论信息，有的商品可能没有评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }
    });

    /**
     * 获取推荐数据
     */
    getRecommends().then((res) => {
      console.log(res);
      this.recommendInfo = res.data.list;
    });
  },
  mounted() {
    const newRefresh = debounce(this.$refs.scroll.refresh, 50);
    this.itemImageListener = () => {
      console.log("details");
      newRefresh();
    };
    this.$bus.$on("itemImageLoad", this.itemImageListener);
  },
  deactivated() {
    console.log("home destory");
  },
  destroyed() {
    // 取消全局事件监听
    // 因为 Detail 没有 keep-alive，所以无法触发deactivated 需要在 destory
    this.$bus.$off("itemImageLoad", this.itemImageListener);
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