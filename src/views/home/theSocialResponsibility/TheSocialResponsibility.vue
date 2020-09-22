<template>
  <div>
    <mob-head/>
    <nav-bar/>
    <crumbs :crumbs="crumbs"/>
    <div class="widths">
      <div class="partyBuilding">社会责任</div>
      <ul>
        <li v-for="(item, index) in link" class="link" @click="newsInfo(item.id)">
          <div class="tuijian" v-if="item.topSortNum != 99999">荐</div>
          <div class="overflow-ellipsis">{{item.title}}</div>
          <div class="time">{{item.publishDate | myData}}</div>
        </li>
      </ul>
      <load-more-btn v-if="total != link.length" @click.native="loadMoreData"/>
    </div>
    <mob-footer/>
  </div>
</template>

<script>
  import {activeList,addLog} from "@/api/request";
  import {myData} from "@/assets/js/globalFilter";
  import MobHead from "@/components/control/mobHead/MobHead";
  import NavBar from "@/components/control/navBar/NavBar";
  import Crumbs from "@/components/control/crumbs/Crumbs";
  import LoadMoreBtn from "@/components/control/loadMoreBtn/LoadMoreBtn";
  import MobFooter from "@/components/control/mobFooter/MobFooter";
  import { LOGLIST } from "@/assets/js/constant";

  export default {
    name: "TheSocialResponsibility",//社会责任
    components: {MobFooter, LoadMoreBtn, Crumbs, NavBar, MobHead},
    data() {
      return {
        crumbs: [
          {name: '首页', path: '/home'},
          {name: '社会责任', path: ''}
        ],
        link: [],
        total: 0,
        linkPage:1,
      }
    },
    created(){
      this.firstLoad({typeCode: 'shehuizeren', pageNo: this.linkPage, pageSize: 10})
      addLog({
          columnTypeCode:LOGLIST.SYLM,
          subColumnTypeCode:`${LOGLIST.SYLM}_shehuizeren`
        })
    },
    methods: {
      firstLoad(datas){
        activeList(datas).then(res=>{
          if (res.code == 200 || res.code == 0) {
            if(datas.pageNo==1){
              this.link = res.result.records;
              this.linkPage++;
              this.total = res.result.total
            }else {
              this.link.push(...res.result.records);
              this.linkPage++;
              this.total = res.result.total
            }
          }
        })
      },
      loadMoreData() {
        this.firstLoad({typeCode: 'shehuizeren', pageNo: this.linkPage, pageSize: 10})
      },
      newsInfo(id) {
        // this.$router.push({name:'TheSocialResponsibilityDetial',query:{id,typeCode: 'shehuizeren'}})
        let routeUrl = this.$router.resolve({
          name:'TheSocialResponsibilityDetial',
          query:{id,typeCode: 'shehuizeren'}
        })
        window.open(routeUrl.href, '_blank')
      },
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
