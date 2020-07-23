<template>
  <div id="hy-swiper">
    <div class="swiper" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">
      <slot></slot>
    </div>
    <slot name="indicator"></slot>
    <!-- 小圆圈 -->
    <div class="indicator">
      <slot name="indicator" v-if="showIndicator && slideCount>1">
        <div
          v-for="(item, index) in slideCount"
          class="indi-item"
          :class="{active: index === currentIndex-1}"
          :key="index"
        ></div>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "Swiper",
  data() {
    return {
      slideCount: 0, //slide 的个数
      totalWidth: 0, //Swiper 的宽度
      swiperStyle: {}, //Swiper 的样式
      currentIndex: 1, // 当前的index，也就是当前 slide 的索引
      scrolling: false, // 是否正在滚动
    }
  },
  props: {
    interval: {
      type: Number,
      default: 3000
    },
    animDuration: { //过渡时间
      type: Number,
      default: 300
    },
    showIndicator: {//显示小圆圈
      type: Boolean,
      default: true
    },
    moveRatio: { //手指滑动 slide 多少比例，就滑到下一帧
      type: Number,
      default: 0.25
    },
  },
  mounted: function () {//挂载到元素的操作
    // 1.操作DOM, 在前后添加Slide
    setTimeout(() => {
      this.handleDom();

      // 2.开启定时器
      this.startTimer();
    }, 100);

  },
  methods: {
    /**
     * 定时器操作
     */
    startTimer() {
      this.playTimer = window.setInterval(() => {
        this.currentIndex++;//2
        // 左移一个 swiper 宽度
        this.scrollContent(-this.currentIndex * this.totalWidth)
      }, this.interval)
    },
    /**
     * 滚动到正确的位置
     */
    scrollContent(currentPosition) {
      // 1.设置正在滚动
      this.scrolling = true;
      // 2. 开始滚动动画
      // 所有样式的变形需要 ** ms
      this.swiperStyle.transition = 'transform' + this.animDuration + 'ms';
      this.setTransform(currentPosition);

      // 3.判断滚动到的位置
      this.checkPosition();

      // 4.滚动完成
      this.scrolling = false
    },

    /**
     * 校验正确的位置
     */
    checkPosition() {
      window.setTimeout(() => {
        //  1.校验正确的位置
        this.swiperStyle.transition = '0ms';
        if (this.currentIndex >= this.slideCount + 1) {
          // 当 slide 处于 clone 之后的最后一张照片时候，重置当前的 index 为 1
          this.currentIndex = 1;

          this.setTransform(-this.currentIndex * this.totalWidth)
        } else if (this.currentIndex <= 0) {
          //当 slide 处于clone之后的 最后一张照片的时候，重置 index 为slider总数
          this.currentIndex = this.slideCount;//n
          this.setTransform(-this.currentIndex * this.totalWidth)
        }
        // 2.结束移动后的回调 子级向父级发射
        this.$emit('transitionEnd', this.currentIndex - 1);
      }, this.animDuration)
    },

    /**
     * 设置滚动的位置
     */
    setTransform(position) {
      // ${} 在模板字符串中添加变量
      this.swiperStyle.transform = `translate3d(${position}px, 0, 0)`;
      this.swiperStyle['-webkit-transform'] = `translate3d(${position}px), 0, 0`;
      this.swiperStyle['-ms-transform'] = `translate3d(${position}px), 0, 0`;
    },

    /**
     * 操作DOM 初始化轮播图
     */
    handleDom() {
      // 1.获取Dom
      let swiperEl = document.querySelector(".swiper");
      let slideEls = document.querySelectorAll(".slide");

      this.slideCount = slideEls.length;

      // 3.如果大于1个, 那么在前后分别添加一个slide
      if (this.slideCount > 1) {
        // 克隆轮播图的第一张和最后一张，最后一张放在轮播图的最前面，第一张放在轮播图的最后面
        let cloneFirst = slideEls[0].cloneNode(true);
        let cloneLast = slideEls[this.slideCount - 1].cloneNode(true);
        // 在 swiper 插入
        swiperEl.insertBefore(cloneLast, slideEls[0]);
        swiperEl.appendChild(cloneFirst);

        this.totalWidth = swiperEl.offsetWidth;
        this.swiperStyle = swiperEl.style;
      }
      // 3.让swiper元素, 显示第一个(目前是显示前面添加的最后一个元素)
      this.setTransform(-this.totalWidth)

    },

    /**
     * 拖动事件的处理
     */
    touchStart(e) {
      // 1.如果正在滚动, 不可以拖动
      if (this.scrolling) return

      // 2.停止定时器
      this.stopTimer();
      // 3.保存开始滚动的位置 变量
      this.startX = e.touches[0].pageX;

    },

    touchMove(e) {
      // 1.计算出用户拖动的距离
      this.currentX = e.touches[0].pageX;
      this.distance = this.currentX - this.startX;
      let currentPosition = -this.currentIndex * this.totalWidth;
      let moveDistance = this.distance + currentPosition;

      // 2.设置当前的位置
      this.setTransform(moveDistance);
    },

    touchEnd(e) {
      // 1.获取移动的距离
      let currentMove = Math.abs(this.distance);

      // 2.判断最终的距离
      if (this.distance === 0) {
        return
      } else if (this.distance > 0 && currentMove > this.totalWidth * this.moveRatio) { // 右边移动超过0.5
        this.currentIndex--
      } else if (this.distance < 0 && currentMove > this.totalWidth * this.moveRatio) { // 向左移动超过0.5
        this.currentIndex++
      }

      // 3.移动到正确的位置
      this.scrollContent(-this.currentIndex * this.totalWidth);

      // 4.移动完成后重新开启定时器
      this.startTimer();
    },

    /**
     * 控制上一个, 下一个
     */
    previous: function () {
      this.changeItem(-1);
    },

    next: function () {
      this.changeItem(1);
    },

    changeItem: function (num) {
      // 1.移除定时器
      this.stopTimer();

      // 2.修改index和位置
      this.currentIndex += num;
      this.scrollContent(-this.currentIndex * this.totalWidth);

      // 3.添加定时器
      this.startTimer();
    }

  }
};
</script>

<style scoped>
#hy-swiper {
  overflow: hidden;
  position: relative;
}

.swiper {
  display: flex;
}

.indi-item {
  box-sizing: border-box;
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background-color: #fff;
  line-height: 8px;
  text-align: center;
  font-size: 12px;
  margin: 0 5px;
}

.indi-item.active {
  background-color: rgba(212, 62, 46, 1);
}
</style>