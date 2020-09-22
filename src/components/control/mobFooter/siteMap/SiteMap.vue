<template>
  <div>
    <mob-head />
    <nav-bar />
    <crumbs :crumbs="crumbs" />
    <div class="widths">
      <div class="siteMap">网站地图</div>
      <ul class="title">
        <li class="title-item">新闻动态</li>
        <ul class="subTitle">
          <li
            class="subTitle-item"
            v-for="item in newsList"
            @click="toTheSpecifiedPage(item.toURL)"
          >
            {{ item.title }}
          </li>
        </ul>
        <li class="title-item">川烟概况</li>
        <ul class="subTitle">
          <li
            class="subTitle-item"
            v-for="item in sichuanSmokeSituation"
            @click="toTheSpecifiedPage(item.toURL)"
          >
            {{ item.title }}
          </li>
        </ul>
        <li class="title-item">栏目专题</li>
        <ul class="subTitle">
          <li
            class="subTitle-item"
            v-for="item in topicList"
            @click="toTheSpecifiedPage(item.toURL)"
          >
            {{ item.title }}
          </li>
        </ul>
        <li class="title-item">政务公开</li>
        <ul class="subTitle">
          <li
            class="subTitle-item"
            v-for="item in openGovernment"
            @click="toTheSpecifiedPage(item.toURL)"
          >
            {{ item.title }}
          </li>
        </ul>
        <li class="title-item">办事服务</li>
        <ul class="subTitle">
          <li
            class="subTitle-item"
            v-for="item in businessServices"
            @click="toTheSpecifiedPage(item.toURL)"
          >
            {{ item.title }}
          </li>
        </ul>
        <li class="title-item">互动交流</li>
        <ul class="subTitle">
          <li
            class="subTitle-item"
            v-for="item in interactive"
            @click="toTheSpecifiedPage(item.toURL)"
          >
            {{ item.title }}
          </li>
        </ul>
        <li class="title-item">子站链接</li>
        <ul class="subTitle">
          <li
            class="subTitle-item"
            v-for="item in subStationLink"
            @click="toSubStationLink(item.url)"
          >
            {{ item.name }}
          </li>
        </ul>
      </ul>
    </div>
    <div style="margin-top: 1.5rem">
      <mob-footer />
    </div>
  </div>
</template>

<script>
import MobHead from "../../mobHead/MobHead";
import NavBar from "../../navBar/NavBar";
import MobFooter from "../MobFooter";
import Crumbs from "../../crumbs/Crumbs";

export default {
  name: "SiteMap", // 网站地图
  components: { Crumbs, MobFooter, NavBar, MobHead },
  data() {
    return {
      crumbs: [
        { name: "首页", path: "/home" },
        { name: "网站地图", path: "" },
      ],
      tempData: [],
      // 新闻动态
      newsList: [
        { title: "时政要闻", toURL: "/news/shizhengyaowen" },
        { title: "国务院信息", toURL: "" },
        { title: "行业热点", toURL: "/news/hangyeredian" },
        { title: "川烟动态", toURL: "/news/chuanyandongtai" },
      ],
      // 栏目专题
      topicList: [
        { title: "专题教育", toURL: "/home/specialeducation" },
        { title: "党的建设", toURL: "/home/partybuilding" },
        { title: "社会责任", toURL: "/home/thesocialresponsibility" },
      ],
      //川烟概况
      sichuanSmokeSituation: [
        { title: "企业简介", toURL: "/sichuansmokesituation" },
        { title: "领导信息", toURL: "/sichuansmokesituation" },
        { title: "机构职能", toURL: "/sichuansmokesituation" },
        { title: "企业文化", toURL: "/home/theenterpriseculture" },
      ],
      //政务公开
      openGovernment: [
        {
          title: "公告公示",
          toURL:
            "/governmentpublic/openprocurementresults?id=gongshigonggao&getTitle=公示公告",
        },
        {
          title: "信息公开",
          toURL: "/governmentpublic/discloseinformation?type=openInfo",
        },
        {
          title: "采购结构公开",
          toURL:
            "/governmentpublic/openprocurementresults?id=caigoujieguogongkai&getTitle=采购结果公开",
        },
        {
          title: "法律法规",
          toURL:
            "/governmentpublic/openprocurementresults?id=falvfagui&getTitle=法律法规",
        },
        {
          title: "政策解读",
          toURL:
            "/governmentpublic/openprocurementresults?id=zhengcejiedu&getTitle=政策解读",
        },

        // {title:'权力清单',toURL:'/governmentpublic/discloseinformation?type=rightList'},
        {
          title: "数据统计",
          toURL:
            "/governmentpublic/openprocurementresults?id=shujufabu&getTitle=数据统计",
        },
      ],
      //办事服务
      businessServices: [
        {
          title: "政务服务",
          toURL: "/businessservices/publicservice?id=&getTitle=政务服务",
        },
        {
          title: "公共服务",
          toURL: "/businessservices/commonservice?id=&getTitle=公共服务",
        },
        {
          title: "服务导航",
          toURL: "/home/servicenavigation?id=&getTitle=服务导航",
        },
        {
          title: "办件公示",
          toURL:
            "/governmentpublic/openprocurementresults?id=banjiangongshi&getTitle=办件公示",
        },
      ],
      //互动交流
      interactive: [
        { title: "我要留言", toURL: "/interaction/leavemessage" },
        { title: "在线问答", toURL: "/interaction/OnlineInTheSearch" },
        { title: "征集调查", toURL: "/interaction/forinvestigation" },
        { title: "烟草逸事", toURL: "/interaction/tobaccoanecdotes" },
        { title: "川烟视窗", toURL: "/home/sichuansmokeview" },
      ],
      //  子站链接
      subStationLink: [
        { name: "成都", url: "http://sc.tobacco.com.cn/nportal/portal/s/CD" },
        { name: "自贡", url: "http://sc.tobacco.com.cn/nportal/portal/s/ZG" },
        {
          name: "攀枝花",
          url: "http://sc.tobacco.com.cn/nportal/portal/s/PZH",
        },
        { name: "泸州", url: "http://sc.tobacco.com.cn/nportal/portal/s/LZ" },
        { name: "德阳", url: "http://sc.tobacco.com.cn/nportal/portal/s/DY" },
        { name: "绵阳", url: "http://sc.tobacco.com.cn/nportal/portal/s/MY" },
        { name: "广元", url: "http://sc.tobacco.com.cn/nportal/portal/s/GY" },
        { name: "遂宁", url: "http://sc.tobacco.com.cn/nportal/portal/s/SN" },
        { name: "内江", url: "http://sc.tobacco.com.cn/nportal/portal/s/NJ" },
        { name: "乐山", url: "http://sc.tobacco.com.cn/nportal/portal/s/LES" },
        { name: "南充", url: "http://sc.tobacco.com.cn/nportal/portal/s/NC" },
        { name: "眉山", url: "http://sc.tobacco.com.cn/nportal/portal/s/MS" },
        { name: "宜宾", url: "http://sc.tobacco.com.cn/nportal/portal/s/YB" },
        { name: "广安", url: "http://sc.tobacco.com.cn/nportal/portal/s/GA" },
        { name: "达州", url: "http://sc.tobacco.com.cn/nportal/portal/s/DZ" },
        { name: "雅安", url: "http://sc.tobacco.com.cn/nportal/portal/s/YA" },
        { name: "巴中", url: "http://sc.tobacco.com.cn/nportal/portal/s/BZ" },
        { name: "资阳", url: "http://sc.tobacco.com.cn/nportal/portal/s/ZY" },
        { name: "凉山", url: "http://sc.tobacco.com.cn/nportal/portal/s/LS" },
        { name: "阿坝", url: "http://sc.tobacco.com.cn/nportal/portal/s/AB" },
        { name: "甘孜", url: "http://sc.tobacco.com.cn/nportal/portal/s/GZ" },
      ],
    };
  },
  methods: {
    toTheSpecifiedPage(url) {
      if (url) {
        this.$router.push({ path: url });
      } else {
        window.open("http://www.gov.cn/pushinfo/v150203/index.htm ", "_black");
      }
    },
    toSubStationLink(url) {
      window.open(url, "_blank");
    },
  },
};
</script>

<style lang="less" scoped>
.siteMap {
  margin: 0.6399rem auto;
  font-size: 0.5rem;
}

.title {
  .title-item {
    height: 1.066rem;
    font-size: 0.43rem;
    font-family: MicrosoftYaHei;
    text-align: left;
    color: #000000;
    line-height: 1.066rem;
    margin-top: 0.64rem;
    /*display: inline-block;*/
  }
  .subTitle {
    display: flex;
    flex-wrap: wrap;
    .subTitle-item {
      height: 0.85rem;
      background: #fff;
      display: inline-block;
      font-size: 0.37rem;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      /*text-align: left;*/
      padding-right: 0.64rem;
      color: #235399;
      line-height: 0.85rem;
    }
  }
}
</style>
