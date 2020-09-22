<template>
  <div class="items">
    <div v-for="item in list" class="items-item">
      <div class="names">{{item.name}}</div>
      <div class="item">
        <div class="left">
          <span>地</span>
          <span>址</span>
        </div>
        <div class="center">:</div>
        <div class="right">{{item.address}}</div>
      </div>
      <div class="item">
        <div class="left">
          <span>电</span>
          <span>话</span>
        </div>
        <div class="center">:</div>
        <div class="right">{{item.tel}}</div>
      </div>
      <div class="item">
        <div class="left">
          <span>工</span>
          <span>作</span>
          <span>时</span>
          <span>间</span>
        </div>
        <div class="center">:</div>
        <div class="right workTime">{{item.workTime}}</div>
      </div>
      <div class="item">
        <div class="left">
          <span>备</span>
          <span>注</span>
        </div>
        <div class="center">:</div>
        <div class="right">{{item.remark}}</div>
      </div>
    </div>

    <load-more-btn @click.native="loadMore()" v-show="haveData" />
    <div v-show="!haveData" class="noData">
      <!--<img src="../search/images/pic_search_nothing.svg"/>-->
      <!--<p>暂无数据</p>-->
      <no-data />
    </div>
  </div>
</template>

<script>
import PubSub from "pubsub-js";
import { navigationList, addLog } from "@/api/request";
import NoData from "@/components/control/noData/NoData";
import LoadMoreBtn from "@/components/control/loadMoreBtn/LoadMoreBtn";
import { LOGLIST } from "@/assets/js/constant";
export default {
  name: "Store",
  components: { LoadMoreBtn, NoData },
  props: ["search"],
  data() {
    return {
      list: [],
      currentPage: 1,
      haveData: false
    };
  },
  created() {
    this.loadMore();
    addLog({
      columnTypeCode: LOGLIST.BSFW,
      subColumnTypeCode: `bsfw_zhiyingdian`
    });
    // navigationList({cityName:this.search,pageNo:1,pageSize:5,type:2}).then(res=>{
    //   this.list = res.result.records;
    //   this.haveData = res.result.records.length>0 ?true:false;
    //   // console.log('直营店查询  2 -',this.list);
    // })
  },
  methods: {
    loadMore() {
      navigationList({
        cityName: this.search,
        pageNo: this.currentPage,
        pageSize: 5,
        type: 2
      }).then(res => {
        console.log(res.success);
        if (res.success) {
          if (res.result.records.length == 0) {
            this.$toast("没有更多数据了");
            return false;
          }
          if (this.currentPage == 1) {
            this.list = res.result.records;
            this.haveData = res.result.records.length > 0 ? true : false;
          } else {
            this.list.push(...res.result.records);
          }
          this.currentPage += 1;
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.items {
  .items-item {
    margin-bottom: 0.586rem;
  }
  .names {
    opacity: 1;
    font-size: 0.43rem;
    font-family: PingFangSC;
    font-weight: 500;
    color: #323333;
    line-height: 0.43rem;
    margin: 0.69333rem auto 0.1599rem auto;
  }
  .item {
    display: flex;
    padding: 0.266rem 0;
    font-size: 0.37rem;
    .left {
      color: #979899;
      width: 21%;
      display: flex;
      justify-content: space-between;
    }
    .center {
      width: 3%;
      text-align: center;
    }
    .right {
      width: 76%;
    }
    .workTime {
      margin-top: -0.05rem;
    }
    .right:last-child {
      line-height: 0.43rem;
      margin-top: -0.05rem;
    }
  }

  .noData {
    text-align: center;
    font-size: 0.43rem;
    color: #656566;
    margin: 1.5rem auto;
    p {
      margin-top: 0.8rem;
    }
  }
}
</style>
