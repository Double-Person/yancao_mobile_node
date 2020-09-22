<template>
  <div class="submitQueryList">
    <mob-head/>
    <nav-bar/>
    <crumbs :crumbs="crumbs"/>
    <div class="widths">
      <h1 class="nav-title">查询列表</h1>
      <div class="WriteBackList widths">
        <div v-if="lists.length">
          <ul>
            <li v-for="item in lists" @click="toSubmitQueryInfo(item.id)">
              <div class="list">
                <div class="result">{{item.code}}</div>
                <div class="time">{{item.updateTime | myData}}</div>
              </div>
              <div class="title">{{item.topic || item.title}}</div>
            </li>
          </ul>
          <load-more-btn @click.native="loadMore" v-if="lists.length>1"/>
        </div>
        <div v-else>
          <no-data/>
        </div>
      </div>
    </div>
    <mob-footer/>
  </div>
</template>

<script>
  import PubSub from 'pubsub-js'
  import {consultList, letterList} from "@/api/request";
  import MobHead from "@/components/control/mobHead/MobHead";
  import NavBar from "@/components/control/navBar/NavBar";
  import Crumbs from "@/components/control/crumbs/Crumbs";
  import MobFooter from "@/components/control/mobFooter/MobFooter";
  import NoData from "@/components/control/noData/NoData";
  import LoadMoreBtn from "@/components/control/loadMoreBtn/LoadMoreBtn";
  import {myData} from "@/assets/js/globalFilter";

  export default {
    beforeRouteEnter(to, from, next) {
      var test = from.fullPath +""
      next(vm => {
        vm.urls = test
      })
    },
    name: "SubmitQueryList",
    components: {LoadMoreBtn, NoData, MobFooter, Crumbs, NavBar, MobHead},
    data(){
      return {
        lists:[],
        currentPages:1,
        hasData:true,
        urls:'interaction',
        leadmsg:'',
      crumbs:[
        {name:'互动交流',path:'/interaction'},
        {name:'查询列表',path:''}
      ]
      }
    },
    mounted(){
      if(this.$route.params.id == 'leadmsg'){
        this.crumbs = [
          {name:'互动交流',path:'/interaction'},
          {name:'领导信箱',path:'/interaction/leadmsg'},
          {name:'办件查询',path:'/interaction/handelquery'},
          {name:'查询列表',path:''}
        ]
      }
     setTimeout(()=>{
       this.loadMore()
     },10)
    },
    methods:  {
      loadMore(){
        if(!this.hasData){
          return false
        }
        if(this.urls.indexOf('consultationservice')!=-1){// /interaction/consultationservice  咨询服务  LM078432858940
          consultList({type:2,pageNo:this.currentPages,pageSize:20,code:this.$route.query.code,cxCode:this.$route.query.cxCode}).then(res=>{
            if (res.code == 0 || res.code == 200) {
              this.leadmsg = ''
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
        }else if(this.urls.indexOf('reporttorunaquery')!=-1){ //  /interaction/reporttorunaquery   举报投诉  LM929479592139
          consultList({type:1,pageNo:this.currentPages,pageSize:20,code:this.$route.query.code,cxCode:this.$route.query.cxCode}).then(res=>{
            this.leadmsg = ''
            if (res.code == 0 || res.code == 200) {
              if (res.result.records.length) {
                this.currentPages += 1;
                console.log(this.currentPages);
                this.lists.push(...res.result.records)
              } else {
                this.hasData = false
                this.$toast('没有更多数据了');
                PubSub.publish('noData','noData')
              }
            }
          })
        }
        else if(this.urls.indexOf('handelquery')!=-1){ //  /interaction/handelquery   领导信箱  LM480857043608
          letterList({pageNo:this.currentPages,pageSize:15,code:this.$route.query.code,cxCode:this.$route.query.cxCode}).then(res=>{
            if (res.code == 0 || res.code == 200) {
              this.leadmsg = 'leadmsg'
              if (res.result.records.length) {
                this.currentPages += 1;
                console.log(this.currentPages);
                this.lists.push(...res.result.records)
              } else {
                this.hasData = false
                this.$toast('没有更多数据了');
                PubSub.publish('noData','noData')
              }
            }
          })
        }

      },
      toSubmitQueryInfo(id){
        // console.log(this.leadmsg)
        this.$router.push({path:'/interaction/submitqueryinfo',query:{id,falg:this.leadmsg},params:{id:this.leadmsg}})
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
