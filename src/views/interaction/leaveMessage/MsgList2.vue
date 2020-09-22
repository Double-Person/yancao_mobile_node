<template>
  <div class="statics-list">
    <ul class="list-ul">
      <li
        class="list-li"
        v-for="(item, index) in listData"
        @click="gotoDetails(item.id)"
        :key="index"
      >
        <div class="widths">
          <div class="title">
            <span class="title-overflow overflow-ellipsis" style="margin:0">{{item.title}}</span>
          </div>
          <div class="time">{{item.createTime | myData}}</div>
        </div>
      </li>
    </ul>

    <load-more-btn v-if="listData.length" @click.native="getDataList" />

    <div class="nothing" v-if="!listData.length">
      <img class="nothing-icon" src="../../../assets/img/pic_search_nothing.svg" />
      <p class="nothing-text">暂无数据</p>
    </div>
  </div>
</template>

<script>
import PubSub from "pubsub-js";
import LoadMoreBtn from "@/components/control/loadMoreBtn/LoadMoreBtn";
import { leaveMesList2 } from "@/api/request";

export default {
  name: "MsgList",
  data() {
    return {
      currentPage: 1,
      listData: []
    };
  },
  components: { LoadMoreBtn },
  filters: {
    typeName(val) {
      if (val == "TS") {
        return "投诉";
      } else if (val == "ZX") {
        return "咨询";
      } else if (val == "JY") {
        return "建议";
      } else if (val == "JB") {
        return "举报";
      } else {
        return val;
      }
    }
  },
  mounted() {
    this.getDataList()
    PubSub.subscribe("upDate", (msg, data) => {
      this.getDataList()
    });
  },
  methods: {
    /**
     * 跳转详情页面
     * @param id
     */
    gotoDetails(id) {
      // this.$router.push({ name: "HandelInfo", query: { id } });
      // let routeUrl = this.$router.resolve({
      //   name: 'HandelInfo',
      //   query: {id}
      // })
      // window.open(routeUrl.href, '_blank')

      let routeUrl = this.$router.resolve({
        path: "/home/tabsinfo",
        query: { id: id, title: '留言统计' },
      });
      window.open(routeUrl.href, "_blank");
    },
    noData() {
      PubSub.publish("noData", "noData");
    },
    async getDataList() {
      let res = await leaveMesList2({ pageNo: this.currentPage, pageSize: 5, typeCode: 'liuyantongji' });
      if (res.code == 0 || res.code == 200) {
        if (this.currentPage == 1) {
          this.listData = res.result.records;
          this.currentPage += 1;
        } else {
          if (res.result.records.length) {
            this.listData.push(...res.result.records);
            this.currentPage += 1;
          } else {
            this.noData();
          }
        }
      }
    }
  }
};
</script>

<style lang="less" scoped>
* {
  /*ios，如果不行可以加一个透明遮罩层*/
  -webkit-touch-callout: none;
  touch-callout: none;
  /*安卓*/
  -webkit-user-select: none;
  user-select: none;
}
.statics-list {
  padding: 8px 0 0 0;
  .list-ul {
    .list-li {
      margin-top: 0.43rem;
      box-shadow: 0pt -0.0266rem 0pt 0pt #f2f3f5 inset;
      -webkit-touch-callout: none;
      -webkit-user-select: none;
      -khtml-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      &:first-child {
        margin-top: 0rem;
      }
      &:last-child {
        box-shadow: 0pt -0.0266rem 0pt 0pt #fff inset;
      }
      .title {
        display: flex;
        /*justify-content: space-between;*/
        align-items: baseline;
        .tag {
          flex-shrink: 0;
          height: 0.61rem;
          line-height: 0.61rem;
          background: #235399;
          padding: 0rem 0.16rem;
          font-size: 0.32rem;
          font-family: PingFangSC, PingFangSC-Medium;
          font-weight: 500;
          color: #ffffff;
        }
        .title-overflow {
          margin-left: 0.1333rem;
          font-size: 0.43rem;
        }
      }
      .content {
        height: 0.533rem;
        font-size: 0.3733rem;
        font-family: PingFangSC, PingFangSC-Regular;
        font-weight: 400;
        text-align: justify;
        color: #979899;
        line-height: 0.533rem;
        margin: 0.24rem auto 0.32rem auto;
      }
      .info {
        background: #f2f3f5;
        border-radius: 0.155rem;
        padding: 0.32rem 0.21333rem;
        font-weight: 400;
        font-family: PingFangSC, PingFangSC-Regular;
        .info-title {
          font-size: 0.32rem;
          text-align: justify;
          color: #323333;
          margin-bottom: 0.32rem;
        }
        .info-info {
          font-size: 0.37333rem;
          text-align: justify;
          color: #979899;
          line-height: 0.5333rem;
        }
      }
      .time {
        margin: 0.23999rem auto 0.15rem auto;
        padding-bottom: 0.43rem;
      }
    }
  }

  .nothing {
    text-align: center;
    .nothing-icon {
      width: 56px;
    }
    .nothing-text {
      margin: 29px 0 60px 0;
      font-size: 16px;
      color: #656566;
    }
  }
}
</style>
