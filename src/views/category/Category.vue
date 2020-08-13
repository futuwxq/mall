<template>
  <div id="category">
    <!-- 导航栏 -->
    <nav-bar class="cate-nav-bar">
      <template v-slot:center>商品分类</template>
    </nav-bar>
    <!-- content -->
    <div class="content">
      <left-bar :titles="categorys" class="left-bar" @barClick="barClick" />
      <div class="right-menu">
        <tab-control
          :tabControlTitles="tabControls"
          @tabClick="tabClick"
          ref="tabControlCopy"
          v-show="isTabFixed"
        />
        <scroll
          class="scroll-content"
          @scroll="scroll"
          :probeType="3"
          :data="[categoryDatas]"
          ref="scroll"
        >
          <right-menu :subcategoryInfo="getSubinfo" @imgLoad="imgLoad" />
          <tab-control :tabControlTitles="tabControls" @tabClick="tabClick" ref="tabControl" />
          <goods-list :goods="getGoods" />
        </scroll>
        <back-top @click.native="goBack" v-show="isShowBackTop" />
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import Scroll from "components/common/scroll/Scroll";
import GoodsList from "../../components/content/good/GoodsList";
import LeftBar from "./categoryCpns/LeftBar";
import RightMenu from "./categoryCpns/RightMenu";

import {
  getCategoryInfo,
  getSubCategory,
  getCategoryDetail,
} from "network/category";

import { tabControlMixin, backTopMixin } from "common/mixin";
import { debounce } from "common/utils";
export default {
  name: "Category",
  components: {
    NavBar,
    Scroll,
    GoodsList,
    // TabControl,
    LeftBar,
    RightMenu,
  },
  data() {
    return {
      categorys: [],
      categoryDatas: {},
      currentIndex: -1,
      tabControls: ["综合", "新品", "销量"],
      isTabFixed: false,
    };
  },
  mixins: [tabControlMixin, backTopMixin],
  computed: {
    getSubinfo() {
      if (this.currentIndex === -1) return {};
      return this.categoryDatas[this.currentIndex].subcategories;
    },
    getGoods() {
      if (this.currentIndex === -1) return [];
      return this.categoryDatas[this.currentIndex].categoryDetail[
        this.goodsCurrentType
      ];
    },
  },
  created() {
    /**
     * 获取数据
     */
    this._getCategoryInfo();

    /**
     * 获取tabControl 的 offsettop
     */
    this.getTabTop = debounce(() => {
      this.tabControlOffsetTop = this.$refs.tabControl.$el.offsetTop;
      console.log(this.tabControlOffsetTop);
    }, 200);
  },
  methods: {
    /**
     * 获取 /category 数据
     */
    _getCategoryInfo() {
      getCategoryInfo().then((res) => {
        this.categorys = res.data.category.list;
        for (let i = 0; i < this.categorys.length; i++) {
          this.categoryDatas[i] = {
            // 上部分的分类
            subcategories: {},
            categoryDetail: {
              pop: [],
              new: [],
              sell: [],
            },
          };
        }
        // 获取第一组数据
        this._getSubCategory(0);
      });
    },
    /**
     * SubCategory 的数据
     */
    _getSubCategory(index) {
      this.currentIndex = index;
      const maitKey = this.categorys[index].maitKey;
      getSubCategory(maitKey).then((res) => {
        // console.log(res);
        this.categoryDatas[index].subcategories = res.data;

        // 合并对象
        this.categoryDatas = { ...this.categoryDatas };

        // 调用CategoryDetail
        this._getCategoryDetail("pop");
        this._getCategoryDetail("new");
        this._getCategoryDetail("sell");
      });
    },

    /**
     *CategoryDetail
     */
    _getCategoryDetail(type) {
      const miniWallkey = this.categorys[this.currentIndex].miniWallkey;
      getCategoryDetail(miniWallkey, type).then((res) => {
        console.log(res);
        this.categoryDatas[this.currentIndex].categoryDetail[type] = res;
      });
    },
    /**
     * barClick  点击左侧的菜单栏
     */
    barClick(index) {
      console.log(index);
      // this.currentIndex = index;
      this._getSubCategory(index);
    },
    /**
     * backtop 和 tabcontrol
     */
    scroll(position) {
      const pos = -position.y;
      this.listenShowBackTop(pos);

      // 2.tabControlCopy 显示和隐藏，吸顶效果
      this.isTabFixed = pos > this.tabControlOffsetTop;
    },
    /**
     * 图片加载刷新，监听 scroll 中的 data
     */
    imgLoad() {
      debounce(this.$refs.scroll.refresh, 200);
      this.getTabTop();
    },
    /**
     * 点击 tabcontrol
     */
    // titleClick() {
    //   console.log(index);
    // },
  },
};
</script>
<style scoped>
.cate-nav-bar {
  background: var(--color-tint);
  color: #fff;
}
.content {
  display: flex;
  position: absolute;
  top: 44px;
  left: 0;
  right: 0;
  bottom: 49px;
}
.left-bar {
  width: 100px;
}
.right-menu {
  flex: 1;
  /* background: yellow; */
}
.scroll-content {
  height: 100%;
  overflow: hidden;
}
</style>