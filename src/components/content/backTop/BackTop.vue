<template>
  <div class="back-top" >
    <img src="~assets/img/common/top.png" alt="">
  </div>
</template>

<script>
export default {
  name:'BackTop',
  methods:{
    // btnClick(){
    //   console.log('回到顶部');
    // }
  }
}
</script>

<style scoped>
.back-top {
  position: fixed;
  right: 8px;
  bottom: 52px;
  /* z-index: 8; */
}

.back-top img{
  display: block;
  width: 44px;
  height: 44px;
}
</style>