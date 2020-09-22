<template>
  <div>
    <mob-head />
    <nav-bar />
    <crumbs :crumbs="crumbs" />
    <div class="widths"><h1 class="nav-title">征集调查</h1></div>
    <div class="for-investigation widths wrapper" ref="wrapper">
      <!-- 征集调查 -->
      <ul>
        <li class="list" v-for="item in lists">
          <div class="item">
            <div style="width: 80%" class="overflow-ellipsis">
              {{ item.title }}
            </div>
            <div class="vote" @click="vote(item.id)">投票</div>
          </div>
          <div class="time">{{ item.createTime }}</div>
        </li>
      </ul>

      <load-more-btn @click.native="loadMore" />
      <div style="height: 3.5rem" v-if="noData"></div>
    </div>
    <mob-footer />
  </div>
</template>

<script>
import PubSub from "pubsub-js";
import MobHead from "@/components/control/mobHead/MobHead";
import NavBar from "@/components/control/navBar/NavBar";
import Crumbs from "@/components/control/crumbs/Crumbs";
import MobFooter from "@/components/control/mobFooter/MobFooter";
import LoadMoreBtn from "@/components/control/loadMoreBtn/LoadMoreBtn";
import { questionnaireList, addLog } from "@/api/request";
import { LOGLIST } from "@/assets/js/constant";

export default {
  name: "ForInvestigation",
  components: { LoadMoreBtn, MobFooter, Crumbs, NavBar, MobHead },
  data() {
    return {
      hasData: true,
      crumbs: [
        { name: "互动交流", path: "/interaction" },
        { name: "征集调查", path: "" },
      ],
      noData: false,
      currentPages: 1,
      lists: [],
    };
  },
  mounted() {
    this.loadMore();
    this.logpoint()
  },
  methods: {
    logpoint() {
      addLog({
        columnTypeCode: LOGLIST.HDJL,
        subColumnTypeCode: "hdjl_zhengjidiaocha",
      });
    },
    loadMore() {
      this.noData = false;
      if (!this.hasData) {
        return false;
      }
      questionnaireList({ pageNo: this.currentPages, pageSize: 5 }).then(
        (res) => {
          if (res.code == 0 || res.code == 200) {
            if (res.result.records.length) {
              // this.lists = res.result.records
              this.currentPages += 1;
              this.lists.push(...res.result.records);
            } else {
              this.hasData = false;
              this.noData = true;
              this.$toast("没有更多数据了");
              PubSub.publish("noData", "noData");
            }
          }
        }
      );
    },
    // 投票
    vote(id) {
      // this.$router.push({
      //   path: '/interaction/forinvestigationinfo',
      //   query: {id}
      // })

      let routeUrl = this.$router.resolve({
        path: "/interaction/forinvestigationinfo",
        query: { id },
      });
      window.open(routeUrl.href, "_blank");
    },
  },
};
</script>

<style lang="less" scoped>
.for-investigation {
  margin: 0 auto;
  .list {
    opacity: 1;
    border-bottom: 0.02666rem solid #f2f3f5;
    padding: 0.43rem 0;
    .item {
      display: flex;
      justify-content: space-between;
      height: 0.586rem;
      line-height: 0.586rem;
      align-items: center;
      .overflow-ellipsis {
        color: #323333;
        font-size: 0.43rem;
      }
      .vote {
        color: #235399;
        background: #f2f3f5;
        display: inline-block;
        width: 1.38666rem;
        height: 0.586rem;
        line-height: 0.586rem;
        text-align: center;
        border-radius: 0.32rem;
        font-size: 0.32rem;
      }
    }
    .time {
      margin-top: 0.2399rem;
    }
  }

  .list:last-child {
    border-bottom: none;
  }
}
</style>
