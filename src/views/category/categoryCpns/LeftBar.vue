<template>
  <ul class="left-bar">
    <scroll class="content">
      <li
        class="menu-item"
        :class="{active:index === currentIndex}"
        v-for="(item,index) in titles"
        :key="index"
        @click="barClick(index)"
      >{{item.title}}</li>
    </scroll>
  </ul>
</template>

<script>
import Scroll from "components/common/scroll/Scroll";
export default {
  name: "CategoryLeftMenu",
  components: {
    Scroll,
  },
  props: {
    titles: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      currentIndex: 0,
    };
  },
  methods: {
    barClick(index) {
      this.currentIndex = index;
      this.$emit("barClick", index);
    },
  },
};
</script>

<style scoped>
.left-bar {
  background: #f6f6f6;
  text-align: center;
}
.content {
  height: 100%;
  width: 100%;
  overflow: hidden;
}
.menu-item {
  height: 45px;
  line-height: 45px;
  font-size: 14px;
}
.active {
  color: var(--color-high-text);
  font-weight: 700;
  background: #fff;
  position: relative;
}
.active::before {
  position: absolute;
  top: 0;
  left: 0;
  content: "";
  width: 4px;
  height: 100%;
  background: var(--color-high-text);
}
.content {
  height: 100%;
}
</style>