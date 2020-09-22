<template>
  <div>
    <mob-head/>
    <nav-bar/>
    <crumbs :crumbs="crumbs"/>
    <div class="widths"><h1 class="nav-title">回复列表</h1></div>
    <div class="WriteBackList widths">
      <ul>
        <li v-for="list in lists">
          <div class="list">
            <div class="result">{{list.solveStatus | solveStatus}}</div>
            <div class="time">{{list.updateTime | myData}}</div>
          </div>
          <div class="title" @click="jumpHandelInfo(list.id)">{{list.topic}}</div>
        </li>
      </ul>
      <load-more-btn @click.native="loadMore"/>
    </div>
    <mob-footer/>
  </div>
</template>

<script>
  import PubSub from 'pubsub-js'
  import {myData,solveStatus} from "@/assets/js/globalFilter";
  import MobHead from "@/components/control/mobHead/MobHead";
  import NavBar from "@/components/control/navBar/NavBar";
  import Crumbs from "@/components/control/crumbs/Crumbs";
  import MobFooter from "@/components/control/mobFooter/MobFooter";
  import LoadMoreBtn from "@/components/control/loadMoreBtn/LoadMoreBtn";
  import {letterList} from "@/api/request";



  export default {
    name: "WriteBackList",
    components: {LoadMoreBtn, MobFooter, Crumbs, NavBar, MobHead},
    data() {
      return {
        hasData:true,
        crumbs: [
          {name: '互动交流', path: '/interaction'},
          {name: '领导信箱', path: '/interaction/leadmsg'},
          {name: '回复列表', path: '/interaction/writebacklist'},
        ],
        lists: [],
        currentPages:1
      }
    },
    created() {
      this.loadMore()
    },
    methods: {
      loadMore() {
        if(!this.hasData){
          return false
        }
        letterList({pageNo:this.currentPages,pageSize:5,cxCode:'',code:''}).then(res => {
          if (res.code == 0 || res.code == 200) {
            if (res.result.records.length) {
              this.currentPages += 1
              this.lists.push(...res.result.records)
            } else {
              this.hasData = false
              this.$toast('没有更多数据了');
              PubSub.publish('noData','noData')

            }
          }

        })
      },
      jumpHandelInfo(id) {
        // this.$router.push({name: 'HandelInfo', query: {id}})
        let routeUrl = this.$router.resolve({
          name: 'HandelInfo',
          query: {id}
        })
        window.open(routeUrl.href, '_blank')
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
