<template>
  <div>
    <mob-head />
    <nav-bar />
    <crumbs :crumbs="crumbs" />
    <div class="widths"><h1 class="nav-title">烟草逸事</h1></div>
    <div class="WriteBackList widths">
      <ul>
        <li v-for="list in lists">
          <div class="title overflow-ellipsis" @click="jumpHandelInfo(list)">
            <span class="tuijian" v-if="list.topSortNum != 99999">荐</span>
            <span> {{ list.title }}</span>
          </div>
          <div class="list">
            <div class="result" v-if="list.publishDate.length">
              {{ list.publishDate | myData }}
            </div>
            <div class="result" v-else>{{ list.updateTime | myData }}</div>
            <div class="time"></div>
          </div>
        </li>
      </ul>
      <load-more-btn @click.native="loadMore" />
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
import { activeList, addLog } from "@/api/request";
import { formatDate } from "@/assets/js/utils";
import LoadMoreBtn from "@/components/control/loadMoreBtn/LoadMoreBtn";
import { solveStatus, myData } from "@/assets/js/globalFilter";
import { LOGLIST } from "@/assets/js/constant";

export default {
  name: "TobaccoAnecdotes", //烟草逸事
  components: { LoadMoreBtn, MobFooter, Crumbs, NavBar, MobHead },
  data() {
    return {
      hasData: true,
      crumbs: [
        { name: "互动交流", path: "/interaction" },
        { name: "烟草逸事", path: "" },
      ],
      lists: [],
      currentPages: 1,
    };
  },
  created() {
    this.loadMore();
    this.logpoint()
  },

  methods: {
    logpoint() {
      addLog({
        columnTypeCode: LOGLIST.HDJL,
        subColumnTypeCode: "hdjl_yancaoyishi",
      });
    },
    loadMore() {
      if (!this.hasData) {
        return false;
      }
      activeList({
        pageNo: this.currentPages,
        pageSize: 10,
        typeCode: "yancaoyishi",
      }).then((res) => {
        if (res.code == 0 || res.code == 200) {
          console.log(res);
          if (res.result.records.length) {
            this.currentPages += 1;
            this.lists.push(...res.result.records);
          } else {
            this.hasData = false;
            this.$toast("没有更多数据了");
            PubSub.publish("noData", "noData");
          }
        }
      });
    },

    jumpHandelInfo(item) {
      // console.log(item);
      // return false;
      // this.$router.push({name: 'TobaccoAnecdotesDetails', query: {id:item.id,articleType:item.typeCode_dictText}})
      let routeUrl = this.$router.resolve({
        name: "TobaccoAnecdotesDetails",
        query: { id: item.id, articleType: item.typeCode_dictText },
      });
      window.open(routeUrl.href, "_blank");
    },
  },
};
</script>

<style lang="less" scoped>
.WriteBackList {
  margin: 0 auto;
  li {
    border-bottom: 0.02666rem solid #f2f3f5;
    /*margin-bottom: .5rem;*/
    .list {
      display: flex;
      justify-content: space-between;

      padding-bottom: 0.64rem;
      .result {
        font-size: 0.32rem;
      }
    }
    .title {
      font-size: 0.43rem;
      color: #323333;
      padding: 0.24rem 0;
      margin-top: 0.42rem;
      line-height: 0.5366rem;
      /*padding: .2rem 0 0.4rem 0;*/
    }
  }
  li:last-child {
    margin-bottom: 0.69rem;
    border-bottom: none;
  }
}
.overflow-ellipsis {
  font-size: 0.43rem;
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
</style>
