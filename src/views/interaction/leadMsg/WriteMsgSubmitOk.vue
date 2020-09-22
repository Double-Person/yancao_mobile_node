<template>
  <div class="writeMsgSubmitOk">
    <mob-head />
    <nav-bar />
    <crumbs :crumbs="crumbs" />
    <div class="widths">
      <h1 class="nav-title">提交成功</h1>
      <div class="submit-icon">
        <img src="./images/icon_tijiaowancheng.svg" alt />
      </div>
      <p class="submit-text">您的办件已成功提交系统</p>
      <div class="check-info">
        <div class="info">您可以使用办件编号查询留言处理进度，请妥善保管编号</div>
        <div class="info-num">
          <div>
            <div>办件编号：{{code}}</div>
            <div class="query-num" v-if="cxCode">查询码：{{cxCode}}</div>
          </div>
          <div>
            <span
              class="copy"
              v-clipboard:copy="code"
              v-clipboard:success="copy"
              v-clipboard:error="onError"
            >复制</span>
          </div>
        </div>
      </div>
      <div class="backBtn" @click="backBtn">返回</div>
    </div>
    <mob-footer />
  </div>
</template>

<script>
import MobHead from "@/components/control/mobHead/MobHead";
import NavBar from "@/components/control/navBar/NavBar";
import Crumbs from "@/components/control/crumbs/Crumbs";
import MobFooter from "@/components/control/mobFooter/MobFooter";
export default {
  name: "WriteMsgSubmitOk",
  components: { MobFooter, Crumbs, NavBar, MobHead },
  data() {
    return {
      code: "123",
      cxCode: "",
      crumbs: []
    };
  },
  created() {
    console.log(this.$route.params.title);
    if (this.$route.params.title == "我要投诉") {
      this.crumbs = [
        { name: "互动交流", path: "/interaction" },
        { name: "举报投诉", path: "/interaction/reportcomplaints" },
        {
          name: "我要投诉",
          path: "/interaction/havecomplaint?id=&getTitle=我要投诉"
        }
      ];
    } else if(this.$route.params.title == "我要留言") {
      this.crumbs = [
        { name: "互动交流", path: "/interaction" },
        { name: "我要留言", path: "/interaction/leavemessage" },
        { name: "提交成功", path: "" }
      ];
    } else {
      this.crumbs = [
        { name: "互动交流", path: "/interaction" },
        { name: "领导信箱", path: "/interaction/leadmsg" },
        { name: "我要写信", path: "/interaction/writemsg" }
      ];
    }
    this.code = this.$route.params.code;
    this.cxCode = this.$route.params.cxCode;
  },
  methods: {
    copy() {
      this.$toast("办件编号复制成功");
    },
    onError() {
      this.$toast("办件编号复制失败");
    },
    backBtn() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="less" scoped>
.writeMsgSubmitOk {
  margin: 0 auto;
  .submit-icon {
    width: 13.6%;
    margin: 0.5rem auto;
    img {
      width: 100%;
    }
  }
  .submit-text {
    color: #323333;
    font-size: 0.37rem;
    text-align: center;
  }
  .check-info {
    background: #f2f3f5;
    margin-top: 1rem;
    padding: 0.6rem 0.4rem;
    .info {
      color: #979899;
      font-size: 0.32rem;
      font-weight: 400;
    }
    .info-num {
      display: flex;
      justify-content: space-between;
      color: #323333;
      font-size: 0.37rem;
      font-weight: 400;
      margin-top: 0.5rem;
      align-items: center;
      .copy {
        display: inline-block;
        border: 1px solid #999;
        border-radius: 0.4rem;
        padding: 0.1rem 0.2rem;
      }
      .query-num {
        margin-top: 0.3rem;
      }
    }
  }
  .backBtn {
    margin: 0.7rem 0;
    height: 1.2rem;
    opacity: 1;
    border: 1px solid #235399;
    border-radius: 0.6rem;
    font-size: 0.43rem;
    line-height: 1.2rem;
    text-align: center;
    color: #235399;
  }
}
</style>
