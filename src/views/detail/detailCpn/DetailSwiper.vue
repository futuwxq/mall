<template>
  <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
    <van-swipe-item v-for="(item,index) in swpiperImage" :key="index" class="my-swipe-item">
        <img :src="item"/>
    </van-swipe-item>
  </van-swipe>
</template>

<script>
import Vue from 'vue';
import { Swipe, SwipeItem } from 'vant';


Vue.use(Swipe);
Vue.use(SwipeItem);


export default {
  name: 'DetailSwiper',
  data() {
    return {
    }
  },
  computed: {
  },
  props: {
    swpiperImage: {
      type: Array,
      default() {
        return []
      }
    }
  },
  components: {
    Swipe,
    SwipeItem
  },
  methods: {
  }
}
</script>


<style scoped>
.van-swipe-item {
height: 300px;
  overflow: hidden;
width: 100%;
}

.van-swipe-item img {
  width: 100%;
  display: block;
}

</style>
