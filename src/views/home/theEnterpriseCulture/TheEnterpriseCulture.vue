<template>
  <div>
    <!-- <div class="advertising" v-for="(item ,index) in advertising" v-if="index <= 0"><img :src="item.img" alt=""></div> -->
    <mob-head/>
    <nav-bar/>
    <crumbs :crumbs="crumbs"/>
    <div class="widths">
      <div class="theEnterpriseCulture">文化架构体系</div>
      <p>中国烟草文化架构体系：</p>
      <ul>
        <li>行业共同价值观：国家利益至上，消费者利益至上。</li>
        <li>行业愿景：责任烟草、诚信烟草、和谐烟草。</li>
        <li>行业使命：报效国家、回报社会、成就员工 。</li>
        <li>行业精神：宽容开放、改革创新、敬业奉献、自律自强 。</li>
        <li>行业行为信条：潜心做事、低调做人。</li>
        <li>行业行为准则：讲责任、讲诚信、讲效率、讲奉献。</li>
      </ul>

      <p style="margin-top: .64rem">四川烟草文化架构体系：</p>
      <ul style="margin-bottom: .85rem">
        <li>企业核心价值观：人为本、法为准、德为先。</li>
        <li>企业使命：携手客户，构建和谐并进的利益共同体。</li>
        <li>企业精神：以责任奉献社会，以真情回报客户，以创新超越自我。</li>
        <li>企业道德：感恩、尽责、诚信、自律 。</li>
        <li>发展理念：不断超越，领先一步。</li>
        <li>领导模式：全员参与型领导模式。</li>
        <li>人文环境：愉快工作，幸福生活 。</li>
      </ul>

      <div class="theEnterpriseCulture">诚至诚服务文化</div>
      <div>
        <van-swipe @change="onChange" :autoplay="3000">
          <van-swipe-item v-for="(item, index) in swiperImgArr" :key="index">
            <img :src="item.img" alt="" class="swiper-img">
          </van-swipe-item>
          <!--<div class="custom-indicator" slot="indicator">-->
            <!--{{ current + 1 }}/{{swiperImgArr.length || 0}}-->
          <!--</div>-->
        </van-swipe>
      </div>
      <div class="theEnterpriseCulture">专题文化</div>
      <div class="safetyCulture">安全文化：企业文化核心价值观：以人为本，法为准，德为先。</div>
    </div>

    <mob-footer/>
  </div>
</template>

<script>
  import {sysAdvertiseList} from "@/api/request";
  import MobHead from "@/components/control/mobHead/MobHead";
  import NavBar from "@/components/control/navBar/NavBar";
  import Crumbs from "@/components/control/crumbs/Crumbs";
  import MobFooter from "@/components/control/mobFooter/MobFooter";

  export default {
    name: "TheEnterpriseCulture",//企业文化
    components: {MobFooter, Crumbs, NavBar, MobHead},
    data() {
      return {
        crumbs: [
          {name: '首页', path: '/home'},
          {name: '企业文化', path: ''}
        ],
        advertising: [],
        swiperImgArr: [],
        current: 0
      }
    },
    mounted() {
      // 遍历添加轮播数组中的图片
      this.swiperImgArr = [];
      for (let i = 1; i < 18; i++) {
        this.swiperImgArr.push({img: require(`./images/${i}.jpg`)})
      }
    },
    created() {
      this.firstLoad()
    },
    methods: {
      firstLoad() {
        sysAdvertiseList({typeCode: 'index_dingbuguanggao'}).then(res => {
          if (res.code == 200 || res.code == 0) {
            this.advertising = res.result.records
          }
        })
      },
      onChange(index) {
        this.current = index;
      }
    }
  }
</script>

<style lang="less" scoped>
  /* 轮播图片 */
  .swiper-img {
    width: 100%;
  }

  .advertising {
    width: 100%;
    height: 30px;
    img {
      width: 100%;
      border: none;
      display: block;
    }
  }

  .theEnterpriseCulture {
    margin: .6399rem auto;
    font-size: .5rem;
  }

  p {
    height: .37rem;
    font-size: .37rem;
    font-family: PingFangSC, PingFangSC-Medium;
    font-weight: 500;
    text-align: left;
    color: #323333;
    line-height: .37rem;
    margin-bottom: .29rem;
  }

  li {
    font-size: .37rem;
    font-family: PingFangSC, PingFangSC-Regular;
    font-weight: 400;
    text-align: left;
    color: #4e4e4e;
    line-height: .56rem;
    margin-bottom: .2rem;
  }

  .safetyCulture{
    height: 1.1199rem;
    font-size: .373rem;
    font-family: PingFangSC, PingFangSC-Regular;
    font-weight: 400;
    text-align: left;
    color: #4e4e4e;
    line-height: .56rem;
    margin-bottom: 1.01333rem;
  }
</style>
