<template>
  <div>
    <mob-head/>
    <nav-bar/>
    <crumbs :crumbs="crumbs"/>
    <my-li-jump-page navTitle="公共服务" :myLi="myLi"/>
    <mob-footer/>
  </div>
</template>

<script>
  import MobHead from "@/components/control/mobHead/MobHead";
  import NavBar from "@/components/control/navBar/NavBar";
  import Crumbs from "@/components/control/crumbs/Crumbs";
  import MyLiJumpPage from "@/components/control/myLiJumpPage/MyLiJumpPage";
  import MobFooter from "@/components/control/mobFooter/MobFooter";
  export default {
    name: "CommonService",//公共服务
    components: {MobFooter, MyLiJumpPage, Crumbs, NavBar, MobHead},
    data(){
      return{
        crumbs: [
          {name: '办事服务', path: '/businessservices'},
          {name: '公共服务', path: ''}
        ],
        myLi:[
          {title:'零售户订货',path:'',outLine:'http://www.xinshangmeng.com/xsm2/?Version=2019121400'},
          {title:'直营店查询',name:'ServiceNavigation'},
          {title:'真假烟识别',name:'TrueAndFalseSmoke',id:'zhenjiayanshibie'},
          {title:'烟草农业',name:'TrueAndFalseSmoke',id:'yancaofuwu'},
          {title:'诚至诚商务',path:'/error',id:''},
        ]
      }
    }
  }
</script>

<style scoped>

</style>
