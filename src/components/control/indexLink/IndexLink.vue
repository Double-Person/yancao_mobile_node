<template>
  <ul>
    <li
      v-for="(item, index) in link"
      class="link"
      @click="newsInfo(item.id, item)"
    >
      <div class="tuijian" v-if="item.topSortNum != 99999">荐</div>
      <div class="overflow-ellipsis">{{ type==='媒体报道'? '【'+item.mediaNameCode_dictText+'】 '+item.title: item.title }}</div>
      <div class="time">{{ item.publishDate | formatData }}</div>
    </li>
  </ul>
</template>

<script>
import { addLog } from "@/api/request";
export default {
  name: "IndexLink",
  props: ["link", "type"],

  data() {
    return {};
  },
  mounted () {
    console.log(this.type);
    console.log(this.link)
  },
  methods: {
    // 埋点
    addVisit() {
      addLog({
        columnTypeCode: "article",
        subColumnTypeCode: "article_guowuyuan",
      });
    },
    newsInfo(id, item) {
      // console.log(item);
      
      // return false;
      if (item.outUrl) {
        // 存在外网就跳转外网
        this.addVisit()
        window.open(item.outUrl, "_black");
        return false; //
      }
      // this.$router.push({path: '/home/tabsinfo', query: {id, title: item.typeCode_dictText}})
      let routeUrl = this.$router.resolve({
        path: "/home/tabsinfo",
        query: { id, title: this.type },
      });
      window.open(routeUrl.href, "_blank");
    },
  },
  filters: {
    formatData(value) {
      return value.substr(5, 5);
    },
  },
};
</script>

<style scoped>
.link {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.48rem;
  height: 14px;
}

.link:first-child {
  padding-top: 0.05rem;
}

.overflow-ellipsis {
  color: red;
  font-size: 0.37rem;
  width: 78%;
  color: #323333;
  height: 14px;
  /* display: flex;
  align-items: center; */
}
</style>
