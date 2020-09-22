<template>
  <div>
    <mob-head/>
    <nav-bar/>
    <crumbs :crumbs="crumbs"/>
    <div class="widths margin-bottom">
      <h1 class="nav-title">川烟视窗</h1>
      <div class="wrapper">
        <ul class="content margin-bottom">
          <!--<li v-for="(item,index) in arrList">{{item}}{{index}}</li>  controls -->
          <li class="item-video" v-for="(item,index) in video.list">
            <video :id="'my-video'+index"
                   class="video-js vjs-default-skin  vjs-big-play-centered"
                   controls
                   preload="auto"
                   style='width: 100%;height: 5.15rem'
                   :poster="item.imgList[0]"
                   @touchstart="start"
                   @touchend="end"
                   @click="player(index,item.url)">
              <source :src="item.url" style='width: 100%;height: 100%' type="application/x-mpegURL">
            </video>

            <p class="overflow-ellipsis">{{item.title}}</p>
          </li>
        </ul>
      </div>
      <load-more-btn @click.native="loadMore"/>

    </div>
    <mob-footer/>
  </div>
</template>

<script>
  import videojs from 'video.js'
  import 'video.js/dist/video-js.min.css'
  import 'videojs-flash';

  import PubSub from 'pubsub-js'
  import {videoList,addLog} from "@/api/request";
  import MobHead from "@/components/control/mobHead/MobHead";
  import NavBar from "@/components/control/navBar/NavBar";
  import Crumbs from "@/components/control/crumbs/Crumbs";
  import MobFooter from "@/components/control/mobFooter/MobFooter";
  import LoadMoreBtn from "@/components/control/loadMoreBtn/LoadMoreBtn";
  import VideoChild from "./VideoChild";
  import { LOGLIST } from "@/assets/js/constant";

  export default {
    name: "SichuanSmokeView",
    components: {VideoChild, LoadMoreBtn, MobFooter, Crumbs, NavBar, MobHead},
    data() {
      return {
        hasData: true,
        crumbs: [
          {name: '首页', path: '/home'},
          {name: '川烟视窗', path: ''}
        ],
        scroll: null,
        video: {pages: 1, list: []},//视频列表
      }
    },
    created() {
      this.loadMore()
      addLog({
          columnTypeCode:LOGLIST.SYLM,
          subColumnTypeCode:`${LOGLIST.SYLM}_chuanyanshichuang`
        })
    },
    mounted() {
      // document.body.addEventListener('touchstart', function () {
      //   alert('stop touchstart')
      //   return false;
      // });
      // window.ontouchstart = function (e) {
      //   console.log(e);
      //   alert('stop ontouchstart')
      //   e.preventDefault();
      //   return false;
      // };
      for (let i = 0; i < this.video.list.length; i++) {
        videojs(
          "my-video" + i,
          {
            // bigPlayButton: false,
            textTrackDisplay: false,
            posterImage: true,
            errorDisplay: false,
            controlBar: true
          },
          function () {
            this.play();
          }
        )
      }

    },
    methods: {
      start() {
        clearTimeout(this.loop); //再次清空定时器，防止重复注册定时器
        this.loop = setTimeout(() => {
          return false;
        }, 600);
      },
      end() {
        clearTimeout(this.loop); //清空定时器，防止重复注册定时器
        return false;
      },
      player(index,url){
        let myId = 'my-video'+index;
       let myVideo = document.getElementById(myId);
        console.log(myVideo);
        // myVideo.play()
      },
      //上拉加载更多|| {pageNo: (this.video.pages), pageSize: 4}
      loadMore() {
        if (!this.hasData) {
          return false
        }
        videoList({pageNo: (this.video.pages), pageSize: 4}).then(res => {
          if (res.code == 200) {
            if (res.result.records.length) {
              this.video.pages += 1
              this.video.list.push(...res.result.records)
            } else {
              this.hasData = false
              this.$toast('没有更多数据了');
              PubSub.publish('noData', 'noData')
            }
          } else {
            this.$toast(res.message);
          }
        })
      },
    }

  }
</script>

<style scoped>

  .item-video {
    font-size: .43rem;
    margin-bottom: 1rem;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    /* 禁用系统默认菜单 */
    touch-callout: none;
    -webkit-touch-callout: none;
    -ms-touch-callout: none;
    -moz-touch-callout: none;
  }
  .item-video:last-child{
    margin-bottom: 0;
  }

  .overflow-ellipsis {
    color: #323333;
    font-size: .43rem;
    margin: .3rem auto;
  }

</style>
