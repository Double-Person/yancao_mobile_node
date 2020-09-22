<template>
  <div>
    <mob-head/>
    <nav-bar/>
    <crumbs :crumbs="crumbs"/>
    <div class="widths">
      <div class="nav-title">党的建设</div>
      <ul>
        <li v-for="(item, index) in link" class="link" @click="newsInfo(item.id)">
          <div class="tuijian" v-if="item.topSortNum != 99999">荐</div>
          <div class="overflow-ellipsis">{{item.title}}</div>
          <div class="time">{{item.publishDate | myData}}</div>
        </li>
      </ul>
      <load-more-btn v-if="total != link.length" @click.native="loadMoreData" style=""/>
    </div>
    <mob-footer/>
  </div>
</template>

<script>
  import {sysArticleActiveList,addLog} from "@/api/request";
  import {myData} from "@/assets/js/globalFilter";
  import MobHead from "@/components/control/mobHead/MobHead";
  import NavBar from "@/components/control/navBar/NavBar";
  import Crumbs from "@/components/control/crumbs/Crumbs";
  import MobFooter from "@/components/control/mobFooter/MobFooter";
  import LoadMoreBtn from "@/components/control/loadMoreBtn/LoadMoreBtn";
  import { LOGLIST } from "@/assets/js/constant";

  export default {
    name: "PartyBuilding",
    components: {LoadMoreBtn, MobFooter, Crumbs, NavBar, MobHead},
    data() {
      return {
        crumbs: [
          {name: '首页', path: '/home'},
          {name: '党的建设', path: ''}
        ], 
        link: [],
        total: 0,
        pageNo: 1
      }
    },
    created() {
      this.firstLoad({typeCode: 'dangdejianshe', pageNo: this.pageNo, pageSize: 10})
      addLog({
          columnTypeCode:LOGLIST.SYLM,
          subColumnTypeCode:`${LOGLIST.SYLM}_dangdejianshe`
        })
    },
    methods: {
      firstLoad(data) {
        sysArticleActiveList(data).then(res => {
          // console.log(res);
          if (res.code == 0 || res.code == 200) {
            if (this.pageNo == 1) {
              this.link = res.result.records
              this.total = res.result.total
              this.pageNo++
            } else {
              this.link.push(...res.result.records)
              this.pageNo++
            }
          }
        })
      },
      loadMoreData() {
        this.firstLoad({typeCode: 'dangdejianshe', pageNo: this.pageNo, pageSize: 10})
      },
      newsInfo(id){
        // this.$router.push({name:'partyBuildingDetial',query:{id,typeCode: 'dangdejianshe'}})
        let routeUrl = this.$router.resolve({
          name: 'partyBuildingDetial',
          query: {id,typeCode: 'dangdejianshe'}
        })
        window.open(routeUrl.href, '_blank')
      }
    }
  }
</script>

<style scoped>
  .partyBuilding {
    margin: .6399rem auto;
    font-size: .5rem;
  }

  .link {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: .48rem;
  }

  .link:first-child {
    padding-top: .05rem;
  }

  .link:last-child {
    margin-bottom: 1.5rem;
  }

  .overflow-ellipsis {
    font-size: .37rem;
    width: 80%;
    color: #323333;
  }
</style>
