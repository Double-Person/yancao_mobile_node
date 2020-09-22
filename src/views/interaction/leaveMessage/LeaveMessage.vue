<template>
  <div>
    <mob-head />
    <nav-bar />
    <crumbs :crumbs="crumbs" />
    <div class="widths" style="font-size:0.5rem;margin-top: 0.64rem;margin-bottom: 0.64rem;">我要留言</div>
    <van-tabs @click="msgList" v-model="active" :lazy-render="false" class="leave-tab">
      <van-tab title="我要留言">
        <submit-msg />
      </van-tab>
      <van-tab title="留言列表">
        <msg-list ref="msgList" />
      </van-tab>
      <van-tab title="留言统计">
        <msg-list2 />
      </van-tab>
      <van-tab title="办件编号查询" class="code-search">
        <van-field class="code-search-inp" v-model="searchvalue" placeholder="输入办件编号" />
        <div class="code-search-btn">
          <van-button type="default" class="search-btn-mian" @click="search">搜索</van-button>
        </div>
      </van-tab>
    </van-tabs>
    <div class="widths" v-show="active===0 || active===1">
      <div class="topCircle">
        <div class="itemCircle">
          <div class="number">{{total.dayLeaveMes}}件</div>
          <div class="title">日受理</div>
        </div>
        <div class="itemCircle">
          <div class="number">{{total.monthLeaveMes}}件</div>
          <div class="title">月受理</div>
        </div>
        <div class="itemCircle">
          <div class="number">{{total.allLeaveMes}}件</div>
          <div class="title">全部受理</div>
        </div>
      </div>
    </div>
    <mob-footer />
  </div>
</template>

<script>
import PubSub from "pubsub-js";
import CreateCode from "@/components/common/createCode";
import MobHead from "@/components/control/mobHead/MobHead";
import NavBar from "@/components/control/navBar/NavBar";
import Crumbs from "@/components/control/crumbs/Crumbs";
import MobFooter from "@/components/control/mobFooter/MobFooter";
import {
  uploadFile,
  consultAdd,
  leaveMesStatistical,
  addLog
} from "@/api/request";
import SubmitMsg from "./SubmitMsg";
import MsgList from "./MsgList";
import MsgList2 from "./MsgList2";
import { LOGLIST } from "@/assets/js/constant";

export default {
  name: "HaveComplaint",
  components: {
    MsgList,
    MsgList2,
    SubmitMsg,
    MobFooter,
    Crumbs,
    NavBar,
    MobHead,
    CreateCode
  },
  data() {
    return {
      searchvalue: "",
      crumbs: [
        { name: "互动交流", path: "/interaction" },
        { name: "我要留言", path: "" }
      ],
      total: {},
      active: 0
    };
  },
  mounted() {
    this.getTotal();
    this.logpoint();
  },
  methods: {
    search() {
      this.active = 1;
      console.log(this.$refs);
      this.$refs.msgList.search(this.searchvalue);
    },
    logpoint() {
      addLog({
        columnTypeCode: LOGLIST.HDJL,
        subColumnTypeCode: "hdjl_woyaoliuyan"
      });
    },
    async getTotal() {
      let res = await leaveMesStatistical();
      this.total = res.result;
    },
    msgList(name, index) {
      // console.log(this.active);
      this.searchvalue = ''
      if (index) {
        PubSub.publish("upDate");
      }
    }
  }
};
</script>

<style lang="less" scoped>
/*顶部圆圈*/
.topCircle {
  margin: 0.6rem auto 1.44rem auto;
  display: flex;
  justify-content: space-between;
  .itemCircle {
    width: 2.35rem;
    height: 2.35rem;
    background: rgba(35, 83, 153, 0);
    border: 0.0266rem solid #235399;
    border-radius: 50%;
    font-family: PingFangSC, PingFangSC-Regular;
    font-weight: 400;
    text-align: center;
    .number {
      font-size: 0.48rem;
      color: #235399;
      line-height: 1rem;
      margin-top: 0.5rem;
    }
    .title {
      font-size: 0.32rem;
      color: #656566;
      line-height: 0.32rem;
    }
  }
}

/deep/ .van-tab {
  font-size: 0.43rem;
  font-family: PingFangSC, PingFangSC-Regular;
  font-weight: 400;
  color: #323333;
}
/deep/ .van-tab--active {
  /*font-size: .43rem;*/
  /*font-family: PingFangSC, PingFangSC-Regular;*/
  /*font-weight: 400;*/
  /*color: #323333;*/
}
/* 标签栏顶部距离 */
/deep/ .van-tabs__content {
  padding-top: 0.32rem;
}
/*标签栏选中下划线*/
/deep/ .van-tabs__line {
  background: #235399;
  height: 0.05333rem;
}

.leave-tab.van-tabs {
  /deep/ .van-tabs__wrap {
    height: 58px;
    .van-tabs__nav--line {
      // padding: 0;
    }
    .van-tab {
      font-size: 14px;
      .van-tab__text {
      }
    }
    .van-tabs__line {
      width: 24.8% !important;
    }
  }
}
.code-search {
  padding: 29px 0 0 0;
  .code-search-inp {
    margin: 0 auto;
    width: 92%;
    border: 1px solid #d8dce6;
  }
  .code-search-btn {
    margin: 20px auto 203px;
    width: 92%;
    height: 42px;

    .search-btn-mian {
      width: 100%;
      font-size: 16px;
      background: #245399;
      border-radius: 23px;
      color: #ffffff;
    }
  }
}
</style>

