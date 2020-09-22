<template>
    <div class="consultation-service">
      <mob-head/>
      <nav-bar/>
      <crumbs :crumbs="crumbs"/>
      <div class="widths">
        <my-li-jump-page nav-title="咨询服务" :my-li="myLi"/>
      </div>
      <mob-footer/>
    </div>
</template>

<script>
  import MobHead from "@/components/control/mobHead/MobHead";
  import NavBar from "@/components/control/navBar/NavBar";
  import Crumbs from "@/components/control/crumbs/Crumbs";
  import MobFooter from "@/components/control/mobFooter/MobFooter";
  import MyLiJumpPage from "@/components/control/myLiJumpPage/MyLiJumpPage";
  export default {
    name: "ConsultationService",//咨询服务
    components: {MyLiJumpPage, MobFooter, Crumbs, NavBar, MobHead},
    data(){
      return{
        crumbs:[
          {name:'互动交流',path:'/interaction'},
          {name:'咨询服务',path:'/interaction/consultationservice'},
        ],
        myLi: [
          {title: '咨询服务', name: 'ConsultationServiceItem'},
          {title: '回复列表', name: 'ReplyToList'},
          {title: '办件查询', name: 'CHandelQuery'},
        ]
      }
    }
  }
</script>

<style scoped>

</style>