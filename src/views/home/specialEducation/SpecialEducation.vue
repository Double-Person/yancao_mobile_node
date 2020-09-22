<template>
  <div class>
    <!-- <div
      class="advertising"
      v-for="(item, index) in advertising"
      v-if="index <= 0"
    >
      <img :src="item.img" alt="" />
    </div>-->
    <mob-head />
    <nav-bar />
    <crumbs :crumbs="crumbs" />
    <div class="widths">
      <div class="specialEducation">新闻报道</div>

      <van-swipe :autoplay="3000" class="swipe" @change="onChange">
        <van-swipe-item v-for="(image, index) in images" :key="index" class="swipe-item">
          <a :href="image.url" target="_blank" rel="noopener noreferrer">
            <img :src="image.img" class="swipe-img" />
          </a>
        </van-swipe-item>
        <template #indicator>
          <div class="custom-indicator">
            <div>{{ images[current].title }}</div>
            <div class="btn">
              <div
                :class="current == index ? 'selected' : ''"
                v-for="(item, index) in images"
              >{{ index + 1 }}</div>
            </div>
          </div>
        </template>
      </van-swipe>

      <!-- 轮播下列表数据  （新闻报道） -->
      <ul>
        <li v-for="(item, index) in link" class="link" @click="newsInfo(item.id, 'xinwenbaodao')">
          <div class="tuijian" v-if="item.topSortNum != 99999">荐</div>
          <div class="overflow-ellipsis">{{ item.title }}</div>
          <div class="time">{{ item.publishDate | formatData }}</div>
        </li>
      </ul>

      <load-more-btn @click.native="loadMoreEducation" v-if="linkPageTotal != link.length" />
      <div v-if="linkPageTotal == link.length" style="height: .85rem;"></div>
      <!-- 思想理论 -->
      <div class="specialEducation" style="margin-top: 0">思想理论</div>
      <ul>
        <li
          v-for="(item, index) in thoughtsAndTheories"
          class="link"
          @click="newsInfo(item.id, 'sixianglilun')"
        >
          <div class="tuijian" v-if="item.topSortNum != 99999">荐</div>
          <div class="overflow-ellipsis">{{ item.title }}</div>
          <div class="time">{{ item.publishDate | formatData }}</div>
        </li>
      </ul>

      <load-more-btn
        @click.native="loadMore"
        v-if="thoughtsAndTheoriesPageTotal != thoughtsAndTheories.length"
      />
      <div v-if="thoughtsAndTheoriesPageTotal == thoughtsAndTheories.length" style="height: 1rem;"></div>
    </div>
    <mob-footer />
  </div>
</template>

<script>
import { sysAdvertiseList, shuffling, activeList, addLog } from "@/api/request";
import MobHead from "@/components/control/mobHead/MobHead";
import NavBar from "@/components/control/navBar/NavBar";
import Crumbs from "@/components/control/crumbs/Crumbs";
import LoadMoreBtn from "@/components/control/loadMoreBtn/LoadMoreBtn";
import MobFooter from "@/components/control/mobFooter/MobFooter";
import { LOGLIST } from "@/assets/js/constant";

export default {
  name: "SpecialEducation", //专题教育
  components: { MobFooter, LoadMoreBtn, Crumbs, NavBar, MobHead },
  data() {
    return {
      current: 0,
      advertising: [], //顶部广告
      crumbs: [
        { name: "首页", path: "/home" },
        { name: "专题教育", path: "" },
      ],
      images: [{ title: "" }], //
      thoughtsAndTheories: [], //思想理论
      link: [], // 专题教育
      linkPage: 1, // 专题教育当前页数
      linkPageTotal: 1, // 专题教育总条数
      thoughtsAndTheoriesPageTotal: 1, //思想理论总条数
      thoughtsAndTheoriesPage: 1, //思想理论当前页数
    };
  },
  created() {
    this.firstLoad();
    this.specialEducationData(
      { typeCode: "xinwenbaodao", pageNo: 1, pageSize: 5 },
      "xinwenbaodao"
    );
    this.specialEducationData(
      { typeCode: "sixianglilun", pageNo: 1, pageSize: 7 },
      "sixianglilun"
    );
    this.logPoint();
  },
  methods: {
    // 统计埋点
    logPoint() {
      addLog({
        columnTypeCode: LOGLIST.SYLM,
        subColumnTypeCode: `${LOGLIST.SYLM}_zhuantijiaoyu`,
      });
    },
    // 点击轮播光标
    swiperCheck() {
      this.$refs.vanSwipe.swipeTo(3, false);
    },
    onChange(index) {
      this.current = index;
    },
    firstLoad() {
      shuffling({ typeCode: "mobile_index_top" }).then((res) => {
        if (res.code == 200 || res.code == 0) {
          this.advertising = res.result.records;
        }
      });
      // 轮播
      shuffling({ typeCode: "zhuantixinwenbaodao" }).then((res) => {
        if (res.code == 200 || res.code == 0) {
          this.images = res.result.records;
        }
      });
    },
    //  专题教育  搜想理论
    specialEducationData(datas, type) {
      activeList(datas).then((res) => {
        // console.log(type,res);//total
        // console.log(datas.pageNo);
        if (res.code == 0 || res.code == 200) {
          if (datas.pageNo == 1) {
            if (type == "xinwenbaodao") {
              this.link = res.result.records;
              this.linkPage++;
              this.linkPageTotal = res.result.total;
            } else {
              this.thoughtsAndTheoriesPage++;
              this.thoughtsAndTheories = res.result.records;
              this.thoughtsAndTheoriesPageTotal = res.result.total;
            }
          } else {
            if (type == "xinwenbaodao") {
              this.linkPage++;
              this.link.push(...res.result.records);
            } else {
              this.thoughtsAndTheoriesPage++;
              this.thoughtsAndTheories.push(...res.result.records);
            }
          }
        }
      });
    },
    newsInfo(id, typeCode) {
      // this.$router.push({name:'SpecialEducationDetial',query:{id,typeCode}})
      let routeUrl = this.$router.resolve({
        name: "SpecialEducationDetial",
        query: { id, typeCode },
      });
      window.open(routeUrl.href, "_blank");
    },
    // 新闻报道点击更多
    loadMoreEducation() {
      this.$router.push({
        path: `/news/xinwenbaodao`,
        params: { pathUrlP: "xinwenbaodao" },
      });
      // this.specialEducationData({typeCode: 'zhuantijiaoyu', pageNo: this.linkPage, pageSize: 10}, 'zhuantijiaoyu')
    },
    //思想理论
    loadMore() {
      this.$router.push({
        path: `/news/sixianglilun`,
        params: { pathUrlP: "sixianglilun" },
      });
      // this.specialEducationData({typeCode: 'sixianglilun', pageNo: this.thoughtsAndTheoriesPage, pageSize: 10}, 'sixianglilun')
    },
  },
  filters: {
    formatData(value) {
      if (value.length && value.length > 5) {
        return value.substr(5, 5);
      } else {
        return value;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.advertising {
  width: 100%;
  img {
    width: 100%;
    border: none;
    display: block;
    height: 30px;
  }
}

.specialEducation {
  margin: 0.6399rem auto;
  font-size: 0.5rem;
}

/* 轮播 */
.swipe {
  width: 100%;
  height: 4.26rem;
  .swipe-item {
    width: 100%;
    /*height: 4.26rem;*/
    .swipe-img {
      width: 100%;
      /*height: 4.26rem;*/
      object-fit: cover;
    }
  }
}

/*  轮播下列表数据 */
.link {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.48rem;
}

.link:first-child {
  padding-top: 0.05rem;
}

.link:last-child {
  margin-bottom: 0.4rem;
}

.overflow-ellipsis {
  font-size: 0.37rem;
  width: 80%;
  color: #323333;
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
    max-width: 100px;
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
