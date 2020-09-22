<template>
  <div class="reportComplaints">
    <mob-head/>
    <nav-bar/>
    <crumbs :crumbs="crumbs"/>
    <div class="widths">
      <my-li-jump-page nav-title="举报投诉" :my-li="myLi"/>
      <router-view/>
    </div>
    <mob-footer/>
  </div>
</template>

<script>
  import MyLiJumpPage from "@/components/control/myLiJumpPage/MyLiJumpPage";
  import MobHead from "@/components/control/mobHead/MobHead";
  import Crumbs from "@/components/control/crumbs/Crumbs";
  import MobFooter from "@/components/control/mobFooter/MobFooter";
  import NavBar from "@/components/control/navBar/NavBar";
  export default {
    name: "ReportComplaints",
    components: {NavBar, MobFooter, Crumbs, MobHead, MyLiJumpPage},
    data(){
      return{
        crumbs:[
          {name:'互动交流',path:'/interaction'},
          {name:'举报投诉',path:'/interaction/reportcomplaints'},
        ],
        myLi: [
          {title: '我要投诉', name: 'HaveComplaint'},
          {title: '回复列表', name: 'ReportReplyToList'},
          {title: '办件查询', name: 'ReportToRunAQuery'},
        ]
      }
    }
  }
</script>

<style scoped>
.reportComplaints{
  margin: 0 auto;
}
</style>