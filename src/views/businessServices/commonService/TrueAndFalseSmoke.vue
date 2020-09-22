<template>
  <div>
    <mob-head />
    <nav-bar />
    <!-- 采购公开结果 -->
    <Crumbs :crumbs="content" />
    <div class="widths">
      <h1 class="nav-title">
        {{
          $route.query.getTitle == "行政许可?type="
            ? "行政许可"
            : $route.query.getTitle
        }}
      </h1>
    </div>
    <div class="content widths" v-if="title">
      <ul class="margin-bottom-finally">
        <li v-for="item in lists" @click="toDetails(item.id)">
          <p class="overflow-ellipsis">
            <span class="tuijian" v-if="item.topSortNum != 99999">荐</span>
            <span> {{ item.title }}</span>
          </p>
          <div class="time">{{ item.publishDate | myData }}</div>
        </li>
      </ul>
      <load-more-btn @click.native="loadMore" />
    </div>
    <div v-else>
      <no-data />
    </div>

    <mob-footer />
  </div>
</template>

<script>
import PubSub from "pubsub-js";
import { myData } from "@/assets/js/globalFilter";
import Crumbs from "@/components/control/crumbs/Crumbs";
import MobHead from "@/components/control/mobHead/MobHead";
import NavBar from "@/components/control/navBar/NavBar";
import MobFooter from "@/components/control/mobFooter/MobFooter";
import LoadMoreBtn from "@/components/control/loadMoreBtn/LoadMoreBtn";
import { activeList, addLog } from "@/api/request";
import { LOGLIST } from "@/assets/js/constant";
import NoData from "@/components/control/noData/NoData";

export default {
  name: "TrueAndFalseSmoke", //真假烟识别
  components: { LoadMoreBtn, NoData, MobFooter, NavBar, MobHead, Crumbs },
  data() {
    return {
      hasData: true,
      content: [],
      lists: [],
      title: "",
      currentPages: 1,
    };
  },
  created() {
    console.log(this.$route.query);
    if (this.$route.query.id == "wangzhannianbao") {
      this.content = [
        { name: "首页", path: "/home" },
        { name: this.$route.query.getTitle, path: "" },
      ];
    } else if (this.$route.query.id == "xingzhengxuke") {
      this.content = [
        { name: "办事服务", path: "/businessservices" },
        {
          name: "政务服务",
          path: "/businessservices/publicservice?id=&getTitle=政务服务",
        },
        {
          name: "权力清单",
          path: "/businessservices/publicservice?id=&getTitle=政务服务",
        },
        { name: "行政许可", path: "" },
      ];
    } else {
      this.content = [
        { name: "办事服务", path: "/businessservices" },
        { name: "公共服务", path: "/businessservices/commonservice" },
        { name: this.$route.query.getTitle, path: "" },
      ];
    }
  },
  mounted() {
    this.loadMore();
    if (this.$route.query.getTitle == "服务指南" || this.$route.query.getTitle == "专卖公示" || this.$route.query.getTitle == "办事统计") {
      this.content = [
        { name: "办事服务", path: "/businessservices" },
        {
          name: "政务服务",
          path: "/businessservices/publicservice?id=&getTitle=政务服务",
        },
      ];
    }
    this.logpoint();
  },
  methods: {
    logpoint() {
      let logtype = this.$route.query.getTitle;
      console.log(logtype);
      if (logtype == "服务指南") {
        addLog({
          columnTypeCode: LOGLIST.BSFW,
          subColumnTypeCode: "bsfw_fuwuzhinan",
        });
      } 
      else if (logtype == "真假烟识别") {
        addLog({
          columnTypeCode: LOGLIST.BSFW,
          subColumnTypeCode: "bsfw_zhenjiayanshibie",
        });
      }
      else if (logtype == "烟草农业") {
        addLog({
          columnTypeCode: LOGLIST.BSFW,
          subColumnTypeCode: "bsfw_yancaofuwu",
        });
      }
      else if (logtype == "网站年报") {
        addLog({
          columnTypeCode: LOGLIST.SYLM,
          subColumnTypeCode: "sylm_wangzhannianbao",
        });
      }
      else if (logtype == "专卖公示") {
        addLog({
          columnTypeCode: LOGLIST.BSFW,
          subColumnTypeCode: "bsfw_zhuanmaigongshi",
        });
      }
      else if (logtype == "办事统计") {
        addLog({
          columnTypeCode: LOGLIST.BSFW,
          subColumnTypeCode: "bsfw_banshitongji",
        });
      }
    },
    loadMore() {
      if (!this.hasData) {
        return false;
      }
      activeList({
        pageNo: this.currentPages,
        pageSize: 10,
        typeCode: this.$route.query.id,
      }).then((res) => {
        if (res.code == 200 || res.code == 0) {
          if (res.result.records.length) {
            this.title = res.result.records[0].typeCode_dictText;
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
    toDetails(id) {
      // this.$router.push({path: '/businessservices/truearticledetails?id=' + id,query:{title:this.$route.query.getTitle}})
      let routeUrl = this.$router.resolve({
        path: "/businessservices/truearticledetails?id=" + id,
        query: { title: this.$route.query.getTitle },
      });
      window.open(routeUrl.href, "_blank");
    },
  },
};
</script>
<style lang="less" scoped>
.content {
  margin: 0 auto;
  li {
    border-bottom: #f2f3f5 solid 1px;
    padding: 0.43rem 0;

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
    .time {
      margin-top: 0.2399rem;
    }
  }
  li:last-child {
    border-bottom: none;
  }
  li:first-child {
    margin-top: -0.29rem;
  }
}
</style>
