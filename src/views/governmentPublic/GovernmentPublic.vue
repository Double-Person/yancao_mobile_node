
<template>
  <div>
    <mob-head/>
    <nav-bar/>
    <!-- 采购公开结果 -->
      <my-li-jump-page navTitle="政务公开" :myLi="myLi"/>

    <mob-footer/>
  </div>
</template>

<script>
  import MobHead from "@/components/control/mobHead/MobHead";
  import NavBar from "@/components/control/navBar/NavBar";
  import MyLiJumpPage from "@/components/control/myLiJumpPage/MyLiJumpPage";
  import MobFooter from "@/components/control/mobFooter/MobFooter";
  //
  export default {
    name: "OpenProcurementResults",
    components: {MobFooter, MyLiJumpPage, NavBar, MobHead},
    data() {
      return {
        myLi:[
          {title:'公示公告',name:'OpenProcurementResults',id:'gongshigonggao'},
          {title:'信息公开',path:'/governmentpublic/discloseinformation',id:'openInfo'},//openInfo  ---有下级菜单 跳转DiscloseInformation
          {title:'采购结果公开',name:'OpenProcurementResults',id:'caigoujieguogongkai'},
          {title:'法律法规',name:'OpenProcurementResults',id:'falvfagui'},
          {title:'政策解读',name:'OpenProcurementResults',id:'zhengcejiedu'},
          {title:'数据统计',name:'OpenProcurementResults',id:'shujufabu'},
          // {title:'数据统计',path:'/home/servicenavigation?id=&getTitle=服务导航',id:'shujufabu'},
          // {title:'权力清单',path:'/governmentpublic/discloseinformation',id:'rightList'},//rightList  ---有下级菜单 跳转DiscloseInformation
          // {title:'办件公示',name:'OpenProcurementResults',id:'banjiangongshi'},
        ]
      }
    },

  }
</script>

<style lang="less" scoped>
  .content {
    margin: 0 auto;
    li{
      border-bottom: #999 solid 1px;

      .overflow-ellipsis {
        font-size: .43rem;
        margin: .5rem 0 .3rem 0;
      }
      .time{
        margin-bottom: .4rem;
      }
    }

  }

</style>
