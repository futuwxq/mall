<template>
  <div id="home" class="wrapper">
    <nav-bar class="home-nav">
      <template v-slot:center>购物街</template>
    </nav-bar>
    <tab-control
      :tabControlTitles="['流行', '新款', '精选']"
      @tabClick="tabClick"
      ref="tabControlCopy"
      v-show="isTabFixed"
      class="tabFixed"
    />
    <!--data 只要 good-list 会发生变化  -->
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
      :data="showGoods"
    >
      <swipers :banners="banners" @swiperImageIoad="swiperImageIoad" />
      <home-recomand-view :recommends="recommends" />
      <home-feature-view />
      <tab-control :tabControlTitles="['流行', '新款', '精选']" @tabClick="tabClick" ref="tabControl" />
      <goods-list :goods="showGoods" />
    </scroll>
    <back-top @click.native="btnClick" v-show="isShowBackTop" />
  </div>
</template>

<script>
import HomeRecomandView from "./childComponents/HomeRecomandView";
import HomeFeatureView from "./childComponents/HomeFeatureView";

import NavBar from "components/common/navbar/NavBar";
import Scroll from "components/common/scroll/Scroll";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/good/GoodsList";
// import BackTop from "components/content/backTop/BackTop";

import Swipers from "../../plugins/Swipers";

import { getHomeMultidata, getHomeGoods } from "network/home";
// import { debounce } from "common/utils";
import { tabControlMixin, backTopMixin } from "common/mixin";
// import { BACK_POSITION } from "common/const";

export default {
  name: "Home",
  components: {
    HomeRecomandView,
    HomeFeatureView,
    NavBar,
    Scroll,
    TabControl,
    GoodsList,
    Swipers,
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      isShowBackTop: false,
      tabControlOffsetTop: 0,
      isTabFixed: false,
      saveY: 0,
      // itemImageListener: null, mixin
    };
  },
  mixins: [backTopMixin, tabControlMixin],
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
  // destroyed() {
  //   console.log("home destory");
  // },
  activated() {
    this.$refs.scroll.scrollTo(0, this.saveY, 0);
    this.$refs.scroll.refresh();
  },
  deactivated() {
    // 1. 保存离开时的位置 y 值
    this.saveY = this.$refs.scroll.getScrollY();
    // 2.取消全局事件监听
    // 如果参数只写一个事件名称，就会把所有地方相关事件的监听取消，因此需要传入一个函数
    // 也就是离开的时候只取消对该函数的监听
    // this.$bus.$off("itemImageLoad", this.itemImageListener);
  },
  created() {
    // 请求多个数据
    this.getHomeMultidata();

    // 请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted() {
    // mixin
    // 监听商品 item 中图片加载完成
    // let newRefresh = debounce(this.$refs.scroll.refresh, 50);
    // 对监听事件进行保存
    // this.itemImageListener = () => {
    //   newRefresh();
    // };
    // this.$bus.$on("itemImageLoad", this.itemImageListener);
  },
  methods: {
    /**
     * 事件监听相关的方法
     */
    // tabClick(index) {
    //   switch (index) {
    //     case 0:
    //       this.currentType = "pop";
    //       break;
    //     case 1:
    //       this.currentType = "new";
    //       break;
    //     case 2:
    //       this.currentType = "sell";
    //       break;
    //   }
    //   // 同步 TabControl 和 TabControlCopy 的激活状态
    //   this.$refs.tabControl.currentIndex = index;
    //   this.$refs.tabControlCopy.currentIndex = index;
    // },
    // scroll
    contentScroll(position) {
      // 1.判断BackTop是否显示
      this.listenShowBackTop(position);
      // 2.决定tabControl是否吸顶(position: fixed)
      this.isTabFixed = -position.y > this.tabControlOffsetTop;
    },
    loadMore() {
      // console.log("上拉加载更多");
      this.getHomeGoods(this.currentType);
    },
    //backtop
    // btnClick() {
    //   // this.$refs.scroll 获取的是整个Scroll对象，可以调用 Scroll对象属性
    //   // this.$refs.scroll.scroll.scrollTo(0,0,500)
    //   this.$refs.scroll.scrollTo(0, 0);
    // },
    // swiper 加载完成获取tabControl的offsetTop
    // $el 是获取组件的根元素
    swiperImageIoad() {
      // console.log(this.$refs.tabControl.$el.offsetTop,'swiper');
      this.tabControlOffsetTop = this.$refs.tabControl.$el.offsetTop;
    },
    /**
     * 网络请求相关的方法
     */
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        // console.log(res);
        // 在函数销毁之前，将data的变量指向数据
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      // 获取page
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page++;
        // 表示这次上拉数据已经加载完，否则不能完成下次加载
        this.$refs.scroll.finishPullUp();
      });
    },
  },
};
</script>

<style scoped>
#home {
  /* padding-top: 44px; */
  height: 100vh;
  position: relative;
}
.home-nav {
  background: var(--color-tint);
  color: #fff;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9;
}

/* 当距离顶部44px 的时候固定在屏幕 */
/* .tabControl {
  position: sticky;
  top: 44px;
} */

.content {
  /* overflow: hidden;
  height: 400px;
  height: calc(100% - 93px);
  margin-top: 44px; */

  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
.tabFixed {
  position: relative;
  top: 44px;
  left: 0;
  right: 0;
  z-index: 9;
}
</style>