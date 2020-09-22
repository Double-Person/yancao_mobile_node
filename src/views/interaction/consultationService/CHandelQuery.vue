<template>
  <div>
    <mob-head/>
    <nav-bar/>
    <crumbs :crumbs="crumbs"/>
    <div class="HandelQuery widths">
      <h1 class="nav-title">办件查询</h1>
      <van-field v-model="code" type="text" label="办件编号" placeholder="请输入办件编号" />
      <van-field v-model="cxCode" type="text" label="查询码" placeholder="请输入查询码" />

      <button class="submit" @click="searchLetter">提交</button>
    </div>
    <mob-footer/>
  </div>

</template>

<script>
  import MobHead from "@/components/control/mobHead/MobHead";
  import NavBar from "@/components/control/navBar/NavBar";
  import Crumbs from "@/components/control/crumbs/Crumbs";
  import MobFooter from "@/components/control/mobFooter/MobFooter";

  import {letterList} from "@/api/request";

  export default {
    name: "CHandelQuery",
    components: {MobFooter, Crumbs, NavBar, MobHead},
    data(){
      return{
        crumbs:[
          {name: '互动交流', path: '/interaction'},
          {name: '咨询服务', path: '/interaction/consultationservice'},
          {name:'办件查询',path:'/interaction/chandelquery'}
        ],
        code:'',
        cxCode:''
      }
    },
    methods:{
      searchLetter(){
        this.$router.push({path:'/interaction/submitquerylist',query:{
            code:this.code,
            cxCode:this.cxCode
          }})
      }
    }
  }
</script>

<style scoped>
  .HandelQuery{
    margin: 0 auto;
  }
  .submit {
    margin: 1rem auto;
    background: #245399;
    width: 100%;
    color: #fff;
    border-radius: 1rem;
    height: 1.2rem;
    line-height: 1.2rem;
    font-size: .43rem;
    border: none;
  }
</style>