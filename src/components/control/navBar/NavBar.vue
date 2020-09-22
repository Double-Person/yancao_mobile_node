<template>
  <div>
    <div class="navBar">
      <!--<div v-for="item in categories" @click="jumpToOtherPage(item.path)">{{item.title}}</div>-->

      <router-link
        active-class="activeNavClass"
        @click="testhome()"
        class="categories"
        to="/home"
        >首页</router-link
      >
      <router-link
        active-class="activeNavClass"
        @click="testsi()"
        class="categories"
        to="/sichuansmokesituation"
        >川烟概况</router-link
      >
      <router-link
        active-class="activeNavClass"
        @click="testzhen()"
        class="categories"
        to="/governmentpublic"
        >政务公开</router-link
      >

      <router-link
        active-class="activeNavClass"
        @click="testban()"
        class="categories"
        to="/businessservices"
        >办事服务</router-link
      >
      <router-link
        active-class="activeNavClass"
        @click="testhu()"
        class="categories"
        to="/interaction"
        >互动交流</router-link
      >
    </div>
    <router-view />
  </div>
</template>

<script>
import { addLog } from "@/api/request";

export default {
  name: "NavBar",
  data() {
    return {};
  },
  methods: {
    //川烟
    testsi() {
      // 埋点
      addLog({
        columnTypeCode: "gongneng",
        subColumnTypeCode: "gongneng_chuanyangaikuang",
      });
    },
  },
};
</script>

<style scoped>
.navBar {
  width: 100%;
  display: flex;
  justify-content: space-around;
  background: #235399;
}
.categories {
  height: 1.1rem;
  line-height: 1.1rem;
  color: #fff;
  font-size: 14px;
}
.activeNavClass {
  font-weight: 600;
}
</style>
