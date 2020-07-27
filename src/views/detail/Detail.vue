<template>
  <div id="detail">
    <detail-nav-bar />
    <detail-swiper :swpiperImage="swpiperImage"/>
    <detail-base-info :goods="goods" />
  </div>
</template>

<script>
import DetailNavBar from "./detailCpn/DetailNavBar";
import DetailSwiper from './detailCpn/DetailSwiper';
import DetailBaseInfo from './detailCpn/DetailBaseInfo';

import { getDetails, Goods, shop } from "network/detail";
export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo
  },
  data() {
    return {
      iid: null,
      swpiperImage:[],
      goods:{}
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
    });
  },
};
</script>
<style scoped>
</style>