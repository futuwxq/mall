<template>
  <div id="user-info">
    <a href="javascript:;" class="clear-fix" @click="userClick">
      <slot name="user-icon ">
        <img src="~assets/img/profile/avatar.svg" class="user-avator left" />
      </slot>
      <div class="login-info left">
        <slot name="user-nickname">
          <div>登录/注册</div>
        </slot>
        <div class="phone">
          <img src="~assets/img/profile/phone.svg" class="phone-icon" />
          <slot name="user-phone">暂无绑定手机号</slot>
        </div>
      </div>
      <div class="right arrow">
        <img src="~assets/img/profile/next.svg" />
      </div>
    </a>
  </div>
</template>

<script>
export default {
  name: "UserInfo",
  methods: {
    userClick() {
      this.$toast.show("登录/注册接口未完善");
    },
  },
};
</script>

<style scoped>
#user-info {
  background-color: var(--color-tint);
  padding: 15px;
  margin-top: -5px;
  position: relative;
}
.left {
  float: left;
}
.user-avator {
  width: 50px;
  height: 50px;
  background: #fff;
  border-radius: 50%;
}
#user-info .arrow-svg {
  width: 11px;
  height: 22px;
  margin-top: 18px;
}

#user-info .login-info {
  color: #fff;
  margin: 10px 0 0 10px;
}

#user-info .login-info .phone {
  font-size: 13px;
  margin-top: 5px;
  font-weight: 300;
  position: relative;
  margin-left: 18px;
}

.login-info .phone-icon {
  height: 20px;
  width: 20px;
  position: absolute;
  left: -18px;
  top: -3px;
}
.arrow {
  position: absolute;
  top: 35%;
  right: 20px;
}
.arrow img {
  width: 15px;
  height: 15px;
}
</style>
