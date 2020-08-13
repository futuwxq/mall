<template>
  <div id="app">
    <keep-alive exclude="Detail">
      <router-view />
    </keep-alive>
    <main-tab-bar v-if="isShow" />
  </div>
</template>

<script>
import MainTabBar from "components/content/MainTabBar/MainTabBar";
export default {
  name: "App",
  components: {
    MainTabBar,
  },
  computed: {
    isShow() {
      return this.$route.path.includes("/detail") ? false : true;
    },
  },
};
</script>

<style>
@import "assets/css/base.css";
</style>
