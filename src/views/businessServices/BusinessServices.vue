<template>
  <div>
    <mob-head/>
    <nav-bar/>
    <my-li-jump-page navTitle="办事服务" :myLi="myLi"/>
    <router-view/>

    <mob-footer/>
  </div>
</template>

<script>
  import MobHead from "../../components/control/mobHead/MobHead";
  import NavBar from "../../components/control/navBar/NavBar";
  import MyLiJumpPage from "../../components/control/myLiJumpPage/MyLiJumpPage";
  import MobFooter from "../../components/control/mobFooter/MobFooter";
  export default {
    name: "BusinessServices",
    components: {MobFooter, MyLiJumpPage, NavBar, MobHead},
    data(){
      return{
        myLi:[
          {title:'政务服务',name:'PublicService'},
          {title:'公共服务',name:'CommonService'},
          {title:'服务导航',name:'ServiceNavigation'},
        ]
      }
    }
  }
</script>

<style scoped>

</style>