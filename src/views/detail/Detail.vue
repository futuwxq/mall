<template>
  <div id="detail">
    <detail-nav-bar />
    <detail-swiper :swpiperImage="swpiperImage"/>
    <detail-base-info :goods="goods" />
    <detail-shop-info :shop="shop" />

    <ul>
      <li>1</li>
      <li>2</li>
      <li>3</li>
      <li>4</li>
      <li>4</li>
      <li>4</li>
      <li>4</li>
      <li>4</li>
      <li>4</li>
      <li>4</li>
      <li>4</li>
      <li>4</li>
      <li>4</li>
    </ul>

  </div>
</template>

<script>
import DetailNavBar from "./detailCpn/DetailNavBar";
import DetailSwiper from './detailCpn/DetailSwiper';
import DetailBaseInfo from './detailCpn/DetailBaseInfo';
import DetailShopInfo from './detailCpn/DetailShopInfo';

import { getDetails, Goods, Shop } from "network/detail";
export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo
  },
  data() {
    return {
      iid: null,
      swpiperImage:[],
      goods:{},
      shop:{}
    };
  },
  created() {
    this.iid = this.$route.params.iid;

    // 获取详情页的数据
    getDetails(this.iid).then((res) => {
      console.log(res);
      const data = res.result
      this.swpiperImage = data.itemInfo.topImages;
      this.goods =new Goods(data.itemInfo, data.columns, data.shopInfo.services)
      this.shop = new Shop(data.shopInfo)
    });
  },
};
</script>
<style scoped>

</style>