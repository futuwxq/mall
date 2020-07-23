<template>
  <ul class="recommend">
    <li v-for="(item,index) in recommends" :key="index" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image" alt />
        <div>{{item.title}}</div>
      </a>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'HomeRecomandView',
  props: {
    recommends: {
      type: Array,
      default: []
    }
  }
}
</script>

<style scoped>
.recommend {
  display: flex;
  width: 100%;
  font-size: 12px;
  padding: 10px 6px 20px 0;
  border-bottom: 10px solid #eee;
}
.recommend-item {
  flex: 1;
  text-align: center;
  padding-left: 6px;
}
.recommend-item img {
  width: 100%;
  /* height: 100%; */
  margin-bottom: 10px;
}
</style>