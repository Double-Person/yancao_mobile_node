<template>
  <div class="articleDetails">
    <mob-head/>
    <crumbs :crumbs="crumbs"/>
    <div class="widths" v-if="articleDetails.title">
      <!--<div class="title" v-html="articleDetails.title"></div>-->
      <van-field
          class="title"
          v-model="articleDetails.title"
          rows="1"
          autosize
          type="textarea"
          input-align="center"
          :border="false"
      />
      <div class="subTitle" v-if="articleDetails.subtitle">
        <span>
          {{articleDetails.subtitle}}
        </span>
      </div>
      <div class="info">
        <div class="time">发布时间：{{articleDetails.publishDate | myData}}</div>
        <!--<div class="time count">浏览次数：{{articleDetails.readAmount}}</div>-->
      </div>
      <div class="time from" v-if="articleDetails.source">来源：{{articleDetails.source}}</div>
      <div class="content" id="content">

      </div>
    </div>

    <div class="partingLine"></div>

    <div class="widths" v-if="!($route.query.isShow)">
      <ul v-if="articleDetails.preArticle">
        <li @click="nextPreArticle(articleDetails.preArticle.id)">
          <div class="next time">上一篇</div>
          <div class="overflow-ellipsis" v-if="articleDetails.preArticle.title"
               v-html="articleDetails.preArticle.title"></div>
          <div class="overflow-ellipsis" v-else>{{articleDetails.preArticle.title || "暂无"}}</div>
          <div class="nextTime time">{{articleDetails.preArticle.publishDate | myData}}</div>
        </li>
      </ul>
    </div>

    <div class="noneBgc partingLine"></div>

    <div class="widths margin-bottom-finally" v-if="!($route.query.isShow)">
      <ul v-if="articleDetails.nextArticle">
        <li @click="nextPreArticle(articleDetails.nextArticle.id)">
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
  import {myData} from "@/assets/js/globalFilter";
  import MobHead from "@/components/control/mobHead/MobHead";
  import Crumbs from "@/components/control/crumbs/Crumbs";
  import MobFooter from "@/components/control/mobFooter/MobFooter";

  import {queryById} from "@/api/request";
  import {ARTICLE_TYPE} from "@/assets/js/constant";


  export default {
    name: "articleDetails",
    inject: ['reload'],
    components: {MobFooter, Crumbs, MobHead},
    beforeRouteEnter(to, from, next) {
      let temp = {}
      temp.name = from.query.getTitle
      temp.path = from.fullPath;

      next(vm => {
        if (temp.path == '/inthesearch') {
          vm.isShow = false;
        }
        //  存在路由跳轉改變頁面麵包屑
        vm.crumbs = [
          {name: '政务公开', path: '/governmentpublic'},
          {name: to.query.title, path: '/governmentpublic'},
          // {name: temp.name='搜索', path:temp.path}
        ]
        if (temp.path == '/inthesearch') {
          vm.crumbs = [
            {name: '首页', path: '/home'},
            {name: '搜索', path: '/inthesearch'}
          ]
        }
      })
    },
    //  办事服务 政务服务 权力清单 行政许可  文章详情
    data() {
      return {
        isShow: true,
        crumbs: [
          //  默認值，直接當前頁面刷新，麵包屑顯示該默認數據
          {name: '首页', path: '/home'},
          {name: '文章详情', path: ''}
        ],
        articleDetails: {},

        timer: null
      }
    },
    created() {
      let title = this.$route.query.title;
      let result = ARTICLE_TYPE.filter(item => item.label == title);
      if (result.length) {
        this.crumbs = [
          {name: '政务公开', path: '/governmentpublic'},
          {name: title, path: `/governmentpublic/openprocurementresults?id=${result[0].value}&getTitle=${title}`},
          {name: '文章详情', path: ''}
        ];
        this.firstLoad({id: this.$route.query.id, typeCode: result[0].value})
      } else {
        this.firstLoad({id: this.$route.query.id, typeCode: this.$route.query.typeCode})
      }

      //

    },
    mounted() {

      if (this.$route.path == '/governmentpublic/articledetails') {
        let title = this.$route.query.title;
        ARTICLE_TYPE.forEach(item => {
          if (item.label == title) {
            this.crumbs = [
              {name: '政务公开', path: '/governmentpublic'},
              {name: title, path: `/governmentpublic/openprocurementresults?id=${item.value}&getTitle=${title}`}
            ]
          }
        })

      }
      this.timer = setInterval(() => {
        if (this.articleDetails.content.length) {
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
      firstLoad(id, typeCode) {
        queryById(id, typeCode).then(res => {
          if (res.code == 0 || res.code == 200) {
            this.articleDetails = res.result
          }
        })
      },
      nextPreArticle(id) {
        if (!id) {
          this.$toast('没有更多数据了')
          return false;
        }
        if (this.$route.query.title) {
          this.$router.push({
            path: '/governmentpublic/articledetails?id=' + id,
            query: {title: this.$route.query.title}
          })
        } else {
          this.$router.push({
            path: '/governmentpublic/articledetails?id=' + id,
            query: {typeCode: this.$route.query.typeCode}
          })
        }

        this.reload();
        // queryById({id}).then(res => {
        //   if (res.code == 0 || res.code == 200) {
        //     this.articleDetails = res.result
        //   }
        // })

        // chrome
        document.body.scrollTop = 0
        // firefox
        document.documentElement.scrollTop = 0
        // safari
        window.pageYOffset = 0
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
      /*display: flex;*/
      /*justify-content: space-between;*/
      text-align: center;
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
      /*margin: .23999rem auto .6666rem auto;*/
      /*padding: .23999rem auto;*/
      padding-top: .23999rem;
    }

    .noneBgc {
      background: none;
      border-bottom: #F2F3F5 solid .0266rem;
    }
  }
</style>
