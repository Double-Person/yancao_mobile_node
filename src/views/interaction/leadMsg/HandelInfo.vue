<template>
  <div>
    <mob-head />
    <nav-bar />
    <crumbs :crumbs="crumbs" />
    <div class="HandelInfo widths">
      <h1 class="nav-title">留言详情</h1>
      <div class="info-item">
        <span>留言姓名：</span>
        <span>{{handelInfo.name}}</span>
      </div>
      <div class="info-item">
        <span>留言日期：</span>
        <span>{{handelInfo.createTime | myData}}</span>
      </div>

      <div class="info-item">
        <span>留言标题：</span>
        <span v-html="handelInfo.title"></span>
      </div>
      <div class="info-item">
        <span>留言类型：</span>
        <span>{{handelInfo.type | myType}}</span>
      </div>
      <div class="info-item">
        <span>留言内容：</span>
        <span v-html="handelInfo.content"></span>
      </div>

      <!---->

      <p class="info-subtit">留言回复</p>
      <div v-if="handelInfo.solveTime">
        <div class="info-item">
          <span>回复单位：</span>
          <span>{{handelInfo.departName}}</span>
        </div>
        <div class="info-item">
          <span>回复日期：</span>
          <span>{{handelInfo.solveTime | myData}}</span>
        </div>
        <div class="info-item">
          <span>回复内容：</span>
          <span>{{handelInfo.solveContent}}</span>
        </div>
      </div>

      <div class="noReply" v-else>
        <img src="../../../assets/img/noReply.png" alt />
        <p>留言正在处理中…</p>
      </div>

      <div style="height: 1.5rem"></div>
    </div>
    <mob-footer />
  </div>
</template>

<script>
import MobHead from "@/components/control/mobHead/MobHead";
import NavBar from "@/components/control/navBar/NavBar";
import Crumbs from "@/components/control/crumbs/Crumbs";
import MobFooter from "@/components/control/mobFooter/MobFooter";

import { letterInfo, leaveMesQueryById } from "@/api/request";

export default {
  name: "HandelInfo",
  components: { MobFooter, Crumbs, NavBar, MobHead },
  data() {
    return {
      crumbs: [
        { name: "互动交流", path: "/interaction" },
        { name: "我要留言", path: "/interaction/leavemessage" },
        { name: "留言详情", path: `/interaction/writebacklist/handelinfo` }
      ],
      handelInfo: {}
    };
  },
  filters: {
    myType(val) {
      if (val == "ZX") {
        return "咨询";
      } else if (val == "TS") {
        return "投诉";
      } else if (val == "JY") {
        return "建议";
      } else if (val == "JB") {
        return "举报";
      } else {
        return val;
      }
    }
  },
  created() {
    leaveMesQueryById(this.$route.query.id).then(res => {
      if (res.code == 200) {
        this.handelInfo = res.result;
      }
    });
  }
};
</script>

<style lang="less" scoped>
.HandelInfo {
  margin: 0 auto;
  .info-item {
    display: flex;
    font-size: 0.3733rem;
    margin-bottom: 0.37rem;
    font-family: PingFangSC, PingFangSC-Regular;
    font-weight: 400;
    text-align: left;
    line-height: 0.3733rem;
    & span:nth-of-type(1) {
      color: #979899;
      flex-shrink: 0;
    }
    & span:nth-of-type(2) {
      color: #323333;
      line-height: 0.56rem;
      margin-top: -0.12rem;
    }
  }

  .info-subtit {
    margin-top: 0.2133rem;
    border-top: #f2f3f5 solid 0.026rem;
    padding: 0.43rem 0;
    font-size: 0.3733rem;
    font-family: PingFangSC, PingFangSC-Regular;
    font-weight: 400;
    text-align: left;
    color: #4e4e4e;
    line-height: 0.53rem;
  }

  .noReply {
    margin-top: 30px;
    text-align: center;
    img {
      width: 41px;
      height: 46px;
    }
    p {
      margin-top: 12px;
      font-size: 14px;
      line-height: 20px;
      color: #4e4e4e;
    }
  }
}
</style>
