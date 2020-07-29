<template>
  <div class="good-info" v-if="Object.keys(detailInfo).length !==0 ">
    <div class="info-text-wrap">
      <div class="text-top-style"></div>
      <div class="info-text-desc">{{detailInfo.desc}}</div>
      <div class="text-bottom-style"></div>
    </div>
    <div class="img-list-wrap" v-for="item in detailInfo.detailImage" :key="item.id">
      <div class="desc">{{item.key}}</div>
      <div class="img-item" v-for="(item, index) in item.list" :key="index">
        <img :src="item" @load="imageLoad" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "DetailGoodsInfo",
  props: {
    detailInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      count: 0,
      imagesLength: 0,
    };
  },
  methods: {
    imageLoad() {
      // console.log(this.imagesLength);
      // 判断所有的图片都加在完了，只进行一次回调
      if (++this.count === this.imagesLength) {
        this.$emit("imageLoad");
        console.log("goodsInfor 加载完成");
      }
    },
  },
  watch: {
    // 监听 获取图片个数
    detailInfo() {
      for (let i in this.detailInfo.detailImage) {
        // console.log(this.detailInfo.detailImage[i]);
        this.imagesLength += this.detailInfo.detailImage[i].list.length;
      }
    },
  },
};
</script>
<style lang="less" scoped>
.good-info {
  margin: 20px 0 0;
  border-bottom: 5px solid #f2f5f8;
}
.info-text-wrap {
  position: relative;
  .text-top-style {
    width: 80px;
    height: 1px;
    background-color: #908c8c;
    margin-left: 4px;
    &::before {
      position: absolute;
      left: 4px;
      top: -2.5px;
      display: block;
      content: "";
      width: 5px;
      height: 5px;
      background-color: #333;
    }
  }
  .text-bottom-style {
    width: 80px;
    height: 1px;
    background-color: #908c8c;
    position: absolute;
    right: 4px;
    bottom: 0;
    &::after {
      position: absolute;
      right: 0;
      top: -2.5px;
      display: block;
      content: "";
      width: 5px;
      height: 5px;
      background-color: #333;
    }
  }
  .info-text-desc {
    padding: 10px 4px;
    font-size: 14px;
    padding-bottom: 6px;
    line-height: 20px;
    margin: 4px 0;
    text-indent: 10px;
  }
}

.img-list-wrap {
  .desc {
    font-size: 15px;
    padding: 6px 0;
    line-height: 20px;
    margin: 4px 0;
    text-indent: 10px;
  }
  img {
    display: block;
    width: 100%;
  }
}
</style>