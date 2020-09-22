<template>
  <div class="articleDetails">
    <mob-head/>
    <crumbs :crumbs="crumbs"/>
    <div class="widths" v-if="articleDetails.title">
      <!--<div class="title" v-html="articleDetails.title"></div>-->
      <van-field
          class="title"
          v-model="articleDetails.allTit"
          rows="1"
          autosize
          type="textarea"
          input-align="center"
          :border="false"
          readonly
      />
      <div class="subTitle"  v-if="articleDetails.subtitle">
        <span>
          {{articleDetails.subtitle}}
        </span>
      </div>
      <div class="info">
        <div class="time">发布时间：{{articleDetails.publishDate | myData}}</div>
        <!--<div class="time count">浏览次数：{{articleDetails.readAmount }}</div>-->
      </div>
      <div class="time from" v-if="articleDetails.source">来源：{{articleDetails.source}}</div>
      <div class="content" id="content">

      </div>
    </div>

    <div class="partingLine"></div>
    <!--$route.query.isSearch===true-->
    <div class="widths" v-if="!($route.query.isSearch)">
      <ul v-if="articleDetails.preArticle">
        <li @click="nextPreArticle(articleDetails.preArticle.id,types)">
          <div class="next time">上一篇</div>
          <div class="overflow-ellipsis" v-if="articleDetails.preArticle.title"
               v-html="articleDetails.preArticle.title"></div>
          <div class="overflow-ellipsis" v-else>{{articleDetails.preArticle.title || "暂无"}}</div>
          <div class="nextTime time">{{articleDetails.preArticle.publishDate | myData}}</div>
        </li>
      </ul>
    </div>

    <div class="noneBgc partingLine"></div>

    <div class="widths margin-bottom-finally" v-if="!($route.query.isSearch)">
      <ul v-if="articleDetails.nextArticle">
        <li @click="nextPreArticle(articleDetails.nextArticle.id,types)">
          <div class="next time">下一篇</div>
          <div class="overflow-ellipsis" v-if="articleDetails.nextArticle.title"
               v-html="articleDetails.nextArticle.title"></div>
          <div class="overflow-ellipsis" v-else>{{articleDetails.nextArticle.title || "暂无"}}</div>
          <div class="nextTime time">{{articleDetails.nextArticle.publishDate| myData}}</div>
        </li>
      </ul>
    </div>
    <mob-footer/>
  </div>
</template>

<script>
  import {myMixin} from "@/mixins/myMixins";
  import {myData} from "@/assets/js/globalFilter";
  import MobHead from "@/components/control/mobHead/MobHead";
  import Crumbs from "@/components/control/crumbs/Crumbs";
  import MobFooter from "@/components/control/mobFooter/MobFooter";

  import {queryById} from "@/api/request";
  import { ARTICLE_TYPE } from "@/assets/js/constant";


  export default {
    name: "TabsInfo",
    inject: ["reload"],
    mixins: [myMixin],
    components: {MobFooter, Crumbs, MobHead},
    beforeRouteEnter(to, from, next) {
      console.log(to, from);
      next(vm => {
        if(from.path=='/interaction/OnlineInTheSearch'){
          vm.isShow = false;
        }
      })
    },
    data() {
      return {
        isShow:true,
        crumbs: [
          //  默認值，直接當前頁面刷新，麵包屑顯示該默認數據
          {name: '首页', path: '/home'},
          {name: '文章详情', path: ''}
        ],
        articleDetails: {},
        timer: null,
        articleType:[],
        types:''
      }
    },
     created() {
       if(this.$route.query.title){
         ARTICLE_TYPE.forEach(item=>{
           if(item.label==this.$route.query.title){
             this.types = item.value;
             this.firstLoad({id: this.$route.query.id,typeCode:item.value})
           }
         })
       }else {
         this.firstLoad({id: this.$route.query.id,typeCode:this.$route.query.typeCode})
       }

    },
    mounted() {
      this.timer = setInterval(() => {
        if (this.articleDetails && this.articleDetails.content && this.articleDetails.content.length) {
          clearInterval(this.timer);
          this.jq("#content").html(this.articleDetails.content);
          let imgs = 'http://www.tobacco.gov.cn/attachfiles/2020/01/11/707e1f5836c79a08e7231e6f585485a2c1d98337.jpg';
          let result = Array.from(document.images).filter(item => item.src == imgs);
          result.forEach(item => {
            item.setAttribute("style", "width: 15px !important;");
          })
          //  查找附件 图标
          let arr = Array.from(document.images);
          arr.forEach(item => {
            let result = (item.parentNode.innerHTML.toString()).includes('附件：') || (item.parentNode.innerHTML.toString()).includes('附件:') || (item.parentNode.innerHTML.toString()).includes('徐');
            if (result) {//找到了
              item.setAttribute("style", "width: 15px !important;");
            }

            //  p标签内图片缩进样式
            if (item.parentNode.nodeName == 'P' && item.parentNode.childElementCount == 1) {  // document.images[1].parentNode.childElementCount
              if (item.parentNode.getAttribute('style').toString().includes("text-indent")) {
                let str = item.parentNode.getAttribute('style').toString().split(";");
                str.forEach((item, index) => {//查找text-indent属性位置
                  if (str[index].includes('text-indent')) {
                    str[index] = ' text-indent: 0em';
                  }
                })
                let templateStyle = str.join(';');
                item.parentNode.setAttribute("style", templateStyle);
              }
            }
          })


        }
      }, 200)
    },
    beforeDestroy() {
      if (this.timer) {
        clearInterval(this.timer);
      }
    },

    methods: {
      firstLoad(id,typeCode) {
        queryById(id,typeCode).then(res => {
          if (res.code == 0 || res.code == 200) {
            this.articleDetails = res.result;
            this.articleDetails.allTit = this.$route.query.title==='媒体报道'? '【'+this.articleDetails.mediaNameCodeDictText+'】 '+this.articleDetails.title: this.articleDetails.title
            this.crumbsData(this.articleDetails.typeCode)
          }
        })
      },
      // 面包屑数据
      crumbsData(type){
        console.log(type);
        if (this.$route.query.title == '在线问答') {
          this.crumbs = [
            {name: '互动交流', path: '/interaction'},
            {name: '在线问答', path: '/interaction/OnlineInTheSearch'}
          ]
        }else if (this.$route.query.title == 'help') {
          this.crumbs = [
            {name: '首页', path: '/home'},
            {name: '使用帮助', path: '/home/help'},
            {name: '帮助详情', path: ''}
          ]
        } else if (this.$route.query.title == 'OnlineInTheSearch') {
          this.crumbs = [
            {name: '首页', path: '/home'},
            {name: '在线问答', path: '/interaction/OnlineInTheSearch'},
            {name: '文章详情', path: ''}
          ]
        } else {
          let title = this.$route.query.title;
          let finlyTitle = '';
          let pathUrlP = '';
         ARTICLE_TYPE.forEach(item=>{
           if(item.value==type){
             this.articleType = item
           }
         });

          this.crumbs = [
            //  默認值，直接當前頁面刷新，麵包屑顯示該默認數據
            {name: '首页', path: '/home'},
            {name: this.$route.query.title, path: `/news/${this.articleType.value}`}
          ]
        }
      },
      nextPreArticle(id,types) {
        if (!id) {
          this.$toast('没有更多数据了')
          return false;
        }
        this.$router.push({path: '/home/tabsinfo?id='+id, query: {title: this.$route.query.title}})
        // let routeUrl = this.$router.resolve({
        //   path: '/home/tabsinfo?id='+id,
        //   query: {title: this.$route.query.title}
        // })
        // window.open(routeUrl.href, '_blank')


        this.reload();

      }
    }
  }
</script>

<style lang="less" scoped>
  .articleDetails {
    .title {
      /*padding: 0.26667rem 0.42667rem;*/
      text-align: center;
      /*margin: .64rem auto .43rem auto;*/
      margin: .37rem auto .01rem auto;
      color: #323333;
      font-size: .5rem;
      line-height: .72rem;
      font-weight: 500;
    }
    .subTitle {
      text-align: center;
      font-size: .43rem;
      font-family: "Microsoft YaHei";
      font-weight: 400;
      color: #656566;
      line-height: 0.586rem;
      margin-bottom: 0.64rem;
      span:before {
        content: '--';
      }
    }
    .info {
      text-align: center;
      /*display: flex;*/
      /*justify-content: space-between;*/
    }
    .from {
      margin: .21333rem auto .63999rem auto;
      text-align: center;
    }

    #content {
      color: #323333;
      font-weight: 400;
      font-size: .43rem;
      line-height: .8rem;
      text-align: left;
      padding-bottom: .85rem;
      width: 100%;
      overflow: hidden;
      word-wrap: break-word;
    }
    /deep/ #content div {
      width: 100% !important;
    }
    /deep/ #content #playbtn_img {
      width: 46px !important;
      height: 46px !important;
      position: absolute;
      left: 50% !important;
      margin-left: -23px !important;
    }
    /deep/ #content p {
      width: 100% !important;
    }
    /deep/ #content img {
      width: 100% !important;
      vertical-align: middle !important;
    }
    /deep/ #content p img {
      width: 100% !important;
      vertical-align: middle !important;
    }
    /*/deep/ #content>p:nth-of-type(6) img{*/
    /*width: 15px !important;*/
    /*vertical-align: middle !important;*/
    /*}*/
    /deep/ #content video {
      width: 100% !important;
      vertical-align: middle !important;
    }

    .content img, .content video {
      width: 100% !important;
      vertical-align: middle !important;
    }

    li {
      padding-bottom: .43rem;
    }
    .next {
      margin: .43rem auto .21333rem;
    }
    .overflow-ellipsis {
      color: #323333;
      line-height: .586rem;
      height: .586rem;
      font-size: .43rem;
      font-weight: 400;
    }
    .nextTime {
      padding-top: .23999rem;
    }

    .noneBgc {
      background: none;
      border-bottom: #F2F3F5 solid .0266rem;
    }
  }
</style>
