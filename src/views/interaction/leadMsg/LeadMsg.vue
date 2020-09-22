<template>
  <div>
    <mob-head/>
    <nav-bar/>
    <crumbs :crumbs="crumbs"/>
    <MyLiJumpPage :my-li="myLi" nav-title="领导信箱"/>
    <router-view/>
    <mob-footer/>

  </div>
</template>

<script>
  import MyLiJumpPage from "@/components/control/myLiJumpPage/MyLiJumpPage";
  import MobHead from "@/components/control/mobHead/MobHead";
  import NavBar from "@/components/control/navBar/NavBar";
  import Crumbs from "@/components/control/crumbs/Crumbs";
  import MobFooter from "@/components/control/mobFooter/MobFooter";
  export default {
    name: "LeadMsg",
    components: {MobFooter, Crumbs, NavBar, MobHead, MyLiJumpPage},
    data() {
      return {
        crumbs:[
          {name:'互动交流',path:'/interaction'},
          {name:'领导信箱',path:'/interaction/leadmsg'}
        ],
        myLi: [
          {title: '我要写信', name: 'WriteMsg'},
          {title: '回复列表', name: 'WriteBackList'},
          {title: '办件查询', name: 'HandelQuery'},
        ]
      }
    }
  }
</script>

<style scoped>

</style>