<template>
  <div id="detail">
    <detail-nav-bar class="nav-bar" @titleClick="titleClick" ref="navbar" />
    <scroll class="content" ref="scroll" @scroll="contentScroll" :probe-type="3">
      <detail-swiper :swpiperImage="swpiperImage" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detailInfo="detailInfo" @imageLoad="imageLoad" />
      <detail-param-info ref="params" :paramInfo="paramInfo" />
      <detail-comment-info ref="comment" :commentInfo="commentInfo" />
      <goods-list ref="recommend" :goods="recommendInfo" class="recommend-lists" />
    </scroll>
    <back-top @click.native="btnClick" v-show="isShowBackTop" />
    <detail-bottom-bar @addToCart="addToCart" />
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
import DetailBottomBar from "./detailCpn/DetailBottomBar";

import GoodsList from "components/content/good/GoodsList";
import Scroll from "components/common/scroll/Scroll";
// import BackTop from "components/content/backTop/BackTop";

import { debounce } from "common/utils";
import { itemListenerMixin, backTopMixin } from "common/mixin";
// import { BACK_POSITION } from "common/const";

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
    DetailBottomBar,
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
      getThemeTopY: null, //
      themeTopYs: [],
      positionY: 0,
      currentIndex: -1,
      // isShowBackTop: false, mixin
      // itemImageListener: null, mixin
    };
  },
  mixins: [itemListenerMixin, backTopMixin],
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

    // 第一次值部分是undefined，因为 DOM 还没有渲染出来
    //  this.newRefresh();
    // this.themeTopYs = [];

    // this.themeTopYs.push(0);
    // this.themeTopYs.push(this.$refs.params.$el.offsetTop);
    // this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
    // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);

    this.getThemeTopY = debounce(() => {
      const navbarTops = this.$refs.navbar.$el.offsetHeight;
      this.themeTopYs = [];

      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop - navbarTops);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop - navbarTops);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop - navbarTops);
      this.themeTopYs.push(Number.MAX_VALUE);
      // console.log(this.themeTopYs);
    }, 200);
  },
  updated() {
    // 第二次是值不正确 图片还没有加载完全
    // this.$nextTick(() => {
    // 每次进来重新赋值
    // this.themeTopYs = [];
    // this.themeTopYs.push(0);
    // this.themeTopYs.push(this.$refs.params.$el.offsetTop);
    // this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
    // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
    // console.log(this.themeTopYs);
    // });
  },
  mounted() {
    // mixin 处理的是 商品推荐照片 goodlist
    // let newRefresh = debounce(this.$refs.scroll.refresh, 50);
    // this.itemImageListener = () => {
    //   newRefresh();
    // };
    // this.$bus.$on("itemImageLoad", this.itemImageListener);
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
    // 处理的是 detail info 的图片
    imageLoad() {
      // 方法一 等所有图片加载完了 refresh
      // this.$refs.scroll.refresh();
      // 方法二 debounce mixin
      // 等价于调用了 debounce(this.$refs.scroll.refresh, 100);
      this.newRefresh();

      // 第三次获取 offsetTop 调用过于频繁
      // this.themeTopYs = [];

      // this.themeTopYs.push(0);
      // this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      // this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      // console.log(this.themeTopYs);

      // 第四次
      this.getThemeTopY();
    },
    titleClick(index) {
      // console.log(index);
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200);
    },
    contentScroll(position) {
      const positionY = -position.y;
      const length = this.themeTopYs.length;
      for (let i = 0; i < length - 1; i++) {
        if (
          // this.currentIndex !== i &&
          // ((i < length - 1 &&
          //   positionY >= this.themeTopYs[i] &&
          //   positionY < this.themeTopYs[i + 1]) ||
          //   (i === length - 1 && positionY >= this.themeTopYs[i]))
          this.currentIndex !== i &&
          positionY >= this.themeTopYs[i] &&
          positionY < this.themeTopYs[i + 1]
        ) {
          this.currentIndex = i;
          // console.log(i);
          this.$refs.navbar.currentIndex = i;
        }
      }
      // 判断BackTop是否显示
      this.listenShowBackTop(position);
      // this.isShowBackTop = -position.y > BACK_POSITION;
    },
    // mixin
    // listenShowBackTop(position){
    //    //  判断BackTop是否显示
    //   this.isShowBackTop = -position.y > BACK_POSITION;
    // }
    //backtop mixin
    // btnClick() {
    //   // this.$refs.scroll 获取的是整个Scroll对象，可以调用 Scroll对象属性
    //   // this.$refs.scroll.scroll.scrollTo(0,0,500)
    //   this.$refs.scroll.scrollTo(0, 0);
    // },

    /**
     * 添加购物车
     */
    addToCart() {
      // 1.获取购物车需要展示的数据
      const product = {};
      product.image = this.swpiperImage[0];
      product.title = this.goods.title;
      product.desc = this.goods.title;
      product.price = this.goods.realPrice;
      product.iid = this.iid;

      // 2.将商品添加到购物车中 vuex
      this.$store.dispatch("addCart", product);
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
  height: calc(100% - 44px - 58px);
}

.nav-bar {
  position: relative;
  z-index: 9;
  background: #fff;
}

.recommend-lists {
  margin-top: 20px;
  background: #ffffff;
}
</style>