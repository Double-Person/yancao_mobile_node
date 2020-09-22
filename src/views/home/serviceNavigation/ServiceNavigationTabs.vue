<template>
  <div class="ServiceNavigationTabs">
    <mob-head/>
    <crumbs :crumbs="crumbs"/>
    <div class="widths">
      <!--{{titleType}}-->
      <div v-if="titleType=='直营店查询'">
        <Store :search="checkCity"/> <!-- &type=2  直营店查询  -->
      </div>

      <div v-else>
        <Retail :search="checkCity"/> <!-- &type=1  零售办理许可  -->
      </div>


      <!--<van-tabs v-model="active" swipeable @click="clickTabs">-->
        <!--<van-tab v-for="(item,index) in titleList" :key="index" :title="item">-->
          <!--<div v-if="item == '零售许可证办理点'">-->
            <!--<Retail :search="checkCity"/>-->
          <!--</div>-->
          <!--<div v-else>-->
            <!--<Store :search="checkCity"/>-->
          <!--</div>-->
        <!--</van-tab>-->
      <!--</van-tabs>-->
    </div>
    <mob-footer/>
  </div>
</template>

<script>
  import PubSub from 'pubsub-js'
  import {navigationList} from "@/api/request";
  import MobHead from "@/components/control/mobHead/MobHead";
  import Crumbs from "@/components/control/crumbs/Crumbs";
  import MobFooter from "@/components/control/mobFooter/MobFooter";
  import Retail from "./Retail";
  import Store from "./Store";
  export default {
    name: "ServiceNavigationTabs",
    components: {Store, Retail, MobFooter, Crumbs, MobHead},
    data(){
      return{
        checkCity:'',
        active:'',
        titleList:['零售许可证办理点','直营店列表'],
        crumbs:[],
        titleType:''
      }
    },
    created(){
      this.checkCity = this.$route.query.cityName;
      let title = this.$route.query.title;
      console.log(title);
      this.titleType = (title=='直营店查询'?'直营店查询':'服务导航');
      this.crumbs = [
        {name: '办事服务', path: '/businessservices'},
        {name: this.titleType, path: '/home/servicenavigation?getTitle='+title},
        {name: this.checkCity, path: ''}
      ]
    },
    methods:{
      clickTabs(name,title){

        if(name ==0){
          PubSub.publish('clickTypeLeft',this.checkCity)
        }else {
          PubSub.publish('clickType',this.checkCity)
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  /deep/ .van-tabs__line {
    /*background-color: #235399;*/
    background-color: #ebedf0;
    border-radius: 0;
    height: 0;
  }

  & /deep/ .van-tab {
      color: #323333;
      font-size: .37rem;
    }

  & /deep/ .van-tab--active {
    /deep/ .van-ellipsis{
      display: inline-block;
      height: 1.07rem;
      border-bottom: #235399 solid .05333rem !important;
    }
  }

</style>
