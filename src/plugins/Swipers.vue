<template>
  <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white" @change="onChange">
    <van-swipe-item v-for="(item,index) in banners" :key="index" class="my-swipe-item">
      <a :href="item.link">
        <img v-lazy="item.image" alt />
      </a>
    </van-swipe-item>
    <!-- <template #indicator>
      <div class="custom-indicator">{{ (current + 1)}} / {{banners.length}}</div>
    </template>-->
  </van-swipe>
</template>

<script>
import Vue from 'vue';
import { Swipe, SwipeItem } from 'vant';
import { Lazyload } from 'vant';


Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Lazyload);

export default {
  name: 'Swipers',
  data() {
    return {
      currentIndex: 0,
    }
  },
  computed: {
    // getIndex(index) {
    //   index / this.banners.length
    // }
  },
  props: {
    banners: {
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
    onChange(index) {
      this.currentIndex = index
    }
  }
}
</script>


<style scoped>
.my-swipe .van-swipe-item {
  display: flex;
  overflow: hidden;
  color: #fff;
  font-size: 20px;
  /* line-height: 150px; */
  text-align: center;
  /* background-color: #39a9ed; */
}

.van-swipe-item img {
  width: 100%;
  /* height: 100%; */
  /* pointer-events: none; */
}

.custom-indicator {
  position: absolute;
  right: 5px;
  bottom: 5px;
  padding: 2px 5px;
  font-size: 12px;
  background: rgba(0, 0, 0, 0.1);
}
</style>
