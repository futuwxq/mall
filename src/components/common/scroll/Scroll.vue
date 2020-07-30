<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  name: "Scroll",
  props: {
    probeType: {
      type: Number,
      default: 0,
    },
    pullUpLoad: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      scroll: null,
    };
  },
  mounted() {
    // 1.创建 BScroll 对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      mouseWheel: true,

      //  表单元素点击可以监听，但是 div 等其他元素需要设置为 ture
      click: true,

      // 0,1都是不侦测实时的位置
      // 2: 在手指滚动的过程中侦测, 手指离开后的惯性滚动过程中不侦测.
      // 3: 只要是滚动, 都侦测
      probeType: this.probeType,

      // pullup 插件相关配置，true 监听上拉加载更多
      pullUpLoad: this.pullUpLoad,
    });
    // 2.监听滚动事件
    // BetterScroll 实时派发 scroll 事件，是需要设置 probeType 为 3。
    this.scroll.on("scroll", (position) => {
      // console.log(position)
      this.$emit("scroll", position);
    });
    //3. 监听上拉事件
    this.scroll.on("pullingUp", () => {
      // console.log('上拉加载更多');
      this.$emit("pullingUp");
    });
  },
  methods: {
    // 封装 scrollTo 方法，让 Home 组件直接调用
    // ES6 新语法 参数可以赋默认值
    scrollTo(x, y, time = 300) {
      this.scroll && this.scroll.scrollTo(x, y, time);
      // console.log(this.srcoll);
    },
    /**
     * 封装 finishPullUp 方法 ，让 Home 组件直接调用
     * 表示这次上拉数据已经加载完，否则不能完成下次加载
     */
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp();
    },

    refresh() {
      this.scroll && this.scroll.refresh();
    },

    /**
     * 返回滚动的 y 轴距离
     */
    getScrollY() {
      return this.scroll ? this.scroll.y : 0;
    },
  },
};
</script>
<style scoped>
</style>