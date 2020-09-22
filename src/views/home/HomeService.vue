<template>
  <div>
    <h1 class="nav-title">{{service.title}}</h1>
    <ul>
      <li v-for="item in service.lists" @click="homeToPage(item.path,item.addOutline,item)">
        <span>
          <img :src="item.img" />
        </span>
        <span>{{item.navBar}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { addLog } from "@/api/request";
import { LOGLIST } from "@/assets/js/constant";
export default {
  name: "HomeService",
  props: ["service"],
  methods: {
    homeToPage(path, addOutline, item) {
      if (addOutline) {
        let params = {
          columnTypeCode: LOGLIST.BSFW,
          subColumnTypeCode: "bsfw_quanliqingdan"
        };
        if (item.navBar == "在线办证") params.subColumnTypeCode="bsfw_zaixianbanzheng"
        if (item.navBar == "办证查询") params.subColumnTypeCode="bsfw_banzhengchaxun"
        if (item.navBar == "办件公示") params.subColumnTypeCode="bsfw_banjiangongshi"
        if (item.navBar == "零售户订货") params.subColumnTypeCode="bsfw_lingshouhuchaxun"
        addLog(params);
        window.open(addOutline, "_blank");
        return false;
      }
      if (path.length) {
        this.$router.push({ path });
      }
    }
  }
};
</script>

<style lang="less" scoped>
.nav-title {
  font-size: 0.5rem;
  margin: 0.44rem 0;
}

ul {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  font-size: 0.43rem;
  li {
    width: 50%;
    height: 1.1rem;
    line-height: 1.1rem;
    img {
      vertical-align: middle;
      display: inline-block;
      border: none;
      width: 0.95rem;
      /*height: 1.3rem;*/
      line-height: 1.3rem;
    }
    span:nth-of-type(2) {
      margin-left: 0.3rem;
      height: 1.3rem;
      line-height: 1.3rem;
    }
  }
}
</style>
