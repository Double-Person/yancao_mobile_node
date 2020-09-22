<template>
  <div>
    <mob-head/>
    <crumbs :crumbs="crumbs"/>
    <div class="widths">
      <h1 class="nav-title">使用帮助</h1>
      <ul>
        <li v-for="item in lists" @click="helpInfo(item.id)">{{item.title}}</li>
      </ul>
      <load-more-btn @click.native="loadMore"/>
    </div>
    <mob-footer/>
  </div>
</template>

<script>
  import PubSub from 'pubsub-js'
  import {activeList} from "@/api/request";
  import MobHead from "@/components/control/mobHead/MobHead";
  import Crumbs from "@/components/control/crumbs/Crumbs";
  import LoadMoreBtn from "../../loadMoreBtn/LoadMoreBtn";
  import MobFooter from "../MobFooter";


  export default {
    name: "Help",
    components: {MobFooter, LoadMoreBtn, Crumbs, MobHead},
    data() {
      return {
        hasData:true,
        crumbs: [
          {name: '首页', path: '/home'},
          {name: '使用帮助', path: ''}
        ],
        lists:[],
        currentPages:1
      }
    },
    created(){
      this.loadMore()
    },
    methods:{
      loadMore() {
        if(!this.hasData){
          return false
        }
        activeList({pageNo:this.currentPages,pageSize:10,typeCode:'shiyongbangzhu'}).then(res => {
          if (res.code == 0 || res.code == 200) {
            if(res.result.records.length){
              this.currentPages +=1
              this.lists.push(...res.result.records)
            }else {
              this.hasData = false
              this.$toast('没有更多数据了');
              PubSub.publish('noData','noData')
            }

          }
        })
      },
      helpInfo(id){
        this.$router.push({path:'/home/tabsinfo',query:{id,title:'help'}})
      }
    }
  }
</script>

<style lang="less" scoped>
ul{
  li{
    color: #323333;
    font-size: .43rem;
    line-height: .58rem;
    padding: .43rem 0 .64rem 0;
    border-bottom: #F2F3F5 solid .0266rem;
  }
  li:last-child{
    border-bottom: none;
  }
}
</style>