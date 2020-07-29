<template>
  <div class="comment-info" v-if="Object.keys(commentInfo).length !==0 ">
    <div class="info-header clear-fix">
      <div class="header-title">用户评价</div>
      <div class="header-more">
        更多
        <i class="arrow-right"></i>
      </div>
    </div>
    <div class="info-user">
      <img :src="commentInfo.user.avatar" alt />
      <span>{{commentInfo.user.uname}}</span>
    </div>
    <div class="info-detail">
      <p>{{commentInfo.content}}</p>
      <div class="info-other">
        <span class="date">{{commentInfo.created | showDate}}</span>
        <span>{{commentInfo.style}}</span>
      </div>
      <div class="info-imgs">
        <img :src="item" alt v-for="(item, index) in commentInfo.images" :key="index" />
      </div>
    </div>
  </div>
</template>

<script>
import { formatDate } from "common/utils";
export default {
  name: "DetailCommentInfo",
  props: {
    commentInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  filters: {
    showDate(value) {
      //将时间戳转换成date对象
      const date = new Date(value * 1000);
      //将date进行格式化
      return formatDate(date, "yyyy-MM-dd");
    },
  },
};
</script>

<style scoped>
.comment-info {
  font-size: 15px;
  padding: 20px 10px 0px;
  border-bottom: 5px solid #f2f5f8;
}
.info-header {
  border-bottom: 1px solid rgb(240 235 235);
  padding-bottom: 10px;
  color: #333;
}
.header-title {
  float: left;
}
.header-more {
  float: right;
}
.arrow-right {
}
.info-user {
  padding: 10px 0;
  color: #333;
}
.info-user img {
  width: 45px;
  height: 45px;
  border-radius: 100%;
  vertical-align: middle;
  margin-right: 7px;
}
.info-detail {
  font-size: 13px;
}
.info-other {
  padding: 10px 0;
  color: #888;
}
.info-other .date {
  padding-right: 5px;
}

.info-imgs img {
  width: 70px;
  height: 70px;
  margin-right: 5px;
}
</style>