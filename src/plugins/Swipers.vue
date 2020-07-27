<template>
  <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white" @change="onChange">
    <van-swipe-item v-for="(item,index) in banners" :key="index" class="my-swipe-item">
      <a :href="item.link">
        <!-- <img v-lazy="item.image" @load="imageIoad" /> -->
        <img :src="item.image" @load="imageIoad" />
      </a>
    </van-swipe-item>
  </van-swipe>
</template>

<script>
import Vue from 'vue';
import { Swipe, SwipeItem } from 'vant';
import { Lazyload } from 'vant';


Vue.use(Swipe);
Vue.use(SwipeItem);
// 懒加载影响获取 tabControl 的 offsetTop
// Vue.use(Lazyload);

export default {
  name: 'Swipers',
  data() {
    return {
      currentIndex: 0,
      isLoad : false
    }
  },
  computed: {
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
    },
   imageIoad(){
      // 本来会 emit 4 次 ，此处用 isLoad判断只用一次
      if(!this.isLoad) {
        // console.log('--');
          this.$emit('swiperImageIoad')
          this.isLoad = true
      }
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
  line-height: 150px;
  text-align: center;
  background-color: #39a9ed;
}

.van-swipe-item img {
  width: 100%;
  display: block;
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
