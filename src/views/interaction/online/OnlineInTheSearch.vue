<template>
  <div class="mobile-head">
    <div class="logoImg position-fixed">
      <img src="./images/pic_home_banner2.png" alt="中国烟草"/>
      <Crumbs :crumbs="crumbs"/>
    </div>
    <div class="widths">
      <div class="search">
        <input v-model="search" placeholder="请输入关键字" @blur="onSearch"/>
        <span @click="onSearch"><img src="./images/icon_home_nav_search.svg"/></span>
      </div>
      <div class="null"></div>
      <div style="padding-top: 4.372rem;">

        <!-- 搜索中  -->
        <div class="InTheSearch" v-if="InTheSearch">
          <img src="./images/loading_zhinengfenxi@3x.png"/>
          <div>正在智能分析中...</div>
        </div>
        <!-- 有结果 -->
        <div v-if="haveSearch" class="haveSearch">
          <!-- .最新相关消息列表，最近三个月内发布的相关消息（无则不显示）组成：文章标题+发布时间 -->
          <!--<div class="newMsgTitle"><span style="color: #ff1616;">真假烟识别</span>的相关消息</div>-->
          <!--<div class="result newMsg" v-for="item in lists" @click="toDetails(item.id)">-->
            <!--<div class="overflow-ellipsis" v-html="item.title"></div>-->
            <!--&lt;!&ndash;<div class="content overflow-ellipsis" v-html="item.content"></div>&ndash;&gt;-->
            <!--<span class="time">{{item.createTime}}</span>-->
          <!--</div>-->
          <!--<div class="newMsgNull"></div>-->


          <div class="result" v-for="item in lists" @click="toDetails(item)">
            <div class="overflow-ellipsis" style="margin: 0.3rem auto" v-html="item.title"></div>
            <!--<div class="content overflow-ellipsis" v-html="item.content"></div>-->
            <span class="time">{{item.createTime}}</span>
          </div>
          <p class="no-data" style="margin-top: 0.5rem;text-align: center">没有满意的结果？请到<span @click="services">我要留言</span>提交问题吧
          </p>
          <div style="margin-top: 0.5rem">
            <load-more-btn @click.native="loadMore"/>
          </div>

        </div>
        <!-- 无结果 -->
        <div class="noSearch" v-if="noSearch">
          <div class="img">
            <img src="./images/pic_search_nothing.svg" alt="">
          </div>
          <p class="no-data">暂无相关结果，您可以到<span @click="services">我要留言</span>提交问题哦</p>
        </div>
      </div>

    </div>

    <mob-footer/>
  </div>
</template>

<script>
  import PubSub from 'pubsub-js'
  import Crumbs from "@/components/control/crumbs/Crumbs";
  import MobFooter from "@/components/control/mobFooter/MobFooter";

  import {questionSearch, getAction} from "@/api/request";
  import LoadMoreBtn from "@/components/control/loadMoreBtn/LoadMoreBtn";
  import {ARTICLE_TYPE} from "@/assets/js/constant";

  export default {
    name: "OnlineInTheSearch",
    components: {LoadMoreBtn, MobFooter, Crumbs},
    data() {
      return {
        search: '',
        crumbs: [
          {name: '互动交流', path: '/interaction'},
          {name: '在线问答', path: ''}
        ],
        lists: [],
        InTheSearch: true,//搜索中
        haveSearch: false,//搜索有结果
        noSearch: false,//搜索无结果
        currentPage: 2,//当前页数
        hasData: true,
        noData: false,
      }
    },
    created() {
      this.onSearch()
    },
    mounted(){

    },
    methods: {
      //搜索
      onSearch() {
        //搜索中
        this.InTheSearch = true
        this.haveSearch = false
        this.noSearch = false;
        questionSearch({pageNo: 1, pageSize: 5, keyword: this.search}).then(res => {

          if (res.result.records.length) {
            if (this.currentPage == 1) {
              this.haveSearch = true
              this.noSearch = false
            }
            //  有数据
            this.InTheSearch = false;
            this.haveSearch = true;
            // this.lists.push(...res.result.records);
            this.lists = res.result.records;
            // this.currentPage++;
            this.$nextTick(()=>{
              let leng = this.lists.length;
              // console.log('长度',leng);
              // console.log(document.getElementsByClassName('newMsg')[leng-1]);

              // document.getElementsByClassName('newMsg')[leng-1].style.borderBottom = 'none'
            })

          } else {
            this.InTheSearch = false
            this.haveSearch = false
            this.noSearch = true
          }
        })


      },
      loadMore() {
        this.noData = false;
        if (!this.hasData) {
          return false
        }
        questionSearch({pageNo: this.currentPage, pageSize: 5, keyword: this.search}).then(res => {
          if (res.code == 0 || res.code == 200) {
            if (res.result.records.length) {
              // this.lists = res.result.records
              this.currentPage += 1
              this.lists.push(...res.result.records)
            } else {
              this.hasData = false;
              this.noData = true
              this.$toast('没有更多数据了');
              PubSub.publish('noData', 'noData')
            }
          }
        })
      },
      toDetails(item) {
        console.log(item);
        ARTICLE_TYPE.forEach(items=>{
          if(items.value==item.typeCode){
            // this.$router.push({path: '/home/tabsinfo?id='+item.id, query: {title: '在线问答'}})
            let routeUrl = this.$router.resolve({
              path: '/home/tabsinfo?id='+item.id,
              query: {title: '在线问答',isSearch:true}
            })
            window.open(routeUrl.href, '_blank')
          }
        })

      },
      //  无数据去 咨询服务
      services() {
        this.$router.push('/interaction/leavemessage')
      }
    }
  }
</script>

<style lang="less" scoped>
  .newMsgTitle{
    font-size: .5333rem;
    font-family: PingFangSC, PingFangSC-Medium;
    font-weight: 500;
    text-align: left;
    line-height: 20pt;
    margin-top: .85rem;
  }
  .newMsgNull{
    height: 1rem;
  }
  .haveSearch .newMsg:last-child{
    background: red;
   color: red;
  }
  .position-fixed {
    position: fixed;
    z-index: 3;
    top: 0;
    left: 0;
    right: 0;

  }

  .no-data {
    font-size: .32rem;
    span {
      color: #235399;
      &:hover {
        font-weight: bold;
      }
    }
  }

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
    width: 89%;
    display: flex;
    justify-content: space-between;
    padding-right: .3rem;
    height: 1.066rem;
    line-height: 1.066rem;
    /*margin-top: .6399rem;*/
    /*2.666*/
    margin-top: 3.3065rem;
    position: fixed;
    z-index: 3;
    /*top: 3.3065rem;*/
    input {
      border: none;
      background: #F2F3F5;
      font-size: .37rem;
      padding-left: .3rem;
      height: 1rem;
    }
    span {
      height: 1.066rem;
      line-height: 1.066rem;
      display: inline-block;
      img {
        vertical-align: middle;
      }
    }
  }

  .null {
    /*height: 1.066rem;*/
    height: 4.372rem;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 2;
    background: #fff;
    /*top: 3.306rem;*/
  }

  /* 搜索中 */
  .InTheSearch {
    height: 5.5rem;
    text-align: center;

    font-size: .37rem;
    font-family: PingFangSC, PingFangSC-Regular;
    font-weight: 400;
    color: #235399;
    /*line-height: 7rem;*/
    img {
      margin-top: 1.066rem;
      width: .85rem;
      margin-bottom: 0.345rem;
    }
  }

  .result {
    border-bottom: 1px solid #F2F3F5;
    padding: .3rem 0 0.2rem 0;
  }

  .overflow-ellipsis {
    font-size: .43rem;
    margin: .3rem auto;
  }

  .content {
    color: #979899;
    font-size: .37rem;
    line-height: 1.5;
  }

  .noSearch {
    margin: 3rem auto;
    text-align: center;
    font-size: .43rem;
    .img {
      width: 20%;
      margin: .5rem auto;
      img {
        width: 100%;
      }
    }

  }
</style>
