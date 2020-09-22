<template>
  <div>
    <mob-head/>
    <nav-bar/>
    <crumbs :crumbs="crumbs"/>
    <div class="widths margin-bottom">
      <!--<h1 class="nav-title" v-html="info.title"></h1>-->
      <van-field
          class="nav-title"
          v-model="info.title"
          rows="1"
          autosize
          type="textarea"
          input-align="center"
          :border="false"
      />
      <div class="time">发布时间:{{info.createTime}}</div>
      <div class="content" v-html="info.content"></div>
    </div>
    <mob-footer/>
  </div>
</template>

<script>
  import {queryById} from "@/api/request";
  import MobHead from "@/components/control/mobHead/MobHead";
  import NavBar from "@/components/control/navBar/NavBar";
  import Crumbs from "@/components/control/crumbs/Crumbs";
  import MobFooter from "@/components/control/mobFooter/MobFooter";

  export default {
    name: "DepartmentResponsibilityInfo",//部门职责詳情
    components: {MobFooter, Crumbs, NavBar, MobHead},
    data(){
      return{
        crumbs:[
          {name:'川烟概况',path:'/sichuansmokesituation'},
          {name:'部门职责',path:'/sichuansmokesituation/departmentresponsibility'},
          {name:'部门职责详情',path:'/sichuansmokesituation/departmentresponsibility/departmentresponsibilityinfo'},
        ],
        info:{}
      }
    },
    created(){
      this.getInfo({id:this.$route.query.id,typeCode: 'bumenzhize'})
    },
    methods:{
     async getInfo(id,typeCode){
       let res = await queryById(id,typeCode)
       this.info = res.result
     }
    }

  }
</script>

<style scoped>
  .content {
    color: #323333;
    font-size: .43rem;
    line-height: 1.5;
    margin: .5rem auto 1rem auto;
    text-indent: 2em;
  }

</style>
