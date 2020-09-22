<template>
  <div class="mobile-head">
    <div class="logoImg">
      <img src="./images/pic_home_banner2.png" alt="中国烟草"/>
      <Crumbs :crumbs="crumbs"/>
    </div>
    <div class="widths">
      <div class="search">
        <input v-model="search" placeholder="请输入关键字" @blur="onSearch"/>
        <span @click="onSearch"><img src="../images/icon_home_nav_search.svg"/></span>
      </div>

      <!-- 搜索中 -->
      <div class="InTheSearch"></div>
<!-- 有结果 -->
      <div v-if="haveSearch">
        <div class="result">
          <div class="overflow-ellipsis">鉴别——“冬虫夏草”（和润）</div>
          <div class="content">
            为防范和化解安全风险，提升企业本质安全水平，近日，自贡市局（公司）积极推进双重预防机制建设，着力夯实安全生产基础底座，真假烟增强安全事故的…
          </div>
          <span class="time">2019-01-21</span>
        </div>

        <div class="result">
          <div class="overflow-ellipsis">鉴别——“冬虫夏草”（和润）</div>
          <div class="content">
            为防范和化解安全风险，提升企业本质安全水平，近日，自贡市局（公司）积极推进双重预防机制建设，着力夯实安全生产基础底座，真假烟增强安全事故的…
          </div>
          <span class="time">2019-01-21</span>
        </div>
      </div>
      <!-- 无结果 -->
      <div class="noSearch" v-if="noSearch">
        <div class="img">
          <img src="./images/pic_search_nothing.svg" alt="">
        </div>
        <p>暂无数据</p>
      </div>
    </div>

    <mob-footer/>
  </div>
</template>

<script>
  import ajax from '@/api/ajax'
  import Crumbs from "@/components/control/crumbs/Crumbs";
  import MobFooter from "../../../components/control/mobFooter/MobFooter";
  export default {
    name: "InTheSearch",
    components: {MobFooter, Crumbs},
    data(){
      return{
        search: '',
        crumbs:[
          {name: '首页', path: '/home'},
          {name: '搜索', path: '/inthesearch'}
        ],
        InTheSearch:true,//搜索中
        haveSearch:false,//搜索有结果
        noSearch:false,//搜索无结果
      }
    },
    methods:{
      //搜索
      onSearch() {
        console.log(this.search.trim());
        ajax('/mobile/questionnaire/list',{pageNo:1,pageSize:10}).then(res=>{
          console.log(res);
        })

        console.log(this.search);
      },
    }
  }
</script>

<style lang="less" scoped>
  .logoImg {
    width: 100%;
    img {
      width: 100%;
      border: none;
      display: block;
    }
  }

  .search {
    background: #F2F3F5;
    display: flex;
    justify-content: space-between;
    padding-right: .3rem;
    height: .9rem;
    line-height: .9rem;
    margin-top: .3rem;
    input {
      border: none;
      background: #F2F3F5;
      font-size: .37rem;
      padding-left: .3rem;
      height: .9rem;
      line-height: .9rem;
    }
  }
.InTheSearch{
  height: 6rem;
}
  .result{
    border-bottom: 1px solid #F2F3F5;
    padding: .3rem 0;
  }
  .overflow-ellipsis{
    font-size: .43rem;
    margin: .3rem auto;
  }
  .content{
    color: #979899;
    font-size: .37rem;
    line-height: 1.5;
  }
  .noSearch{
    margin: 3rem auto;
    text-align: center;
    font-size: .43rem;
    .img{
      width: 20%;
      margin: .5rem auto;
      img{
        width: 100%;
      }
    }

  }
</style>