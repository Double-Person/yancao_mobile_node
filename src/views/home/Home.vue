<template>
  <div class="home">
    <div
      class="advertising"
      v-for="(item, index) in advertising"
      v-if="index <= 0"
    >
      <img :src="item.img" alt="" />
    </div>
    <mob-head />
    <nav-bar />
    <div >
      <div class="search widths" @click="onSearch">
        <!--<input v-model="search" placeholder="请输入关键字" @focus="onSearch"/>-->
        <!--<span @click="onSearch"><img src="./images/icon_home_nav_search.svg"/></span>-->
        <van-search
          placeholder="请输入关键字"
          right-icon="search"
          left-icon=""
        />
      </div>
      <!-- swipe 轮播 -->
      <van-swipe
        ref="vanSwipe"
        :autoplay="3000"
        class="swipe"
        style="width: 92%;margin: 0 auto"
        @change="onChange"
      >
        <van-swipe-item
          v-for="(image, index) in images"
          :key="index"
          class="swipe-item"
        >
          <img :src="image.img" class="swipe-img" @click="goAdetail(image)" />
        </van-swipe-item>
        <template #indicator>
          <div class="custom-indicator">
            <div>{{ images[current].title }}</div>
            <div class="btn">
              <div
                :class="current == index ? 'selected' : ''"
                v-for="(item, index) in images"
              >
                {{ index + 1 }}
              </div>
            </div>
          </div>
        </template>
      </van-swipe>
      <van-tabs
        v-model="active"
        @click="onClickSwipeTabs"
        class="tabs-four"
        :line-width="60"
        :line-height="2"
      >
        <van-tab title="时政要闻">
          <IndexLink :link="linkType[0].linkList" :type="tabsPathUrl" />
        </van-tab>
        <van-tab title="国务院信息">
          <IndexLink :link="linkType[1].linkList" :type="tabsPathUrl" />
        </van-tab>
        <van-tab title="行业热点">
          <IndexLink :link="linkType[2].linkList" :type="tabsPathUrl" />
        </van-tab>
        <van-tab title="川烟动态">
          <IndexLink :link="linkType[3].linkList" :type="tabsPathUrl" />
        </van-tab>
         <van-tab title="媒体报道">
          <IndexLink :link="linkType[4].linkList" :type="tabsPathUrl" />
        </van-tab>
      </van-tabs>
    </div>
    <div class="more-btn widths" style="text-align: center" @click="tabsMore">
      更多
    </div>
    <div class="nav-banner" @click.self="clickBanner($event)">
      <div class="nav-banner-title" @click.self="clickBanner($event)">
        深入学习贯彻习近平新时代中国特色社会主义思想
      </div>
      <div class="nav-banner-list">
        <div class="nav-banner-item" @click="specialEducation">专题教育</div>
        <div class="nav-banner-item" @click="partyBuilding">党的建设</div>
        <div class="nav-banner-item" @click="theSocialResponsibility">
          社会责任
        </div>
        <div class="nav-banner-item" @click="theEnterpriseCulture">
          企业文化
        </div>
      </div>
    </div>
    <div style="background: #f4f5f7;padding-bottom: 0.9rem">
      <div class="widths goverment">
        <!-- 政府服务 -->
        <HomeService :service="govermentService" />
        <!-- 公共服务 -->
        <HomeService :service="commonalityService" />
        <!-- 诚至诚 -->
        <div class="icon_honest" @click="$router.push('/error')">
          <span><img src="./images/icon_home_chengzhicheng.svg" alt=""/></span
          >商务
        </div>
      </div>
    </div>
    <!-- <div class="partingLine"></div> -->

    <div class="widths">
      <!-- 公示公告 数据发布 -->

      <div class="publicity">
        <div class="left none" id="none">
          <van-tabs type="card" @click="onClick">
            <van-tab title="公示公告">
              <IndexLink
                :link="linkType[5].linkList.slice(0, 3)"
                type="公示公告"
              />
            </van-tab>
            <van-tab title="" style="display: none" disabled>
              <!--<IndexLink :link="linkType[5].linkList"/>-->
            </van-tab>
            <!--<van-tab title="数据发布">-->
            <!--<IndexLink :link="linkType[5].linkList"/>-->
            <!--</van-tab>-->
          </van-tabs>
        </div>
        <div class="right">
          <span @click="caigoujieguogongkaiMore('gongshigonggao')">更多</span>
        </div>
      </div>

      <!-- 法律法规 政策解读 -->

      <div class="publicity">
        <div class="left none">
          <van-tabs type="card">
            <van-tab title="法律法规">
              <IndexLink
                :link="linkType[7].linkList.slice(0, 3)"
                type="法律法规"
              />
            </van-tab>
            <van-tab title="" disabled>
              <!--<IndexLink :link="linkType[7].linkList"/> 政策解读  -->
            </van-tab>
          </van-tabs>
        </div>
        <div class="right">
          <span @click="caigoujieguogongkaiMore('falvfagui')">更多</span>
        </div>
      </div>

      <!-- 法律法规 政策解读 -->

      <div class="publicity">
        <div class="left none">
          <van-tabs type="card">
            <van-tab title="政策解读">
              <IndexLink
                :link="linkType[8].linkList.slice(0, 3)"
                type="政策解读"
              />
            </van-tab>
            <van-tab title="" disabled>
              <!--<IndexLink :link="linkType[7].linkList"/>-->
            </van-tab>
          </van-tabs>
        </div>
        <div class="right">
          <span @click="caigoujieguogongkaiMore('zhengcejiedu')">更多</span>
        </div>
      </div>

      <!-- 互动交流 homeInteraction -->
      <home-interaction />

      <!-- 川烟视窗 -->
      <div class="view">
        <h1 class="nav-title">川烟视窗</h1>
        <div class="item-video" v-for="item in video">
          <video
            width="100%"
            height="193"
            controls
            :poster="item.imgList[0]"
            playsinline
            x5-playsinline="true"
            playsinline="true"
            webkit-playsinline=""
          >
            <source :src="item.url" type="video/mp4" />
            您的浏览器不支持 HTML5 video 标签。
          </video>
          <p class="overflow-ellipsis">{{ item.title }}</p>
        </div>
        <div class="btn" @click="SichuanSmokeView">查看更多</div>
      </div>

      <!-- 川烟动态视频标签下的item -->
      <VideoButtomItem />
    </div>

    <!-- 烟草专卖市场监管举报电话 -->
    <div>
      <img style="width: 100%" src="./images/pic_home_banner3@3x.png" alt="" />
    </div>

    <div class="widths">
      <div>
        <h1 class="nav-title">服务导航</h1>
        <maps />
      </div>

      <div class="friendlyLink">
        <h1 class="nav-title">友情链接</h1>
        <ul>
          <li @click="friend('http://www.sc.gov.cn/')">
            <img
              src="./images/friendlyLink/pic_home_logo6.svg"
              alt="四川人民政府"
            />
          </li>
          <li
            @click="
              friend(
                'http://www.sczwfw.gov.cn/app/main?flag=1&areaCode=510000000000'
              )
            "
          >
            <img
              src="./images/friendlyLink/pic_home_logo4.svg"
              alt="四川政务服务网"
            />
          </li>
          <li @click="friend('http://www.tobacco.gov.cn/html/')">
            <img
              src="./images/friendlyLink/pic_home_logo1.svg"
              alt="中国烟草"
            />
          </li>
          <li @click="friend('http://www.echinatobacco.com/')">
            <img
              src="./images/friendlyLink/pic_home_logo2.svg"
              alt="中国烟草资讯网"
            />
          </li>
          <li @click="friend('https://www.eastobacco.com/')">
            <img
              src="./images/friendlyLink/pic_home_logo3.svg"
              alt="东方烟草网"
            />
          </li>
          <li
            @click="
              friend(
                'http://www.sctobacco.com/information/informationAction.do?method=getIndexInfomationByColumnId'
              )
            "
          >
            <img
              src="./images/friendlyLink/pic_home_logo5.svg"
              alt="四川中烟工业有限公司"
            />
          </li>
        </ul>
      </div>
    </div>

    <!-- 进入页面抛出弹窗   -->
    <van-overlay :show="show" @click="" z-index="10">
      <div class="wrapper" @click.stop>
        <div class="block">
          <div class="widths">
            <div class="title">谢绝18岁以下人士访问</div>
            <img src="./images/pic_pop1.svg" alt="" />
            <div class="btnDiv">
              <button @click="closePops">确定</button>
              <button @click="closeMosk">取消</button>
            </div>
          </div>
        </div>
      </div>
    </van-overlay>

    <mob-footer />
  </div>
</template>

<script>
// @ is an alias to /src
import { myMixin } from "@/mixins/myMixins";
import IndexLink from "@/components/control/indexLink/IndexLink";
import HomeService from "./HomeService";
import MobHead from "@/components/control/mobHead/MobHead";
import NavBar from "@/components/control/navBar/NavBar";
import MobFooter from "@/components/control/mobFooter/MobFooter";
import HomeInteraction from "./homeInteraction/HomeInteraction";
import Maps from "./maps/maps";
import { addLog } from "@/api/request";

import { videoIndex, searchAllProvinces } from "@/views/home/homeRequest";
import {
  sysAdvertiseList,
  shuffling,
  activeList,
  videoList,
  addVisitLog
} from "@/api/request";
import VideoButtomItem from "./videoButtomItem/VideoButtomItem";

export default {
  name: "home",
  mixins: [myMixin],
  components: {
    VideoButtomItem,
    Maps,
    HomeInteraction,
    MobFooter,
    NavBar,
    MobHead,
    HomeService,
    IndexLink,
  },
  data() {
    return {
      current: 0,
      tabsPathUrl: "时政要闻", //轮播下tabs
      mobile: "", //手机型号
      show: false,
      advertising: [], //顶部广告
      active: 0,
      search: "",
      video: [], //川烟视窗--视频
      govermentService: {
        title: "政务服务",
        lists: [
          {
            img: require("./images/goverment/icon_fuwuzhinan.svg"),
            navBar: "服务指南",
            path:
              "/businessservices/commonservice/trueandfalsesmoke?id=fuwuzhinan&getTitle=服务指南",
          },
          {
            img: require("./images/goverment/icon_home_zaixiainbanzheng.svg"),
            navBar: "在线办证",
            path: "",
            addOutline:
              "https://zwfwdt.tobacco.gov.cn/cooperativeWeb/event/tab",
          },
          {
            img: require("./images/goverment/icon_banjianchaxun.svg"),
            navBar: "办证查询",
            path: "",
            addOutline:
              "https://zwfwdt.tobacco.gov.cn/cooperativeWeb/event/tab",
          },
          {
            img: require("./images/goverment/iocn_home_banjiangongkai.svg"),
            navBar: "办件公示",
            path: "",
            addOutline:
              "https://zwfwdt.tobacco.gov.cn/cooperativeWeb/event/tab",
          },

          {
            img: require("./images/goverment/icon_home_quanliqingdan.svg"),
            navBar: "权力清单",
            path: "/governmentpublic/discloseinformation?type=rightList",
          },
        ],
      },
      commonalityService: {
        title: "公共服务",
        lists: [
          {
            img: require("./images/commonality/icon_home_lingshouhudinghuo.svg"),
            navBar: "零售户订货",
            path: "",
            addOutline: "http://www.xinshangmeng.com/xsm2/?Version=2019121400",
          },
          {
            img: require("./images/commonality/icon_home_zhiyingdian.svg"),
            navBar: "直营店查询",
            path: "/home/servicenavigation?id=&getTitle=直营店查询",
          },

          {
            img: require("./images/commonality/icon_home_zhenjiayanshibie.svg"),
            navBar: "真假烟识别",
            path:
              "/businessservices/commonservice/trueandfalsesmoke?id=zhenjiayanshibie&getTitle=真假烟识别",
          },
          {
            img: require("./images/commonality/icon_home_yancaonongye.svg"),
            navBar: "烟草农业",
            path:
              "/businessservices/commonservice/trueandfalsesmoke?id=yancaofuwu&getTitle=烟草农业",
          },
        ],
      },
      images: [{ title: "" }], //轮播
      linkType: [
        { name: "时政要闻", typeCodes: "shizhengyaowen", linkList: [] },
        { name: "国务院信息", typeCodes: "guowuyuan", linkList: [] },
        { name: "行业热点", typeCodes: "hangyeredian", linkList: [] },
        { name: "川烟动态", typeCodes: "chuanyandongtai", linkList: [] },
        { name: "媒体报道", typeCodes: "meitibaodao", linkList: [] },
        { name: "公示公告", typeCodes: "gongshigonggao", linkList: [] },
        { name: "数据发布", typeCodes: "shujufabu", linkList: [] },
        { name: "法律法规", typeCodes: "falvfagui", linkList: [] },
        { name: "政策解读", typeCodes: "zhengcejiedu", linkList: [] },
      ],
      type: "法律法规",
    };
  },

  mounted() {
    this.bar = "时政要闻";
    if (window.name == "") {
      this.show = true;
      // console.log("首次被加载");
    } else if (window.name == "isReload") {
      // console.log("页面被刷新");
      this.show = false;
    }
    this.firstLoad();
    //  轮播下的导航栏
    this.linkTypeMethod();
    this.mobile =
      navigator.appVersion.indexOf("iPhone") !== -1 ? "iPhone" : "android";

    this.getVisitor();
  },
  methods: {
    // 点击轮播光标
    swiperCheck() {
      this.$refs.vanSwipe.swipeTo(3, false);
    },
    onChange(index) {
      this.current = index;
    },
    // 跳转详情
    goAdetail(item) {
      console.log(item);
      let routeUrl = this.$router.resolve({
        path: "/home/tabsinfo",
        query: { id: item.id, title: item.articleTypeName },
      });
      window.open(routeUrl.href, "_blank");
    },
    // 点击banner跳转新网页
    clickBanner(e) {
      window.open("http://www.sc.gov.cn/10462/14586/zgtshsx.shtml", "_black");
    },
    onClickSwipeTabs(name, title) {
      // if (name == 1) {
      //   this.$router.push({path: `/news/guowuyuan`, params: {pathUrlP: 'guowuyuan'}});
      //   return false;
      // }
      this.tabsPathUrl = title;
      this.bar = title;

      if(name === 1){
        addLog({
        columnTypeCode: "sylm",
        subColumnTypeCode: "sylm_guowuyuanxinxi",
      });
      }
    },
    //轮播下tabs的更多按钮
    tabsMore() {
      // console.log(this.tabsPathUrl);
      let pathUrlP = "";
      if (this.tabsPathUrl == "时政要闻") {
        pathUrlP = "shizhengyaowen";
      } else if (this.tabsPathUrl == "国务院信息") {
        // pathUrlP = 'guowuyuan'
        window.open("http://www.gov.cn/pushinfo/v150203/index.htm ", "_black");
        return false;
      } else if (this.tabsPathUrl == "行业热点") {
        pathUrlP = "hangyeredian";
      } else if(this.tabsPathUrl == "川烟动态") {
        //川烟动态
        pathUrlP = "chuanyandongtai";
      }else{
        pathUrlP = "meitibaodao";
      }
      this.$router.push({ path: `/news/${pathUrlP}`, params: { pathUrlP } });
    },
    //
    onClick(name, title) {
      // return false;
      if (title == "数据发布") {
        // console.log('数据发布');
        this.$router.push({
          path: "/home/servicenavigation?id=&getTitle=服务导航",
        });
      }
    },
    // 社会责任
    theSocialResponsibility() {
      // 埋点
      addLog({
        columnTypeCode: "article",
        subColumnTypeCode: "article_shehuizeren",
      });
      this.$router.push("/home/thesocialresponsibility");
    },
    // 专题教育
    specialEducation() {
      // 埋点
      addLog({
        columnTypeCode: "article",
        subColumnTypeCode: "article_zhuantijiaoyu",
      });
      this.$router.push({ path: "/home/specialeducation" });
    },
    //党的建设
    partyBuilding() {
      addLog({
        columnTypeCode: "article",
        subColumnTypeCode: "article_dangdejianshe",
      });
      this.$router.push({ path: "/home/partybuilding" });
    },
    // 企业文化
    theEnterpriseCulture() {

      this.$router.push({ path: "/home/theenterpriseculture" });
    },
    //  轮播下的导航栏
    linkTypeMethod() {
      for (let item of this.linkType) {
        activeList({ typeCode: item.typeCodes, pageNo: 0, pageSize: 8 }).then(
          (res) => {
            if (res.code == 200 || res.code == 0) {
              item.linkList.push(...res.result.records);
            }
          }
        );
      }
    },
    changeFalvOrZhengCe(name, title) {
      this.type = title;
    },
    //  公式公告||数据发布 更多按钮点击去 政务公开-采购结果公开
    caigoujieguogongkaiMore(types) {
      this.$router.push({ path: `/news/${types}`, params: { types } });
      return false;
      let id = "";
      let type = "";
      if (types == "falvfagui") {
        id = "falvfagui";
        type = "法律法规";
        // 埋点
        addLog({
          columnTypeCode: "article",
          subColumnTypeCode: "article_falvfagui",
        });
      } else if (types == "zhengcejiedu") {
        id = "zhengcejiedu";
        type = "政策解读";
        // 埋点
        addLog({
          columnTypeCode: "article",
          subColumnTypeCode: "article_zhengcejiedu",
        });
      } else if (types == "gongshigonggao") {
        id = "zhengcejiedu";
        type = "公示公告";
        // 埋点
        addLog({
          columnTypeCode: "article",
          subColumnTypeCode: "article_gongshigonggao",
        });
      }
      // this.$router.push({path: `/governmentpublic/openprocurementresults?id=${id}&getTitle=${this.type}`})
      // this.$router.push({path:'/home/tabsinfo',query:{id:item.id,title:this.navTitle}})
    },
    firstLoad() {
      videoIndex().then((res) => {
        this.video = res.result;
      });
      //  顶部广告
      shuffling({ typeCode: "mobile_index_top" }).then((res) => {
        if (res.code == 200 || res.code == 0) {
          this.advertising = res.result.records;
        }
      });
      //  轮播
      shuffling({ typeCode: "index_lunbo" }).then((res) => {
        if (res.code == 200 || res.code == 0) {
          this.images = res.result.records;
        }
      });

      // 视频
      videoList({ pageNo: 1, pageSize: 1 }).then((res) => {
        if (res.code == 200 || res.code == 0) {
          this.video = res.result.records;
        }
      });
    },
    onSearch() {
      this.$router.push({ name: "InTheSearch" });
    },
    // 关闭弹窗
    closePops() {
      window.name = "isReload";
      this.show = false;
    },
    //关闭当前页面
    closeMosk() {
      let userAgent = navigator.userAgent;
      if (
        userAgent.indexOf("Firefox") != -1 ||
        userAgent.indexOf("Chrome") != -1
      ) {
        window.location.href = "about:blank";
      } else {
        window.opener = null;
        window.open("", "_self");
        window.close();
      }
    },
    // 视频点击更多
    SichuanSmokeView() {
      this.$router.push({ name: "SichuanSmokeView" });
    },
    //  友情链接
    friend(url) {
      window.open(url, "_blank");
    },
    // 获取访问量
    getVisitor() {
      addVisitLog("/mobile/visitor/add").then((res) => {
        if (res.code == 0 || res.code == 200) {
          localStorage.setItem("amount", res.result.amount);
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
/* 隐藏公式公告旁边的  */
/deep/ .none {
  .van-tabs {
    .van-tabs__nav > div:nth-of-type(2) {
      background: #fff !important;
    }
  }
}

.home {
  .partingLine {
    margin: 0.40333rem auto 0.43rem 0;
  }
  .goverment {
    margin-top: -0.7rem;
  }
  /*首页广告图片*/
  .advertising {
    width: 100%;
    height: 30px;
    img {
      width: 100%;
      border: none;
      height: 30px;
      display: block;
    }
  }
  .search {
    .van-search {
      padding: 0.2399rem 0;
    }
  }
  .swipe {
    width: 100%;
    /*height: 6.9rem;*/
    height: 4.26rem;
    .swipe-item {
      width: 100%;

      .swipe-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }

  /* tabs下边框start */
  /deep/ .van-tabs__line {
    /*background-color: #ebedf0;*/
    background-color: #04549e;
    border-radius: 0;
    height: 0;
  }

  & /deep/ .van-tab {
    color: #323333;
    font-size: 0.37rem;
  }
  /* apple is double '/deep/' while not style */
  /deep/ .van-tab--active {
    .van-ellipsis {
      display: inline-block;
      height: 1.07rem;
      border-bottom: #235399 solid 0.05333rem;

      font-size: 0.37333rem;
    }
  }
  .tabs-four {
    /deep/ .van-tabs__content {
      width: 92%;
      margin: 0 auto;
    }
    /deep/ .van-tab--active {
      /*border-bottom: #04549E solid 0.05rem;*/
      /*border-color: #04549E;*/
      background: url("./images/icon_slider.svg") no-repeat 50% 100%;
      .van-ellipsis {
        color: #235399;
        font-weight: 600;
      }
    }
  }

  /* tabs下边框 end */

  & /deep/ .van-tab__pane li {
    margin-bottom: 0.28rem;
  }
  /* 横幅 */
  .nav-banner {
    padding-top: 0.4rem;
    margin-top: 0.5rem;
    width: 100%;
    height: 3.57rem;
    overflow: hidden;
    background: #f4f5f7 url("./images/pic_home_hongqi@3x.png") no-repeat;
    background-size: contain;

    .nav-banner-title {
      text-align: center;
      font-size: 0.43rem;
      font-weight: 700;
      line-height: 0.56rem;
      letter-spacing: 0px;
      /*box-shadow: 0px 1px 4px 0px #A80D0D;*/
      font-family: MicrosoftYaHei, MicrosoftYaHei-Bold;
      height: 0.56rem;
      -webkit-text-stroke: 0.00566rem #fff;
      /* text-shadow: #fff 0.00266rem 0 0, #fff 0 0.00266rem 0, #fff -1px 0 0, #fff 0 -0.00266rem 0; */

      background: linear-gradient(rgba(250, 178, 36, 1), rgba(247, 24, 8, 1));
      -webkit-background-clip: text;
      color: transparent;
      /*color: #de0000;*/
    }
    .nav-banner-list {
      display: flex;
      justify-content: space-between;
      font-size: 0.37rem;
      color: #fff;
      margin-top: 0.34666rem;
      .nav-banner-item {
        background: url("./images/butt_home_zhuanti.svg") no-repeat center;
        background-size: cover;
        width: 22%;
        line-height: 1.8rem;
        position: relative;
        z-index: 2;
        margin: -0.1rem auto;
        text-align: center;
      }
    }
  }

  .icon_honest {
    font-size: 0.43rem;
    height: 1rem;
    line-height: 1rem;
    img {
      vertical-align: middle;
      margin-top: -0.1rem;
    }
  }

  /deep/ .van-tabs__nav,
  .van-tabs__nav--card {
    border: none;
  }

  /deep/ .van-tabs__nav--card .van-tab.van-tab--active {
    background: #1c59b0;
    color: #fff;
  }
  /deep/ .van-tabs__nav--card .van-tab {
    background: #e6f0fb;
    color: #323333;
    border-right: none;
  }
  .van-tabs__content ul {
    width: 100%;
  }
  .publicity ul {
    width: 110%;
  }
  /*****************/
  /deep/ .publicity > .left .van-tabs--card .van-tabs__wrap {
    display: inline-block;
    width: 80% !important;
    height: 1rem;
    margin-left: -5%;
  }
  /deep/ .van-tabs__nav--card,
  .van-tabs__nav--card {
    width: 80% !important;
    height: 1rem;
    line-height: 1rem;
    vertical-align: center;
  }
  /deep/ .van-tabs__nav--card span {
    display: inline-block;
    height: 1rem;
    line-height: 1rem;
  }

  /*****************/

  .publicity {
    display: flex;
    justify-content: space-between;
    margin: 0.2rem auto 0.5rem;
    .left {
      width: 90%;
    }
    .right {
      width: 10%;
      color: #979899;
      font-size: 0.37rem;
      line-height: 0.74667rem;
    }
  }
  /* 川烟视窗 */
  .view {
    .item-video {
      font-size: 0.43rem;
      video {
        object-fit: fill;
      }
      p {
        margin: 0.32rem auto 0.44rem auto;
        color: #323333;
        font-weight: 500;
        font-size: 0.43rem;
      }
    }
    .btn {
      color: #656566;
      border: #979899 solid 0.02777rem;
      border-radius: 0.6rem;
      width: 3.1rem;
      margin: 0.21rem auto 0.66rem auto;
      font-size: 0.37rem;
      text-align: center;
      height: 0.8rem;
      line-height: 0.8rem;
    }
  }
  /* 友情链接 */
  .friendlyLink {
    padding: 0rem 0;

    ul {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      li {
        width: 45%;
        margin-bottom: 0.43rem;
        img {
          width: 100%;
          display: block;
        }
      }
    }
  }

  .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    .block {
      width: 89%;
      /*height: 40%;*/
      background: rgba(70, 123, 199, 0.9);
      .widths {
        text-align: center;
        width: 74%;
        color: #fff;
        font-size: 0.51rem;
        .title {
          margin: 1rem auto 0 auto;
        }
        img {
          width: 100%;
          /*border: .0266rem #fff dashed;*/
        }
        .btnDiv {
          display: flex;
          justify-content: space-between;
          margin: 0.8rem auto;
          button {
            width: 47.5%;
            line-height: 1rem;
            border: none;
            border-radius: 0.16rem;
            background: #49c8ff;
          }
          button:nth-last-of-type(1) {
          }
          button:nth-last-of-type(2) {
            /*background: #2BAAE1;*/
          }
        }
      }
    }
  }
}
.custom-indicator {
  position: absolute;
  height: 30px;
  right: 0px;
  bottom: 0px;
  background: rgba(0, 0, 0, 0.4);
  width: 100%;
  color: #fff;
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  align-items: center;
  & > div:nth-child(1) {
    width: 210px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-left: 8px;
    height: 20px;
    line-height: 20px;
  }
  .btn {
    width: 100px;
    display: flex;
    div {
      cursor: pointer;
      font-size: 12px;
      width: 20px;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: rgba(255, 255, 255, 0.67);
      &.selected {
        background: #ec1207;
        color: #fff;
      }
    }
  }
}
</style>
