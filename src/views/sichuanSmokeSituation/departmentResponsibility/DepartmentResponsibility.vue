<template>
  <div>
    <mob-head />
    <nav-bar />
    <crumbs :crumbs="crumbs" />
    <div class="widths">
      <h1 class="nav-title">部门职责</h1>
      <router-link
        :to="{ name: 'DepartmentResponsibilityInfo', query: { id: item.id } }"
        tag="a"
        target="_blank"
        v-for="item in departmentArr"
      >
        <div class="department">
          <span class="tuijian" v-if="item.topSortNum != 99999">荐</span>
          <span> {{ item.title }}</span>
        </div>
        <div class="time">{{ item.createTime }}</div>
      </router-link>
    </div>
    <mob-footer />
  </div>
</template>

<script>
import MobHead from "@/components/control/mobHead/MobHead";
import NavBar from "@/components/control/navBar/NavBar";
import Crumbs from "@/components/control/crumbs/Crumbs";
import MobFooter from "@/components/control/mobFooter/MobFooter";
import { sysArticleActiveList,addLog } from "@/api/request";
import departments from "@/assets/js/departments";
import { LOGLIST } from "@/assets/js/constant";

export default {
  name: "DepartmentResponsibility", //部门职责
  components: { MobFooter, Crumbs, NavBar, MobHead },
  data() {
    return {
      crumbs: [
        { name: "川烟概况", path: "/sichuansmokesituation" },
        {
          name: "部门职责",
          path: "/sichuansmokesituation/departmentresponsibility",
        },
      ],
      departmentArr: [],
    };
  },
  created() {
    this.getDepartmen();
    addLog({ columnTypeCode: LOGLIST.CYGK, subColumnTypeCode: "cygk_bumenzhize" });
  },
  methods: {
    async getDepartmen() {
      let res = await sysArticleActiveList({
        typeCode: "bumenzhize",
        pageNo: 1,
        pageSize: 50,
      });
      this.departmentArr = res.result.records;
    },
  },
};
</script>

<style lang="less" scoped>
.department {
  color: #323333;
  font-size: 0.43rem;
  margin-bottom: 0.3rem;
  color: #323333;
  display: flex;
  align-items: center;
  & > span:last-child {
    max-width: 309px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
}
a {
  border-bottom: #f2f3f5 solid 0.0266rem;
  padding-bottom: 0.5rem;
  margin-top: 0.3rem;
  display: block;
}
a:last-child {
  margin-bottom: 1.5rem;
  border-bottom: none;
}
</style>
