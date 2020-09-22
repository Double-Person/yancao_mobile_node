<template>
  <div>
    <mob-head/>
    <nav-bar/>
    <crumbs :crumbs="crumbs"/>
    <my-li-jump-page navTitle="政务服务" :myLi="myLi"/>
    <mob-footer/>
  </div>
</template>

<script>
  import MyLiJumpPage from "@/components/control/myLiJumpPage/MyLiJumpPage";
  import Crumbs from "@/components/control/crumbs/Crumbs";
  import MobHead from "@/components/control/mobHead/MobHead";
  import NavBar from "@/components/control/navBar/NavBar";
  import MobFooter from "@/components/control/mobFooter/MobFooter";
  export default {
    name: "PublicService",//政务服务
    components: {MobFooter, NavBar, MobHead, Crumbs, MyLiJumpPage},
    data(){
      return{
        crumbs:[
          {name:'办事服务',path:'/businessservices'},
          {name:'政务服务',path:'/businessservices/publicservice'},
        ],
        myLi:[
          {title:'服务指南',name:'TrueAndFalseSmoke',id:'fuwuzhinan'},
          {title:'在线办证',name:'',outLine:'https://zwfwdt.tobacco.gov.cn/cooperativeWeb/event/tab'},
          {title:'办件公示',name:'',outLine:'https://zwfwdt.tobacco.gov.cn/cooperativeWeb/event/tab'},
          {title:'办证查询',name:'',outLine:'https://zwfwdt.tobacco.gov.cn/cooperativeWeb/event/tab'},

          // {title:'权力清单',name:'',outLine:'http://www.sczwfw.gov.cn/app/scworkguide/detail?id=3951292303922225152&shardKey=5100'},
          {title:'权力清单',onlyPath:'/governmentpublic/discloseinformation?type=rightList'},
          ///   {title:'数据统计',path:'/home/servicenavigation?id=&getTitle=服务导航',id:'shujufabu'},
          {title:'专卖公示',name:'TrueAndFalseSmoke',id:'zhuanmaigongshi'},
          {title:'办事统计',name:'TrueAndFalseSmoke',id:'banshitongji'},

        ]
      }
    },
    mounted(){
      // console.log(this.$route.params.id);
    }
  }
</script>

<style scoped>

</style>
