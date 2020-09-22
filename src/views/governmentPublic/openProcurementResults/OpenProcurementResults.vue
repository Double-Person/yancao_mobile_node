<template>
  <div>
    <mob-head />
    <nav-bar />
    <!-- 采购公开结果 -->
    <Crumbs :crumbs="content" />
    <div class="content widths" v-if="lists" ref="wrapper">
      <h1 class="nav-title">{{ $route.query.getTitle }}</h1>
      <ul class="margin-bottom-finally content">
        <li v-for="item in lists" @click="toDetails(item)">
          <p class="overflow-ellipsis">
            <span class="tuijian" v-if="item.topSortNum != 99999">荐</span>
            <span> {{ item.title }}</span>
          </p>
          <div class="time">{{ item.publishDate | myData }}</div>
        </li>
      </ul>
      <div style="margin-top: 1rem;">
        <load-more-btn @click.native="firstLoad" />
      </div>
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

import { activeList, addLog } from "@/api/request";
import LoadMoreBtn from "@/components/control/loadMoreBtn/LoadMoreBtn";
import { LOGLIST } from "@/assets/js/constant";
export default {
  name: "OpenProcurementResults", //采购结果公开
  components: { LoadMoreBtn, MobFooter, NavBar, MobHead, Crumbs },
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
    this.firstLoad();
    // 设置面包屑
    let arr = [
      "xinxigongkaizhidu",
      "xinxigongkaizhinan",
      "xinxigongkaimulu",
      "xinxigongkainianbao",
      "yishenqinggongkai",
    ];
    let reslut = arr.includes(this.$route.query.id);
    let that = this;
    if (reslut) {
      this.content = [
        { name: "政务公开", path: "/governmentpublic" },
        {
          name: "信息公开",
          path: `/governmentpublic/discloseinformation?type=openInfo`,
        },
        { name: this.$route.query.getTitle || "采购结果公开", path: "" },
      ];
    } else {
      console.log("---", this.$route.query.getTitle);
      if (this.$route.query.getTitle == "行政许可") {
        that.content = [
          { name: "办事服务", path: "/businessservices" },
          {
            name: "政务服务",
            path: "/businessservices/publicservice?id=&getTitle=政务服务",
          },
          {
            name: "权力清单",
            path: "/businessservices/publicservice?id=&getTitle=政务服务",
          },
          {
            name: "行政许可",
            path: "/businessservices/publicservice?id=&getTitle=政务服务",
          },
          { name: that.$route.query.getTitle || "采购结果公开", path: "" },
        ];
      }
      that.content = [
        { name: "政务公开", path: "/governmentpublic" },
        { name: that.$route.query.getTitle || "采购结果公开", path: "" },
      ];
    }
  },
  mounted() {
    PubSub.subscribe("getCrumbs", (msg, data) => {
      console.log(msg, data);
      if (data) {
        switch (data) {
          case "openInfo":
            this.content = [
              { name: "政务公开", path: "/governmentpublic" },
              {
                name: "信息公开",
                path: "/governmentpublic/discloseinformation?type=openInfo",
              },
              // {name: this.$route.query.getTitle, path: ''}
            ];
            break;
          case "rightList":
            this.content = [
              { name: "政务公开", path: "/governmentpublic" },
              {
                name: "权力清单",
                path: "/governmentpublic/discloseinformation?type=rightList",
              },
              // {name: this.$route.query.getTitle, path: ''}
            ];
            break;
          default:
            this.content = [
              { name: "政务公开", path: "/governmentpublic" },
              { name: "采购结果公开", path: "" },
            ];
        }
      }
    });
    this.logPoint()
  },
  methods: {
    // 点
    logPoint() {
        addLog({
          columnTypeCode: LOGLIST.ZWGK,
          subColumnTypeCode: `${LOGLIST.ZWGK}_${this.$route.query.id}`,
        })
    },
    firstLoad() {
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
            this.currentPages += 1;
            this.lists.push(...res.result.records);
            this.title = res.result.records[0].typeCode_dictText;
          } else {
            this.hasData = false;
            this.$toast("没有更多数据了");
            PubSub.publish("noData", "noData");
          }
        }
      });
    },
    toDetails(item) {
      console.log(item);
      // this.$router.push({
      //   path: '/governmentpublic/articledetails?id=' + item.id,
      //   query: {title: this.$route.query.getTitle}
      // })
      let routeUrl = this.$router.resolve({
        path: "/governmentpublic/articledetails?id=" + item.id,
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
