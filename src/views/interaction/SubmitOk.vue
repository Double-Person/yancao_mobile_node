<template>
  <div class="writeMsgSubmitOk">
    <mob-head/>
    <nav-bar/>
    <crumbs :crumbs="crumbs"/>
    <div class="widths">
      <h1 class="nav-title">提交成功</h1>
      <div class="submit-icon">
        <img src="./images/icon_tijiaowancheng.svg" alt="">
      </div>
      <p class="submit-text">您的办件已成功提交系统</p>
      <div class="check-info">
        <div class="info">您可以使用以下编号和查询码，在网站上查询</div>
        <div class="info-num">
          <div>
            <div>办件编号：{{code}}</div>
            <div class="query-num">查询码：{{cxCode}}</div>
          </div>
          <div><span class="copy"
                     v-clipboard:copy="code"
                     v-clipboard:success="copy"
                     v-clipboard:error="onError">复制</span></div>
        </div>
      </div>
      <div class="backBtn" @click="backBtn">返回</div>
    </div>
    <mob-footer/>
  </div>
</template>

<script>
  import MobHead from "@/components/control/mobHead/MobHead";
  import NavBar from "@/components/control/navBar/NavBar";
  import Crumbs from "@/components/control/crumbs/Crumbs";
  import MobFooter from "@/components/control/mobFooter/MobFooter";

  export default {
    name: "SubmitOk",
    components: {MobFooter, Crumbs, NavBar, MobHead},
    data() {
      return {
        crumbs:{},
        code: '',
        cxCode: ''
      }
    },
    created() {
      // console.log(this.$route.params.crumbs);
      // console.log(JSON.parse(this.$route.params.crumbs));

      this.crumbs = JSON.parse(this.$route.params.crumbs)
      this.code = this.$route.query.code
      this.cxCode = this.$route.query.cxCode
    },
    methods: {
      copy() {
        this.$toast('办件编号复制成功')
      },
      onError() {
        this.$toast('办件编号复制失败')
      },
      backBtn() {
        this.$router.go(-1)
      }
    }
  }
</script>

<style lang="less" scoped>
  .writeMsgSubmitOk {

    margin: 0 auto;
    .submit-icon {
      width: 13.6%;
      margin: .5rem auto;
      img {
        width: 100%;
      }
    }
    .submit-text {
      color: #323333;
      font-size: .37rem;
      text-align: center;
    }
    .check-info {
      background: #F2F3F5;
      margin-top: 1rem;
      padding: .6rem .4rem;
      .info {
        color: #979899;
        font-size: .32rem;
        font-weight: 400;
      }
      .info-num {
        display: flex;
        justify-content: space-between;
        color: #323333;
        font-size: .37rem;
        font-weight: 400;
        margin-top: .5rem;
        align-items: center;
        .copy {
          display: inline-block;
          border: 1px solid #999;
          border-radius: .4rem;
          padding: .1rem .2rem;
        }
        .query-num {
          margin-top: .3rem;
        }
      }

    }
    .backBtn {
      margin: .7rem 0;
      height: 1.2rem;
      opacity: 1;
      border: 1px solid #235399;
      border-radius: .6rem;
      font-size: .43rem;
      line-height: 1.2rem;
      text-align: center;
      color: #235399;
    }
  }
</style>
