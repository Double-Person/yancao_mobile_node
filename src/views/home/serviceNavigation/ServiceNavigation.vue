<template>
  <div>
    <mob-head />
    <crumbs :crumbs="crumbs" />
    <div class="widths">
      <h1 class="nav-title">{{ navTitle }}</h1>
      <ul class="margin-bottom">
        <li
          v-for="(item, index) in lists"
          @click="handelActive(index, item.name)"
          :class="{ activeLi: index == currentIndex }"
        >
          {{ item.name | filterName }}
        </li>
      </ul>
    </div>

    <mob-footer />
  </div>
</template>

<script>
import MobHead from "@/components/control/mobHead/MobHead";
import Crumbs from "@/components/control/crumbs/Crumbs";
import MobFooter from "@/components/control/mobFooter/MobFooter";
import { addLog } from "@/api/request";

export default {
  name: "ServiceNavigation",
  components: { MobFooter, Crumbs, MobHead },
  data() {
    return {
      currentIndex: -1,
      navTitle: "服务导航",
      crumbs: [
        { name: "办事服务", path: "/businessservices" },
        { name: "服务导航", path: "" },
      ],
      lists: [
        { name: "成都", selected: false },
        { name: "自贡", selected: false },
        { name: "攀枝花", selected: false },
        { name: "泸州", selected: false },
        { name: "德阳", selected: false },
        { name: "绵阳", selected: false },
        { name: "广元", selected: false },
        { name: "遂宁", selected: false },
        { name: "内江", selected: false },
        { name: "乐山", selected: false },
        { name: "南充", selected: false },
        { name: "宜宾", selected: false },
        { name: "广安", selected: false },
        { name: "达州", selected: false },
        { name: "巴中", selected: false },
        { name: "雅安", selected: false },
        { name: "眉山", selected: false },
        { name: "资阳", selected: false },
        { name: "凉山", selected: false },
        { name: "阿坝", selected: false },
        { name: "甘孜", selected: false },
      ],
    };
  },
  filters: {
    filterName(name) {
      return name.substr(0, 4);
    },
  },
  mounted() {
    // console.log('--',this.$route.query.getTitle);// "直营店查询"
  },
  created() {
    if (this.$route.query.getTitle == "直营店查询") {
      this.navTitle = "直营店查询";
      this.crumbs = [
        { name: "办事服务", path: "/businessservices" },
        { name: "直营店查询", path: "" },
      ];
    }
    let res = this.lists.findIndex(
      (item) => item.name == this.$route.query.cityName
    );
    this.currentIndex = res;
  },
  methods: {
    logpoint() {
      let logtype = this.$route.query.getTitle;
      if (logtype == "服务导航") {
        addLog({
          columnTypeCode: "gongneng",
          subColumnTypeCode: "gongneng_fuwudaohang",
        });
      } 
      else if (logtype == "直营店查询") {
        addLog({
          columnTypeCode: "gongneng",
          subColumnTypeCode: "gongneng_zhiyingdian",
        });
      }
    },
    handelActive(index, itemName) {
      this.currentIndex = index;
      let title = this.$route.query.getTitle;
      console.log(itemName, title);
      this.$router.push({
        name: "ServiceNavigationTabs",
        query: { cityName: itemName, title },
      });
    },
  },
};
</script>

<style lang="less" scoped>
ul {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  ul:after {
    width: 20%;
  }
  li {
    width: 20%;
    font-size: 0.37rem;
    height: 0.9rem;
    line-height: 0.9rem;
    text-align: center;
    border: #dbdbdb solid 0.02666rem;
    border-radius: 0.1066rem;
    margin-bottom: 0.32rem;
    color: #323333;
  }
}

.activeLi {
  background: #235399;
  color: #fff;
  border: none;
}
</style>
