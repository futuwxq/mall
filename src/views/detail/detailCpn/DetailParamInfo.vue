<template>
  <div class="param-info" v-if="Object.keys(paramInfo).length !== 0">
    <table class="info-size" v-for="(table, index) in paramInfo.sizes" :key="index">
      <tr v-for="(tr, indey) in table" :key="indey">
        <td v-for="(td, indez) in tr" :key="indez">{{td}}</td>
      </tr>
    </table>
    <table class="info-param">
      <tr v-for="(info, index) in paramInfo.infos" :key="index">
        <td class="info-param-key">{{info.key}}</td>
        <td class="param-value">{{info.value}}</td>
      </tr>
    </table>
    <div class="info-img" v-if="paramInfo.image.length !== 0">
      <img :src="paramInfo.image" alt />
    </div>
  </div>
</template>
<script>
export default {
  name: "DetailParamInfo",
  props: {
    paramInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>
<style scoped>
.param-info {
  padding: 10px 10px 0px;
  border-bottom: 5px solid #f2f5f8;
}

table {
  width: 100%;
  line-height: 40px;
  border-collapse: collapse;
  font-size: 14px;
}
table.info-size {
  border-bottom: 2px solid rgb(240 235 235);
}
table tr {
  border-bottom: 1px solid #f6f4f4;
}
.param-info table tr:last-child {
  border: 0px;
}
table.info-param tr td:first-child {
  width: 25%;
}

table.info-param tr td:last-child {
  color: var(--color-high-text);
  line-height: 1.15;
  font-size: 13px;
}
</style>