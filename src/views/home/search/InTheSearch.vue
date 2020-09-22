<template>
  <div class="mobile-head">
    <div class="logoImg">
      <img src="./images/pic_home_banner2.png" alt="中国烟草"/>
      <Crumbs :crumbs="crumbs"/>
    </div>
    <div class="widths">
      <div class="search">
        <!-- ios不支持自动聚焦  :autofocus="true" -->

        <van-search placeholder="请输入关键字" right-icon="search" left-icon="" v-model="search"
                    :autofocus="true"
                    @blur="onSearchBlur" id="pickoversearch"/>



      </div>

      <div class="search-result">结果分类</div>
      <!--<el-input-->
          <!--placeholder="请输入内容"-->
          <!--prefix-icon="el-icon-search"-->
          <!--v-model="search"-->
          <!--@blur="onSearchBlur">-->
      <!--</el-input>-->
      <div class="classification">
        <div v-for="(item, index) in classification" @click="choosClassification(index, item.typeCode)"
             :class="activeType==index?'activeClass':''">
          {{ item.typeName }} &nbsp;&nbsp; {{ (item.num?`(${item.num})`:'') }}
        </div>
      </div>

      <div class="search-result" style="margin-top: 0.686rem;">时间分类</div>
      <div class="classification">
        <div v-for="(item, index) in classificationTime" @click="choosTime(index, item.value)"
             :class="activeTime==index?'activeClass':''">{{ item.name }}
        </div>
      </div>
      <!-- 搜索中 -->
      <div class="InTheSearch" v-if="InTheSearch"></div>
      <!-- 有结果 -->
      <div v-if="haveSearch" class="resultList">


        <div class="search-result" style=" margin-top: 0.2666rem;">查询结果（共{{total}}条）</div>
        <div class="result" v-for="item in lists" @click="toArticleInfo(item.id, item.typeCode,item.typeName)" v-if="(item.typeCode !='fuwudaohang') && (item.typeCode !='zhiyingdian')">
          <div class="overflow-ellipsis" >
            <span class="tag">{{item.typeCode_dictText}}</span>
            <span v-html="item.title"></span>
          </div>
          <!--<div class="content overflow-ellipsis-three" v-if="item.digest.length" v-html="item.digest"></div>-->
          <!--<div class="content overflow-ellipsis-three" v-else v-html="item.content"></div>-->
          <span class="time">{{item.publishDate | myData}}</span>
        </div>
        <!-- 服务导航 -->
        <div class="result  aaaaaa" v-for="item in lists" @click="toArticleInfo(item.id, item.typeCode,item.typeName)"
             v-if="(item.typeCode =='fuwudaohang') || (item.typeCode =='zhiyingdian')">
          <div class="overflow-ellipsis">
            <!--  item.typeCode_dictText  -->
            <span class="tag">{{item.typeCode_dictText}}</span>
            <span v-html="item.name"></span>
          </div>
          <div class="content">地 <span style="display: inline-block;width: .6rem"></span>址：{{item.address}}</div>
          <div class="time" style="margin-bottom: 0.2666rem;line-height: 0.53rem;">电 <span
              style="display: inline-block;width: .6rem"></span>话：{{item.tel }}
          </div>
          <div class="time" style="margin-bottom: 0.2666rem;line-height: 0.53rem;">工作时间：{{item.workTime}}</div>
          <div class="time" style="margin-bottom: 0.2666rem;line-height: 0.53rem;" v-if="!!item.scope">受理范围：{{item.scope}}</div>
          <div class="time" style="margin-bottom: 0.2666rem;line-height: 0.53rem;" v-else>备
            <span style="display: inline-block;width: .6rem"></span>注：{{item.remark}}</div>
        </div>

        <load-more-btn @click.native="loadMore"/>
      </div>
      <!-- 无结果 -->
      <div class="noSearch" v-if="noSearch">
        <!--<div class="search-result" style=" margin-top: 0.7466rem;">查询结果（共{{total}}条）</div>-->
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
  import PubSub from 'pubsub-js'
  import ajax from '@/api/ajax'
  import Crumbs from "@/components/control/crumbs/Crumbs";
  import MobFooter from "@/components/control/mobFooter/MobFooter";
  import LoadMoreBtn from "@/components/control/loadMoreBtn/LoadMoreBtn";
  import {myData} from "@/assets/js/globalFilter";
  import {sysArticleSearch, sysArticleGetType} from "@/api/request";

  export default {
    name: "InTheSearch",
    components: {LoadMoreBtn, MobFooter, Crumbs},
    data() {
      return {
        activeType: 0,
        classification: [],
        activeTime: 0,
        classificationTime: [
          {name: '时间不限', value: ''},
          {name: '一周之内', value: 'week'},
          {name: '一月之内', value: 'month'},
          {name: '一年之内', value: 'year'}
        ],
        hasData: true,
        total: 0,
        currentPages: 1,
        search: '',
        crumbs: [
          {name: '首页', path: '/home'},
          {name: '搜索', path: '/inthesearch'}
        ],
        lists: [],
        dateType: '',//时间类型
        typeCode: '',// 标签类型
        InTheSearch: true,//搜索中
        haveSearch: false,//搜索有结果
        noSearch: false,//搜索无结果
      }
    },
    created() {
      this.getType()
      this.choosClassification();
    },
    mounted(){
      this.$nextTick(()=>{
        // document.getElementById('pickoversearch').focus();
      })
    },
    methods: {
      searchTest(){
        console.log('---');
        alert('---');
      },
      /**
       * 选择分类
       * @param index  当前下标
       * @param typeCode  当前标签编码
       * @constructor
       */
      choosClassification(index = 0, typeCode = '') {
        this.activeType = index;
        this.typeCode = typeCode;
        this.onSearch()
      },

      /**
       * 选择时间分类
       * @param index 当前下标
       * @param dateType 当前时间类型
       */
      async choosTime(index, dateType) {
        this.activeTime = index;
        this.dateType = dateType;
        await this.onSearch()
      },

      /**
       * 获取文章类型
       * @param keyword 关键字
       * @returns {Promise<void>}
       */
      async getType(keyword) {
        let res = await sysArticleGetType(keyword);
        this.classification = res.result;
        let sum = res.result.map(item => item.num).reduce((prev, cur, index) => prev + cur);
        this.classification.unshift({typeName: '全部', num: sum, typeCode: ''})
      },
      //搜索
      onSearch() {
        // if(!this.hasData){
        //   return false
        // }
        //  dateType    typeCode
        this.InTheSearch = true
        this.haveSearch = false
        this.noSearch = false
        // console.log('搜索中')
        this.getType({keyword: this.search.trim()});
        sysArticleSearch({
          pageNo: 1,
          pageSize: 5,
          keyword: this.search.trim(),
          dateType: this.dateType,
          typeCode: this.typeCode
        }).then(res => {
          // console.log(res);
          if (res.code == 200 || res.code == 0) {
            this.currentPages = 2;
            if (res.result.records.length) {
              this.lists = res.result.records;
              // console.log(this.lists);
              this.total = res.result.total;
              this.InTheSearch = false
              this.haveSearch = true
              this.noSearch = false
              this.hasData = false
            } else {
              PubSub.publish('noData', 'noData');
              this.InTheSearch = false
              this.haveSearch = false
              this.noSearch = true
            }

          }
        })


      },
      //失焦
      onSearchBlur() {
        this.activeType = 0;
        this.activeTime = 0;
        //  dateType    typeCode
        this.InTheSearch = true
        this.haveSearch = false
        this.noSearch = false
        this.getType({keyword: this.search.trim()});
        sysArticleSearch({
          pageNo: 1,
          pageSize: 5,
          keyword: this.search.trim(),
          dateType: '',
          typeCode: ''
        }).then(res => {
          // console.log(res);
          if (res.code == 200 || res.code == 0) {
            this.currentPages = 2;
            if (res.result.records.length) {
              this.lists = res.result.records;
              // console.log(this.lists);
              this.total = res.result.total;
              this.InTheSearch = false
              this.haveSearch = true
              this.noSearch = false
              this.hasData = false
            } else {
              PubSub.publish('noData', 'noData');
              this.InTheSearch = false
              this.haveSearch = false
              this.noSearch = true
            }

          }
        })

        console.log(this.activeType)
        console.log(this.activeTime)
      },
      loadMore() {
        sysArticleSearch({
          pageNo: this.currentPages,
          pageSize: 5,
          keyword: this.search.trim(),
          dateType: this.dateType,
          typeCode: this.typeCode
        }).then(res => {
          if (res.code == 200 || res.code == 0) {
            if (res.result.records.length) {
              this.currentPages += 1
              this.lists.push(...res.result.records)
            } else {
              this.$toast('没有更多数据了');
              PubSub.publish('noData', 'noData');
            }

          }
        })
      },
      toArticleInfo(id, typeCode,title) {
        if(this.typeCode == 'fuwudaohang'){
          return false
        }
        if (this.typeCode == 'zhiyingdian') {
          return false
        }
        // this.$router.push({path: '/governmentpublic/articledetails', query: {id,typeCode}})
        let routeUrl = this.$router.resolve({
          path: '/governmentpublic/articledetails',
          query: {id,typeCode,isShow:true,title}
        })
        window.open(routeUrl.href, '_blank')
      }
    }
  }
</script>

<style lang="less" scoped>
  /* 结构列表标签 */
  .tag {
    display: inline-block;
    height: 0.63rem;
    line-height: 0.63rem;
    background: #235399;
    padding: 0rem 0.2rem;
    font-size: 0.32rem;
    color: #fff;
    margin-right: 0.2rem;
  }

  /* 分类 */
  .classification {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-top: 0.5333rem;
    &:after {
      content: '';
      width: 2.77rem;
    }
    div {
      width: 2.77rem;
      height: 1.066rem;
      line-height: 1.066rem;
      text-align: center;
      font-size: 0.32rem;
      font-family: "Microsoft YaHei";
      font-weight: 400;
      text-align: center;
      color: #235399;
      border: #DBDBDB solid 0.0266rem;
      margin-bottom: 0.21333rem;
    }
  }

  /* 激活分类标签 */
  .activeClass {
    background: #235399;
    border: #235399 solid 0.0266rem !important;
    color: #fff !important;
  }

  /* 搜索结果标题 */
  .search-result {
    height: 0.533rem;
    font-size: 0.533rem;
    font-family: "Microsoft YaHei";
    font-weight: 500;
    text-align: left;
    color: #323333;
    line-height: 0.533rem;
  }

  .loadMoreBtn {
    margin-top: 1rem;
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
    .van-search {
      padding: .6399rem 0rem 0.85rem 0rem;
    }
    .mint-search{
      height: 0.85rem;
      padding: .6399rem 0rem 0.85rem 0rem;
    }
  }

  .search1 {
    background: #F2F3F5;
    display: flex;
    justify-content: space-between;
    padding-right: .3rem;
    height: 1.066rem;

    margin-top: .64rem;
    input {
      border: none;
      background: #F2F3F5;
      font-size: .37rem;
      padding-left: .3rem;
      height: 1rem;
      width: 80%;
    }
    span {
      display: inline-block;
      height: 1rem;
      vertical-align: middle;
      img {
        width: .64rem;
        height: .64rem;
        display: block;
        margin-top: .15rem;
      }
    }
  }

  .resultList {
    padding-top: .43rem;
  }

  .InTheSearch {
    height: 6rem;
  }

  .result {
    border-bottom: 1px solid #F2F3F5;
    padding-bottom: .43rem;
    /*padding: .3rem 0;*/
  }

  .overflow-ellipsis {
    font-size: .43rem;
    margin: .43rem auto 0 auto;
    line-height: .63rem;
    /*display: flex;*/
  }

  .content {
    color: #979899;
    font-size: .37rem;
    line-height: .53rem;
    max-height: 1.499rem;
    overflow: hidden;
    /*margin-bottom: .32rem;*/
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
