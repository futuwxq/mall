<template>
  <div id="profile">
    <!-- 导航栏 -->
    <nav-bar class="profile-nav-bar">
      <template v-slot:center>小码哥商城</template>
    </nav-bar>
    <!-- 用户信息 -->
    <user-info />
    <!-- 账户信息 -->
    <section class="account">
      <div class="account-item">
        <div>
          <span class="num">0.00</span>元
        </div>

        <span class="title">我的余额</span>
      </div>
      <div class="account-item">
        <div>
          <span class="num">0</span>个
        </div>
        <span class="title">我的优惠</span>
      </div>
      <div class="account-item">
        <div>
          <span class="num">0</span>分
        </div>
        <span class="title">我的积分</span>
      </div>
    </section>
    <!-- 服务列表 -->
    <list-view :listInfo="orderList" />
    <list-view :listInfo="serviceList" />
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import ListView from "./profilecpns/ListView";
import UserInfo from "./profilecpns/UserInfo";
export default {
  name: "Profile",
  components: {
    NavBar,
    UserInfo,
    ListView,
  },
  data() {
    return {
      orderList: [
        {
          icon: "/img/profile/message.svg",
          color: "#ff8198",
          info: "我的消息",
          iid: 0,
        },
        {
          icon: "~assets/img/profile/shopping.svg",
          color: "#fc7b53",
          info: "积分商城",
          iid: 1,
        },
        {
          icon: "~assets/img/profile/vip.svg",
          color: "#ffc636",
          info: "会员卡",
          iid: 2,
        },
      ],
      serviceList: [
        {
          icon: "~assets/img/profile/vip.cart.svg",
          color: "#ff8198",
          info: "我的购物车",
          iid: 3,
        },
        {
          icon: "~assets/img/profile/vip.cart.svg",
          color: "#ff8198",
          info: "下载购物app",
          iid: 4,
        },
      ],
    };
  },
};
</script>
<style scoped>
.profile-nav-bar {
  background: var(--color-tint);
  color: #fff;
}
.account {
  display: flex;
  justify-content: space-around;
  text-align: center;
  font-size: 13px;
}
.account-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-right: 1px solid #f2f2f2;
  padding: 20px 0;
}
.account-item .num {
  font-size: 24px;
  font-weight: 700;
  color: #ff5f3e;
}
.account-item > div {
  margin-bottom: 5px;
}
</style>