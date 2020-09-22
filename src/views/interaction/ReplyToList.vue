<template>
  <div>
    <mob-head/>
    <nav-bar/>
    <crumbs :crumbs="crumbs"/>
    <div class="WriteBackList widths">
      <h1 class="nav-title">回复列表</h1>
      <ul>
        <li v-for="list in lists" @click="jumpHandelInfo(list)">
          <div class="list">
            <div class="result">{{list.solveStatus | solveStatus}}</div>
            <div class="time">{{list.updateTime | myData}}</div>
          </div>
          <div class="title">{{list.title}}</div>
        </li>

      </ul>
      <load-more-btn @click.native="firstLoad"/>
    </div>
    <mob-footer/>
  </div>
</template>

<script>
  import PubSub from 'pubsub-js'
  import {solveStatus, myData} from "@/assets/js/globalFilter";
  import MobHead from "@/components/control/mobHead/MobHead";
  import NavBar from "@/components/control/navBar/NavBar";
  import Crumbs from "@/components/control/crumbs/Crumbs";
  import MobFooter from "@/components/control/mobFooter/MobFooter";
  import {consultList} from "@/api/request";
  import LoadMoreBtn from "@/components/control/loadMoreBtn/LoadMoreBtn";


  export default {
    name: "ReplyToList",
    components: {LoadMoreBtn, MobFooter, Crumbs, NavBar, MobHead},
    data() {
      return {
        hasData: true,
        crumbs: [
          {name: '互动交流', path: '/interaction'},
          {name: '咨询服务', path: '/interaction/consultationservice'},
          {name: '回复列表', path: '/interaction/writebacklist'},
        ],
        lists: [],
        currentPage: 1,
      }
    },
    created() {
      this.firstLoad()
    },
    methods: {
      firstLoad() {
        if (!this.hasData) {
          return false
        }
        consultList({pageNo: this.currentPage, pageSize: 5, type: 2}).then(res => {
          if (res.code == 0 || res.code == 200) {
            if (res.result.records.length) {
              this.currentPage += 1
              this.lists.push(...res.result.records)
            } else {
              this.hasData = false
              this.$toast('没有更多数据了');
              PubSub.publish('noData', 'noData')
            }
          }

        })
      },
      jumpHandelInfo(list) {
        this.$router.push({name: 'HandelInfoS', query: {list}})
      }
    }
  }
</script>

<style lang="less" scoped>
  .WriteBackList {
    margin: 0 auto;
    li {
      border-bottom: .02666rem solid #F2F3F5;
      /*margin-bottom: .5rem;*/
      .list {
        display: flex;
        justify-content: space-between;
        padding: .24rem 0;
        margin-top: .42rem;
        .result {
          font-size: .32rem;
          color: #235399;

        }
      }
      .title {
        font-size: .43rem;
        color: #323333;
        padding-bottom: .64rem;
        line-height: .5366rem;
        /*padding: .2rem 0 0.4rem 0;*/
      }
    }
    li:last-child {
      margin-bottom: .69rem;
      border-bottom: none;
    }
  }

</style>