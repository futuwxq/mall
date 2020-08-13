<template>
  <ul class="list-view">
    <li class="list-item" v-for="(item,index) in listInfo" :key="index" @click="btnclick(item)">
      <img src="~assets/img/profile/message.svg" class="icon" />
      <!-- <img :src="item.icon" class="icon" /> -->
      <!-- :style="{color:item.color}" -->
      <span>{{item.info}}</span>
    </li>
  </ul>
</template>

<script>
export default {
  name: "ListView",
  props: {
    listInfo: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    btnclick(item) {
      if (item.iid === 3) {
        this.$router.replace("/cart");
      }
    },
    getImage(item) {
      return "{background: url('item')}";
    },
  },
};
</script>

<style scoped>
.list-view {
  border-top: 12px solid #f2f2f2;
  padding-left: 10px;
  /* background: url(''); */
}

.list-item {
  display: flex;
}
.list-item .icon {
  width: 20px;
  height: 20px;
  margin-right: 5px;
  margin-top: 10px;
}
.list-item span {
  flex: 1;
  padding: 12px 0;
  border-bottom: 1px solid #f2f2f2;
}
</style>