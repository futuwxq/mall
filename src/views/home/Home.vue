<template>
  <div id="home">
    <nav-bar class="home-nav">
      <template v-slot:center>购物街</template>
    </nav-bar>
    <swipers :banners="banners"></swipers>
    <home-recomand-view :recommends="recommends"></home-recomand-view>
    <home-feature-view />
    <tab-control class="tabControl" :tabControlTitles="['流行', '新款', '精选']" @tabClick="tabClick" />
    <goods-list :goods="showGoods" />
  </div>
</template>

<script>

// import HomeSwipers from './childComponents/HomeSwipers'

import HomeRecomandView from './childComponents/HomeRecomandView'
import HomeFeatureView from './childComponents/HomeFeatureView';

import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl';
import GoodsList from 'components/content/good/GoodsList';

import Swipers from '../../plugins/Swipers';

import { getHomeMultidata, getHomeGoods } from 'network/home'
export default {
  name: 'Home',
  components: {
    HomeRecomandView,
    HomeFeatureView,

    NavBar,
    TabControl,
    GoodsList,

    Swipers,

  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    }
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        'pop': { page: 0, list: [] },
        'new': { page: 0, list: [] },
        'sell': { page: 0, list: [] }
      },
      currentType: 'pop'
    }
  },
  created() {
    this.getHomeMultidata()
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  methods: {
    /**
    * 事件监听相关的方法
    */
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }

      console.log(index);
    },

    /**
     * 网络请求相关的方法
     */
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        // console.log(res);
        // 在函数销毁之前，将data的变量指向数据
        this.banners = res.data.banner.list
        this.recommends = res.data.recommend.list
      })
    },
    getHomeGoods(type) {
      // 获取page
      const page = this.goods[type].page + 1
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list)
      })
      this.goods[type].page++
    }
  }
}
</script>

<style scoped>
#home {
  padding-top: 44px;
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
.tabControl {
  position: sticky;
  top: 44px;
}
</style>