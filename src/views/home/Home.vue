<template>
  <div id="home">
    <nav-bar class="home-nav">
      <template v-slot:center>购物街</template>
    </nav-bar>
    <swipers :banners="banners"></swipers>
    <home-recomand-view :recommends="recommends"></home-recomand-view>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
// import HomeSwipers from './childComponents/HomeSwipers'
import Swipers from '../../plugins/Swipers';
import HomeRecomandView from './childComponents/HomeRecomandView'

import { getHomeMultidata } from 'network/home'
export default {
  name: 'Home',
  components: {
    NavBar,
    // HomeSwipers
    Swipers,
    HomeRecomandView
  },
  data() {
    return {
      banners: [],
      recommends: []
    }
  },
  created() {
    getHomeMultidata().then(res => {
      // console.log(res);
      // 在函数销毁之前，将data的变量指向数据
      this.banners = res.data.banner.list
      this.recommends = res.data.recommend.list
    })
  },
}
</script>

<style scoped>
.home-nav {
  background: var(--color-tint);
  color: #fff;
}
</style>