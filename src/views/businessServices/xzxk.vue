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
import { activeList } from "@/api/request";
import NoData from "@/components/control/noData/NoData";

export default {
  name: "xzxk", //行政许可
  components: { LoadMoreBtn, NoData, MobFooter, NavBar, MobHead, Crumbs },
  data() {
    return {
      hasData: true,
      content: [
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
      ],
      lists: [],
      title: "",
      currentPages: 1,
    };
  },
  created() {
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
  },
  mounted() {
    this.loadMore();
    if (this.$route.query.getTitle == "服务指南") {
      this.content = [
        { name: "办事服务", path: "/businessservices" },
        {
          name: "政务服务",
          path: "/businessservices/publicservice?id=&getTitle=政务服务",
        },
      ];
    }
  },
  methods: {
    loadMore() {
      if (!this.hasData) {
        return false;
      }
      activeList({
        pageNo: this.currentPages,
        pageSize: 10,
        typeCode: "xingzhengxuke",
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
