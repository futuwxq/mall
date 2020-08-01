<template>
  <div class="totast" v-show="isShow">
    <div>{{messages}}</div>
  </div>
</template>

<script>
export default {
  name: "Toast",
  data() {
    return {
      messages: "",
      isShow: false,
    };
  },
  methods: {
    show(messages = "默认文字", duration = 2000) {
      this.isShow = true;
      this.messages = messages;
      setTimeout(() => {
        this.isShow = false;
        this.messages = "";
      }, duration);
    },
  },
};
</script>

<style scoped>
.totast {
  position: absolute;
  left: 50%;
  bottom: 50%;
  transform: translate(-50%, -50%);
  padding: 8px 10px;
  background: rgba(0, 0, 0, 0.75);
  color: #fff;
  z-index: 999;
}
</style>