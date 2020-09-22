<template>
  <div>
    <mob-head/>
    <nav-bar/>
    <crumbs :crumbs="crumbs"/>
    <div class="HandelInfo widths">
      <h1 class="nav-title-fina">办件详情</h1>
      <div class="title">{{handelInfo.title}}</div>
      <div class="number time">
        <div class="left">办件编号：{{handelInfo.code}}</div>
        <div class="right">提交时间：{{handelInfo.createTime}}</div>
      </div>

      <div class="content">
        {{handelInfo.content}}
      </div>

      <div class="handel margin-bottom">
        <p>处理回复</p>
        <div class="mar-top"><span class="width">处理情况：</span>{{handelInfo.solveStatus | solveStatus }}</div>
        <div class="mar-top"><span class="width">回复机构：</span>{{handelInfo.updateBy}}</div>
        <div class="mar-top"><span class="width">回复时间：</span>{{handelInfo.replyTime}}</div>
        <div class="mar-top handelContent">
          <div class="handelLeft">回复内容：</div>
          <div class="handelRight">
            {{ handelInfo.replyContent}}
          </div>
        </div>

      </div>

    </div>
    <mob-footer/>
  </div>
</template>

<script>
  import {mobileConsult,letterInfo} from "@/api/request";
  import MobHead from "@/components/control/mobHead/MobHead";
  import NavBar from "@/components/control/navBar/NavBar";
  import Crumbs from "@/components/control/crumbs/Crumbs";
  import MobFooter from "@/components/control/mobFooter/MobFooter";
  export default {
    name: "SubmitQueryInfo",
    components: {MobFooter, Crumbs, NavBar, MobHead},

    data(){
      return{
        handelInfo:{},
        crumbs:[
            {name:'互动交流',path:'/interaction'},
            {name:'办件详情',path:''}
        ]
      }
    },
    created(){

      if(this.$route.params.id == 'leadmsg'){
        this.crumbs = [
          {name:'互动交流',path:'/interaction'},
          {name:'领导信箱',path:'/interaction/leadmsg'},
          {name:'办件查询',path:'/interaction/handelquery'},
          {name:'办件详情',path:''}
        ]
      }

      if(this.$route.query.falg== "leadmsg"){
        this.leadInfo()
      }else {
        this.firstLoad()
      }
    },
    methods:{
      //  咨询服务于举报投诉的查看详细信息
      firstLoad(){//consultList
        mobileConsult(this.$route.query.id).then(res=>{
          this.handelInfo = res.result
        })
      },
      //  通过领导信箱查询详细信息
      leadInfo(){
        letterInfo(this.$route.query.id).then(res=>{
          this.handelInfo = res.result
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  .HandelInfo {
    margin: 0 auto;
    .nav-title-fina{
      margin: .64rem auto;
    }
    .title {
      font-size: .43rem;
      line-height: .58666rem;
      margin-bottom: .3733rem;
    }
    .number {
      display: flex;
      justify-content: space-between;
      line-height: .32rem;
    }
    .content{
      font-size: .37rem;
      color: #4E4E4E;
      line-height: .64rem;
      margin: .42rem auto;
      padding: .32rem 0;
      border-bottom: .02666rem solid #F2F3F5;
      border-top: .02666rem solid #F2F3F5;
    }
    /* 下载附件start */
    .attachment{
      border-bottom: .02666rem solid #F2F3F5;
      padding-bottom: .5rem;
      p{
        font-size: .37rem;
      }
      .attachment-name{
        background: #F2F3F5;
        font-size: .32rem;
        height: .8rem;
        line-height: .8rem;
        display: flex;
        span{
          padding: 0 .5rem;
        }
        .name{
          width: 66%;
        }
        .download{
          color: #235399;
        }
      }
    }
    /* 下载附件end */
    .handel{
      margin-top: .42rem;
      font-size: .37rem;
      .mar-top{
        margin-top: .42rem;
      }
      p{
        font-size: .37rem;
      }
      .width{
        width: 23%;
        color: #979899;
        display: inline-block;
      }
      .handelContent{
        display: flex;
        .handelLeft{
          color: #979899;
          width: 23%;
        }
        .handelRight{
          width: 77%;
          line-height: .63999rem;
          color: #323333;
          margin-top: -.1rem;
        }
      }
    }

  }
</style>