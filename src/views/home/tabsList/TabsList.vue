<template>
  <div>
    <mob-head />
    <nav-bar />
    <!-- 采购公开结果 -->
    <Crumbs :crumbs="content" />
    <div class="widths">
      <h1 class="nav-title">{{ navTitle }}</h1>
    </div>
    <div class="content widths" v-if="title">
      <ul class="margin-bottom-finally">
        <li v-for="item in lists" @click="toDetails(item)">
          <p class="overflow-ellipsis">
            <span class="tuijian" v-if="item.topSortNum != 99999">荐</span> <span> {{ $route.params.pathUrl==='meitibaodao'? '【'+item.mediaNameCode_dictText+'】 '+item.title: item.title }}</span>
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
import { activeList,addLog } from "@/api/request";
import NoData from "@/components/control/noData/NoData";
import { ARTICLE_TYPE,LOGLIST } from "@/assets/js/constant";

export default {
  name: "TabsList", //首页tabs列表
  components: { LoadMoreBtn, NoData, MobFooter, NavBar, MobHead, Crumbs },
  data() {
    return {
      navTitle: "",
      hasData: true,
      content: [],
      lists: [],
      title: "",
      currentPages: 1,
    };
  },
  created() {
    if (this.$route.params.pathUrl == "shizhengyaowen") {
      this.navTitle = "时政要闻";
    } else if (this.$route.params.pathUrl == "guowuyuan") {
      this.navTitle = "国务院信息";
    } else if (this.$route.params.pathUrl == "hangyeredian") {
      this.navTitle = "行业热点";
    } else if (this.$route.params.pathUrl == "chuanyandongtai") {
      //川烟动态
      this.navTitle = "川烟动态";
    } else if (this.$route.params.pathUrl == "sixianglilun") {
      //思想理论
      this.navTitle = "思想理论";
    } else if (this.$route.params.pathUrl == "meitibaodao") {
      this.navTitle = "媒体报道";
    }else {
      ARTICLE_TYPE.forEach((item) => {
        if (item.value == this.$route.params.pathUrl) {
          this.navTitle = item.label;
        }
      });
    }
    this.content = [
      { name: "首页", path: "/home" },
      { name: this.navTitle, path: "" },
    ];
  },
  mounted() {
    this.loadMore();
    this.logPoint()
  },
  methods: {
    // 统计埋点
    logPoint(){
        addLog({
          columnTypeCode:LOGLIST.SYLM,
          subColumnTypeCode:`${LOGLIST.SYLM}_${this.$route.params.pathUrl}`
        })
    },
    loadMore() {
      if (!this.hasData) {
        return false;
      }
      activeList({
        pageNo: this.currentPages,
        pageSize: 10,
        typeCode: this.$route.params.pathUrl,
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
    toDetails(item) {
      // console.log(item);
      if (item.outUrl) {
        window.open(item.outUrl, "_black");
        return false;
      }

      // this.$router.push({path: '/businessservices/truearticledetails?id=' + item.id})
      // this.$router.push({path:'/home/tabsinfo',query:{id:item.id,title:this.navTitle}})
      let routeUrl = this.$router.resolve({
        path: "/home/tabsinfo",
        query: { id: item.id, title: this.navTitle },
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
