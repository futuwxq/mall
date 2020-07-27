<template>
  <nav-bar>
    <template v-slot:left>
      <div @click="goBack">
        <img class="back" src="~assets/img/common/back.svg" />
      </div>
    </template>
    <template v-slot:center>
      <div class="title">
        <div
          class="title-item"
          v-for="(item, index) in titles"
          :key="index"
          :class="{active:currentIndex === index}"
          @click="titleClick(index)"
        >{{item}}</div>
      </div>
    </template>
  </nav-bar>
</template>
<script>
import NavBar from "components/common/navbar/NavBar";
export default {
  name: "DetailNavBar",
  components: {
    NavBar,
  },
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      currentIndex: 0,
    };
  },
  methods: {
    titleClick(index) {
      this.currentIndex = index;
    },
    goBack() {
      this.$router.back();
    },
  },
};
</script>

<style scoped>
.title {
  display: flex;
  font-size: 14px;
}
.title-item {
  flex: 1;
}
.active {
  color: var(--color-high-text);
}
.back {
  /* display: block; */
  vertical-align: middle;
}
</style>