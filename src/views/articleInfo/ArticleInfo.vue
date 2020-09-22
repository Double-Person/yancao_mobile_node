<template>
  <div>
    <!--  文章详情 -->
    <div class="article-info">
      <div class="title">
        凉山会理县局从严把流程入手做好烟叶收购中后期管理
      </div>
      <div class="time">
        <span>发布时间：2018-11-27 16:21 </span>
        <span>浏览次数：233  </span>
      </div>
      <div class="from">
        来源：四川省烟草专卖局
      </div>
      <div class="article-content">
        会议指出，2020年是全面建成小康社会和“十三五”规划收官之年，我们要实现第一个百年奋斗目标。 做好明年经济工作，要以习近平新时代中国特色社会主义思想为指导，
        全面贯彻党的十九大和十九届二中、三中、四中全会精神，紧扣全面建成小康社会目标任务，坚持稳中求进工作总基调，坚持新发展理念。 会议强调，当前和今后一个时期，
        我国经济稳中向好、长期向好的基本趋势没有变。我们要坚持用辩证思维看待形势发展变化，增强必胜信心，善于把外部压力转化为深化改革、扩大开放的强大动力，集中精力办好自己的事。
        要加快现代化经济体系建设，推动农业、制造业、服务业高质量发展，加强基础设施建设，推动形成优势互补高质量发展的区域经济布局，提升科技实力和创新能力，深化经济体制改革，
        建设更高水平开放型经济新体制。
      </div>

      <Paging :paging="paging"/>
      <Paging :paging="paging"/>
    </div>
    <MobFooter/>

    <div class="share">
      <div class="left">分享到</div>
      <div class="right">
        <span><img src="./images/icon_share_weibo.svg" alt=""></span>
        <span><img src="./images/icon_share_weixin.svg" alt=""></span>
        <span><img src="./images/icon_share_qq.svg" alt=""></span>
      </div>
    </div>
  </div>
</template>

<script>
  import Paging from "./Paging";
  import MobFooter from "../../components/control/mobFooter/MobFooter";
  export default {
    name: "ArticleInfo",
    components: {MobFooter, Paging},
    data(){
      return{
        paging:{page:'上一篇',title:'四川阿坝州局编译藏汉双语手册让专卖普啊啊啊啊啊啊啊啊',time:'2019-01-21'}
      }
    }
  }
</script>

<style lang="less" scoped>
  .article-info{
    width: 83%;
    margin: .5rem auto;
    .title{
      font-size: .5rem;
      font-weight: 600;
      color: rgba(50,51,51,1);
    }
    .time{
      display: flex;
      justify-content: space-between;
      color: #979899;
      font-size: .32rem;
      margin: .4rem 0rem .2rem 0;
    }
    .from{
      color: #979899;
      font-size: .32rem;
    }
    .article-content{
      color: #323333;
      font-size: .43rem;
      margin: .5rem 0;
      line-height: 1.5;
      font-weight: 400;
    }
  }

  .share{
    width: 83%;
    margin: 0 auto;
    height: 1.3rem;
    line-height: 1.3rem;
    display: flex;
    justify-content: space-between;
    font-size: .37rem;
    vertical-align: center;
    /*position: fixed;*/
    /*bottom: 0;*/
    /*left: 0;*/
    /*right: 0;*/
    .right{
      width: 50%;
      display: flex;
      justify-content: space-around;
      align-items: center;
      span{
        align-items: center;
        display: inline-block;
        line-height: 1.6rem;
        height: 1.3rem;
      }
    }
  }
</style>