<template>
  <div>
    <mob-head/>
    <nav-bar/>
    <crumbs :crumbs="crumbs"/>
    <div class="HandelQuery widths">
      <h1 class="nav-title">办件查询</h1>
      <van-field v-model="code" type="text" label="办件编号" placeholder="请输入办件编号" required/>
      <van-field v-model="cxCode" type="text" label="查询码" placeholder="请输入查询码" required/>

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
    name: "ToRunAQuery",
    props:['crumbs'],
    components: {MobFooter, Crumbs, NavBar, MobHead},
    data(){
      return{
        code:'',
        cxCode:''
      }
    },
    created(){
      console.log(this.$route);
    },
    methods:{
      searchLetter(){
        if(!this.code.trim()){
          this.$toast('办件编号不能为空')
          return false
        }
        if(!this.cxCode.trim()){
          this.$toast('查询码不能为空')
          return false
        }
        // letterList({code:this.code,cxCode:this.cxCode}).then(res=>{
        //   console.log(res);
        // })
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