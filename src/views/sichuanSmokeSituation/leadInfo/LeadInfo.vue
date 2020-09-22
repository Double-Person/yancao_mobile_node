<template>
  <div class="leadInfo">
    <mob-head />
    <nav-bar />
    <crumbs :crumbs="crumbs" />
    <div class="widths">
      <h1 class="nav-title">领导简介</h1>
      <div class="img">
        <img :src="leadInfo.avatar" alt />
        {{leadInfo.name}}
      </div>
      <div class="position">{{leadInfo.position}}</div>
      <div class="work">
        <van-field
          class="title"
          v-model="leadInfo.manageWork"
          rows="1"
          autosize
          type="textarea"
          :border="false"
        />
      </div>
    </div>

    <div class="partingLine line"></div>

    <div class="nav-title-fina">我的简历</div>
    <div class="biographical widths margin-bottom-finally">
      <div class="job-resume" v-for="item in leadInfo.leaderResumes">
        <div class="date">{{item.startTime | formatDate}} - {{item.endTime |formatDate}}</div>
        <div class="job">{{item.description}}</div>
      </div>
    </div>
    <mob-footer />
    <!--{{$route.query.pinyin}}-->
  </div>
</template>

<script>
import MobHead from "@/components/control/mobHead/MobHead";
import NavBar from "@/components/control/navBar/NavBar";
import Crumbs from "@/components/control/crumbs/Crumbs";
import MobFooter from "@/components/control/mobFooter/MobFooter";
import { leaderInfoById, addLog } from "@/api/request";
import { LOGLIST } from "@/assets/js/constant";

export default {
  name: "LeadInfo",
  components: { MobFooter, Crumbs, NavBar, MobHead },
  data() {
    return {
      crumbs: [
        { name: "川烟概况", path: "/sichuansmokesituation" },
        { name: "领导简介", path: "/sichuansmokesituation/leadinfo" }
      ],
      leadInfo: {}
    };
  },
  filters: {
    formatDate(val) {
      if (val && val.length) {
        return val.substr(0, 7);
      }
    }
  },
  created() {
    this.getLeaderInfo();
    addLog({ columnTypeCode: LOGLIST.CYGK, subColumnTypeCode: "cygk_lingdaoxinxi" });
  },

  methods: {
    async getLeaderInfo() {
      let id = this.$route.query.id;
      let { success, result } = await leaderInfoById(id);
      if (success) {
        this.leadInfo = result;
      }
    }
  }
};
</script>

<style lang="less" scoped>
/deep/ ::-webkit-scrollbar {
  display: none;
  width: 0;
}
.leadInfo {
  .widths {
    .img {
      font-size: 0.43rem;
      margin-bottom: 0.43rem;
      img {
        width: 22.5%;
        margin-right: 0.43rem;
        border: none;
      }
    }
    .position,
    .inCharge,
    .work {
      font-size: 0.37rem;
      color: #656566 !important;
      line-height: 0.5333rem;
      font-family: "Microsoft YaHei";
    }
    .position {
      position: relative;
      z-index: 2;
      margin-bottom: -0.23999rem;
    }
    /* 文本域字体颜色 */
    /deep/ .van-field__control {
      color: #656566 !important;
      font-size: 0.3733rem;
    }
    /* 文本域边框 */
    /deep/ .van-cell {
      padding: 0.26667rem 0rem !important;
    }
  }
  .line {
    margin: 0.43rem auto;
  }
  .nav-title-fina {
    padding-bottom: 0.43rem;
    padding-left: 4%;
    border-bottom: 0.0266rem solid #f2f3f5;
  }
  .biographical {
    .job-resume {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      color: #656566;
      font-size: 0.37rem;
      margin-top: 0.3rem;
      font-family: "Microsoft YaHei";
      text-indent: 0;
      .date {
        width: 40%;
        line-height: 0.5333rem;
      }
      .job {
        width: 60%;
        line-height: 0.5333rem;
      }
    }
  }
}
</style>
