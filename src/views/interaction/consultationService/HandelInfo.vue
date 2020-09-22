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

      <div class="accessoryBag" v-if="handelInfo.attachmentUrl">
        <div class="accessory">附件</div>
        <div class="accessoryInfo">
          <div class="accessoryName overflow-ellipsis">{{handelInfo.attachmentName}}</div>
          <div class="accessoryDownLoad"><a :href="handelInfo.attachmentUrl" target="_blank">下载</a></div>
        </div>
      </div>





      <div class="handel margin-bottom">
        <p>处理回复</p>
        <div class="mar-top"><span class="width">处理情况：</span>{{handelInfo.solveStatus | solveStatus }}</div>
        <div class="mar-top"><span class="width">回复机构：</span>{{handelInfo.updateBy}}</div>
        <div class="mar-top"><span class="width">回复时间：</span>{{handelInfo.solveTime}}</div>
        <div class="mar-top handelContent">
          <div class="handelLeft">回复内容：</div>
          <div class="handelRight">
            {{ handelInfo.solveContent}}
          </div>
        </div>

      </div>

    </div>
    <mob-footer/>
  </div>

</template>

<script>
  import MobHead from "@/components/control/mobHead/MobHead";
  import NavBar from "@/components/control/navBar/NavBar";
  import Crumbs from "@/components/control/crumbs/Crumbs";
  import MobFooter from "@/components/control/mobFooter/MobFooter";

  import {letterInfo} from "@/api/request";

  export default {
    name: "HandelInfo",
    components: {MobFooter, Crumbs, NavBar, MobHead},
    data(){
      return{
        crumbs:[
          {name: '互动交流', path: '/interaction'},

          {name:'办件详情',path:`/interaction/consultationservice/handelinfo`},
        ],
        handelInfo:{}
      }
    },
    created(){
      console.log(this.$route.query);
      this.handelInfo = this.$route.query.list
    }
  }
</script>

<style lang="less" scoped>
  .accessoryBag{
    padding-bottom: .64rem;
    border-bottom: #F2F3F5 solid .02666rem;
    .accessory{
      font-size: .37rem;
      color: #4E4E4E;
    }
    .accessoryInfo{
      display: flex;
      justify-content: space-between;
      background: #F2F3F5;
      margin-top: .2133rem;
      padding: 0rem .2133rem;
      height: .8rem;
      line-height: .8rem;
      font-size: .32rem;
      .accessoryName{
        color: #323333;
      }
      .accessoryDownLoad{
        color: #235399;
      }
    }
  }

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
