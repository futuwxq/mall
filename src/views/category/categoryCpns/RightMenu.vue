<template>
  <div class="menu-category-wrap">
    <div class="categoty-item" v-for="(item, index) in subcategoryInfo.list" :key="index">
      <a :href="item.link">
        <img :src="item.image" alt @load="imgLoad" />
        <span>{{item.title}}</span>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "RightMenu",
  props: {
    subcategoryInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    imgLoad() {
      this.$emit("imgLoad");
    },
  },
};
</script>

<style scoped>
.menu-category-wrap {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  text-align: center;
  font-size: 13px;
  padding: 5px 0 20px 8px;
}
.categoty-item {
  padding-top: 15px;
  width: 60px;
  margin-right: 8px;
}

.categoty-item img {
  width: 80%;
  display: block;
  margin-bottom: 15px;
}
</style> 